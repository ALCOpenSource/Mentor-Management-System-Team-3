import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Logger, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { ChatService } from "src/chat/chat.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtWebSocketGuard } from "src/auth/guards/ws.auth.guard";

import {
  MarkMessageAsDeliveredDto,
  BroadCastMessage,
  TypingDto,
  CreateMessageDto,
} from "src/chat/dto/messsage.dto";
import { UsersService } from "src/users/users.service";
import { PreferencesService } from "src/preferences/preferences.service";
import { MailService } from "src/mail/mail.service";

@WebSocketGateway() // { cors: { origin: "http://localhost:3000" } }
export class WsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(WsGateway.name);

  constructor(
    private chatService: ChatService,
    private usersService: UsersService,
    private preferenceService: PreferencesService,
    private mailService: MailService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @WebSocketServer()
  server: Server;

  private readonly connectedUsers = new Map<string, Socket>();

  async handleConnection(socket: Socket) {
    this.logger.debug("Starting connection");
    const authToken = socket.handshake.headers["authorization"];
    this.logger.debug(`Authorization header: ${authToken}`);
    if (!authToken || !authToken.startsWith("Bearer ")) {
      this.logger.error("Invalid authorization header");
      socket.disconnect();
      return false;
    }
    const token = authToken.slice(7, authToken.length);
    try {
      if (!token) {
        throw new UnauthorizedException();
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>("JWT_SECRET"),
        });

        socket.data.user = payload;
        this.logger.debug(socket);
        const userId = socket.data.user.sub;
        this.logger.debug(`Client connected: ${socket.id} with user ${userId}`);

        this.connectedUsers.set(userId, socket);
      } catch (error) {
        throw new UnauthorizedException();
      }
    } catch (error) {
      socket.disconnect();
    }
  }

  async handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
    const uid = Array.from(this.connectedUsers.entries())
      .filter(([, s]) => s.id === socket.id)
      .map(([u]) => u)[0];
    this.connectedUsers.delete(uid);
  }

  @UseGuards(JwtWebSocketGuard)
  @SubscribeMessage("heartbeat")
  handleHeartbeat(client: Socket) {
    // Send heartbeat response
    client.emit("heartbeatResponse");
  }

  async afterInit(server: Server) {
    this.logger.debug(`Initialized! ${server}`);
  }
  @UseGuards(JwtWebSocketGuard)
  @SubscribeMessage("getChatMessages")
  async handleGetChatMessages(socket: Socket, data: { chatId: string }) {
    const messages = await this.chatService.getChatMessages(data.chatId);
    socket.emit("chatMessages", messages);
  }

  @UseGuards(JwtWebSocketGuard)
  @SubscribeMessage("sendMessage")
  async handleSendMessage(socket: Socket, createMessage: CreateMessageDto) {
    this.logger.debug(socket.data.user.sub);
    createMessage.senderId = socket.data.user.sub;
    let message;
    if (typeof createMessage.text === "string") {
      message = await this.chatService.sendMessage(createMessage);
    } else {
      message = await this.chatService.uploadAttachment(createMessage);
    }
    // list sockets
    const sockets = Array.from(this.connectedUsers.entries());
    // find receiver socket
    const receiverSocket = sockets.find(
      ([userId]) => userId === createMessage.receiverId,
    );
    // if receiver is connected, emit message to receiver
    if (receiverSocket) {
      this.logger;
      this.server.to(receiverSocket[1].id).emit("newMessage", message);
    }
    // if the receiver is not online, send push notification to their email
    else {
      // Notifcation service(TODO||)
      // check if user is subscribed to Direct messages notifications
      // const preferences = await this.preferenceService.getPreferencesByUid(
      //   createMessage.receiverId,
      // );
      // const isSubscribed =
      //   preferences.data[0].discussionNotifications
      //     .enableDirectMessageNotifications;
      // const receiver = await this.usersService.getUserById(
      //   createMessage.receiverId,
      // );
      // const sender = await this.usersService.getUserById(
      //   createMessage.senderId,
      // );
      // const message = `You have a new message from ${sender.data.email}`;
      // // check if a user has enabled email notifications for messages
      // if (receiver && isSubscribed) {
      //   await this.mailService.sendNotificationEmail(
      //     receiver.data.email,
      //     message,
      //   );
      // }
    }
  }

  @UseGuards(JwtWebSocketGuard)
  @SubscribeMessage("markMessageRead")
  async handleMarkMessageRead(socket: Socket, data: MarkMessageAsDeliveredDto) {
    const message = await this.chatService.markMessageRead(
      data.messageId,
      data.chatId,
    );
    // list sockets
    const sockets = Array.from(this.connectedUsers.entries());
    // find receiver socket
    const senderSocket = sockets.find(
      ([userId]) => userId === message.senderId,
    );
    const receiverSocket = sockets.find(
      ([userId]) => userId === message.receiverId,
    );
    // Emit updated message to sender and receiver
    this.server
      .to(receiverSocket[1].id)
      .to(senderSocket[1].id)
      .emit("messageRead", message);
  }

  @UseGuards(JwtWebSocketGuard)
  @SubscribeMessage("markMessageAsDelivered")
  async handleMarkMessageAsDelivered(
    socket: Socket,
    data: MarkMessageAsDeliveredDto,
  ) {
    const message = await this.chatService.markMessageAsDelivered(
      data.chatId,
      data.messageId,
    );
    // list sockets
    const sockets = Array.from(this.connectedUsers.entries());
    // find receiver socket
    const senderSocket = sockets.find(
      ([userId]) => userId === message.senderId,
    );
    const receiverSocket = sockets.find(
      ([userId]) => userId === message.receiverId,
    );
    // Emit updated message to sender and receiver
    this.server
      .to(receiverSocket[1].id)
      .to(senderSocket[1].id)
      .emit("messageDelivered", message);
  }
  // start typing event
  @UseGuards(JwtWebSocketGuard)
  @SubscribeMessage("startTyping")
  async handleStartTyping(socket: Socket, data: TypingDto) {
    data.receiverId = socket.data.user.sub;
    // list sockets
    const sockets = Array.from(this.connectedUsers.entries());
    // find receiver socket
    const receiverSocket = sockets.find(
      ([userId]) => userId === data.receiverId,
    );
    // if receiver is connected, emit message to receiver
    if (receiverSocket) {
      this.server.to(receiverSocket[1].id).emit("startTyping", {
        success: true,
        chatId: data.chatId,
        senderId: data.senderId,
      });
    }
  }

  // stop typing event
  @UseGuards(JwtWebSocketGuard)
  @SubscribeMessage("stopTyping")
  async handleStopTyping(socket: Socket, data: TypingDto) {
    // list sockets
    const sockets = Array.from(this.connectedUsers.entries());
    // find receiver socket
    const receiverSocket = sockets.find(
      ([userId]) => userId === data.receiverId,
    );
    // if receiver is connected, emit message to receiver
    if (receiverSocket) {
      this.server.to(receiverSocket[1].id).emit("stopTyping", {
        success: true,
        chatId: data.chatId,
        senderId: data.senderId,
      });
    }
  }
  // broadcast a chat to all users

  @UseGuards(JwtWebSocketGuard)
  @SubscribeMessage("broadcastChat")
  async handleBroadCastMessage(socket: Socket, data: BroadCastMessage) {
    const s_Id = socket.data.user.sub;

    data.recipients.map(async (_r) => {
      const chat = await this.chatService.createChat(_r, s_Id);

      const message = {
        senderId: s_Id,
        receiverId: _r,
        text: data.text,
        chatId: chat.data.chatId,
      };
      this.chatService.sendMessage(message);

      //TODO broadcast message if online
      // send notification if subscribed to email
      // send-in-app notifcation if subscribed
    });
    throw new Error("Not implemented yet");
  }
}

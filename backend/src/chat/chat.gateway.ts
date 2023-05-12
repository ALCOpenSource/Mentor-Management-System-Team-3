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
import { ChatService } from "./chat.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtWebSocketGuard } from "src/auth/guards/ws.auth.guard";
import { UsersService } from "src/users/users.service";
import { MailService } from "src/mail/mail.service";

@WebSocketGateway() // { cors: { origin: "http://localhost:3000" } }
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private chatService: ChatService,
    private usersService: UsersService,
    private mailService: MailService,
    private jwtService: JwtService,
    private configService: ConfigService, // private userService: UserService,
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
  async handleSendMessage(
    socket: Socket,
    data: {
      chatId: string;
      senderId: string;
      receiverId: string;
      text: string | Express.Multer.File;
    },
  ) {
    let message;
    if (typeof data.text === "string") {
      message = await this.chatService.sendMessage(
        data.chatId,
        data.senderId,
        data.receiverId,
        data.text,
      );
    } else {
      message = await this.chatService.uploadAttachment(
        data.chatId,
        data.senderId,
        data.receiverId,
        data.text,
      );
    }
    // list sockets
    const sockets = Array.from(this.connectedUsers.entries());
    // find receiver socket
    const receiverSocket = sockets.find(
      ([userId]) => userId === data.receiverId,
    );
    // if receiver is connected, emit message to receiver
    if (receiverSocket) {
      this.server.to(receiverSocket[1].id).emit("newMessage", message);
    }
    // if the receiver is not online, send push notification to their email
    else {
      const receiver = await this.usersService.getUserById(data.receiverId);
      const sender = await this.usersService.getUserById(data.senderId);
      const message = `You have a new message from ${sender.data.email}`;
      if (receiver) {
        await this.mailService.sendNotificationEmail(
          receiver.data.email,
          message,
        );
      }
    }
  }

  @UseGuards(JwtWebSocketGuard)
  @SubscribeMessage("markMessageRead")
  async handleMarkMessageRead(
    socket: Socket,
    data: { messageId: string; chatId: string },
  ) {
    const message = await this.chatService.markMessageRead(
      data.messageId,
      data.chatId,
    );
    // Emit updated message to sender and receiver
    this.server
      .to(message.senderId)
      .to(message.receiverId)
      .emit("messageRead", message);
  }

  @UseGuards(JwtWebSocketGuard)
  @SubscribeMessage("markMessageAsDelivered")
  async handleMarkMessageAsDelivered(
    socket: Socket,
    data: { chatId: string; messageId: string },
  ) {
    await this.chatService.markMessageAsDelivered(data.chatId, data.messageId);
    // Emit event to sender and receiver
    this.server.to(data.chatId).emit("messageDelivered", {
      chatId: data.chatId,
      messageId: data.messageId,
    });
  }
  // start typing event
  @UseGuards(JwtWebSocketGuard)
  @SubscribeMessage("startTyping")
  async handleStartTyping(
    socket: Socket,
    data: { chatId: string; senderId: string; receiverId: string },
  ) {
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
  async handleStopTyping(
    socket: Socket,
    data: { chatId: string; senderId: string; receiverId: string },
  ) {
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
}

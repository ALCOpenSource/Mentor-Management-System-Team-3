import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Logger, UseGuards } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { MessagesService } from "./chat.service";
import { FirebaseService } from "src/firebase/firebase.service";
import { WsFirebaseAuthGuard } from "src/firebase/guards/websocket.guard";

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatGateway.name);
  constructor(
    private messagesService: MessagesService,
    private firebaseService: FirebaseService,
  ) {}

  @WebSocketServer()
  server: Server;

  private readonly connectedUsers = new Map<string, Socket>();

  async handleConnection(socket: Socket, ..._args: unknown[]) {
    const authToken = socket.handshake.headers["authorization"];
    this.logger.debug(`Authorization header: ${authToken}`);
    if (!authToken || !authToken.startsWith("Bearer ")) {
      this.logger.error("Invalid authorization header");
      socket.disconnect();
      return false;
    }
    const token = authToken.slice(7, authToken.length);
    try {
      const decodedToken = await this.firebaseService.auth.verifyIdToken(token);

      // Check if the token has expired
      const now = new Date().getTime() / 1000; // convert to Unix time
      if (decodedToken.exp < now) {
        socket.disconnect();
      }

      // Pass the decoded token to the client for later use
      socket["authUser"] = decodedToken;

      this.logger.debug(`The user ${decodedToken.uid} is connected`);
    } catch (error) {
      socket.disconnect();
    }
    const userId = socket["authUser"].uid;

    this.connectedUsers.set(userId, socket);
    const messages = await this.messagesService.getUnreadMessages(userId);
    this.logger.debug(`Sending ${messages.length} unread messages`);
    socket.emit("unreadMessages", messages);
  }

  async handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
    const uid = Array.from(this.connectedUsers.entries())
      .filter(([, s]) => s.id === socket.id)
      .map(([u]) => u)[0];
    this.connectedUsers.delete(uid);
  }

  async afterInit(server: Server) {
    console.log(server.getMaxListeners());
    console.log("WebSocket server initialized");
  }
  @UseGuards(WsFirebaseAuthGuard)
  @SubscribeMessage("chatMessage")
  async handleChatMessage(
    _client: Socket,
    payload: { senderId: string; receiverId: string; text: string },
  ) {
    console.log(
      `Received chat message from ${payload.senderId} to ${payload.receiverId}: ${payload.text}`,
    );
    const { senderId, receiverId, text } = payload;
    const message = await this.messagesService.createMessage(
      senderId,
      receiverId,
      text,
    );
    const receiverSocket = this.connectedUsers.get(receiverId);
    if (receiverSocket) {
      receiverSocket.emit("chatMessage", message);
    }
  }
  @UseGuards(WsFirebaseAuthGuard)
  @SubscribeMessage("markMessageAsRead")
  async handleMarkMessageAsRead(
    _client: Socket,
    payload: { messageId: string; receiverId: string },
  ) {
    this.logger.log(
      `Received mark message as read from ${payload.receiverId} for message ${payload.messageId}`,
    );
    const { messageId, receiverId } = payload;
    const message = await this.messagesService.markMessageAsRead(
      messageId,
      receiverId,
    );
    const senderSocket = this.connectedUsers.get(message.sender);
    if (senderSocket) {
      senderSocket.emit("markMessageAsRead", message);
    }
  }
}

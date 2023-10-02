/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8001, { cors: '*' })
// @WebSocketGateway(8001, { cors: '*' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private players: Map<string, string> = new Map();
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string): void {
    console.log(message);
    const rm = this.players.get(client.id);
    if (rm) this.server.to(rm).emit('message', message);
  }
  @SubscribeMessage('rome')
  handleCreatRome(client: Socket, rome: string): void {
    // console.log(client);
    client.join(rome);
    console.log(this.players);
    this.players.set(client.id, rome);
    // const exisstingRoom = this.players.get(client.id);
    // if(exi)
    // console.log(existingRoom);
    // this.server.emit('message', message);
  }
}

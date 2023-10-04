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

@WebSocketGateway(8002, { cors: '*' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private players: Array<{ _client: Socket; _rome: string }> = [];
  handleConnection(client: Socket) {
    console.log(`Game: Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.players = this.players.filter((item) => item._client.id != client.id);
    console.log(`Game: Client disconnected: ${client.id}`);
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string): void {
    console.log('Game: -------- ', message);
    // const rm = this.players.get(client.id);
    // if (rm) this.server.to(rm).emit('message', message);
  }
  @SubscribeMessage('joinRome')
  handleCreatRome(client: Socket, rome: string): void {
    this.players.push({ _client: client, _rome: rome });
    client.join(rome);
    const filtr = this.players.filter((item) => item._rome === rome);
    // this.server.emit('numberOfPlayerInRome', 10);
    const index = this.players.findIndex(
      (item) => item._client.id === client.id,
    );
    if (index != -1) client.emit('indexPlayer', index);
    if (filtr.length == 2) this.server.emit('start', filtr.length);
    console.log(filtr.length);
    console.log(this.players);
  }
  @SubscribeMessage('update1')
  handleCreatpostion1(client: Socket, y: number): void {
    const user = this.players.find((item) => item._client.id == client.id);
    if (user) client.to(user._rome).emit('y1', y);
  }
  @SubscribeMessage('update2')
  handleCreatpostion2(client: Socket, y: number): void {
    const user = this.players.find((item) => item._client.id == client.id);
    if (user) client.to(user._rome).emit('y2', y);
  }
  @SubscribeMessage('moveBall')
  handleMoveBall(client: Socket, ball: any): void {
    const user = this.players.find((item) => item._client.id == client.id);
    if (user) this.server.to(user._rome).emit('movebb', ball);
  }
  @SubscribeMessage('startWithComputer')
  handlestartWithComputer(client: Socket, ball: any): void {
    // const user = this.players.find((item) => item._client.id == client.id);
    // if (user) this.server.to(user._rome).emit('movebb', ball);
    client.emit('start');
  }
}

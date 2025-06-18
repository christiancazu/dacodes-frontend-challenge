import { UserScore } from "@dacodes/lib";
import { UseGuards } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { WsGuard } from "./guards/websockets.guards";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
@UseGuards(WsGuard)
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log("Client connected:", client.id);
  }

  handleDisconnect(client: Socket) {
    console.log("Client disconnected:", client.id);
  }

  emitUpdate(leaderboardUsers: UserScore[]) {
    this.server.emit("leaderboard:update", leaderboardUsers);
  }
}

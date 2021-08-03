import { Socket } from "net"

export type Client = {
  socket: Socket;
  data: ClientData;
}

export type ClientData = {
  bytesChunks: Buffer[],
  result: any
}

export type Action = {
  type: ActionType;
  payload: object;
}

export enum ActionType {

}
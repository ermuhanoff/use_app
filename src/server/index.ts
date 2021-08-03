import net, { Socket } from "net";
import { Action, Client } from "./types";

class AppServer {
  public readonly PORT: number = 33333;

  private _server: net.Server;
  private _clients: Map<string, Client>;
  private _receivedChunks: Buffer[];

  constructor() {
    this._server = net.createServer();
    this._clients = new Map<string, Client>();
    this._receivedChunks = [];

    this.applyServerListeners();
  }

  private applyServerListeners(): void {
    this._server.on("connection", this.onConnectionListener);

    this._server.on("error", () => {
      console.error("Error on server");    // ? logger
    });

    this._server.listen(this.PORT, () => {
      console.info("Server is running on port " + this.PORT);    // ? logger
    });
  }

  private onConnectionListener(socket: Socket): void {
    console.info(`Client ${this.getFullAddress(socket)} opened connection`);    // ? logger

    this._clients.set(this.getFullAddress(socket), {
      socket,
      data: { bytesChunks: [], result: null }
    });

    socket.on("data", (data: Buffer) => {
      const client = this._clients.get(this.getFullAddress(socket))

      if (client)
        this.dataReceive(client, data);
    });

    socket.on("drain", () => {
      console.info(this.concatBytes(this._receivedChunks).toString());    // ? logger
    });

    socket.on("error", () => {
      console.error(`Error on client ${this.getFullAddress(socket)}`);    // ? logger
    });

    socket.on("close", () => {
      this._clients.delete(this.getFullAddress(socket));

      console.warn(`Client ${this.getFullAddress(socket)} closed connection`);    // ? logger
    });
  };

  private getFullAddress(socket: Socket): string {
    return `${socket.remoteAddress}:${socket.remotePort}`;
  };

  private dataReceive(client: Client, bytes: Buffer): void {
    let startByte = bytes.readInt8(0);
    let endByte = bytes.readInt8(bytes.length - 1);

    if (startByte === 0 || endByte === 0) {
      if (startByte === 0 && endByte === 0) {
        this.addBytesToClient(client, bytes.slice(1, bytes.length - 1));
        this.executeClientAction(client);
      } else if (startByte === 0) {
        this.addBytesToClient(client, bytes.slice(1, bytes.length));
      } else {
        this.addBytesToClient(client, bytes.slice(0, bytes.length - 1));
        this.executeClientAction(client);
      }
    } else {
      this.addBytesToClient(client, bytes);
    }
  };

  private addBytesToClient(client: Client, bytes: Buffer): void {
    client.data.bytesChunks.push(bytes);
  };

  private concatBytes(bytesChunks: Buffer[]): Buffer {
    return Buffer.concat(bytesChunks);
  };

  private executeClientAction(client: Client): void {
    const { data } = client;
    const bytes = this.concatBytes(data.bytesChunks);
    const parsedClientAction = this.parseAction(bytes);
    // const parsedClientPayload = parsePayload(parsedClientAction.payload);

    console.dir(parsedClientAction);    // ? logger

    this.clearClientData(client);

    switch (parsedClientAction.type) {

    }
  };

  private parsePayload<T>(data: string): T {
    return JSON.parse(data);
  };

  private parseAction(bytes: Buffer): Action {
    return JSON.parse(bytes.toString("utf")) as Action;
  }

  private clearClientData(client: Client): void {
    const { data } = client;

    data.bytesChunks = [];
    data.result = null;
  };

}



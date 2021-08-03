"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const PORT = 33333;
const Server = net_1.default.createServer();
const Clients = new Map();
const ReceivedChunks = [];
const connection = (socket) => {
    console.info(`Client ${getFullAddress(socket)} opened connection`); // ? logger
    Clients.set(getFullAddress(socket), {
        socket,
        data: { bytesChunks: [], result: null }
    });
    socket.on("data", (data) => {
        const client = Clients.get(getFullAddress(socket));
        if (client)
            dataReceive(client, data);
    });
    socket.on("drain", () => {
        console.info(concatBytes(ReceivedChunks).toString()); // ? logger
    });
    socket.on("error", () => {
        console.error(`Error on client ${getFullAddress(socket)}`); // ? logger
    });
    socket.on("close", () => {
        Clients.delete(getFullAddress(socket));
        console.warn(`Client ${getFullAddress(socket)} closed connection`); // ? logger
    });
};
Server.on("connection", connection);
Server.on("error", () => {
    console.error("Error on server"); // ? logger
});
Server.listen(PORT, () => {
    console.info("Server is running on port " + PORT); // ? logger
});
const getFullAddress = (socket) => {
    return `${socket.remoteAddress}:${socket.remotePort}`;
};
const dataReceive = (client, bytes) => {
    let startByte = bytes.readInt8(0);
    let endByte = bytes.readInt8(bytes.length - 1);
    if (startByte === 0 || endByte === 0) {
        if (startByte === 0 && endByte === 0) {
            addBytesToClient(client, bytes.slice(1, bytes.length - 1));
            executeClientAction(client);
        }
        else if (startByte === 0) {
            addBytesToClient(client, bytes.slice(1, bytes.length));
        }
        else {
            addBytesToClient(client, bytes.slice(0, bytes.length - 1));
            executeClientAction(client);
        }
    }
    else {
        addBytesToClient(client, bytes);
    }
};
const addBytesToClient = (client, bytes) => {
    client.data.bytesChunks.push(bytes);
};
const concatBytes = (bytesChunks) => {
    return Buffer.concat(bytesChunks);
};
const executeClientAction = (client) => {
    const { data } = client;
    const bytes = concatBytes(data.bytesChunks);
    const parsedClientAction = parseAction(bytes);
    // const parsedClientPayload = parsePayload(parsedClientAction.payload);
    console.dir(parsedClientAction); // ? logger
    clearClientData(client);
    switch (parsedClientAction.type) {
    }
};
const parsePayload = (data) => {
    return JSON.parse(data);
};
const parseAction = (bytes) => {
    return JSON.parse(bytes.toString("utf"));
};
const clearClientData = (client) => {
    const { data } = client;
    data.bytesChunks = [];
    data.result = null;
};
//# sourceMappingURL=index.js.map
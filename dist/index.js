import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let allMsg = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        //@ts-ignore
        const parsedMsg = JSON.parse(message);
        if (parsedMsg.type == "join") {
            allMsg.push({
                socket,
                roomId: parsedMsg.payload.roomId,
            });
        }
        if (parsedMsg.type == "chat") {
            const currUserRoom = allMsg.find(x => x.socket == socket);
            for (let i = 0; i < allMsg.length; i++) {
                if (currUserRoom?.roomId == allMsg[i]?.roomId) {
                    allMsg[i]?.socket.send(parsedMsg.payload.message);
                }
            }
        }
    });
});
//# sourceMappingURL=index.js.map
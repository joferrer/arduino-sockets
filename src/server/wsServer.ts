import { WebSocketServer, WebSocket } from "ws";

export class WsServer {
    private wss: WebSocketServer;
    private static clients: Set<WebSocket> = new Set(); // Guardar conexiones

    constructor(wss: WebSocketServer) {
        this.wss = wss;
        this.wssSocketEvents();
    }

    private wssSocketEvents() {
        this.wss.on("connection", (ws) => {
            console.log("🔗 Cliente (WebSockets) conectado");
            WsServer.clients.add(ws);

            ws.on("message", (msg, isBinary) => {
                console.log("isBinary", isBinary);
                console.log("📩 Mensaje de WebSockets:", msg.toString());
                ws.send("Respuesta del servidor");
            });

            ws.on("error", (error) => {
                console.error("❌ Error en WebSocket:", error.message);
            });

            ws.on("close", () => {
                console.log("❌ Cliente WebSockets desconectado");
                WsServer.clients.delete(ws);
            });
        });
    }

    // Esta función la puedes llamar desde el scheduler
    public static sendToAll(data: string) {
        for (const client of WsServer.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        }
    }
}

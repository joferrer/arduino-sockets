import { WebSocketServer } from "ws";  // <-- Importamos 'ws'


export class WsServer {
    private wss: WebSocketServer;
    constructor(wss: WebSocketServer){
        this.wss = wss;
        this.wssSocketEvents();
        
    }
    wssSocketEvents(){
        this.wss.on("connection", (ws) => {
            console.log("🔗 Cliente (WebSockets) conectado");
        
            ws.on("message", (msg,isBinary) => {
            
                    console.log("isBinary",isBinary);
                    
                    console.log("📩 Mensaje de WebSockets:", msg.toString());
                    ws.send("Respuesta del servidor");
                    

                
            });
            ws.on("error", (error) => {
                console.error("❌ Error en WebSocket:", error.message);
            });
            ws.on("close", () => {
                console.log("❌ Cliente WebSockets desconectado");
            });
        });
    }
}
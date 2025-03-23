import { Server as SocketServer} from "socket.io";

export class Sockets {

    private io :SocketServer;
    
    constructor(io :SocketServer){
        this.io = io;
        this.socketEvents();
    }

    socketEvents(){
        this.io.on("connection", (socket) => {
            console.log("Client connected", socket.id);
            socket.emit("message", "Welcome to the server");

            socket.on("message", (data) => {
                console.log(data);
                this.io.emit("message", "data received");
            });
        })
        
    }
}
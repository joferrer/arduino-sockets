import express from "express";
import http from "http";
import path from "path";
import cors from "cors";

import { Server as SocketServer} from "socket.io";
import { Sockets } from "./socket";


class Server {
    private port: number;
    private app: express.Application;
    private server: http.Server;
    private io: SocketServer;

    constructor(){
        this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new SocketServer(this.server);
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static(path.resolve(__dirname, "../../public")));
    }

    socketConfig(){
        new Sockets(this.io)
    }
    
    start(){

        this.middlewares();
        this.socketConfig();

        this.server.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}!`);
        });
    }
}


export const server = new Server();
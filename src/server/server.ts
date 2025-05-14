import express from "express";
import http from "http";
import path from "path";
import cors from "cors";

import { Server as SocketServer} from "socket.io";
import { Sockets } from "./socket";
import {WebSocketServer} from "ws"
import { WsServer } from "./wsServer";

import {router as horariosRouter} from '../routes/horario'

class Server {
    private port: number;
    private app: express.Application;
    private server: http.Server;
    private io: SocketServer;
    private wss: WebSocketServer;

    constructor(){
        this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new SocketServer(this.server,{path:"/io"});
        this.wss = new WebSocketServer({ server: this.server, path:"/ws"}) ;
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static(path.resolve(__dirname, "../../public")));
    }

    socketConfig(){
        new Sockets(this.io)
    }
    
    wssSocketConfig(){
        new WsServer(this.wss);
    }

    routes(){
        this.app.use('/api',horariosRouter)
    }

    start(){

        this.middlewares();
        this.socketConfig();
        this.wssSocketConfig();
        this.routes()

        this.server.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}!`);
        });
    }
}


export const server = new Server();
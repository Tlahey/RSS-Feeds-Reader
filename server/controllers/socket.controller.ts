/*
import * as SocketIO from "socket.io";
import {SocketService, IO, Nsp, Socket, SocketSession, Input, Args, Emit} from "@tsed/socketio";
import { Get } from "@tsed/common";
import { MySocketService } from "../services/socket.service";

@SocketService("/RSS")
export class MySocketCtrl {

    constructor(private mySocketService: MySocketService) {}
    
    @Get("/allo")
    allo() {
         this.mySocketService.helloAll(); 
         return "is sent";
    }
}
*/
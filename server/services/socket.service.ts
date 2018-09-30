import * as SocketIO from "socket.io";
import {SocketService, Nsp, Socket, SocketSession, Emit, Input, Broadcast} from "@tsed/socketio";

@SocketService("/RSS")
export class MySocketService {
    @Nsp nsp: SocketIO.Namespace;

    static GetInstance : MySocketService;

    /**
     * Triggered the namespace is created
     */
    $onNamespaceInit(nsp: SocketIO.Namespace) {
        // MySocketService.GetInstance = this;
    }
    /**
     * Triggered when a new client connects to the Namespace.
     */
    $onConnection(@Socket socket: SocketIO.Socket, @SocketSession session: SocketSession) {
        console.log("----------------- connected");
        // this.helloAll();
    }
    /**
     * Triggered when a client disconnects from the Namespace.
     */
    $onDisconnect(@Socket socket: SocketIO.Socket) {

    }

    broadCastNewFeeds(newFeeds : any){
        this.nsp.emit('news', newFeeds);
    }

    playAudio(audioName : string){
        this.nsp.emit('playSound', audioName);
    }
}
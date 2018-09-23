import * as SocketIO from "socket.io";
import {SocketService, IO, Nsp, Socket, SocketSession, Input, Args, Emit} from "@tsed/socketio";

@SocketService("/RSS")
export class MySocketService {

    @Nsp nsp: SocketIO.Namespace;

    constructor(@IO private io: SocketIO.Server) {}
    /**
     * Triggered the namespace is created
     */
    $onNamespaceInit(nsp: SocketIO.Namespace) {
        console.log("------ init namespace ", nsp.name);
        // Réaliser un interval pour récupérer les sockets via la configuration
    }
    /**
     * Triggered when a new client connects to the Namespace.
     */
    $onConnection(@Socket socket: SocketIO.Socket, @SocketSession session: SocketSession) {
        console.log("------ On connection");
        socket.emit("message", "user connected");
    }
    /**
     * Triggered when a client disconnects from the Namespace.
     */
    $onDisconnect(@Socket socket: SocketIO.Socket) {
        console.log("------ On disconnection");
    }

    helloAll() {
        this.nsp.emit('hi', 'everyone!');
    }

    @Input("eventName")
    @Emit("responseEventName") // or Broadcast or BroadcastOthers
    async myMethod(@Args(0) userName: string, @SocketSession session: SocketSession) {

        const user = session.get("user") || {}
        user.name = userName;

        session.set("user", user);

        return user;
    }
}
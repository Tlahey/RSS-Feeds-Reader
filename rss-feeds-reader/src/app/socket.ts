import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, filter, scan } from 'rxjs/operators';

@Injectable()
export class SocketOne extends Socket{

    constructor() { 
        super({ 
            url: 'http://192.168.1.15:8080/my',
            options: {
                path: "/socket"
            } 
        });
    }

    sendMessage(msg: string){
        this.emit("message", msg);
    }

    getMessage() {
        return this
            .fromEvent("message")
            .pipe(map(data => data));
    }


}
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, filter, scan } from 'rxjs/operators';
import { socketConfiguration } from '../../environments/environment';
import { Observer } from 'rxjs';

@Injectable()
export class SocketRSS extends Socket{

    constructor() { 
        super({ 
            url: `${socketConfiguration.host}:${socketConfiguration.port}${socketConfiguration.namespace}`,
            options: {
                path: socketConfiguration.path
            } 
        });
        this.handlers();
    }

    handlers(){

        this.on('playSound', (soundName) => {
            let audio = new Audio();
            audio.src = "/assets/sounds/" + soundName;
            audio.load();
            audio.play();
        });

    }

    // Récupère les nouveaux feeds
    getRSSNewFeeds(observer : Observer<any>){
    
        this.on('news', (data) => {
            console.log(data);
            observer.next(data);
        });

    }


}
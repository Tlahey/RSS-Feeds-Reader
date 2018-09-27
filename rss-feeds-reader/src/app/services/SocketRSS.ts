import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, filter, scan } from 'rxjs/operators';
import { socketConfiguration } from '../../environments/environment';

@Injectable()
export class SocketRSS extends Socket{

    constructor() { 
        super({ 
            url: `${socketConfiguration.host}:${socketConfiguration.port}${socketConfiguration.namespace}`,
            options: {
                path: socketConfiguration.path
            } 
        });
    }

    // Récupère les nouveaux feeds
    getRSSNewFeeds(){
        return this
            .fromEvent("news")
            .pipe(map(feed => feed));            
    }

}
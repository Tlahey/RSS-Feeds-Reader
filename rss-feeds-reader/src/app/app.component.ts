import { Component } from '@angular/core';
import { SocketRSS } from './SocketRSS';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rss-feeds-reader';

  constructor(socket: SocketRSS){
    socket.connect();

    console.log("connecting");

    socket.getRSSNewFeeds().subscribe(newFeed => {
      // Traitement sur l'arrivé d'un nouveau feed
    });

    console.log("Init view");
  }
}

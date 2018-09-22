import { Component } from '@angular/core';
import { SocketOne } from './socket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rss-feeds-reader';

  constructor(socket: SocketOne){
    socket.connect();
    console.log("connecting");
    socket.on('connection', (s) => {
      console.log("connected");
    });
    socket.getMessage().subscribe((message => console.log(message)));
  }
}

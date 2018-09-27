import { Component } from '@angular/core';
import { SocketRSS } from './services/SocketRSS';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rss-feeds-reader';

  constructor(socket: SocketRSS, private _configSrv : ConfigurationService){
    socket.connect();

    /*
    console.log("connecting");
    socket.getRSSNewFeeds().subscribe(newFeed => {
      // Traitement sur l'arrivé d'un nouveau feed
    });
    */

    this._configSrv.GetConfiguration().subscribe(flux => {
      console.log(flux);
    })

    console.log("Init view");
  }
}

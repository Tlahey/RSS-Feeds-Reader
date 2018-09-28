import { Component, ViewChild } from '@angular/core';
import { SocketRSS } from './services/SocketRSS';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MatTableDataSource, MatSort, MatSortable } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(MatSort) sort: MatSort;

  private _feeds = [];
  dataSource : MatTableDataSource<any>;
  get Feeds() { return this._feeds; }
  
  displayedColumns: string[] = ['icon', 'title', 'author', 'isoDate'];

  constructor(socket: SocketRSS, private _configSrv : ConfigurationService){
    
    socket.connect();

    this._configSrv.GetConfiguration().subscribe(flux => {
      this._feeds = flux.reduce((arr, current) => {
        arr = arr.concat(current);
        return arr;
      }, []);

      this.dataSource = new MatTableDataSource<any>(this._feeds);
      this.sort.sort({
        id: 'isoDate',
        start: 'desc',
        disableClear: true
      } as MatSortable);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'isoDate': return new Date(item.isoDate);
          default: return item[property];
        }
      };

      console.log(this._feeds);
    })
  }

  goToUrl (url : string){
      console.log('Go to ', url);
      window.open(url, "_blank");
  }
}

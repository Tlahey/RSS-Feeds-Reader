import { HttpClientModule } from '@angular/common/http';
import { NgModule, OnInit, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { RestService } from './services/rest.service';
import { SocketRSS } from './SocketRSS';
import { ConfigurationService } from './services/configuration.service';
import { HttpModule } from '@angular/http';

export const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

export function init_app(restSrv: RestService) {
  return () => restSrv.GetRSSFeedConfiguration().toPromise().then(s => { AppModule.Route = s; console.log(AppModule.Route); }); // .subscribe(d => {this._route = d; console.log(this._route);});
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SocketIoModule,
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    SocketRSS, 
    RestService, 
    ConfigurationService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [RestService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  static Route : any = undefined;
  constructor (/*private _restService: RestService*/) {
    // this._restService.GetRSSFeedConfiguration().subscribe(d => {this._route = d; console.log(this._route);});
  }

}

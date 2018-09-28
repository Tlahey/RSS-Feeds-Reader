import { HttpClientModule } from '@angular/common/http';
import { NgModule, OnInit, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { RestService } from './services/rest.service';
import { SocketRSS } from './services/SocketRSS';
import { ConfigurationService } from './services/configuration.service';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Ng2EmojiModule } from 'ng2-emoji';

registerLocaleData(localeFr);

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
    HttpModule,
    BrowserAnimationsModule,
    Ng2EmojiModule.forRoot()
  ],
  providers: [
    SocketRSS, 
    RestService, 
    ConfigurationService,
    { provide: LOCALE_ID, useFactory: () => 'fr-CA'},
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

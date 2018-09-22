import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { SocketOne } from './socket';
import { SocketIoModule } from 'ngx-socket-io';

export const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SocketIoModule,
    MaterialModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [SocketOne],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}

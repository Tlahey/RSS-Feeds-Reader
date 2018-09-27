import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { apiRestConfiguration } from "../../environments/environment";
import { catchError } from 'rxjs/operators';
import { AppModule } from '../app.module';

@Injectable()
export class RestService{

    constructor(private http: HttpClient){
    }

    private _getRoute(routeName : string){

        let routes = AppModule.Route;
        let splitedRoute = routeName.split('.');

        let routeObject : {
            method: "get" | "put" | "post" | "delete",
            url: string
        } = routes[splitedRoute[0]][splitedRoute[1]];

        // TODO: regex process parameters :xxx

        switch(routeObject.method){
            case "get":
                return this.http.get(`${apiRestConfiguration.host}:${apiRestConfiguration.port}${routeObject.url}`);
        }

        throw new Error("No route found");
    }

    private _getRoutesConfigurations(){
        return this.http.get(`${apiRestConfiguration.host}:${apiRestConfiguration.port}${apiRestConfiguration.routesUrl}`);
    }


    public GetRSSFeeds(){
        return this._getRoute('RSSCtrl.get');
    }


    GetRSSFeedConfiguration(){
        return this._getRoutesConfigurations();
    }
}
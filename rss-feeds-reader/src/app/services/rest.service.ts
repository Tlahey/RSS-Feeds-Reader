import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { apiRestConfiguration } from "../../environments/environment";
import { catchError } from 'rxjs/operators';
import { AppModule } from '../app.module';
import { Observable } from 'rxjs';

@Injectable()
export class RestService{

    constructor(private http: HttpClient){
    }

    private _getRoute(routeName : string, pathsArgs? : any, queyArgs? : any) : Observable<any>{

        let routes = AppModule.Route;
        let splitedRoute = routeName.split('.');

        let routeObject : {
            method: "get" | "put" | "post" | "delete",
            url: string
        } = routes[splitedRoute[0]][splitedRoute[1]];

        routeObject.url = this._compileUrl(routeObject.url, pathsArgs);

        switch(routeObject.method){
            case "get":
                return this.http.get(`${apiRestConfiguration.host}:${apiRestConfiguration.port}${routeObject.url}`);
        }

        throw new Error("No route found");
    }

    private _compileUrl(url : string, pathArgs : any) {
        for (var key in pathArgs) {
            let value = pathArgs[key] || '';
            url = url.replace(`:${key}`, encodeURIComponent(value));
        }
        return url;
    }

    private _getRoutesConfigurations(){
        return this.http.get(`${apiRestConfiguration.host}:${apiRestConfiguration.port}${apiRestConfiguration.routesUrl}`);
    }


    public GetRSSFeeds(guid?: string){
        return this._getRoute('RSSCtrl.get', {
            guid
        });
    }


    GetRSSFeedConfiguration(){
        return this._getRoutesConfigurations();
    }
}
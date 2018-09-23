import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { apiRestConfiguration } from "../../environments/environment";
import { catchError } from 'rxjs/operators';

@Injectable()
export class RestService{

    private _routes : any;

    constructor(private http: HttpClient){
    }

    private _getRoutesConfigurations(){
        return this.http.get(`${apiRestConfiguration.host}:${apiRestConfiguration.port}${apiRestConfiguration.routesUrl}`);
    }

    GetRSSFeedConfiguration(){
        return this._getRoutesConfigurations();
    }
}
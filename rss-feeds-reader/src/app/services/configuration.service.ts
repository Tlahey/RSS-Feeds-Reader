import { RestService } from './rest.service';
import { Injectable } from "@angular/core";

@Injectable()
export class ConfigurationService{
    constructor(private _restSrv : RestService){

    }

    GetConfiguration(){
        return this._restSrv.GetRSSFeeds();
    }

    _getServerConfiguration(){
        
    }
}
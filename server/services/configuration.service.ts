import { DataService } from './data.service';
export class configurationService{
    constructor(){ }

    GetConfiguration(){
        return new DataService().GetRssFeeds();
    }
}
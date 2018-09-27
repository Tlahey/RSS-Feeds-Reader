import { DataService } from './data.service';
import IRssFeeds from '../models/RssFeeds.model';
export class ConfigurationService{
    constructor(){ }

    GetConfiguration() : Array<IRssFeeds>{
        return new DataService().GetRSSConfigurationFeeds();
    }
}
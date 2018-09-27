import { Logger } from './../utils/Logger';
import { DataService } from './data.service';
import IRssFeeds from '../models/RssFeeds.model';
import { RSS } from './rss.service';
export class ConfigurationService{

    static logger = new Logger(ConfigurationService.name);

    constructor(){ }

    Initialize(): any {
        ConfigurationService.logger.debug("Initialize", "lancement de l'initilisation");
        this._getConfiguration().forEach(rssconfig => {
            let newRss = new RSS(rssconfig);
            newRss.Initialize();
            RSS.RSS.push(newRss);
        });
    }

    private _getConfiguration() : Array<IRssFeeds>{
        return new DataService().GetRSSConfigurationFeeds();
    }
}
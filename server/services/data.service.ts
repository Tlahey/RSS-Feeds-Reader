import * as fs from 'fs';
import Path = require("path");
import IRssFeeds from '../models/RssFeeds.model';
import { Logger } from '../utils/Logger';

const rootDir = Path.resolve(__dirname);

export class DataService{

    static logger = new Logger(DataService.name);

    constructor(){ }

    // Récupère le tableau des feeds
    GetRSSConfigurationFeeds() : Array<IRssFeeds>{
        DataService.logger.debug("GetRSSConfigurationFeeds", `Récupération des données de RSSFeeds`);
        return JSON.parse(fs.readFileSync(`${rootDir}/../assets/database/RSSFeeds.json`, 'utf8'));
    }

    GetRSSConfigurationFeed(guid : string) : IRssFeeds{
        let configuration = this.GetRSSConfigurationFeeds();
        DataService.logger.debug("GetRSSConfigurationFeed", `Récupération des données pour le guid [${guid}]`);
        return configuration.find(c => c.guid == guid);
    }
}
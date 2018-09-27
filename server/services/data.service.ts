import * as fs from 'fs';
import Path = require("path");
import IRssFeeds from '../models/RssFeeds.model';

const rootDir = Path.resolve(__dirname);

export class DataService{
    constructor(){ }

    // Récupère le tableau des feeds
    GetRSSConfigurationFeeds() : Array<IRssFeeds>{
        return JSON.parse(fs.readFileSync(`${rootDir}/../assets/database/RSSFeeds.json`, 'utf8'));
    }

    GetRSSConfigurationFeed(guid : string) : IRssFeeds{
        let configuration = this.GetRSSConfigurationFeeds();
        return configuration.find(c => c.guid == guid);
    }
}
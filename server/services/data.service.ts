import * as fs from 'fs';
import Path = require("path");
import IRssFeeds from '../models/RssFeeds.model';

const rootDir = Path.resolve(__dirname);

export class DataService{
    constructor(){ }

    // Récupère le tableau des feeds
    GetRssFeeds() : any{
        return JSON.parse(fs.readFileSync(`${rootDir}/../assets/database/RSSFeeds.json`, 'utf8'));
    }
}
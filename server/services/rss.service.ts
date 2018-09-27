import IRssFeeds, { IFeed, IFeedItem } from "../models/RssFeeds.model";

let Parser = require('rss-parser');
let parser = new Parser();


export class RSSService{

    constructor(){ }

    public async GetRSSFeeds(feedUrl : string) : Promise<IFeed>{
        return await parser.parseURL(feedUrl);
    }

}

export class RSS{

    static RSS : Array<RSS> = [];

    private _rssSrv : RSSService;
    private _properties : IFeed;

    constructor(rssConfiguration : IRssFeeds){
        this._rssSrv = new RSSService();
    }

    get Feeds() : Array<IFeedItem>{
        return this._properties.items;
    }

    public Initialize(){

    }

    public UpdateFeeds(){
        // Récupère le feed et met seulement à jour les nouveaux items
        // Retourne les nouveaux items en réponse de fonction
    }
}
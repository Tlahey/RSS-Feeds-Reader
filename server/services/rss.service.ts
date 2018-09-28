import { Deferred } from './../utils/Deferred';
import IRssFeeds, { IFeed, IFeedItem } from "../models/RssFeeds.model";
import {Event} from "typescript.events";
import { Logger } from '../utils/Logger';
import * as fs from 'fs';

let Parser = require('rss-parser');
let parser = new Parser();


export class RSSService{

    static logger = new Logger(RSSService.name);

    constructor(){ }

    public GetRSSFeeds(feedGuid? : string) : Array<RSS> {
        if(feedGuid)
            return RSS.RSS.filter(x => x.Guid == feedGuid);
        return RSS.RSS;
    }

    public async RequestHttpRSS(url : string) : Promise<IFeed> {
        RSSService.logger.debug("RequestHttpRSS", `Récupération du flux RSS ayant pour URL [${url}]`);
        let requestData = await parser.parseURL(url);
        // fs.writeFileSync(`c:/temp/${new Date().toISOString().replace(':', '_').replace(':', '_')}.json`, JSON.stringify(requestData));
        return requestData;
    }

}

export class RSS extends Event {

    static logger = new Logger(RSS.name);

    static RSS : Array<RSS> = [];

    private _rssSrv : RSSService;
    private _properties : IFeed = undefined;

    private _isInitilized : Deferred<RSS>;

    constructor(private _rssConfiguration : IRssFeeds){
        super();
        this._rssSrv = new RSSService();
        this._isInitilized = new Deferred<RSS>();
        RSS.logger.debug("ctor", `Création d'un objet RSS pour la configuration `, this._rssConfiguration);
    }

    get Configuration() { return this._rssConfiguration }
    get Guid() { return this._rssConfiguration.guid }
    get Feeds() : Array<IFeedItem>{ return this._properties.items.map(i => { 
        i.guid = this._rssConfiguration.guid; 
        i.icon = this._rssConfiguration.options.icon || this._properties.image.url;
        return i;
    }) }
    get Informations() { 
        return {
            'title': this._properties.title,
            'image': this._properties.image,
            'description': this._properties.description,
            'link': this._properties.link,
            'guid': this._rssConfiguration.guid
        }
    }
    get IsInitialized() : Promise<RSS> { return this._isInitilized.promise }

    public async Initialize(){
        RSS.logger.debug("Initialize", `Lancement de l'initialisation pour le RSS guid [${this.Guid}]`)
        // On télécharge le feed 
        this._properties = await this._rssSrv.RequestHttpRSS(this._rssConfiguration.rss_url);
        RSS.logger.debug("Initialize", `Récupération des données RSS pour le guid [${this.Guid}] `, JSON.stringify(this._properties));
        this._createHandlers();
        this._isInitilized.resolve(this);
        RSS.logger.debug("Initialize", `Fin de l'initialisation pour le RSS guid [${this.Guid}] properties `, this._properties)
        return this;
    }

    public UpdateFeeds(){
        // Récupère le feed et met seulement à jour les nouveaux items
        // Retourne les nouveaux items en réponse de fonction
        this.emit('newContent', { })
    }

    private _createHandlers(){
        RSS.logger.debug("_createHandlers", `Création des events handlers pour le RSS guid [${this.Guid}]`)

        this.on('newContent', (data) => {

        });
    }
}
import { MySocketService } from './services/socket.service';
import * as Express from "express";
import {ServerLoader, ServerSettings, Delete, Authenticated, BodyParams, Required, GlobalAcceptMimesMiddleware, Inject, RouteService} from "@tsed/common";
import Path = require("path");

import "@tsed/servestatic";
import "@tsed/socketio";
import { DataService } from "./services/data.service";
import { ConfigurationService } from "./services/configuration.service";
import { environment } from './environement/environment';

const rootDir = Path.resolve(__dirname);

if(environment.proxy){
    process.env.http_proxy = environment.proxy;
    var globalTunnel = require('global-tunnel-ng');
    globalTunnel.initialize();
}

@ServerSettings({
    rootDir,
    port: 8080,
    acceptMimes: ["application/json"],
    mount: {
        '/rest': `${rootDir}/controllers/*.js`
    },
    serveStatic: {
        "/": `${rootDir}/webapp`
    },
    socketIO:{
        path: "/socket",
        origin: "*"
    }
})
export class Server extends ServerLoader {

    static Routes : any;
    static SocketService : MySocketService;

    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public $onMountingMiddlewares(): void|Promise<any> {
    
        const cookieParser = require('cookie-parser'),
            bodyParser = require('body-parser'),
            compress = require('compression'),
            methodOverride = require('method-override');


        this
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }))
            .use((req: Express.Request, res: Express.Response, next) => {
                res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            })
            ;

        return null;
    }

    @Inject(RouteService)
    @Inject(MySocketService)
    public $onReady(){
        console.log('Server started...');

        // On génère les routes
        let routeSrv : RouteService = this['_injector'].get(RouteService)
        let routes = this._getRoutes(routeSrv.getAll());
        let routesString = JSON.stringify(routes, null, 4);
        Server.Routes = routesString;

        let socketSrv : MySocketService = this['_injector'].get(MySocketService)
        Server.SocketService = socketSrv;

        // Réaliser un interval pour récupérer les sockets via la configuration
        // On charge toutes les configuration RSS
        let configuration = new ConfigurationService().Initialize();

    }
   
    public $onServerInitError(err){
        console.error(err);
    }

    private _getRoutes(apiRouteObject : any){
        // On récupère l'ensemble des routes des controllers
        let restControllerRoutes = apiRouteObject;

        let finalRestRoutes = {};

        // On filtre seulement sur les GET / POST / PUT / DELETE
        restControllerRoutes.filter(r => (r.method == "get") || 
                                         (r.method == "post") || 
                                         (r.method == "put") || 
                                         (r.method == "delete")).forEach((restRoute) => {

            // On récupère le controller et la fonction
            let controllerName = restRoute.name.split('.')[0];
            let functionName = restRoute.name.split('.')[1].replace("()", "");

            // Si le controller n'est pas présent dans l'objet, on l'ajoute
            if(finalRestRoutes[controllerName] == undefined){
                finalRestRoutes[controllerName] = {};
            }

            // On ajoute les éléments dans le tableau
            if(finalRestRoutes[controllerName][functionName] == undefined){
                finalRestRoutes[controllerName][functionName] = {
                    method: restRoute.method,
                    url: restRoute.url
                }
            }
        });

        return finalRestRoutes;
    }
}

new Server().start();
import * as Express from "express";
import {ServerLoader, ServerSettings, Delete, Authenticated, BodyParams, Required, GlobalAcceptMimesMiddleware} from "@tsed/common";
import Path = require("path");
import "@tsed/servestatic";
const rootDir = Path.resolve(__dirname);

@ServerSettings({
    rootDir,
    acceptMimes: ["application/json"],
    mount: {
        '/rest': `${rootDir}/controllers/*.js`
    },
    serveStatic: {
        "/": `${rootDir}/webapp`
    }
})
export class Server extends ServerLoader {

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
            }));

        return null;
    }

    public $onReady(){
        console.log('Server started...');
    }
   
    public $onServerInitError(err){
        console.error(err);
    }    
}

new Server().start();
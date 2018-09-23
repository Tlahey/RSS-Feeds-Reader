import { Controller, RouteService, Get } from "@tsed/common";
import { Server } from "../server";

@Controller("/rest")
export class RestCtrl{

    constructor( ){ }

    @Get("/routes")
    async getRoutes(routeService: RouteService){
        return Server.Routes;
    }
}
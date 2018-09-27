import { ConfigurationService } from './../services/configuration.service';
import { Controller, Get, PathParams, ExpressRouter, RouteService } from "@tsed/common";

@Controller("/configuration")
export class ConfigurationCtrl {

    @Get("/")
    async get(): Promise<any> {
        // return new ConfigurationService().GetConfiguration();
        return null;
    }

}
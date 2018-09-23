import { Controller, Get, PathParams } from "@tsed/common";

@Controller("/RSS")
export class RSSCtrl {

    @Get("/")
    async get(): Promise<any> {
        return {
            id: 0,
            name: "test"
        };
    }
}
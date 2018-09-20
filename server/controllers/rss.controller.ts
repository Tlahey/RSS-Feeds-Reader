import { Controller, Get, PathParams } from "@tsed/common";

interface Calendar{
    id: string;
    name: string;
}

@Controller("/rss")
export class CalendarCtrl {

    @Get("/:id")
    async get(
        @PathParams("id") id: string
    ): Promise<Calendar> {

        return {
            id,
            name: "test"
        };
    }
}
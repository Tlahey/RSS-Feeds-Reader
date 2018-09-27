import { RSSService } from './../services/rss.service';
import { DataService } from './../services/data.service';
import { Controller, Get, PathParams } from "@tsed/common";

@Controller("/RSS")
export class RSSCtrl {

    @Get("/:guid")
    async get(
        // @PathParams("guid") guid : string
    ): Promise<any> {
        let rssSrv = new RSSService();
        return await rssSrv.GetRSSFeeds(/*guid*/).map(x => x.Feeds);
    }

}
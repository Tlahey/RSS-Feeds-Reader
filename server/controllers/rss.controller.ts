import { RSSService } from './../services/rss.service';
import { DataService } from './../services/data.service';
import { Controller, Get, PathParams } from "@tsed/common";

@Controller("/RSS")
export class RSSCtrl {

    @Get("/:guid")
    async get(
        @PathParams("guid") guid : string
    ): Promise<any> {
        let dataSrv = new DataService();
        let rssSrv = new RSSService();

        let feed = dataSrv.GetRSSConfigurationFeed('NASA_VIDEO');
        return await rssSrv.GetRSSFeeds(feed.rss_url);
    }
}
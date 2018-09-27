export default interface IRssFeeds{
    guid: string,
    title: string,
    rss_url: string,
    options: any
}

export interface IFeedItem{
    title: string,
    link: string,
    pubDate: string,
    creator?: string,
    content: string,
    contentSnippet: string,
    guid: string,
    categories: Array<string>,
    isoDate: string
}

export interface IFeed{
    feedUrl: string,
    image?: {
        link: string,
        url: string,
        title: string
    },
    title: string,
    description: string,
    webMaster?: string,
    managingEditor: string,
    link: string,
    language? : string,
    copyright? : string,
    items: Array<IFeedItem>
}
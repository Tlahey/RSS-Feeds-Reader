export interface IRssFeedsSound{
    trigger: string,
    triggerValue: string,
    soundNames: Array<string>,
}

export interface IFeedItem{
    title: string,
    link: string,
    pubDate: string,
    creator?: string,
    content: string,
    contentSnippet: string,
    guid?: string,
    id?: string,
    categories: Array<string>,
    isoDate: string,
    icon? : string,
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

export default interface IRssFeeds{
    guid: string,
    title: string,
    rss_url: string,
    options: {
        icon: string,
        refreshInterval: number,
        sounds: Array<IRssFeedsSound>,
        [key: string]: any
    }
}
# RSS Feeds Reader

It is a simple project that allows to recover different RSS feeds and updates them on an interface.
The project includes a nodejs server and a web application to visualize the flow.
New entries are notified to the web server with the websockets.

## Prerequired

Have angular-cli globaly installed on computer

```
$ npm install -g @angular/cli@6.2.3
```

## Installation

How to build server + web

Go to the web application `rss-feeds-reader` folder and built it.

```
$ npm install
$ ng build
```

Now go to the `server` application and build it.

```
$ npm install
$ tsc -p .
```

Now you can launch the server with this follow command (on server folder)

```
$ node server.js
```

And go on `http://localhost:8080`

## Configuration

You can configurate any RRS feeds. You can find an example on configuration in `server/assets/database/RSSFeeds.json`.

**TODO: Need more configuration informations**


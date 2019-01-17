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







```
npm install
node server/server.js
```

How to rebuild web

On web app
```
npm build
```

All sources go to server/webapp
const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const configFilename = './rss_feeds.txt';

function checkForRSSFile() {
    fs.exists(configFilename, exist => {
        if (!exist) {
            return next(new Error(`missing RSS file: ${configFilename}`));
        }
        next(null, configFilename);
    });
}

function readRSSFile(configFilename) {
    fs.readFile(configFilename, (err, feedList) => {
        if (err) return next(err);
        feedList = feedList
            .toString()
            .replace(/^\s+|\s+$/g, '')
            .split('\n');
        // console.log(feedList);
        const random = Math.floor(Math.random() * feedList.length);
        next(null, feedList[random]);
    });
}

function downloadRSSFeed(feedUrl) {
    request({
        uri: feedUrl
    }, (err, res, body) => {
        if (err) return next(err);
        if (res.statusCode !== 200)
            return next(new Error('Abnormal response status code'));
        // console.log(body);
        next(null, body);
    });
}

function parseRSSFeed(rss) {
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if (!handler.dom.items.length)
        return next(new Error('no RSS items found'));
    const item = handler.dom.items.shift();
    // console.log(item);
    console.log(item.title);
    console.log(item.link);
}

const tasks = [
    checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed
];
function next(err, result) {
    if (err) throw err;
    const currentTast = tasks.shift();
    if (currentTast) {
        currentTast(result);
    }
}

next();

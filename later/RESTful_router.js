'use strict';
const read = require('node-readability');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Article = require('./Article').Article;

app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extend: true,
}));

app.get('/articles/', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err);
        // res.send(articles);
        res.format({
            html: () => {
                res.render('articles.ejs', {articles: articles});
            },
            json: () => {
                res.send(articles);
            }
        });
    });
});

app.post('/articles', (req, res, next) => {
    const url = req.body.url;
    read(url, (err, result) => {
        if (err || !result) {
            res.status(500).send('Error downloading article');
        }
        console.log(result.title);

        Article.create({
            title: result.title,
            content: result.content,
        }, (err, article) => {
            if (err) return next(err);
            res.send('OK');
        });
    });
});

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.find(id, (err, article) => {
        if (err) return next(err);
        res.send(article);
    });
});

app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.delete(id, (err, article) => {
        if (err) return next(err);
        res.send({
            message: 'Deleted',
        });
    });
});

app.listen(app.get('port'), () => {
    console.log('app started on port', app.get('port'));
});

module.exports = app;
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
        res.send(articles);
    });
});

app.post('articles', (req, res) => {
    res.send('ok');
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
'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const articles = [{
    title: 'Example'
}];

app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/articles', (req, res) => {
    const article = {
        title: req.body.title
    };
    articles.push(article);
    res.send(articles);
});

app.get('/articles', (req, res) => {
    res.send(articles);
});

app.listen(app.get('port'), () => {
    console.log('listen at localhost: ', app.get('port'))
});
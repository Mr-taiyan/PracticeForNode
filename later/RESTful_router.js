const express = require('express');
const app = express();
const articles = [{
    title: 'example'
}];

app.set('port', process.env.PORT || 8080);

app.get('/articles/', (req, res) => {
    res.send(articles);
});

app.post('articles', (req, res) => {
    res.send('ok');
});

app.get('/articles/:id', (req, res) => {
    const id = req.params.id;
    console.log('fetch ', id);
    res.send(articles[id]);
});

app.delete('/articles/:id', (req, res) => {
    const id = req.params.id;
    console.log('deleting: ', id);
    delete articles[id];
    res.send({
        message: 'deleted'
    });
});

app.listen(app.get('port'), () => {
    console.log('app started on port', app.get('port'));
});

module.exports = app;
const read = require('node-readability');
const Article = require('./Article').Article;
const url = 'http://www.manning.com/cantelon2/';

// read(url, (err, result) => {
//     console.log(result);
// });

read(url, (err, result) => {
    Article.create({
        title: result.title,
        content: result.content,
    }, (err, article) => {
        console.log(article);
    });
});
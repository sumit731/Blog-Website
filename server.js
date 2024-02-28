const express = require('express');
const articleRouter = require("./routes/articles");
const Article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/Blog'); // Added port number 27017

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.get('/', async(req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: 'desc' });
        res.render('articles/index', { articles });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.use('/articles', articleRouter);

app.listen(3000);

// npm run blogwebsite

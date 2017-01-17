const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const mongoose = require('mongoose');
const pug = require('pug');
const favicon = require('express-favicon');
const app = express();

app.set('views', __dirname +'/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/favicon.png'));
mongoose.connect('mongodb://localhost');

// routes
app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.use((req, res, next) => {
	res.status(404).render('404');
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(8080, () => {
	console.log('Server starting on http://localhost:8080');
});
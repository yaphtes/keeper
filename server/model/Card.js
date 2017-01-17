const mongoose = require('mongoose');

let cardSchema = mongoose.Schema({
	title: String,
	data: String,
	bgColor: String
});

let Card = mongoose.model('Card', cardSchema);

module.exports = Card;

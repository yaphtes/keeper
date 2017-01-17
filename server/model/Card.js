const mongoose = require('mongoose');

let cardSchema = mongoose.Schema({
	title: String,
	data: String
});

let Card = mongoose.model('Card', cardSchema);

module.exports = Card;

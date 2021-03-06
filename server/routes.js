const pages = require('./handlers/pages');
const cards = require('./handlers/cards');

// console.log(cards.getCards);

module.exports = function(app) {
	// pages routes
	app.get('/', pages.home);

	// cards routes
	app.get('/cards', cards.getCards);
	app.post('/card', cards.postCard);
	app.delete('/card', cards.deleteCard);
	app.delete('/cards', cards.deleteAllCards);
	app.put('/card', cards.updateOne);
};
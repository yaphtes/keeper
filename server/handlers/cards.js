const Card = require('../model/Card');

module.exports = {
	getCards: function(req, res) {
		let data = {};

		Card.find((err, cards) => {
			if (err) console.error(err);
			data.cards = cards;
			res.send(data);
		});
	}
};

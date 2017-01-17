const Card = require('../model/Card');

module.exports = {
	getCards: function(req, res) {
		let data = {};

		Card.find((err, cards) => {
			if (err) console.error(err);
			data.cards = cards;
			res.send(data);
		});
	},

	deleteCard: function(req, res) {
		let id = req.body.dataId;

		Card.findByIdAndRemove(id, (err, card) => {
			let response = {
				message: 'Card successfully deleted',
				id: card._id
			};
			res.send(response);
		});
	},

	postCard: function(req, res) {
		let dataId;

		let card = new Card(req.body);
		card.save((err, savedCard) => {
			if (err) res.send(err);
			res.send(savedCard._id);
		});
	},

	deleteAllCards: function(req, res) {
		Card.remove({}, (err) => {
			if (err) return res.send(err);
			res.send('Clear successull');
		});
	}
};

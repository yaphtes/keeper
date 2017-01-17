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
	}
};

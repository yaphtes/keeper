const Card = require('../model/Card.js');


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
		Card.findByIdAndRemove(req.body.dataId, (err, card) => {
			let response = {
				message: 'Card successfully deleted',
				id: card._id
			};
			res.send(response);
		});
	},

	postCard: function(req, res) {
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
	},

	updateOne: function(req, res) {
		let type = req.body.type;
		let id = req.body.id;


		switch (type) {
			case 'title':
				Card.findByIdAndUpdate(id, { title: req.body.title }, (err, card) => {
					let response = {
						message: 'Title of card successfully updated',
						id: card._id
					};
					res.send(response);
				});
				break;
			case 'data':
				Card.findByIdAndUpdate(id, { data: req.body.data }, (err, card) => {
					let response = {
						message: 'Data of card successfully updated',
						id: card._id
					};
					res.send(response);
				});
				break;
			case 'bgColor':
				Card.findByIdAndUpdate(id, { bgColor: req.body.bgColor }, (err, card) => {
					let response = {
						message: 'Background color of card successfully updated',
						id: card._id
					};
					res.send(response);
				});
				break;
			default:
				res.sendStatus(500);
				break;
		}
	}
};

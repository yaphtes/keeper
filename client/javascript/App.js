const Ajax = require('./Ajax');
const Card = require('./Card');
const EventListener = require('./EventListener');


class App {
	constructor() {
		this.store = {};
	}


	init() {
		this.getCards((err, cards) => {
			if (err) return this.showError(err);
			this.store.cards = cards;
			this.store.cards.forEach((card, i) => {
				let component = new Card(card);
				let dom = component.render();
				this.store.cards[i].dom = dom;
			});
		});

		this.listenEvents();
	}


	getCards(cb) {
		Ajax.get('/cards', (err, res) => {
			if (err) return cb(err);
			return cb(err, res.cards);
		});
	}

	listenEvents() {
		let eventListener = new EventListener();
		eventListener.start();
	}

	showError(err) {
		// TODO: написать вывод ошибки
		console.log(err);
	}
}


module.exports = App;
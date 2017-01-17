const Ajax = require('./Ajax');
const Card = require('./Card');
const EventListener = require('./EventListener');


class App {
	constructor() {
		this.store = {};
		this.components = {
			cards: []
		};
	}


	init() {
		this.getCards((err, cards) => {
			if (err) return console.error(err);
			this.store.cards = cards;
			this.store.cards.forEach((data, i) => {
				let component = new Card(data);
				let dom = component.render();
				this.components.cards.push(component);
				this.components.cards[i].dom = dom;
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
}


module.exports = App;
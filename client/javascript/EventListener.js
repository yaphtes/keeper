const Ajax = require('./Ajax');
const Card = require('./Card');


class EventListener {
	constructor() { }

	start() {
		this.listenView();
		this.listenCardMaker();
		this.deleteAllCards();
	}

	listenView() {
		let self = this;
		document.onclick = function(event) {
			let target = event.target;

			if (target.classList.contains('card__clear')) {
				let dataId = target.closest('.card').dataset.id;
				let component = self.getComponent(dataId);
				component.destroy();
			}
		}
	}

	listenCardMaker() {
		let self = this;
		document.querySelector('.new-card').onclick = function(event) {
			let target = event.target;

			if (target.getAttribute('id') == 'post-card') {
				self.postCard();
			} else if (target.className.includes('colors-input')) {
				let bgcolor = getComputedStyle(target).backgroundColor;
				document.querySelector('.new-card').style.backgroundColor = bgColor;
			}
		}
	}

	deleteAllCards() {
		let button = document.getElementById('clearAllCards');
		let self = this;
		button.onclick = function() {
			Ajax.deleteAllCards('/cards', (err, res) => {
				if (err) console.error(err);

				let view = document.getElementById('view');
				while (view.firstElementChild) {
					view.firstElementChild.remove();
				}
				console.log(res);
			});
		}
	}

	getComponent(dataId) {
		let component;
		app.components.cards.forEach((card) => {
			if (card.dataId == dataId) component = card;
		});

		return component;
	}

	postCard() {
		let data = {
			title: document.querySelector('.new-card__title').value,
			data: document.querySelector('.new-card__text').value,
			bgColor: getComputedStyle(document.querySelector('.new-card')).backgroundColor
		};
		if (data.title == '') return console.error('Empty title');

		let component = new Card(data);
		Ajax.post('/card', (err, res) => {
			if (err) return console.error(err);
			component.dataId = res;
			component.dom = component.render();
			app.components.cards.push(component);
		}, data);
	}
}

module.exports = EventListener;
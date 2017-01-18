const Ajax = require('./Ajax');
const Card = require('./Card');


class EventListener {
	constructor() { }

	start() {
		this.listenView();
		this.listenCardMaker();
		this.deleteAllCards();
		this.listenUpdateCard();
	}

	listenView() {
		document.onclick = event => {
			let target = event.target;

			if (target.classList.contains('card__clear')) {
				let dataId = target.closest('.card').dataset.id;
				let component = this.getComponentFromDataId(dataId);
				component.destroy();
			}
		};
	}

	listenCardMaker() {
		document.querySelector('.new-card').onclick = event => {
			let target = event.target;

			if (target.getAttribute('id') == 'post-card') {
				this.postCard();
			} else if (target.className.includes('colors-input')) {
				document.querySelector('.new-card').style.backgroundColor = getComputedStyle(target).backgroundColor;
			}
		};
	}

	deleteAllCards() {
		document.getElementById('clearAllCards').onclick = () => {
			Ajax.deleteAllCards('/cards', (err, res) => {
				if (err) console.error(err);

				let view = document.getElementById('view');
				while (view.firstElementChild) {
					view.firstElementChild.remove();
				}
				console.log(res);
			});
		};
	}

	listenUpdateCard() {
		let view = document.getElementById('view');

		view.onclick = event => {
			let target = event.target;

			if (target.className.includes('card__title')) { this.updateOne(target, 'title') };
			if (target.className.includes('card__data')) { this.updateOne(target, 'data') };
			if (target.className.includes('colors-input_')) {
				let parent = target.closest('.card');
				parent.style.backgroundColor = getComputedStyle(target).backgroundColor;
				this.updateOne(target, 'bgColor')
			}
		};
	}

	getComponentFromDataId(dataId) {
		let component = null;
		app.components.cards.forEach((card) => {
			if (card.dataId == dataId) { component = card }
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

	getDataFromComponent(component, dataId = component._id) {
		let data = {
			title: component.title,
			data: component.title,
			id: component.dataId,
			bgColor: component.bgColor
		};

		return data;
	}

	updateOne(target, whatUpdate) {
		let dataId = target.closest('.card').dataset.id;
		let component = this.getComponentFromDataId(dataId);


		if (whatUpdate == 'title' || whatUpdate == 'data') {
			target.onblur = () => {
				switch (whatUpdate) {
					case 'title':
						let newTitle = target.textContent;
						component.title = newTitle;
						break;
					case 'data':
						let newData = target.textContent;
						component.data = newData;

				}
				let data = this.getDataFromComponent(component, dataId);
				data.type = whatUpdate;
			};

		} else if (whatUpdate == 'bgColor') {
			let newBgColor = getComputedStyle(target).backgroundColor;
			component.bgColor = newBgColor;

			let data = this.getDataFromComponent(component, dataId);
			data.type = whatUpdate;


			Ajax.updateOne('/card', (err, res) => {
				if (err) console.err('Cant update this card, sorry.')
				console.log(res);
			}, data);
		}
	}
}

module.exports = EventListener;
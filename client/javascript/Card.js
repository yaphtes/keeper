class Card {
	constructor(card) {
		this.dataId = card._id;
		this.title = card.title;
		this.data = card.data;
		this.dom;
	}

	render() {
		let container = document.createElement('div');
		container.setAttribute('data-id', this.dataId);
		container.className = 'card';


		let title = document.createElement('h3');
		title.textContent = this.data;
		title.className = 'card__title';
		container.appendChild(title);

		let data = document.createElement('div');
		data.textContent = this.data;
		data.className = 'card__data';
		container.appendChild(data);

		let clear = document.createElement('button');
		clear.className = 'card__clear';
		container.appendChild(clear);



		document.getElementById('view').appendChild(container);

		this.dom = document.querySelector(`div[data-id="${this.dataId}"]`);

		return this.dom;
	}

	destroy(dataId) {
		// TODO: написать код уничтожения карточки
	}
}

module.exports = Card;
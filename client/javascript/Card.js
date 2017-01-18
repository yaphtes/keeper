const Ajax = require('./Ajax');

class Card {
	constructor(data) {
		this.dataId = data._id;
		this.title = data.title;
		this.data = data.data;
		this.bgColor = data.bgColor;
		this.dom;
	}


	render() {
		let container = document.createElement('div');
		container.dataset.id = this.dataId;
		container.className = 'card';
		container.style.backgroundColor = this.bgColor;


		let title = document.createElement('h3');
		title.textContent = this.title;
		title.className = 'card__title';
		container.appendChild(title);
		title.contentEditable = true;

		let data = document.createElement('div');
		data.textContent = this.data;
		data.className = 'card__data';
		container.appendChild(data);
		data.contentEditable = true;

		let colorInputs = document.createElement('div');
		colorInputs.className = 'colors-input';
		container.appendChild(colorInputs);

		let colorInputsDefault = document.createElement('button');
		colorInputsDefault.className = 'colors-input__white';
		colorInputs.appendChild(colorInputsDefault);

		let colorInputsBlue = document.createElement('button');
		colorInputsBlue.className = 'colors-input__blue';
		colorInputs.appendChild(colorInputsBlue);

		let colorInputsYellow = document.createElement('button');
		colorInputsYellow.className = 'colors-input__yellow';
		colorInputs.appendChild(colorInputsYellow);

		let colorInputsRed = document.createElement('button');
		colorInputsRed.className = 'colors-input__red';
		colorInputs.appendChild(colorInputsRed);

		let colorInputsGreen = document.createElement('button');
		colorInputsGreen.className = 'colors-input__green';
		colorInputs.appendChild(colorInputsGreen);

		let colorInputsGrey = document.createElement('button');
		colorInputsGrey.className = 'colors-input__grey';
		colorInputs.appendChild(colorInputsGrey);

		let colorInputsOrange = document.createElement('button');
		colorInputsOrange.className = 'colors-input__orange';
		colorInputs.appendChild(colorInputsOrange);


		let clear = document.createElement('button');
		clear.className = 'card__clear';
		container.appendChild(clear);

		document.getElementById('view').appendChild(container);
		this.dom = document.querySelector(`div[data-id="${this.dataId}"]`);

		return this.dom;
	}


	destroy() {
		let dataId = this.dataId;

		Ajax.delete('/card', (err, response) => {
			if (err) return console.error(err);
			this.dom.remove();
			 console.log(response);
		}, dataId);
	}
}

module.exports = Card;
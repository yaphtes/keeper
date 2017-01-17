// const Card = require('./Card');

class EventListener {
	constructor() { }

	start() {
		document.onclick = function(event) {
			let target = event.target;


			if (target.classList.contains('card__clear')) {
				// TODO: как-то удалить карточку, не пойму как воспользоваться методами класса Card, создавать новый объект Card - это неправильно, мне кажется
			}
		}
	}
}

module.exports = EventListener;
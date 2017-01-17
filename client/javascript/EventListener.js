const handlers = require('./handlers');


class EventListener {
	constructor() { }

	start() {
		this.listenView();
	}

	listenView() {
		document.onclick = function(event) {
			let target = event.target;

			if (target.classList.contains('card__clear')) {
				let dataId = target.closest('.card').dataset.id;
				let component = handlers.getComponent(dataId);
				component.destroy();
			}
		}
	}
}

module.exports = EventListener;
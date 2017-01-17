let handlers = {
	getComponent: function(dataId) {
		let component;
		app.components.cards.forEach((card) => {
			if (card.dataId == dataId) component = card;
		});

		return component;
	}
};

module.exports = handlers;
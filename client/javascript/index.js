const App = require('./App');


window.app = new App();
window.onload = () => {
	app.init();
};

const App = require('./App');
let app = new App();

window.onload =
	() => app.init();

window.app = app;

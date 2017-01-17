const App = require('./App');
let app = new App();

window.onload = function() { app.init() };
window.app = app;

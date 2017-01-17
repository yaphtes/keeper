class Ajax {
	constructor() { }

	static get(action, cb) {
		let http = new XMLHttpRequest();
		http.open('GET', action);
		http.setRequestHeader('X-Requested-With', 'XMLHttpReques');
		http.send();


		http.onload = function() {
			let response = JSON.parse(http.responseText);
			return cb(null, response);
		};

		http.onerror = function () {
			let status = http.status;
			return cb(status);
		};
	}

	static delete(action, cb, dataId) {
		let data = { dataId };
		let http = new XMLHttpRequest();
		http.open('DELETE', action);
		http.setRequestHeader('X-Requested-With', 'XMLHttpReques');
		http.setRequestHeader('Content-Type', 'application/json');
		http.send(JSON.stringify(dataId));


		http.onload = function() {
			let response = http.responseText;
			return cb(null, response);
		};

		http.onerror = function () {
			let status = http.status;
			return cb(status);
		};
	}
}

module.exports = Ajax;
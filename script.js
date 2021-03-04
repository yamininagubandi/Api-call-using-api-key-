var request = new XMLHttpRequest();

request.open('GET', 'https://restcountries.eu/rest/v2/all', true);

request.send();
request.onload = function () {
	var cd = JSON.parse(this.response);

	for (var i in cd) {
		try {
			var name = cd[i].name;
			var lang = cd[i].latlng;
			if (lang.length === 0) throw new Error('longitude not found');
			wd(name, ...lang);
		} catch (e) {
			console.log('Invalid co-ordinate data for country: ' + name + ' ' + e.message);
		}
	}
};
var wd = function (name, lat, lang) {
	var request = new XMLHttpRequest();
	var url =
		'https://api.openweathermap.org/data/2.5/weather?lat=' +
		lat +
		'&lon=' +
		lang +
		'&appid=a87b3645166900960c3e7f508e1d6e1d&units=metric';

	request.open('GET', url, true);
	request.send();
	request.onload = function () {
		try {
			var result = JSON.parse(this.response);
			console.log(`${name} : ${result.main.temp}`);
		} catch (e) {
			console.log('undefined response' + name);
		}
	};
};

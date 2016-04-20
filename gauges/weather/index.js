"use strict";


const	wundernode = require("wundergroundnode");
let manifest = require("./manifest");
let wunder = new wundernode(manifest.params.wundergroundApiKey);

exports.get = (callback) => {
	wunder.forecast().request(manifest.params.zipCode, (err, obj) => {
		if(!err && obj.forecast) {
			const forecast = obj.forecast.simpleforecast.forecastday[0].icon;
			let pos = 0;
			//thanks littlebits for this method
			switch(forecast) {
			case "clear":
			case "sunny":
				pos = 20;
				break;
			case "mostlysunny":
			case "partlycloudy":
			case "hazy":
			case "partlysunny" :
				pos = 70;
				break;
			case "cloudy":
			case "mostlycloudy":
				pos = 150;
				break;
			case "chanceflurries":
			case "chancerain":
			case "chancesleet":
			case "chancesnow":
			case "chancetstorms":
			case "flurries":
			case "fog":
			case "sleet":
			case "rain":
			case "snow":
			case "tstorms":
			case "unknown":
				pos = 180;
				break;
			default:
				pos = 45;
				break;
			}
			callback(pos);
		}
	});
};

exports.updateParams = () => {
	manifest = require("./manifest");
	wunder = new wundernode(manifest.params.wundergroundApiKey);
};

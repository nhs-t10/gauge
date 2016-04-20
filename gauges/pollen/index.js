"use strict";
let manifest = require("./manifest");
const cheerio = require("cheerio");
const request = require("request");

exports.get = (callback) => {
	request({ url: `https://www.wunderground.com/DisplayPollen.asp?Zipcode=${manifest.params.zipCode}`, headers: {
		"User-Agent": "Mozilla/5.0"
	}}, (err, res, body) => {
		let $ = cheerio.load(body);
		const pollenIndex = $("td.levels").first().text();
		callback(180/12 * pollenIndex);
	});
};

exports.updateParams = () => {
	manifest = require("./manifest");
};

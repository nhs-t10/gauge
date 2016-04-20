"use strict";
let manifest = require("./manifest");
const cheerio = require("cheerio");
const request = require("request");

exports.get = (callback) => {
	request({ url: `https://twitter.com/${manifest.params.handle}`, headers: {
		"User-Agent": "Mozilla/5.0"
	}}, (err, res, body) => {
		let $ = cheerio.load(body);
		let resString = $(".ProfileNav-item--followers").text();
		const followers = resString.match(/[0-9]+/)[0];
		callback(180/1000 * followers);
	});
};

exports.updateParams = () => {
	manifest = require("./manifest");
};

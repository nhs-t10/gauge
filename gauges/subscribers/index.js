"use strict";
let manifest = require("./manifest");
const cheerio = require("cheerio");
const request = require("request");

exports.get = (callback) => {
	request({ url: `https://www.facebook.com/${manifest.params.facebookPageId}`, headers: {
		"User-Agent": "Mozilla/5.0"
	}}, (err, res, body) => {
		let $ = cheerio.load(body);
		const likes = $("#PagesLikesCountDOMID").text().split(" ")[0].replace(/\,/g, "");
		callback(180/1000 * likes);
	});
};

exports.updateParams = () => {
	manifest = require("./manifest");
};

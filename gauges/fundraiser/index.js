"use strict";
let manifest = require("./manifest");
const cheerio = require("cheerio");
const request = require("request");

exports.get = (callback) => {
	request({ url: manifest.params.goFundMeURL, headers: {
		"User-Agent": "Mozilla/5.0"
	}}, (err, res, body) => {
		let $ = cheerio.load(body);
		let resString = $(".raised").text();
		resString = resString.replace(/\,/g, "").replace(/k/g, "000");
		let filtered = resString.match(/\$([0-9]+) of \$([0-9]+)/);
		const raised = filtered[1];
		const goal = filtered[2];
		callback(180/goal * raised);
	});
};

exports.updateParams = () => {
	manifest = require("./manifest");
};

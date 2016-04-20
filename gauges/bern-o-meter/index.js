"use strict";
let manifest = require("./manifest");
const request = require("request");

exports.get = (callback) => {
	request("http://bbg-gfx.s3-website-us-east-1.amazonaws.com/auto-calendar.json", (err, res, body) => {
		let states = JSON.parse(body);
		let dels = 0;
		states.forEach((state) => {
			if(state.D_results.length) {
				state.D_results.forEach((result) => {
					if(result.name == manifest.params.candidate) dels += result.del;
				});
			}
		});
		let pos = (180/manifest.params.totalDels) * dels;
		callback(pos);
	});
};

exports.updateParams = () => {
	manifest = require("./manifest");
};

"use strict";
let manifest = require("./manifest");

let daydiff = (first, second) => {
	return Math.round((second-first)/(1000*60*60*24));
};

exports.get = (callback) => {
	let pos = (180 - ((180/30) * (daydiff(new Date(), new Date(manifest.params.endDate)))) - 6);
	callback(pos);
};

exports.updateParams = () => {
	manifest = require("./manifest");
};

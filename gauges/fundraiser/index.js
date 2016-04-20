"use strict";
let manifest = require("./manifest");

exports.get = (callback) => {
	callback(manifest.params.position);
};

exports.updateParams = () => {
	manifest = require("./manifest");
};

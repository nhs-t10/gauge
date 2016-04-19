"use strict";

const	fs = require("fs");
let manifest = require("./manifest");

exports.get = (callback) => {
	callback(manifest.params.position);
};

exports.updateParams = (params) => {
	manifest.params = params;
	fs.writeFileSync("./manifest.json", JSON.stringify(manifest));
	manifest = require("./manifest");
};

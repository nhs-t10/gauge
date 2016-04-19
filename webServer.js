"use strict";
const express = require("express"),
	bodyParser = require("body-parser"),
	app = express();

const fs = require("fs"),
	path = require("path");

const gauges = fs.readdirSync("./gauges").filter((file) => {
	return fs.statSync(path.join("./gauges", file)).isDirectory();
});

let update;

exports.setUpdate = (fn) => {
	update = fn;
};

app.set("view engine", "pug");
app.use(express.static("static"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.render("index", {gauges});
});

app.get("/gauges/:gauge", (req, res) => {
	if(gauges.indexOf(req.params.gauge) > -1) res.render("gauge", require(`./gauges/${req.params.gauge}/manifest`));
	else res.end("404. could not find gauge.");
});

app.post("/setgauge/:gauge", (req, res) => {
	if(gauges.indexOf(req.params.gauge) > -1) {
		const path = `./gauges/${req.params.gauge}/manifest.json`;
		let manifest = require(path);
		manifest.params = req.body;
		fs.writeFileSync(path, JSON.stringify(manifest));

		let program = require(`./gauges/${req.params.gauge}`);
		program.updateParams();

		update(req.params.gauge);
		res.end();
	}
});

app.listen(3000);
console.log("gauge web running at http://localhost:3000");

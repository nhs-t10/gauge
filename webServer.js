"use strict";
const express = require("express"),
	bodyParser = require("body-parser"),
	app = express();

const fs = require("fs"),
	path = require("path");

const guages = fs.readdirSync("./guages").filter((file) => {
	return fs.statSync(path.join("./guages", file)).isDirectory();
});

let update;

exports.setUpdate = (fn) => {
	update = fn;
};

app.set("view engine", "pug");
app.use(express.static("static"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.render("index", {guages});
});

app.get("/guages/:guage", (req, res) => {
	if(guages.indexOf(req.params.guage) > -1) res.render("guage", require(`./guages/${req.params.guage}/manifest`));
	else res.end("404. could not find guage.");
});

app.post("/setguage/:guage", (req, res) => {
	if(guages.indexOf(req.params.guage) > -1) {
		const path = `./guages/${req.params.guage}/manifest.json`;
		let manifest = require(path);
		manifest.params = req.body;
		fs.writeFileSync(path, JSON.stringify(manifest));

		let program = require(`./guages/${req.params.guage}`);
		program.updateParams();

		update(req.params.guage);
		res.end();
	}
});

app.listen(3000);
console.log("Guage web running at http://localhost:3000");

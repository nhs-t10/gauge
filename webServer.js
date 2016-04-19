"use strict";
const express = require("express"),
	app = express();

const fs = require("fs"),
	path = require("path");

const guages = fs.readdirSync("./guages").filter((file) => {
	return fs.statSync(path.join("./guages", file)).isDirectory();
});

console.log(guages);

app.set("view engine", "pug");
app.use(express.static("static"));

app.get("/", (req, res) => {
	res.render("index", {guages});
});

app.get("/guages/:guage", (req, res) => {
	res.render("guage", {guage: req.params.guage});
});

app.listen(3000);

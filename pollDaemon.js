"use strict";
let interval, particle, deviceId, token;

exports.init = (p, t, id) => {
	particle = p,
	deviceId = id,
	token = t;
};
exports.poll = (guage) => {
	if(interval) clearInterval(interval);
	const md = require(`./guages/${guage}`);
	const manifest = require(`./guages/${guage}/manifest`);
	md.get(sendToGuage);
	interval = setInterval(() => {
		md.get(sendToGuage);
	}, manifest.interval);
};

const sendToGuage = (value) => {
	console.log(value);
	particle.callFunction({deviceId, name: "servo", argument: value, auth: token});
};

"use strict";
let interval, particle, deviceId, token;

exports.init = (p, t, id) => {
	particle = p,
	deviceId = id,
	token = t;
};
exports.poll = (gauge) => {
	if(interval) clearInterval(interval);
	const md = require(`./gauges/${gauge}`);
	const manifest = require(`./gauges/${gauge}/manifest`);
	md.get(sendTogauge);
	interval = setInterval(() => {
		md.get(sendTogauge);
	}, manifest.interval);
};

const sendTogauge = (value) => {
	console.log(value);
	particle.callFunction({deviceId, name: "servo", argument: value, auth: token});
};

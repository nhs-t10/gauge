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
	md.get(sendToGauge);
	interval = setInterval(() => {
		md.get(sendToGauge);
	}, manifest.interval);
};

const sendToGauge = (value) => {
	const query = {deviceId: deviceId, name: "servo", argument: value.toString(), auth: token};
	particle.callFunction(query).then(() => {
	}, (err) => {
		if(err) console.log(err);
	});
};

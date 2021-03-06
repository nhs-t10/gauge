"use strict";
const webServer = require("./webServer"),
	pollDaemon = require("./pollDaemon"),
	Particle = require("particle-api-js"),
	particle = new Particle(),
	config = require("./config");

webServer.setUpdate(pollDaemon.poll);

let token;

particle.login(config.particle).then((data) => {
	token = data.body.access_token;
	return particle.listDevices({auth: token});
}).then((data) => {
	const deviceId = data.body[0].id;
	pollDaemon.init(particle, token, deviceId);
	pollDaemon.poll("test");
})
.catch((err) => {
	console.err(err);
});

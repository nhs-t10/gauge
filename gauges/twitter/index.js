"use strict";
let manifest = require("./manifest");
const Twitter = require("twitter");
let client = new Twitter({
	consumer_key: manifest.params.consumerKey,
	consumer_secret: manifest.params.consumerSecret,
	access_token_key: manifest.params.accessToken,
	access_token_secret: manifest.params.accessTokenSecret
});

let Stream;
let volume = 0;
let rate = 0;
let interval;

exports.get = (callback) => {
	callback(rate);
};

let begin = () => {
	client.stream("statuses/filter", {track: `${manifest.params.hashtag}`}, (stream) => {
		Stream = stream;
		stream.on("data", (tweet) => {
			//console.log(tweet)
			volume++;
			rate = (180/manifest.params.tweetsPerHour) * volume;
		});
		stream.on("error", function(error) {
			throw error;
		});
	});
};

exports.updateParams = () => {
	manifest = require("./manifest");
	if(Stream) {
		Stream.destroy();
	}
	if(interval) clearInterval(interval);
	setTimeout(() => {
		client = new Twitter({
			consumer_key: manifest.params.consumerKey,
			consumer_secret: manifest.params.consumerSecret,
			access_token_key: manifest.params.accessToken,
			access_token_secret: manifest.params.accessTokenSecret
		});
		begin();
	}, 1000 + Math.random());
	volume = 0;
	rate = 0;
	setInterval(() => {
		volume = 0;
	}, 60 * 60 * 1000);
};

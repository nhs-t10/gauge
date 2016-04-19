"use strict";
let manifest = require("./manifest");
const Twitter = require("twitter");
let client = new Twitter({
	consumer_key: manifest.params.consumerKey,
	consumer_secret: manifest.params.consumerSecret,
	access_token_key: manifest.params.accessToken,
	access_token_secret: manifest.params.accessTokenSecret
});

let stream;

exports.get = (callback) => {

	callback(0);
};

let begin = () => {
	stream = client.stream("statuses/filter", {track: `#${manifest.params.hashtag.replace(/\#/g, "")}`}, (stream) => {
		stream.on("data", (tweet) => {
			console.log(tweet.text);
		});
		stream.on("error", function(error) {
			throw error;
		});
	});
};

exports.updateParams = () => {
	manifest = require("./manifest");
	if(stream) {
		console.log(stream);
		stream.destroy();
	}
	client = new Twitter({
		consumer_key: manifest.params.consumerKey,
		consumer_secret: manifest.params.consumerSecret,
		access_token_key: manifest.params.accessToken,
		access_token_secret: manifest.params.accessTokenSecret
	});
	begin();
};

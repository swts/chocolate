"use strict";

var options = {
	src: "./",
	dst: "./demo"
};

var less = {
	"style.css": "style.less"
};

var js = {
	"script.js": [
		"common/js/jquery.js",
		"common/js/swts.js",

		"input/slugify.js",
		"input/input.js",

		"nipple/input.js",
		"nipple/tools.js",
		"nipple/nipple.js",

		"cover/cover.js",

		"common/js/index.js"
	]
};

module.exports = {
	options: options,

	"default": {
		js: js,
		css: less
	},

	"belt:js": {
		options: {
			dst: "js",
		},
		tools: ["concat", "common-js", "uglify"]
	},

	"belt:css": {
		options: {
			src: "common/less",
			dst: "css",
		},

		tools: ["less"]
	}
};

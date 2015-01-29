/*jshint
    browser:true,
    strict: false
*/

var $ = require('$'),
	Input = require('ui/input');

exports("ui/nipple/input", function($parent, a, opts, cb) {
	return new Input(opts, cb);
});

/*jshint browser:true, strict: false */

var exposeToPrototype = [
	"css",
	"addClass",
	"removeClass",
	"toggleClass",
	"appendTo",
	"prependTo",
	"insertBefore",
	"insertAfter",
];

var Bar = function() {};

Bar.prototype = {
	remove: function(eventNs) {
		if(eventNs) {
			this.$b.off(eventNs);
		}

		this.$b.remove();
		this.$b = undefined;
	}
};

exposeToPrototype.forEach(function(method) {
	Bar.prototype[method] = function() {
		this.$b[method].apply(this.$b, arguments);
		return this;
	};
});

exports("ui/bar", Bar);

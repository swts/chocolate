/*eslint-disable strict */
var exposeToPrototype = [
	"css",
	"addClass",
	"removeClass",
	"toggleClass",
	"appendTo",
	"prependTo",
	"insertBefore",
	"insertAfter"
];

var Bar = function() {};

Bar.prototype = {
	error: function(errorClass) {
		var $b = this.$b.addClass(errorClass || "swts-error");

		setTimeout(function () {
			$b.removeClass(errorClass || "swts-error");
		}, 600);
	},

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

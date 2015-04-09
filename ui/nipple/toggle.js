/*eslint-disable strict */
var $ = require("$");

var NippleToggle = function($parent, a, opts, cb) {
	var self = this;

	self.state = opts.state !== undefined ? opts.state : false;
	self.title = opts.title;
	self.cb = cb;
	self.$b = $('<a href="#/toggle/' + a + '"' + (opts.class ? ' class="' + opts.class + '"' : "") + ' title="' + opts.title[self.state] + '">' + opts.title[self.state] + "</a>")
		.on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			self.toggle();
		});

	self.$parent = $parent.addClass( "nipple-state-" + (self.state ? "on" : "off") );
};

NippleToggle.prototype = {
	val: function(state) {
		if(state !== undefined) {
			if(state !== this.state) {
				var self = this,
					title = self.title[ (state ? "on" : "off") ];
				self.$b.text(title).attr("title", title);
				self.$parent.removeClass( "nipple-state-" + (self.state ? "on" : "off") ).addClass("nipple-state-" + (state ? "on" : "off"));
				self.state = state;
			}
		} else {
			return this.state;
		}
	},

	toggle: function() {
		this.val(!this.state);
		this.cb(this.state);
	}
};

exports("ui/nipple/toggle", function($parent, a, opts, cb) {
	return new NippleToggle($parent, a, opts, cb);
});

/*
	Gutenberg - edit like no one has ever edited before
*/

/*jshint
	browser:true,
	strict: false
*/

var $ = require('$'),
	Gregory = require("ui/gregory"),
	$instances = [],
	$d = $(document),
	hideInstances = function() {
		for (var i in $instances) {
			$instances[i].addClass("hidden");
		}
	},
	spliceInstance = function($instance) {
		for (var i in $instances) {
			if ($instance === $instances[i]) {
				$instances.splice(i, 1);
			}
		}
	};

var Calenput = function($el, opts) {
	var self = this;

	self.$b = $el;
	self.$c;
	self.gregory;
	self.onDateSelect = opts.onChange;
	self.flip = opts.flip;

	self.init();
};

Calenput.prototype.init = function() {
	var self = this;

	self.gregory = new Gregory({
		flip: self.flip,
		onDateSelect: function(date) {
			if (date.day) {
				self.$c.addClass("hidden");
				self.$b.val(date.day + "." + (date.month + 1) + "." + date.year);
				self.onDateSelect && self.onDateSelect(new Date(date.year, date.month, date.day));
			}
		}
	});

	var d = new Date(parseInt(self.$b.val(), 10) * 1000);

	self.gregory.init({
		date: d
	});

	self.$c = self.gregory.$b;
	self.$c.addClass("hidden");
	self.$b.after(self.$c);
	$instances.push(self.$c);

	self.$b
	.on("mousedown.calenput", function(e) {
		e.stopPropagation();

		hideInstances();

		$d.one("mousedown.calenput", function(e) {
			hideInstances();
		});
	})
	.on("mouseup.calenput", function(e) {
		self.$c.removeClass("hidden");

		if (self.flip) {
			self.$c.css({
				"bottom": self.$b.position().top + 30,
				"left": self.$b.position().left - 70
			});
		} else {
			self.$c.css({
				"top": self.$b.position().top + 25,
				"left": self.$b.position().left - 70
			});
		}
	});

	self.$b.val(d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear());
};

Calenput.prototype.getDate = function() {
	var self = this,
		d = self.$b.val().split(".");

	return new Date(d[2], d[1], d[0]);
};

Calenput.prototype.remove = function() {
	var self = this;

	self.gregory.remove();
	self.$b.off(".calenput");
	$(window).off(".calenput");
	spliceInstance(self.$c);
	self.$c.remove();
};

exports("ui/calenput", Calenput);

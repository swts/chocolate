/*jshint browser:true, strict: false */

var $ = require('$');

var Overlay = function(template, actions) {
	var self = this;
	self.cb = actions;
	self.mouseOver = false;
	self.ui = {};

	self.$b = $(template)
		.on('click.overlay', 'a', function(e) {
			e.preventDefault();
			var action = this.hash.split('/');
			self.cb[action[1]].call(self, self.node || action[2]);
		})
		.on('mouseover.overlay', function() {
			self.mouseOver = true;
		})
		.on('mouseleave.overlay', function() {
			self.mouseOver = false;
		});
};

Overlay.prototype = {
	move: function(node, index) {
		if(node) {
			this.node = node;
			this.index = index;
		} else {
			node = this.node;
		}

		var pos = node.$b.position();

		this.$b.css({
			top: pos.top,
			height: node.$b.outerHeight(),
		});

		return this;
	},

	show: function() {
		this.$b.addClass('swts-visible');
		return this;
	},

	hide: function() {
		this.$b.removeClass('swts-visible');
		return this;
	},

	appendTo: function($container) {
		this.$b.appendTo($container);
		return this;
	},

	prependTo: function($container) {
		this.$b.prependTo($container);
		return this;
	},

	remove: function() {
		var i, uis = this.ui;

		for(i in uis) {
			uis[i].remove();
		}

		this.$b.off('.overlay').remove();
	}
};

exports('ui/overlay', Overlay);

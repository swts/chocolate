/*eslint-disable strict */
var $ = require("$"),
    inherits = require("util/inherits"),
    Bar = require("ui/bar");

var Overlay = function(template, orientation, actions) {
	if(typeof orientation !== "string") {
		actions = orientation;
		orientation = "vertical";
	}

	var self = this;
	self.orientation = orientation;
	self.cb = actions;
	self.mouseOver = false;
	self.frozen = false;
	self.ui = {};

	self.$b = $(template)
		.addClass(orientation === "vertical" ? "swts-overlay-v" : "swts-overlay-h")
		.on("click.overlay", "a", function(e) {
			e.preventDefault();
			var action = this.hash.split("/");
			self.cb[action[1]].call(self, self.node || action[2]);
		})
		.on("mouseover.overlay", function() {
			self.mouseOver = true;
		})
		.on("mouseleave.overlay", function() {
			self.mouseOver = false;
		});
};
inherits(Overlay, Bar);

Overlay.prototype.move = function(node, index) {
	if(node) {
		this.node = node;
		this.index = index;
	} else {
		node = this.node;
	}

	var pos = node.$b.position(),
		type = node.type(),
		cs = window.getComputedStyle(node.$b[0], null),
		css = {};

	if(this.orientation === "vertical") {
		css.height = node.$b.outerHeight();
		css.top = pos.top + parseInt(cs.getPropertyValue("margin-top"), 10);
	} else {
		css.width = node.$b.outerWidth();
		css.left = pos.left + parseInt(cs.getPropertyValue("margin-left"), 10);
	}

	this.$b.css(pos);
	this.$b
		.css(css)
		.removeClass("swts-overlay-"+this.type)
		.addClass("swts-overlay-"+type);

	this.type = type;
	this.frozen && this.unfreeze();
	return this;
};

Overlay.prototype.freeze = function() {
	this.$b
		.addClass("swts-freeze")
		.attr("style", "");
	this.frozen = true;
	return this;
};

Overlay.prototype.unfreeze = function() {
	this.$b.removeClass("swts-freeze");
	this.frozen = false;
	return this;
};

Overlay.prototype.show = function() {
	this.$b.addClass("swts-visible");
	return this;
};

Overlay.prototype.hide = function() {
	this.$b.removeClass("swts-visible");
	return this;
};

Overlay.prototype.remove = function() {
	var i, uis = this.ui;

	for(i in uis) {
		uis[i].remove();
	}

	Overlay.super_.prototype.remove.call(this, ".overlay");
};

exports("ui/overlay", Overlay);

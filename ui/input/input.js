/*eslint-disable strict */
var $ = require("$"),
    inherits = require("util/inherits"),
    Bar = require("ui/bar"),
	slugify = require("ui/input/slugify");

var Input = function($b, opts, cb) {
	var self = this;

	if(!($b instanceof $) && $b !== undefined) {
		cb = opts;
		opts = $b;
		$b = undefined;
	}

	if(!opts) {
		opts = {};
	}

	self.name = opts.name;

	if($b && $b[0] instanceof HTMLInputElement) {
		$b = $b.parent();
	}

	self.$b = $b || $('<label class="input">' +
			'<input type="' + (opts.type || "text") + '" ' +
			(opts.id ? 'id="' + self.id + '" ' : "") +
			(opts.name ? 'name="' + opts.name + '" ' : "") +
			(opts.value ? 'value="' + opts.value + '" ' : "") +
			"><span>" + opts.title + "</span></label>"
		).on("click.input", function(e) {
			e.stopPropagation();
		});

	self.$i = self.$b.find("input")
		.on("blur.input", function() {
			self.$b.toggleClass("input-val", this.value !== "");
		})
		.trigger("blur")
		.on("keyup.input", function() {
			if(self.transform) {
				this.value = self.transform(this.value);
			}
			self.throttledUpdate(this.value);
		});

	self.value = opts.value;
	self.rx = opts.rx;

	if(opts.slugify) {
		self.slugify = true;
		self.transform = slugify;
	} else if (opts.transform) {
		self.transform = opts.transform;
	}

	self.err = opts.errorClass || "ui-error";
	self.cb = cb;

	if(opts.onPaste) {
		self.$i.on("paste", opts.onPaste);
	}
};
inherits(Input, Bar);

Input.prototype.val = function(val, silent) {
	if(val === undefined) {
		return this.$i.val();
	}

	this.$i.val(val).trigger("blur");
	this.throttledUpdate(val, silent);
	return this;
};

Input.prototype.focus = function() {
	this.$i.focus();
};

Input.prototype.throttledUpdate = function(val, silent) {
	var self = this;

	clearTimeout(self.typingTimer);
	self.typingTimer = setTimeout( function() {
		if(val !== self.value) {
			if(self.rx) {
				if(self.rx.test(val)) {
					self.update(val, silent);
				} else {
					self.$b.addClass(self.err);
				}
			} else {
				self.update(val, silent);
			}
		}
	}, 300);
};

Input.prototype.update = function(val, silent) {
	var self = this;

	self.$b.removeClass(self.err);
	self.value = val;

	!silent && self.cb && self.cb(val);
};

Input.prototype.remove = function() {
	this.$i.off(".input");
	this.$i = undefined;
	Input.super_.prototype.remove.call(this, ".input");
};

exports("ui/input", Input);

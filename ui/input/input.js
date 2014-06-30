/*jshint
    browser:true,
    strict: false
*/
var $ = require('$'),
	slugify = require('ui/input/slugify');

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

	self.$b = $b || $('<label class="swts-input"><input type="'+
			(opts.type || "text") +'" '+
			(opts.value ? 'value="'+opts.value+'"' : "") +'><span>'+ opts.title +'</span></label>'
		).on("click.input", function(e) {
			e.stopPropagation();
		});

	self.$i = self.$b.find("input")
		.on("blur.input", function() {
			if(this.value !== "") {
				self.$b.addClass("swts-input-val");
			} else {
				self.$b.removeClass("swts-input-val");
			}
		})
		.trigger("blur")
		.on("keyup.input", function(e) {
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

	self.err = opts.errorClass || "swts-error";
	self.cb = cb;

	if(opts.onPaste) {
		self.$i.on("paste", opts.onPaste);
	}
};

Input.prototype = {
	val: function(val, silent) {
		if(val === undefined) {
			return this.$i.val();
		}

		this.$i.val(val).trigger("blur");
		this.throttledUpdate(val, silent);
		return this;
	},

	focus: function() {
		this.$i.focus();
	},

	throttledUpdate: function(val, silent) {
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
	},

	update: function(val, silent) {
		var self = this;

		self.$b.removeClass(self.err);
		self.value = val;

		!silent && self.cb && self.cb(val);
	},

	addClass: function(className) {
		this.$b.addClass(className);
		return this;
	},

	removeClass: function(className) {
		this.$b.removeClass(className);
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
		this.$i.off(".input");
		this.$b.off(".input").remove();
	}
};

exports("ui/input", Input);

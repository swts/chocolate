/*jshint
    browser:true,
    strict: false
*/
var $ = require('$'),
	slugify = require('ui/input/slugify');

var Input = function($b, opts, cb) {
	var self = this;

	if(!($b instanceof $)) {
		cb = opts;
		opts = $b;
		$b = undefined;
	}

	if(!opts) {
		opts = {};
	}

	self.$b = $b ? $b : $('<label class="swts-input"><input type="'+
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
		.on("keyup.input", function(e) {
			if(self.transform) {
				this.value = self.transform(this.value);
			}
			self.throttledUpdate(this.value);
		});

	self.value = opts.value;
	self.rx = opts.rx;
	self.transform = opts.slugify ? slugify : opts.transform;
	self.err = opts.errorClass || "swts-error";
	self.cb = cb;

	if(opts.onPaste) {
		self.$i.on("paste", opts.onPaste);
	}
};

Input.prototype = {
	val: function(val) {
		if(val === undefined) {
			return this.$i.val();
		}

		this.$i.val(val).trigger("blur");
		this.throttledUpdate(val);
		return this;
	},

	focus: function() {
		this.$i.focus();
	},

	throttledUpdate: function(val) {
		var self = this;

		clearTimeout(self.typingTimer);
		self.typingTimer = setTimeout( function() {

			if(self.transform) {
				val = self.transform(val);
				self.$i.val(val);
			}

			if(val !== self.value) {
				if(self.rx) {
					if(self.rx.test(val)) {
						self.update(val);
					} else {
						self.$b.addClass(self.err);
					}
				} else {
					self.update(val);
				}
			}
		}, 300);
	},

	update: function(val) {
		var self = this;

		self.$b.removeClass(self.err);
		self.value = val;
		self.cb && self.cb(val);
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

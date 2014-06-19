/*jshint browser:true, strict: false*/

var $ = require('$');

var Confirm = function(action, id, cb) {
	var self = this;

	if(cb === undefined) {
		cb = id;
		id = undefined;
	}
	self.confirm = false;

	self.$b = $('<a href="#/'+ action + (id ? "/"+id : "") +'" class="swts-button"></a>').on("click", function(e) {
		e.preventDefault();
    	e.stopPropagation();

		if(!self.confirm) {
			self.confirm = true;
			self.$b.addClass("swts-button-confirm");
		} else {
			self.$b.removeClass("swts-button-confirm");
			self.confirm = false;
			cb(id);
		}
	});
};

Confirm.prototype = {
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
		this.$b.remove();
	}
};

exports("ui/buttons/confirm", Confirm);

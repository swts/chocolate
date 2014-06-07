/*jshint
    browser:true,
    strict: false
*/

var $ = require('$');

var NippleTools = function(a, opts, cb) {
	var self = this,
		b = '';

	for(var t in opts) {
		if(t !== "item") {
			var tool = opts[t];
			b += '<a href="#/'+ (tool.confirm ? "confirm/": "") + t +'" class="'+ tool.icon +'" '+ (tool.title ? 'title="'+ tool.title +'"' : "") +'></a>';
		}
	}

	self.active = undefined;
	self.confirm = undefined;

	//start to hack to get parent li.
	self.$b = $(b)
		.hover(function() {
				self.active = this.hash.split("/")[1];
				self.$parent.addClass("nipple-h-"+ self.active);
				self.$b.not(this).addClass('nipple-hidden');
			}, function() {
				self.$parent.removeClass("nipple-h-"+ self.active);
				self.$b.removeClass('nipple-hidden');
		});

	setTimeout(function () {
		self.$parent = self.$b.first().parent()
			.on("mouseout.nipple-confirm", function() {
				self.hideConfirm();
			})
			.on("click.nipple-confirm", "a", function(e) {
				if(self.confirm && self.$parent.hasClass('nipple-confirmation')) {
					setTimeout(function () {
						self.hideConfirm();
					}, 0);
				} else if(this.hash.substring(0, 9) === "#/confirm" ) {
					e.preventDefault();
					e.stopPropagation();
					self.showConfirm(this);
				}
			});
	}, 16);
};

NippleTools.prototype = {
	showConfirm: function(el) {
		this.$confirm = $(el);
		this.$parent.addClass("nipple-confirmation");
		this.confirm = this.$confirm.attr("href").slice(9);
		this.$confirm.attr("href", "#"+this.confirm);
	},

	hideConfirm: function() {
		if(this.confirm) {
			this.$confirm.attr("href", "#/confirm"+this.confirm);
			this.$parent.removeClass("nipple-confirmation");
			this.confirm = undefined;
		}
	},

	remove: function() {
		this.$parent.off('.nipple-confirm');
	}
};

exports("ui/nipple/tools", function(opts, cb) {
	return new NippleTools(opts, cb);
});
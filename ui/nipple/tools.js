/*eslint-disable strict */
var $ = require("$");

var NippleTools = function($parent, opts) {
	var self = this,
		toolsNum = 0,
		b = "";

	for(var t in opts) {
		if(t !== "item") {
			var tool = opts[t];
			toolsNum++;
			b += '<a href="#/' + (tool.confirm ? "confirm/" : "") + t + '" class="' + tool.icon + '" ' + (tool.title ? 'title="' + tool.title + '"' : "") + "></a>";
		}
	}

	self.active = undefined;
	self.confirm = undefined;

	self.$b = $(b)
		.hover(function() {
				self.active = this.hash.split("/")[1];
				self.$parent.addClass("nipple-h-" + self.active);
				self.$b.not(this).addClass("nipple-hidden");
			}, function() {
				self.$parent.removeClass("nipple-h-" + self.active);
				self.$b.removeClass("nipple-hidden");
			}
		);

	self.$parent = $parent
		.addClass("nipple-i-tools-" + toolsNum)
		.on("mouseout.nipple-confirm", function() {
			self.hideConfirm();
		})
		.on("click.nipple-confirm", "a", function(e) {
			if(self.confirm && self.$parent.hasClass("nipple-confirmation")) {
				setTimeout(function () {
					self.hideConfirm();
				}, 0);
			} else if(this.hash.substring(0, 9) === "#/confirm" ) {
				e.preventDefault();
				e.stopPropagation();
				self.showConfirm(this);
			}
		});
};

NippleTools.prototype = {
	showConfirm: function(el) {
		this.$confirm = $(el);
		this.$parent.addClass("nipple-confirmation");
		this.confirm = this.$confirm.attr("href").slice(9);
		this.$confirm.attr("href", "#" + this.confirm);
	},

	hideConfirm: function() {
		if(this.confirm) {
			this.$confirm.attr("href", "#/confirm" + this.confirm);
			this.$parent.removeClass("nipple-confirmation");
			this.confirm = undefined;
		}
	},

	remove: function() {
		this.$parent.off(".nipple-confirm");
	}
};

exports("ui/nipple/tools", function($parent, a, opts) {
	return new NippleTools($parent, opts);
});

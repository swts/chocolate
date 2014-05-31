/*jshint
    browser:true,
    strict: false
*/

var $ = require('$');

var NippleTools = function(tools) {
	var self = this,
		b = '<li class="nipple-tools">';

	for(var t in tools) {
		var tool = tools[t];
		b += '<a href="#/'+ (tool.confirm ? "confirm/": "") + t +'" class="'+ tool.icon +'" '+ (tool.title ? 'title="'+ tool.title +'"' : "") +'></a>';
	}

	b += "</li>";

	self.active = undefined;
	self.confirm = undefined;
	self.$b = $(b)
		.on("mouseout", function() {
			self.hideConfirm();
		})
		.on("click", "a", function(e) {
			if(self.confirm && self.$b.hasClass('nipple-confirmation')) {
				setTimeout(function () {
					self.hideConfirm();
				}, 0);
			} else if(this.hash.substring(0, 9) === "#/confirm" ) {
				e.preventDefault();
				e.stopPropagation();
				self.showConfirm(this);
			}
		});

	self.$a = self.$b.find('a')
		.hover(function() {
				self.active = this.hash.split("/")[1];
				self.$b.addClass("nipple-h-"+ self.active);
				self.$a.not(this).addClass('nipple-hidden');
			}, function() {
				self.$b.removeClass("nipple-h-"+ self.active);
				self.$a.removeClass('nipple-hidden');
		});
};

NippleTools.prototype = {
	showConfirm: function(el) {
		this.$confirm = $(el);
		this.$b.addClass("nipple-confirmation");
		this.confirm = this.$confirm.attr("href").slice(9);
		this.$confirm.attr("href", "#"+this.confirm);
	},

	hideConfirm: function() {
		if(this.confirm) {
			this.$confirm.attr("href", "#/confirm"+this.confirm);
			this.$b.removeClass("nipple-confirmation");
			this.confirm = undefined;
		}
	}
};

exports("ui/nipple/tools", NippleTools);

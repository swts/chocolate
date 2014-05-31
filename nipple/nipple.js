/*jshint
    browser:true,
    strict: false
*/

/*
	opts: {
		items: [

			["options", "remove"], "status"
		],
		status: [
			{draft: "Draft"},
			{published: "Published"}
		],
		direction: "down | up | left | right",
	}

*/

var defaults = {
		items: {
			"tools": {
				options: {
					title: "Options",
					icon: "swts-icon-dots",
				},

				remove: {
					confirm: true,
					title: "Remove",
					icon: "swts-icon-trash"
				},
			},

			"status/draft": {
				title: "Draft"
			},

			"status/published": {
				title: "Published"
			}
		},
		direction: "down",
		confirmText: "Sure?",
		menu: false,
		autoHide: false,
		size: "small"
	};

var $ = require('$'),
	$d = $(document),
	openedNipple;

var nippleItems = {
	input: require('ui/nipple/input'),
	tools: require('ui/nipple/tools')
};

var Nipple = function(opts, cbs) {
	var self = this;

	if(cbs === undefined) {
		cbs = opts;
		opts = {};
	}

	self._direction = opts.direction || defaults.direction;
	self.confirmText = opts.confirmText || defaults.confirmText;
	self.menu = opts.menu || defaults.menu;
	self.autoHide = opts.autoHide || defaults.autoHide;
	self.cbs = cbs;
	self.items = [];

	self.active = false;
	self.build(opts.items || defaults.items, opts.size || defaults.size || "small");
};

Nipple.prototype = {
	build: function(items, size) {
		var self = this,
			toolbar = false,
			itemClass = self.menu ? "" : ' class="nipple-item"',
			$ulItems = $('<ul class="nipple-items"></ul>');

		self.$b = $('<div class="nipple nipple-'+ size +' nipple-'+ self._direction +'"><a href="#nipple-open"></a></div>')
			.append($ulItems)
			.on("click", "li > a", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var args = this.hash.split("/");
				if(self.menu) {
					self.hide();
				}

				if( $(this).parent().hasClass("nipple-item") ) {
					self.val(this.hash.slice(2));
				}

				self.cbs[args[1]] && self.cbs[args[1]].apply(self, args.slice(2));
			});

		self.$a = self.$b.children("a").on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			self.toggle();
		});


		for(var i in items) {
			if( nippleItems[i] ) {
				var item = new nippleItems[i](items[i], self.cbs[i]);
				$ulItems.append(item.$b);
				self.items.push(item);
			} else {
				$ulItems.append('<li'+ itemClass +'><a href="#/'+ i +'">'+ items[i].title +'</a></li>');
			}
		}

		// if(self.autoHide) {
		// 	console.log("hide");
		// 	self.$b.find("ul").on("mouseout", self.hide.bind(self));
		// }

		self.$items = self.$b.find(".nipple-item");

		$d.on("click", function() {
			self.active && self.hide();
		});
	},

	val: function(val) {
		if(val === undefined) {
			return this._val;
		}

		if(this._val !== val) {
			if(!this.menu) {
				this.$items
					.find('[href="#/'+ this._val +'"]')
						.parent()
							.removeClass("nipple-selected")
							.end()
						.end()
					.find('[href="#/'+ val +'"]')
						.parent()
						.addClass("nipple-selected");
			}

			this._val = val;
		}
		return this;
	},

	direction: function(dir) {
		if(dir === undefined) {
			return this._direction;
		}

		if(this._direction !== dir) {
			this.$b.removeClass("nipple-"+this._direction)
				.addClass("nipple-"+dir);
			this._direction = dir;
		}

		return this;
	},

	confirm: function(tool) {
		var self = this;

		if(self.confirmTool !== tool) {
			self.$confirm
				.attr("href", "#/confirm/" + tool)
				.addClass("nipple-hot");
		} else {
			self.cbs[tool].apply(self, arguments.slice(1));
			self.hideConfirm();
		}
	},

	hideConfirm: function() {
		this.confirmTool = undefined;
		this.$confirm.removeClass("nipple-hot");
	},

	toggle: function() {
		if(this.active) {
			this.hide();
		} else {
			this.show();
		}
	},

	show: function() {
		openedNipple && openedNipple.hide();
		openedNipple = this;
		this.$b.addClass("nipple-hot");
		this.active = true;
		return this;
	},

	hide: function() {
		openedNipple = undefined;
		this.$b.removeClass("nipple-hot");
		this.active = false;
		return this;
	},

	appendTo: function($container) {
		this.$b.appendTo($container);
		return this;
	},

	prependTo: function($container) {
		this.$b.appendTo($container);
		return this;
	},

	remove: function() {
		console.log("nipple remove");
	}
};

Nipple.defaults = function(opts) {
	defaults = opts;
};

exports("ui/nipple", Nipple);

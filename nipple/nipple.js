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
				item: "tools",
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
	tools: require('ui/nipple/tools'),
	item: function(action, opts) {
		return {
			$b: $('<a href="#/'+ action +'">'+ opts.title +'</a>')
		};
	}
};

var Nipple = function(opts, cbs) {
	var self = this;

	if(cbs === undefined) {
		cbs = opts;
		opts = {};
	}

	self._direction = opts.direction || defaults.direction;
	self.confirmText = opts.confirmText || defaults.confirmText;
	self.autoHide = opts.autoHide || defaults.autoHide;
	self.menu = opts.menu || defaults.menu;
	self.cbs = cbs;
	self.items = {};

	self.active = false;
	self.build(opts.items || defaults.items, opts.size || defaults.size || "small");
};

Nipple.prototype = {
	build: function(items, size) {
		var self = this,
			cbs = self.cbs,

			$ul = $('<ul class="nipple-items"></ul>')
				.on("click", "a", function(e) {
					e.preventDefault();
					e.stopPropagation();
					var args = this.hash.split("/");

					if(self.autoHide) {
						self.hide();
					}

					if(!self.menu && $(this).parent().hasClass("nipple-i-item") ) {
						self.val(this.hash.slice(2));
					}

					cbs[args[1]] && cbs[args[1]].apply(self, args.slice(2));
				});

		for(var i in items) {
			var newItem, item = items[i],
				type = item.item || "item",
				$li = $('<li class="nipple-i-'+ type +'"></li>');

			newItem = nippleItems[type](i, items[i], cbs[i] && cbs[i].bind(self));
			$li.append(newItem.$b);
			$ul.append($li);
			self.items[i] = newItem;
		}

		self.$b = $('<div class="nipple nipple-'+ size +' nipple-'+ self._direction +'"><a href="#nipple-open"></a></div>')
			.append($ul);

		self.$a = self.$b.children("a").on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			self.toggle();
		});

		self.$items = self.$b.find(".nipple-i-item");

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
		console.log("nipple remove");
	}
};

Nipple.defaults = function(opts) {
	defaults = opts;
};

exports("ui/nipple", Nipple);

/*eslint-disable strict */
/*
	opts: {
		items: [

			["options", "remove"], "status"
		],
		status: [
			{draft: "Draft"},
			{published: "Published"}
		],
		direction: "n | ne | e | se | e | we | w | nw",
	}

*/

var $ = require("$"),
	inherits = require("util/inherits"),
    Bar = require("ui/bar");

var openedNipple,
	defaults;

$(document).on("click.nipple", function() {
	openedNipple && openedNipple.hide();
});

var nippleItems = {
	input: require("ui/nipple/input"),
	tools: require("ui/nipple/tools"),
	toggle: require("ui/nipple/toggle"),
	item: function($parent, action, opts) {
		return {
			$b: $('<a href="#/' + action + '">' + opts.title + "</a>")
		};
	}
};

var Nipple = function(opts, cbs) {
	var self = this;

	if(cbs === undefined) {
		cbs = opts;
		opts = {};
	}

	self._popup = opts.popup || defaults.popup || "s";
	self.autoHide = opts.autoHide || defaults.autoHide;
	self.menu = opts.menu || defaults.menu;
	self.willOpen = opts.willOpen;
	self.cbs = cbs;
	self.items = {};

	self.active = false;
	self.build(opts.items || defaults.items, opts.size || defaults.size || "small");
};
inherits(Nipple, Bar);

Nipple.prototype.build = function(items, size) {
	var self = this,
		cbs = self.cbs,

		$ul = $('<ul class="nipple-items"></ul>')
			.on("click.nipple", "a", function(e) {
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
			$li = $('<li class="nipple-i-' + type + '"></li>');

		newItem = nippleItems[type]($li, i, items[i], cbs[i] && cbs[i].bind(self));
		$li.append(newItem.$b);
		$ul.append($li);
		self.items[i] = newItem;
	}

	self.$b = $('<div class="nipple nipple-' + size + " nipple-" + self._popup + '"><a href="#nipple-open"></a></div>')
		.append($ul);

	self.$a = self.$b.children("a").on("click.nipple", function(e) {
		e.preventDefault();
		e.stopPropagation();

		if(!self.active && self.willOpen && !self.willOpen()) {
			return;
		}

		self.toggle();
	});

	self.$items = self.$b.find(".nipple-i-item");
};

Nipple.prototype.val = function(val) {
	if(val === undefined) {
		return this._val;
	}

	if(this._val !== val) {
		if(!this.menu) {
			this.$items
				.find('[href="#/' + this._val + '"]')
					.parent()
						.removeClass("nipple-selected")
						.end()
					.end()
				.find('[href="#/' + val + '"]')
					.parent()
					.addClass("nipple-selected");
		}

		this._val = val;
	}
	return this;
};

Nipple.prototype.direction = function(dir) {
	if(dir === undefined) {
		return this._popup;
	}

	if(this._popup !== dir) {
		this.$b.removeClass("nipple-" + this._popup)
			.addClass("nipple-" + dir);
		this._popup = dir;
	}

	return this;
};

Nipple.prototype.confirm = function(tool) {
	var self = this;

	if(self.confirmTool !== tool) {
		self.$confirm
			.attr("href", "#/confirm/" + tool)
			.addClass("nipple-hot");
	} else {
		self.cbs[tool].apply(self, arguments.slice(1));
		self.hideConfirm();
	}
};

Nipple.prototype.hideConfirm = function() {
	this.confirmTool = undefined;
	this.$confirm.removeClass("nipple-hot");
};

Nipple.prototype.toggle = function() {
	if(this.active) {
		this.hide();
	} else {
		this.show();
	}
};

Nipple.prototype.show = function() {
	openedNipple && openedNipple.hide();
	openedNipple = this;
	this.$b.addClass("nipple-hot");
	this.active = true;
	return this;
};

Nipple.prototype.hide = function() {
	openedNipple = undefined;
	this.$b.removeClass("nipple-hot");
	this.active = false;
	return this;
};

Nipple.prototype.remove = function() {
	if(openedNipple === this) {
		openedNipple = undefined;
	}

	this.$a.off(".nipple");
	this.$a = undefined;
	Nipple.super_.prototype.remove.call(this);
};

Nipple.defaults = function(opts) {
	defaults = opts;
};

exports("ui/nipple", Nipple);

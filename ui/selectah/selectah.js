/*jshint
    browser:true,
    strict: false
*/

var $ = require('$'),
    inherits = require('util/inherits'),
    Bar = require('ui/bar'),

	rxChild = /(\/)/g;

var Selectah = function(items, opts, cb) {
	var self = this;

	if(typeof opts === "function") {
		cb = opts;
		opts = {};
	}

	self.keepOrder = opts.keepOrder;
    self.isMultiple = opts.multiple;
    self.selected = opts.selected || (self.isMultiple ? [] : "");
    self.cb = cb;
    self.items = items;
    self.order = [];

    self.build();
};
inherits(Selectah, Bar);

Selectah.prototype.parse = function($el) {
	//todo: parse option tag
	return this;
};

Selectah.prototype.buildItems = function(items) {
	var self = this,
		b = "",
		selected = self.selected,
		isSelected = (selected && selected.length);

	for (var i = 0, l = items.length; i < l; i++) {
		var subItems,
			activeClass = "",
			item = items[i],
			value = Object.keys(item)[0];

		self.order.push(value);
		if(isSelected) {
			if(value === selected || (self.isMultiple && selected.indexOf(value) !== -1)) {
				activeClass = ' selectah-active';
			}
		} else if(i === 0) {
			activeClass = ' selectah-active';
		}

		var match = value.match(rxChild);
		b += '<li class="selectah-level-'+ (match ? match.length : 0) + activeClass + '"><a href="#:' + value + '">' +
			item[value] +
			"</a></li>";
	}
	return b;
};

Selectah.prototype.build = function() {
	var self = this,
		block = '<ul class="selectah">';

	block += self.buildItems(self.items);
	block += "</ul>";

	self.$b = $(block).on("click.selectah", "a", function(e) {
		e.preventDefault();
		e.stopPropagation();
		self.check(this);
	});

	self.$li = self.$b.find("li");
};

Selectah.prototype.pushInOrder = function(slug) {
	var self = this,
		items = self.order,
		selected = self.selected;

	slug = slug.split("/");
	while(slug.length) {
		var val = slug.join("/");
		selected.push(val);
		this.$b.find('a[href="#:'+val+'"]')
			.parent().addClass("selectah-active");
		slug.pop();
	}

	self.selected = [];

	for(var i in items) {
		if(selected.indexOf(items[i]) !== -1) {
			self.selected.push(items[i]);
		}
	}
};

Selectah.prototype.set = function(val) {
	var self = this;

	self.selected = val;
	self.$b.addClass('no-transition');
	self.$li.removeClass('selectah-active');
	self.$b.find('a[href="#:'+val+'"]')
			.parent()
			.addClass('selectah-active');

	setTimeout(function () {
		self.$b.removeClass('no-transition');
	}, 10);
	return this;
};

Selectah.prototype.val = function(val) {
	if(val === undefined) {
		return this.selected;
	}

	this.check( this.$b.find('a[href="#:'+val+'"]' )[0]);
	return this;
};

Selectah.prototype.check = function(el) {
	var self = this,
		slug = el.hash.split(":")[1],
		$parent = $(el).parent();

	if ($parent.hasClass("selectah-active")) {
		self.deactivate($parent, slug);
	} else {
		self.activate($parent, slug);
	}
};

Selectah.prototype.activate = function($parent, slug) {
	var self = this;

	if (!self.isMultiple) {
		self.$li.removeClass("selectah-active");
		self.selected = slug;
	} else {
		if(self.keepOrder) {
			self.pushInOrder(slug);
		} else {
			self.selected.push(slug);
		}
	}

	$parent.addClass("selectah-active");
	self.cb && self.cb(self.selected);
};

Selectah.prototype.deactivate = function($parent, slug) {
	var self = this;

	if (self.isMultiple && self.selected.length > 1) {
		$parent.removeClass("selectah-active");

		for (var i = 0; i < self.selected.length; i++) {
			if (self.selected[i] === slug) {
				self.selected.splice(i, 1);
				break;
			}
		}

		self.cb && self.cb(self.selected);
	}
};

Selectah.prototype.show = function() {
	this.$b.show();
	return this;
};

Selectah.prototype.remove = function() {
	Selectah.super_.prototype.remove.call(this, ".selectah");
};

exports("ui/selectah", Selectah);

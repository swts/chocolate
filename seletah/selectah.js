/*
	Ultimate Flëve Selectah module
*/

/*jshint
    browser:true,
    strict: false
*/

var $ = require('$');

/*
	items: [{ value: title }];
	opts: {
		class: string,			add class to widget
		selected: string,		optional initial selected item slug
		multiple: boolean,	allows multiple select
		onChange: function,		something from outer space that happens after select
	}


*/

var Selectah = function(items, opts, cb) {
	var self = this;

	if(typeof opts === "function") {
		cb = opts;
		opts = undefined;
	}

    self.isMultiple = opts.multiple;
    self.selected = opts.selected || (self.isMultiple ? [] : "");
    self.cb = cb;
    self.items = items;

    self.build(opts.selected, opts.class);
};

Selectah.prototype = {
	parse: function($el) {

	},

	build: function(selected, addClass) {
		var self = this,
			block = '<ul class="selectah'+ (addClass ? ' '+addClass : '') +'">',
			item, value,
			isMultiple = self.isMultiple,
			isSelected = selected !== undefined;

		for (var i = 0, l = self.items.length; i < l; i++) {
			var activeClass = "";
			item = self.items[i];
			value = Object.keys(item)[0];

			if(isSelected) {
				if(value === selected || (isMultiple && selected.indexOf(value) !== -1)) {
					activeClass = ' class="active"';
				}
			} else if(i === 0) {
				activeClass = ' class="active"';
			}

			block += '<li' + activeClass + '><a href="#/' + value + '">' + item[value] + "</a></li>";
		}

		block += '</ul>';

		self.$b = $(block).on("click.selectah", "a", function(e) {
			e.preventDefault();
			e.stopPropagation();
			self.onClick(this);
		});

		self.$li = self.$b.find("li");
	},

	setInitial: function(val) {
		var self = this;

		self.selected = val;
		self.$b.addClass('no-transition');
		self.$li.removeClass('active');
		self.$b.find('a[href="#/'+val+'"]')
				.parent()
				.addClass('active');

		setTimeout(function () {
			self.$b.removeClass('no-transition');
		}, 10);
	},

	val: function(val) {
		if(val === undefined) {
			return this.selected;
		}

		this.onClick( this.$b.find('a[href="#/'+val+'"]' )[0]);
	},

	onClick: function(el) {
		var self = this,
			slug = el.hash.split("/")[1],
			$parent = $(el).parent();

		if ($parent.hasClass("active")) {
			self.deactivate($parent, slug);
		} else {
			self.activate($parent, slug);
		}
	},

	activate: function($parent, slug) {
		var self = this;

		if (!self.isMultiple) {
			self.$li.removeClass("active");
			self.selected = slug;
		} else {
			self.selected.push(slug);
		}

		$parent.addClass("active");

		self.cb && self.cb(self.selected);
	},

	deactivate: function($parent, slug) {
		var self = this;

		if (self.isMultiple && self.selected.length > 1) {
			$parent.removeClass("active");

			for (var i = 0; i < self.selected.length; i++) {
				if (self.selected[i] === slug) {
					self.selected.splice(i, 1);
					break;
				}
			}

			self.cb && self.cb(self.selected);
		}
	},

	show: function() {
		this.$b.show();
	},

	remove: function() {
		var self = this;

		self.$b.off(".selectah");
		self.$b.remove();
	}
};

exports("ui/selectah", Selectah);

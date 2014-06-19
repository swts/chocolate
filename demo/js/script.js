;(function(window, document, undefined) {
	"use strict";
	var modules = {},

		require = function(name) {
			var module = modules[name] || window[name];
			if (!module) {
				throw new Error("Requested module '" + name + "' has not been defined.");
			}
			return module;
		},

		exports = function(name, module, global) {
			if(global) {
				window[name] = module;
			} else {
				modules[name] = module;
			}
		};

(function(window, document, undefined){
exports('$', jQuery.noConflict());
})(window, document);
(function(window, document, undefined){
exports('swts', {});
})(window, document);
(function(window, document, undefined){
var extend = function () {
  var args = Array.prototype.slice.call(arguments),
      deep = false,
      org = args.shift(),
      type = '';

  if (typeof org === 'string' || typeof org === 'boolean') {
    type = (org === true)?'deep':org;
    org = args.shift();

    if (type == 'defaults') {
      org = extend({}, org); //clone defaults into new object
      type = 'strict';
    }
  }

  for (var i = 0, c = args.length; i < c; i++) {
    var prop = args[i];
    for (var name in prop) {
      if (type == 'deep' && typeof prop[name] === 'object' && typeof org[name] !== 'undefined') {
        extend(type, org[name], prop[name]);
      } else if (type != 'strict' || (type == 'strict' && typeof org[name] !== 'undefined')) {
        org[name] = prop[name];
      }
    }
  }
  return org;
};

exports('util/extend', extend);
})(window, document);
(function(window, document, undefined){
/*jshint
    strict: false,
    browser:true
*/


var inherits = function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
};


exports('util/inherits', inherits);
})(window, document);
(function(window, document, undefined){
/*jshint
	browser:true,
	strict: false
*/

var charMap = {
/*    // latin
    'À': 'A',
    'Á': 'A',
    'Â': 'A',
    'Ã': 'A',
    'Ä': 'Ae',
    'Å': 'A',
    'Æ': 'AE',
    'Ç': 'C',
    'È': 'E',
    'É': 'E',
    'Ê': 'E',
    'Ë': 'E',
    'Ì': 'I',
    'Í': 'I',
    'Î': 'I',
    'Ï': 'I',
    'Ð': 'D',
    'Ñ': 'N',
    'Ò': 'O',
    'Ó': 'O',
    'Ô': 'O',
    'Õ': 'O',
    'Ö': 'Oe',
    'Ő': 'O',
    'Ø': 'O',
    'Ù': 'U',
    'Ú': 'U',
    'Û': 'U',
    'Ü': 'Ue',
    'Ű': 'U',
    'Ý': 'Y',
    'Þ': 'TH',
    'ß': 'ss',
    'à': 'a',
    'á': 'a',
    'â': 'a',
    'ã': 'a',
    'ä': 'ae',
    'å': 'a',
    'æ': 'ae',
    'ç': 'c',
    'è': 'e',
    'é': 'e',
    'ê': 'e',
    'ë': 'e',
    'ì': 'i',
    'í': 'i',
    'î': 'i',
    'ï': 'i',
    'ð': 'd',
    'ñ': 'n',
    'ò': 'o',
    'ó': 'o',
    'ô': 'o',
    'õ': 'o',
    'ö': 'oe',
    'ő': 'o',
    'ø': 'o',
    'ù': 'u',
    'ú': 'u',
    'û': 'u',
    'ü': 'ue',
    'ű': 'u',
    'ý': 'y',
    'þ': 'th',
    'ÿ': 'y',
    'ẞ': 'SS',
    // greek
    'α': 'a',
    'β': 'b',
    'γ': 'g',
    'δ': 'd',
    'ε': 'e',
    'ζ': 'z',
    'η': 'h',
    'θ': '8',
    'ι': 'i',
    'κ': 'k',
    'λ': 'l',
    'μ': 'm',
    'ν': 'n',
    'ξ': '3',
    'ο': 'o',
    'π': 'p',
    'ρ': 'r',
    'σ': 's',
    'τ': 't',
    'υ': 'y',
    'φ': 'f',
    'χ': 'x',
    'ψ': 'ps',
    'ω': 'w',
    'ά': 'a',
    'έ': 'e',
    'ί': 'i',
    'ό': 'o',
    'ύ': 'y',
    'ή': 'h',
    'ώ': 'w',
    'ς': 's',
    'ϊ': 'i',
    'ΰ': 'y',
    'ϋ': 'y',
    'ΐ': 'i',
    'Α': 'A',
    'Β': 'B',
    'Γ': 'G',
    'Δ': 'D',
    'Ε': 'E',
    'Ζ': 'Z',
    'Η': 'H',
    'Θ': '8',
    'Ι': 'I',
    'Κ': 'K',
    'Λ': 'L',
    'Μ': 'M',
    'Ν': 'N',
    'Ξ': '3',
    'Ο': 'O',
    'Π': 'P',
    'Ρ': 'R',
    'Σ': 'S',
    'Τ': 'T',
    'Υ': 'Y',
    'Φ': 'F',
    'Χ': 'X',
    'Ψ': 'PS',
    'Ω': 'W',
    'Ά': 'A',
    'Έ': 'E',
    'Ί': 'I',
    'Ό': 'O',
    'Ύ': 'Y',
    'Ή': 'H',
    'Ώ': 'W',
    'Ϊ': 'I',
    'Ϋ': 'Y',
    // turkish
    'ş': 's',
    'Ş': 'S',
    'ı': 'i',
    'İ': 'I',
    // 'ç': 'c', // duplicate
    // 'Ç': 'C', // duplicate
    // 'ü': 'ue', // duplicate
    // 'Ü': 'Ue', // duplicate
    // 'ö': 'oe', // duplicate
    // 'Ö': 'Oe', // duplicate
    'ğ': 'g',
    'Ğ': 'G',
    // macedonian
    'Ќ': 'Kj',
    'ќ': 'kj',
    'Љ': 'Lj',
    'љ': 'lj',
    'Њ': 'Nj',
    'њ': 'nj',
    'Тс': 'Ts',
    'тс': 'ts',
    // russian */
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'г': 'g',
    'д': 'd',
    'е': 'e',
    'ё': 'yo',
    'ж': 'zh',
    'з': 'z',
    'и': 'i',
    'й': 'y',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'х': 'h',
    'ц': 'c',
    'ч': 'ch',
    'ш': 'sh',
    'щ': 'sch',
    'ъ': '',
    'ы': 'y',
    'ь': '',
    'э': 'e',
    'ю': 'yu',
    'я': 'ya'/*,
    'А': 'A',
    'Б': 'B',
    'В': 'V',
    'Г': 'G',
    'Д': 'D',
    'Е': 'E',
    'Ё': 'Yo',
    'Ж': 'Zh',
    'З': 'Z',
    'И': 'I',
    'Й': 'J',
    'К': 'K',
    'Л': 'L',
    'М': 'M',
    'Н': 'N',
    'О': 'O',
    'П': 'P',
    'Р': 'R',
    'С': 'S',
    'Т': 'T',
    'У': 'U',
    'Ф': 'F',
    'Х': 'H',
    'Ц': 'C',
    'Ч': 'Ch',
    'Ш': 'Sh',
    'Щ': 'Sh',
    'Ъ': '',
    'Ы': 'Y',
    'Ь': '',
    'Э': 'E',
    'Ю': 'Yu',
    'Я': 'Ya',
    // ukranian
    'Є': 'Ye',
    'І': 'I',
    'Ї': 'Yi',
    'Ґ': 'G',
    'є': 'ye',
    'і': 'i',
    'ї': 'yi',
    'ґ': 'g',
    // czech
    'č': 'c',
    'ď': 'd',
    'ě': 'e',
    'ň': 'n',
    'ř': 'r',
    'š': 's',
    'ť': 't',
    'ů': 'u',
    'ž': 'z',
    'Č': 'C',
    'Ď': 'D',
    'Ě': 'E',
    'Ň': 'N',
    'Ř': 'R',
    'Š': 'S',
    'Ť': 'T',
    'Ů': 'U',
    'Ž': 'Z',
    // polish
    'ą': 'a',
    'ć': 'c',
    'ę': 'e',
    'ł': 'l',
    'ń': 'n',
    // 'ó': 'o', // duplicate
    'ś': 's',
    'ź': 'z',
    'ż': 'z',
    'Ą': 'A',
    'Ć': 'C',
    'Ę': 'E',
    'Ł': 'L',
    'Ń': 'N',
    'Ś': 'S',
    'Ź': 'Z',
    'Ż': 'Z',
    // latvian
    'ā': 'a',
    // 'č': 'c', // duplicate
    'ē': 'e',
    'ģ': 'g',
    'ī': 'i',
    'ķ': 'k',
    'ļ': 'l',
    'ņ': 'n',
    // 'š': 's', // duplicate
    'ū': 'u',
    // 'ž': 'z', // duplicate
    'Ā': 'A',
    // 'Č': 'C', // duplicate
    'Ē': 'E',
    'Ģ': 'G',
    'Ī': 'I',
    'Ķ': 'k',
    'Ļ': 'L',
    'Ņ': 'N',
    // 'Š': 'S', // duplicate
    'Ū': 'U',
    // 'Ž': 'Z', // duplicate
    // Arabic
    'ا': 'a',
    'أ': 'a',
    'إ': 'i',
    'آ': 'aa',
    'ؤ': 'u',
    'ئ': 'e',
    'ء': 'a',
    'ب': 'b',
    'ت': 't',
    'ث': 'th',
    'ج': 'j',
    'ح': 'h',
    'خ': 'kh',
    'د': 'd',
    'ذ': 'th',
    'ر': 'r',
    'ز': 'z',
    'س': 's',
    'ش': 'sh',
    'ص': 's',
    'ض': 'dh',
    'ط': 't',
    'ظ': 'z',
    'ع': 'a',
    'غ': 'gh',
    'ف': 'f',
    'ق': 'q',
    'ك': 'k',
    'ل': 'l',
    'م': 'm',
    'ن': 'n',
    'ه': 'h',
    'و': 'w',
    'ي': 'y',
    'ى': 'a',
    'ة': 'h',
    'ﻻ': 'la',
    'ﻷ': 'laa',
    'ﻹ': 'lai',
    'ﻵ': 'laa',
    // Arabic diactrics
    'َ': 'a',
    'ً': 'an',
    'ِ': 'e',
    'ٍ': 'en',
    'ُ': 'u',
    'ٌ': 'on',
    'ْ': '',

    // Arabic numbers
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
    // symbols
    '“': '"',
    '”': '"',
    '‘': '\'',
    '’': '\'',
    '∂': 'd',
    'ƒ': 'f',
    '™': '(TM)',
    '©': '(C)',
    'œ': 'oe',
    'Œ': 'OE',
    '®': '(R)',
    '†': '+',
    '℠': '(SM)',
    '…': '...',
    '˚': 'o',
    'º': 'o',
    'ª': 'a',
    '•': '*',
    // currency
    '$': 'USD',
    '€': 'EUR',
    '₢': 'BRN',
    '₣': 'FRF',
    '£': 'GBP',
    '₤': 'ITL',
    '₦': 'NGN',
    '₧': 'ESP',
    '₩': 'KRW',
    '₪': 'ILS',
    '₫': 'VND',
    '₭': 'LAK',
    '₮': 'MNT',
    '₯': 'GRD',
    '₱': 'ARS',
    '₲': 'PYG',
    '₳': 'ARA',
    '₴': 'UAH',
    '₵': 'GHS',
    '¢': 'cent',
    '¥': 'CNY',
    '元': 'CNY',
    '円': 'YEN',
    '﷼': 'IRR',
    '₠': 'EWE',
    '฿': 'THB',
    '₨': 'INR',
    '₹': 'INR',
    '₰': 'PF'*/
},

slugify = function(text) {
	return text.toLowerCase().split("").map(function (char) {
		return charMap[char] || char;
	}).join("")
		.replace(" ", "-")
		.replace(/[^-a-z0-9]{1,60}/, "");
};

exports("ui/input/slugify", slugify);
})(window, document);
(function(window, document, undefined){
/*jshint
    browser:true,
    strict: false
*/
var $ = require('$'),
	slugify = require('ui/input/slugify');

var Input = function($b, opts, cb) {
	var self = this;

	if(!($b instanceof $) && $b !== undefined) {
		cb = opts;
		opts = $b;
		$b = undefined;
	}

	if(!opts) {
		opts = {};
	}

	self.$b = $b || $('<label class="swts-input"><input type="'+
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
		.trigger("blur")
		.on("keyup.input", function(e) {
			if(self.transform) {
				this.value = self.transform(this.value);
			}
			self.throttledUpdate(this.value);
		});

	self.value = opts.value;
	self.rx = opts.rx;

	if(opts.slugify) {
		self.slugify = true;
		self.transform = slugify;
	} else if (opts.transform) {
		self.transform = opts.transform;
	}

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
		this.$i.off(".input");
		this.$b.off(".input").remove();
	}
};

exports("ui/input", Input);
})(window, document);
(function(window, document, undefined){
/*jshint
    browser:true,
    strict: false
*/

var $ = require('$'),
	Input = require('ui/input');

exports("ui/nipple/input", function(a, opts, cb) {
	return new Input(opts, cb);
});
})(window, document);
(function(window, document, undefined){
/*jshint
    browser:true,
    strict: false
*/

var $ = require('$');

var NippleTools = function(a, opts, cb) {
	var self = this,
		toolsNum = 0,
		b = '';

	for(var t in opts) {
		if(t !== "item") {
			var tool = opts[t];
			toolsNum++;
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
			.addClass("nipple-i-tools-"+toolsNum)
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
	}, 0);
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
})(window, document);
(function(window, document, undefined){
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

var $ = require('$'),
	openedNipple,
	defaults;

$(document).on("click.nipple", function() {
	openedNipple && openedNipple.hide();
});

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

	self._popup = opts.popup || defaults.popup || "s";
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
				$li = $('<li class="nipple-i-'+ type +'"></li>');

			newItem = nippleItems[type](i, items[i], cbs[i] && cbs[i].bind(self));
			$li.append(newItem.$b);
			$ul.append($li);
			self.items[i] = newItem;
		}

		self.$b = $('<div class="nipple nipple-'+ size +' nipple-'+ self._popup +'"><a href="#nipple-open"></a></div>')
			.append($ul);

		self.$a = self.$b.children("a").on("click.nipple", function(e) {
			e.preventDefault();
			e.stopPropagation();
			self.toggle();
		});

		self.$items = self.$b.find(".nipple-i-item");
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
			return this._popup;
		}

		if(this._popup !== dir) {
			this.$b.removeClass("nipple-"+this._popup)
				.addClass("nipple-"+dir);
			this._popup = dir;
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
		this.$b.remove();
	}
};

Nipple.defaults = function(opts) {
	defaults = opts;
};

exports("ui/nipple", Nipple);
})(window, document);
(function(window, document, undefined){
/*jshint
    browser:true,
    strict: false
*/

var $ = require('$'),
	$w = $(window),
    swts = require("swts"),
    Nipple = require('ui/nipple'),
	Input = require('ui/input');

var loginTepmlate = '<div class="swts-cover-login">'+
        '<label class="swts-input" id="swts-cover-email"><input type="text"><span>Email</span></label>'+
        '<label class="swts-input" id="swts-cover-password"><input type="password"><span>Password</span></label>'+
        '<a href="#/login" class="swts-button">Go</a>'+
    '</div>';

var Cover = function(opts) {
	var self = this;

	if(!opts) {
		opts = {};
	}

	self.$parent = $(opts.parent || "body");
	self.isLoginVisible = false;

	self.editing = false;
	self.popup = opts.popup || "n";
	self.ui = {};

	if(swts.u) {
		self.showUser(swts.u);
	} else {
		self.buildLogin();
	}
};

Cover.prototype = {
	load: function() {
		var self = this,
			script = document.createElement('script');
		exports("swts", swts, true);
		script.src = "/static/js/chocolate.js";
		script.onload = function() {
			if(window.Chocolate) {
				self.choco = new window.Chocolate(swts);
				self.choco.on();
				self.edit();
			}
		};
		document.body.appendChild(script);
	},

	buildLogin: function() {
		var self = this;

		self.$l = $(loginTepmlate)
			.appendTo(self.$parent)
			.on('click.swts.login', function(e){
				e.stopPropagation();
			})
			.on("keypress.swts.login", function(e) {
				if (e.keyCode === 13) {
					self.login();
				}
			})
			.find(".swts-button").on("click.swts.login", function(e) {
				e.preventDefault();
				self.login();
			})
			.end();

		self.ui.login = new Input(self.$l.find("#swts-cover-email"));
		self.ui.password = new Input(self.$l.find("#swts-cover-password"));

		$w.on({
			"keydown.swts.login": function(e) {
				if(self.isLoginVisible) {
					if (e.keyCode === 27) {
						e.preventDefault();
						self.hideLogin();
					}
				} else {
					if (e.shiftKey && e.keyCode === 48) {
						e.preventDefault();
						self.showLogin();
					}
				}
			},

			"click.swts.login": function(e) {
				self.isLoginVisible && self.hideLogin();
			}
		});
	},

	showLogin: function() {
		this.isLoginVisible = true;
		this.$l.addClass("active");
		this.ui.login.focus();
	},

	hideLogin: function() {
		this.$l.removeClass("active");

		this.ui.login.val('');
		this.ui.password.val('');
		this.isLoginVisible = false;
	},

	removeLogin: function() {
		var self = this;
		self.hideLogin();
		$w.off(".swts.login");

		setTimeout(function () {
			self.$l.remove();
			self.ui.login = undefined;
			self.ui.password = undefined;
		}, 650);
	},

	login: function() {
		var self = this,
			ui = self.ui;

		swts.userLogin(ui.login.val(), ui.password.val(), function(err, user) {
			if (err) {
				self.error();
			} else {
				self.removeLogin();
				self.showUser(user);
			}
		});
	},

	error: function() {
		var self = this;
		self.$l.addClass("swts-error");
		setTimeout(function() {
			self.$l.removeClass("swts-error");
		}, 500);
	},

	showUser: function(user) {
		if (!user) {
			return;
		}

		var self = this;
		self.ui.user = new Nipple({
				popup: self.popup,
				size: "medium",
				menu: true,
				autoHide: true,
				items: {
					"edit": {title: "Edit"},
					"profile": {title: user.name || user.id},
					"logout": {title: "Logout"}
				}
			},{
				edit: self.edit.bind(self),
				logout: self.logout.bind(self),
				profile: function() {
					console.log("User profile");
				},
			})
			.addClass("swts-user")
			.appendTo(self.$parent);
	},

	edit: function() {
		var self = this,
			cp = self.ui.user;

		if (self.choco) {
			if (self.editing) {
				self.editing = false;
				self.choco.off();
				cp.removeClass("swts-editing")
					.items.edit.$b.text("Edit");
			} else {
				self.choco.on();
				cp.addClass("swts-editing")
					.items.edit.$b.text("Stop editing");
				self.editing = true;
			}
		} else {
			self.load();
		}
	},

	logout: function() {
		swts.userLogout();
		this.ui.user.remove();
		this.ui = {};
		this.buildLogin();
	}
};

exports("ui/cover", Cover);
})(window, document);
(function(window, document, undefined){
/*
	Ultimate Flëve Selectah module
*/

/*jshint
    browser:true,
    strict: false
*/

var $ = require('$'),
	rxChild = /(\/)/g;

/*
	items: [{ value: title }];
	opts: {
		class: string,					add class to widget
		selected: string || array,		optional initial selected item slug
		multiple: boolean,				allows multiple select
	},
	cb: function						something from outer space that happens after select
*/

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

Selectah.prototype = {
	parse: function($el) {
		//todo: parse option tag
		return this;
	},

	buildItems: function(items) {
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
	},

	build: function() {
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
	},

	pushInOrder: function(slug) {
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
	},

	set: function(val) {
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
	},

	val: function(val) {
		if(val === undefined) {
			return this.selected;
		}

		this.check( this.$b.find('a[href="#:'+val+'"]' )[0]);
		return this;
	},

	check: function(el) {
		var self = this,
			slug = el.hash.split(":")[1],
			$parent = $(el).parent();

		if ($parent.hasClass("selectah-active")) {
			self.deactivate($parent, slug);
		} else {
			self.activate($parent, slug);
		}
	},

	activate: function($parent, slug) {
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
	},

	deactivate: function($parent, slug) {
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
	},

	show: function() {
		this.$b.show();
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
		var self = this;

		self.$b.off(".selectah");
		self.$b.remove();
	}
};

exports("ui/selectah", Selectah);
})(window, document);
(function(window, document, undefined){
/*jshint
    browser:true,
    strict: false
*/

/*global jQuery*/

var $ = require('$'),
	daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	defaults = {
		startDay: "MON",
		messages: {
			year: "",
			months: {
				0: {
					s: "Jan",
					f: "January"
				},
				1: {
					s: "Feb",
					f: "February"
				},
				2: {
					s: "Mar",
					f: "March"
				},
				3: {
					s: "Apr",
					f: "April"
				},
				4: {
					s: "May",
					f: "May"
				},
				5: {
					s: "Jun",
					f: "June"
				},
				6: {
					s: "Jul",
					f: "July"
				},
				7: {
					s: "Aug",
					f: "August"
				},
				8: {
					s: "Sep",
					f: "September"
				},
				9: {
					s: "Oct",
					f: "October"
				},
				10: {
					s: "Nov",
					f: "November"
				},
				11: {
					s: "Dec",
					f: "December"
				},
			}
		}
	};

var Gregory = function (opts, cb) {
	if(typeof opts === "function") {
		cb = opts;
		opts = {};
	}

	var self = this;

	self.$b = $("<div class='gregory'></div>");

	self.modes = {
		day: "day",
		month: "month",
		year: "year"
	};

	self.displayState = {}; // {twelfth: 0..2013, year: 0..2013, month: 0..11, day: 1..31, mode: self.modes.month}
	self.selectedState = {}; // {year: 0..2013, month: 0..11, day: 1..31}
	self.prevFullState = {};
	self.weekStartDay = opts.weekStartDay || defaults.startDay;
	self.messages = opts.messages || defaults.messages;
	self.flip = opts.flip;
	self.cb = cb;

	self.build(opts.popup);

	self.prevFullState.mode = self.modes.day;
};

Gregory.prototype = {
	build: function(popup) {
		var self = this,
			flip = self.flip,
			header = '<div class="gregory-header"><a class="gregory-change gregory-back" href="#"></a><a class="gregory-info" href="#/"></a><a class="gregory-change gregory-forward" href="#"></a></div>',
			b = '<div class="gregory'+ (popup ? " gregory-popup" : "") + (flip ? " gregory-up" : " gregory-down") +'">';

		if(!flip) {
			b += header;
		}

		b += '<div class="gregory-wrapper"></div>';

		if(flip) {
			b += header;
		}

		b += '</div>';

		self.$b = $(b)
			.on("click.gregory", function(e) {
				e.stopPropagation();
			})
			.on("click.gregory", "a.gregory-change", function(e) {
				e.preventDefault();

				var hash = this.hash.split("/"),
					year = parseInt(hash[1], 10),
					month = hash[2] ? parseInt(hash[2], 10) : null;

				var displayState = {};

				displayState.year = year;

				if (month === 0 || month) {
					displayState.month = month;
				}

				self.changeDisplayState(displayState, "dateChange");
			});

		self.$wrapper = self.$b.find(".gregory-wrapper")
			.on("click.gregory", "a", function(e) {
				e.preventDefault();

				var $self = $(this),
					hash = this.hash.split("/"),
					year = parseInt(hash[1], 10),
					month = hash[2] ? parseInt(hash[2], 10) : null,
					day = hash[3] ? parseInt(hash[3], 10) : null;

				self.changeSelectedState({
					year: year,
					month: month,
					day: day
				}, $self);

				self.cb && self.cb( new Date(year, month, day), !!day );
			});

		self.$date = self.$b.find(".gregory-info")
			.on("click.gregory", function(e) {
				e.preventDefault();

				var displayState = {};

				displayState.mode = this.hash.split('/')[1];

				if (displayState.mode === self.modes.day) {
					self.changeSelectedState(self.prevFullState);
				} else {
					if (self.displayState.month === null) {
						displayState.month = self.selectedState.month;
					} else {
						displayState.month = self.displayState.month;
					}

					if (!self.isYearActive(self.displayState.year) && self.displayState.mode === self.modes.month) {
						displayState.year = self.selectedState.year;
					}

					self.changeDisplayState(displayState);
				}
			});

		self.$back = self.$b.find(".gregory-back");
		self.$forward = self.$b.find(".gregory-forward");
	},

	val: function(state) {
		if(state === undefined) {
			var s = this.selectedState;
			return new Date(s.year, s.month, s.day);
		}

		var newState;

		if (state instanceof Date) {
			newState = {
				year: state.getFullYear(),
				month: state.getMonth(),
				day: state.getDate()
			};
		} else {
			newState = state;
		}

		newState.mode = newState.day ? this.modes.day : this.modes.month;

		this.changeDisplayState(newState);
		this.changeSelectedState(newState);
		return this;
	},

	changeDisplayState: function(displayState) {
		var self = this;

		self.setDisplayState(displayState);
		self.generateCalendar();
		self.updateInfo();
	},

	changeSelectedState: function(selectedState, $d) {
		var self = this;

		if (self.displayState.mode === self.modes.day) {
			self.$wrapper.find(".gregory-active").removeClass("gregory-active");

			if (!$d) {
				var selector = "a[href='#/" + selectedState.year + (selectedState.month === 0 || selectedState.month ? ("/" + selectedState.month + (selectedState.day ? "/" + selectedState.day : "")) : "") + "']";

				$d = self.$wrapper.find(selector);
			}

			$d.addClass("gregory-active");
		}

		self.setSelectedState(selectedState);
		self.updatePrevFullState();

		if (!selectedState.mode) {
			if (self.displayState.mode === self.modes.year) {
				selectedState.mode = self.modes.month;
			} else if (self.displayState.mode === self.modes.month) {
				selectedState.mode = self.modes.day;
			}
		}

		self.changeDisplayState(selectedState);
	},
	generateCalendar: function() {
		var self = this;

		if (self.displayState.mode === self.modes.day) {
			self.generateDayCalendar();
		} else if (self.displayState.mode === self.modes.month) {
			self.generateMonthCalendar();
		} else {
			self.generateYearCalendar();
		}
	},
	generateDayCalendar: function() {
		var self = this,
			firstDay = new Date(self.displayState.year, self.displayState.month, 1).getDay(),
			daysInMonth = self.getDaysInMonth(self.displayState.year, self.displayState.month),
			startingDay = self.weekStartDay === "MON" ? (firstDay === 0 ? 6 : firstDay - 1) : firstDay;

		var html = '<ul class="gregory-day">',
			day = 1,
			dateBack = self.decrementMonth(self.displayState.year, self.displayState.month),
			dateFuture = self.incrementMonth(self.displayState.year, self.displayState.month);


		self.setChange(dateBack.year + "/" + dateBack.month, dateFuture.year + "/" + dateFuture.month);

		for (var i = 0; i < 9; i++) {
			for (var j = 0; j <= 6; j++) {
				if (day <= daysInMonth && ((j >= startingDay && i === 0) || i > 0)) {
					html += "<li><a class='" + (self.isDayActive(day) ? "gregory-active" : "") + "' href='#/" + self.displayState.year + "/" + self.displayState.month + "/" + day + "'>" + day + "</a></li>";
					day++;
				} else if (day > daysInMonth) {
					break;
				} else {
					html += "<li></li>";
				}
			}

			if (day > daysInMonth) {
				break;
			}
		}

		html += '</ul>';

		self.$wrapper.html(html);
	},
	generateMonthCalendar: function() {
		var self = this,
			html = '<ul class="gregory-month">',
			month = 0;

		self.setChange(self.displayState.year - 1, self.displayState.year + 1);

		for (var i = 0; i < 4; i++) {
			for (var j = 0; j <= 2; j++) {
				html += "<li><a class='" + (self.isMonthActive(month) ? "gregory-active'" : "") + "' href='#/" + self.displayState.year + "/" + month + "'>" + self.messages.months[month].s + "</a></li>";
				month++;
			}

			if (month > 11) {
				break;
			}
		}

		html += '</ul>';

		self.$wrapper.html(html);
	},
	generateYearCalendar: function() {
		var self = this,
			html = '<ul class="gregory-year">',
			year = self.displayState.twelfth - 11;

		self.setChange(year - 1, self.displayState.twelfth + 12);

		for (var i = 0; i < 4; i++) {
			for (var j = 0; j <= 2; j++) {
				html += "<li><a class='" + (self.isYearActive(year) ? "gregory-active'" : "") + "' href='#/" + year + "'>" + year + "</a></li>";
				year++;
			}

			if (year > self.displayState.twelfth) {
				break;
			}
		}

		html += '</ul>';

		self.$wrapper.html(html);
	},
	setChange: function(back, future) {
		var self = this;

		self.$back.attr("href", "#/" + back);
		self.$forward.attr("href", "#/" + future);
	},
	setDateActive: function() {
		var self = this;

		self.$wrapper.find("a[href='#/" + self.formUrl + "']").addClass("gregory-active");
	},
	decrementMonth: function(year, month) {
		var self = this,
			result = {};

		if (month === 0) {
			result.year = year - 1;
			result.month = 11;
		} else {
			result.year = year;
			result.month = month - 1;
		}

		return result;
	},
	incrementMonth: function(year, month) {
		var self = this,
			result = {};

		if (month === 11) {
			result.year = year + 1;
			result.month = 0;
		} else {
			result.year = year;
			result.month = month + 1;
		}

		return result;
	},
	getDaysInMonth: function(year, month) {
		var self = this;

		if(self.displayState.month === 1 && ((self.displayState.year % 4 === 0 && self.displayState.year % 100 !== 0) || self.displayState.year % 400 === 0)) {
			return 29;
		}
		return daysInMonth[self.displayState.month];
	},

	updateInfo: function() {
		var self = this,
			sds = self.displayState,
			mode;

		if (sds.mode === self.modes.day) {
			self.$date.html(self.messages.months[sds.month].f + " " + sds.year);
		} else if (sds.mode === self.modes.month) {
			self.$date.html(sds.year + " " + self.messages.year);
		} else {
			self.$date.html(self.prevFullState.day + "." + (self.prevFullState.month + 1) + "." + self.prevFullState.year);
		}

		if (sds.mode === self.modes.day) {
			mode = self.modes.month;
		} else if (sds.mode === self.modes.month) {
			mode = self.modes.year;
		} else if (sds.mode === self.modes.year) {
			mode = self.modes.day;
		}

		self.$date.attr("href", "#/" + mode);
	},

	setDisplayState: function(displayState) {
		var self = this,
			sds = self.displayState;

		if (displayState.year) {
			sds.year = displayState.year;
			sds.twelfth = displayState.year;
		}

		if (displayState.month === 0 || displayState.month) {
			sds.month = displayState.month;
		} else {
			sds.month = null;
		}

		if (displayState.mode) {
			sds.mode = displayState.mode;
		}

		if (!sds.mode) {
			sds.mode = displayState.month === 0 || displayState.month ? self.modes.day : self.modes.month;
		}
	},
	setSelectedState: function(selectedState) {
		var ss = this.selectedState;

		ss.year = selectedState.year;
		ss.month = selectedState.month;
		ss.day = selectedState.day ? selectedState.day : null;
	},
	updatePrevFullState: function() {
		var ss = this.selectedState,
			pfs = this.prevFullState;

		if (ss.day && (ss.month || ss.month === 0) && ss.year) {
			pfs.day = ss.day;
			pfs.month = ss.month;
			pfs.year = ss.year;
		}
	},
	isDayActive: function(day) {
		return day === this.selectedState.day && this.displayState.month === this.selectedState.month && this.displayState.year === this.selectedState.year;
	},
	isMonthActive: function(month) {
		return month === this.selectedState.month && this.displayState.year === this.selectedState.year;
	},
	isYearActive: function(year) {
		return year === this.selectedState.year;
	},

	show: function() {
		this.$b.addClass("gregory-hot");
		return this;
	},

	hide: function() {
		this.$b.removeClass("gregory-hot");
		return this;
	},

	toggle: function() {
		this.$b.toggleClass("gregory-hot");
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
		var self = this;

		self.$b.off(".gregory");
		self.$b.remove();
	}
};

Gregory.defaults = function(opts) {
	defaults = opts;
};

exports("ui/gregory", Gregory);
})(window, document);
(function(window, document, undefined){
/*
	Gutenberg - edit like no one has ever edited before
*/

/*jshint
	browser:true,
	strict: false
*/

var $ = require('$'),
	inherits = require('util/inherits'),
	Input = require('ui/input'),
	Gregory = require("ui/gregory"),
	$d = $(document),
	rxDate = /^\d{1,2}.\d{1,2}.\d{4}$/,
	openedCalendar;

var DateInput = function($b, opts, cb) {
	var self = this;

	if(!($b instanceof $)) {
		cb = opts;
		opts = $b;
		$b = undefined;
	}

	if(!opts) {
		opts = {};
	}

	if(!opts.rx) {
		opts.rx = rxDate;
	}

	opts.type = "text";

	Input.call(self, $b, opts);

	self.flip = opts.flip;
	self.cb = cb;

	this.active = false;

	self.gregory = new Gregory({ flip: self.flip, popup: true }, function(date, dateSelected) {
			dateSelected && self.update(date);
		})
		.appendTo(self.$b);

	self.$i.on("click.input", function(e) {
		self.toggle();
	});

	$d.on("click.input", function() {
		self.active && self.hide();
	});

	var val = parseInt(self.$i.val(), 10) * 1000;

	if(val === val) { //checking for NaN
		self.val(val, true);
	} else {
		self.gregory.val(new Date());
	}
};
inherits(DateInput, Input);

DateInput.prototype.val2date = function(val) {
	var result;

	switch(typeof val) {
		case "number":
			result = new Date(val);
			break;
		case "string":
			val = val.split(".");
			result =  new Date(val[2], val[1]-1, val[0]);
			break;
		default:
			result = val;
	}

	return result && result.toString() === "Invalid Date" ? undefined : result;
};

DateInput.prototype.show = function() {
	openedCalendar && openedCalendar.hide();
	openedCalendar = this.gregory.show();
	this.active = true;
	return this;
};

DateInput.prototype.hide = function() {
	openedCalendar = undefined;
	this.gregory.hide();
	this.active = false;
	return this;
};

DateInput.prototype.toggle = function() {
	if(this.active) {
		this.hide();
	} else {
		this.show();
	}
};

DateInput.prototype.formatDate = function(date) {
	return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
};

DateInput.prototype.val = function(val) {
	if(val === undefined) {
		return this.value;
	}

	this.update(val);
	return this;
};

DateInput.prototype.update = function(val, noUpdate) {
	var self = this,

		doUpdate = function(val) {
			self.$b.removeClass(self.err);
			self.gregory.val(val);
			self.value = self.gregory.val();
			self.$i.val( self.formatDate(val) ).trigger("blur");
			!noUpdate && self.cb && self.cb(val);
		};

	val = self.val2date(val);
	if(self.value === undefined && val) {
		doUpdate(val);
	} else if (val && self.value.getTime() !== val.getTime()) {
		doUpdate(val);
	}
};

DateInput.prototype.remove = function() {
	var self = this;

	if(openedCalendar === this.gregory) {
		openedCalendar = undefined;
	}

	self.gregory.remove();
	self.$i.off(".input");
	self.$b.off(".input").remove();
};

exports("ui/gregory/dateinput", DateInput);
})(window, document);
(function(window, document, undefined){
/*jshint
	browser:true,
	strict: false
*/

/*global jQuery*/

var $ = require("$"),
	$w = $(window),
	$b = $("body"),
	$instances = [],

	hideInstances = function() {
		for (var i in $instances) {
			$instances[i].addClass("gutenberg-hidden");
		}
	},

	spliceInstance = function($instance) {
		for (var i in $instances) {
			if ($instance === $instances[i]) {
				$instances.splice(i, 1);
			}
		}
	},

	availableCommands = {
		"bold": {
			icon: "swts-icon-bold",
			command: function(ctx) {
				document.execCommand("bold");
				ctx.onTextEdit(ctx.$b.html());
			}
		},
		"removeFormat": {
			icon: "swts-icon-clean",
			command: function(ctx) {
				document.execCommand("removeFormat");
				ctx.onTextEdit(ctx.$b.html());
			}
		},
		"italic": {
			icon: "swts-icon-italic",
			command: function(ctx) {
				document.execCommand("italic");
				ctx.onTextEdit(ctx.$b.html());
			}
		},
		"link": {
			icon: "swts-icon-link",
			iconUnlink: "swts-icon-unlink",
			additionalInit: function(ctx) {
				ctx.selectionIsLink = function() {
					var result = false,
						sel = window.getSelection();

					if (navigator.userAgent.match(/webkit/i) ? true : false) {
						result = ctx.findNodeWithTags(sel.focusNode, 'A');
					} else if (navigator.userAgent.match(/firefox/i) ? true : false) {
						result = ctx.firefoxSelectionIsLink();
					}

					return result;
				};

				ctx.firefoxSelectionIsLink = function() {
					var sel = window.getSelection(),
						range = ctx.getRange(),
						fragment = range.cloneContents();

					if (fragment.childNodes.length === 1 && fragment.firstChild.tagName === "A") {
						return true;
					}

					return ctx.findNodeWithTags(sel.focusNode, 'A');
				};

				ctx.findNodeWithTags = function(node, tags) {
					if (!$.isArray(tags)) {

						tags = [tags];
					}
					while (node) {
						if (node.nodeType !== 3) {
							var index = tags.indexOf(node.tagName);
							if (index !== -1) {
								return node;
							}
						}

						node = node.parentNode;
					}

					return null;
				};

				ctx.buildLink = function() {
					ctx.$link = ctx.$controlsWrapper.find("a.swts-icon-link");
					ctx.$linkWrapper = $('<li class="gutenberg-hidden"><input type="text" placeholder="Type link here"/></li>');
					ctx.$linkInput = ctx.$linkWrapper.find("input");
					ctx.$link.parent().parent().append(ctx.$linkWrapper);
				};

				ctx.initLinkListeners = function() {
					ctx.$linkInput.on("keypress", function(e) {
						if (e.which === 13) {
							ctx.onLinkEnter();
						}
					});

					ctx.$b.on("mousedown.gutenberg", function(e) {
						ctx.hide(ctx.$linkWrapper, true);

						$(document)
						.one("mousedown.gutenberg", function() {
							ctx.hide(ctx.$linkWrapper, true);
						})
						.one("mouseup.gutenberg", function() {
							if (ctx.clicked && ctx.selectionIsLink()) {
								ctx.$link.removeClass("swts-icon-link").addClass("swts-icon-unlink");
							} else if (ctx.clicked && !ctx.selectionIsLink()) {
								ctx.$link.removeClass("swts-icon-unlink").addClass("swts-icon-link");
							}
						});
					});


				};

				ctx.onLinkEnter = function() {
					var sel = window.getSelection();

					ctx.$linkInput.blur();
					sel.removeAllRanges();
					sel.addRange(ctx.$linkInput.data('selection'));

					document.execCommand("createlink", false, ctx.$linkInput.val());

					ctx.hide(ctx.$linkWrapper, true);
					ctx.$link.removeClass("swts-icon-link").addClass("swts-icon-unlink");

					ctx.onTextEdit(ctx.$b.html());
				};

				ctx.buildLink();
				ctx.initLinkListeners();
			},
			command: function(ctx) {
				if (ctx.selectionIsLink()) {
					document.execCommand("unlink");
					ctx.$link.removeClass("swts-icon-unlink").addClass("swts-icon-link");

					ctx.onTextEdit(ctx.$b.html());
				} else {
					ctx.$linkInput.data('selection', window.getSelection().getRangeAt(0));
					ctx.hide(ctx.$linkWrapper, false);
					ctx.$linkInput.focus();
				}
			}
		}
	};

var Gutenberg = function(selector, opts, cb) {
	var self = this;

	if(typeof opts === "function") {
		cb = opts;
		opts = {};
	}

	self.$b = $(selector);
	self.$controlsWrapper;
	self.$links;
	self.initialVal = self.$b.html();
	self.tempVal;
	self.commands = opts.commands;
	self.onChange = cb;
	self.onChangeDelay = opts.onChangeDelay || 1000;
	self.stopLinks = opts.stopLinks;
	self.typingTimer;

	self.init();
};

Gutenberg.prototype.init = function() {
	var self = this;

	self.$b.attr("contenteditable", true);
	self.buildDOM();
	self.initListeners();
};

Gutenberg.prototype.buildDOM = function() {
	var self = this,
		html;

	if (!self.commands) {
		return;
	}

	self.$controlsWrapper = $('<ul class="gutenberg-ctrl gutenberg-hidden">');

	$b.append(self.$controlsWrapper);
	$instances.push(self.$controlsWrapper);

	for (var i in self.commands) {
		var cmdName = self.commands[i],
			cmdObj = availableCommands[cmdName];

		if (cmdObj) {
			html = '<li><a href="#' + cmdName + '" class="' + cmdObj.icon + '"></a></li>';
			self.$controlsWrapper.append(html);

			cmdObj.additionalInit && cmdObj.additionalInit(self);
		}
	}

	self.$links = self.$controlsWrapper.find("a");
};

Gutenberg.prototype.initListeners = function() {
	var self = this;

	self.$b
		.on("paste.gutenberg", function(e) {
			self.onPaste(this, e);
		})
		.on("keydown.gutenberg", function(e) {
			if (e.which === 27) {
				self.restoreText();
			} else if (e.which === 8) {
				setTimeout(function() {
					self.sanitizeBackspace();
				}, 2);
			}
		})
		.on("keyup.gutenberg", function(e) {
			self.onTextEdit(self.$b.html());
		})
		.on("mousedown.gutenberg", function(e) {
			self.clicked = true;

			e.stopPropagation();

			hideInstances();

			$(document).one("mousedown.gutenberg", function(e) {
				hideInstances();
			}).one("mouseup.gutenberg", function(e) {
				self.onTextSelect(e);
			});
		})
		.on("focus.gutenberg", function(e) {
			self.tempVal = self.$b.html();
		});

	if(self.stopLinks) {
		self.$b.on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
		});
	}

	if (self.$controlsWrapper) {
		self.$controlsWrapper
		.on("mousedown.gutenberg", function(e) {
			e.stopPropagation();
		})
		.on("mouseup.gutenberg", function(e) {
			e.stopPropagation();
		});
		self.$controlsWrapper
		.on("click.gutenberg", "a", function(e) {
			e.preventDefault();
			self.onToolClick(this.href.split("#")[1]);
		});
	}
};

Gutenberg.prototype.onPaste = function(elem, e) {
	var self = this;

	document.execCommand("insertText", false, e.originalEvent.clipboardData.getData('text/plain'));
	e.preventDefault();
	e.stopPropagation();
	self.onTextEdit(self.$b.html());
};

Gutenberg.prototype.sanitizeBackspace = function() {
	var self = this;

	self.$b.find("span").each(function() {
		if (this.style) {
			$(this).contents().unwrap();
		}
	});
};

Gutenberg.prototype.onTextSelect = function(e) {
	var self = this,
		range = self.getRange();

	if (!self.$controlsWrapper || (range.startOffset === range.endOffset) || !self.clicked) {
		return;
	}

	if (self.prevStartOffset === range.startOffset && self.prevEndOffset === range.endOffset) {
		self.hide(self.$controlsWrapper, true);
		return;
	}

	self.hide(self.$controlsWrapper, false);

	var p = self.getSelectionPosition(e);

	self.$controlsWrapper.css({
		left: p.left,
		top: p.top
	});

	self.clicked = true;
	self.prevStartOffset = range.startOffset;
	self.prevEndOffset = range.endOffset;
};

Gutenberg.prototype.onToolClick = function(tool) {
	availableCommands[tool].command(this);
};

Gutenberg.prototype.onTextEdit = function(val) {
	var self = this;

	clearTimeout(self.typingTimer);
	self.typingTimer = setTimeout( function() {
		self.updateContent(val);
	}, self.onChangeDelay);
};

Gutenberg.prototype.updateContent = function(html) {
	if (this.tempVal !== html) {
		this.onChange(html);
		this.tempVal = html;
	}
};

Gutenberg.prototype.restoreText = function() {
	var self = this;

	self.$b.html(self.initialVal);
	self.onTextEdit(self.initialVal);
};

Gutenberg.prototype.val = function(val) {
	this.$b.html(val);
};

Gutenberg.prototype.getRange = function() {
	if (window.getSelection) {
		var sel = window.getSelection();
		if (sel.rangeCount > 0) {
			return sel.getRangeAt(0);
		}
	} else if (document.selection && document.selection.createRange) {
		return document.selection.createRange();
	}
	return null;
};

Gutenberg.prototype.getSelectionPosition = function(e) {
	var self = this,
		rect = self.getRange().getBoundingClientRect(),
		left = e.pageX - self.$controlsWrapper.width() / 2,
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

	if (left < 0) {
		left = 10;
	}

	var top = scrollTop + rect.top - self.$controlsWrapper.height() - 10;

	return {left: left, top: top};
};

Gutenberg.prototype.remove = function() {
	var self = this;

	self.$b.off(".gutenberg");
	self.$b.attr("contenteditable", false);
	self.$controlsWrapper && self.$controlsWrapper.remove();
	spliceInstance(self.$controlsWrapper);
};

Gutenberg.prototype.hide = function($el, hide) {
	var self = this;

	if (hide) {
		$el.addClass("gutenberg-hidden");
	} else {
		$el.removeClass("gutenberg-hidden");
	}
};

exports('ui/gutenberg', Gutenberg);
})(window, document);
(function(window, document, undefined){
/*jshint
    browser:true,
    strict: false
*/

/*global escape*/

var $ = require('$'),
	swts = require('swts'),
	$active;

var Upload = function($b, resource, options) {
	var self = this;

	self.$b = $($b);
	self.$progress = $('<div class="swts-upload-progress"></div>');
	self.delay = options.progressDelay || 500;
	self.resource = resource;
	self.start = options.start;
	self.done = options.done;
	self.progress = options.progress;
	self.maxFiles = options.maxFiles || 1;

	self.$b.on({
		"dragover.upload": function () {
			$active && $active.removeClass("swts-upload-drop");
			$active = self.$b.addClass("swts-upload-drop");
			return false;
		},
		"drop.upload": function (e) {
			e.preventDefault();
			self.$b.removeClass("swts-upload-drop");
			$active = undefined;

			var files = e.originalEvent.dataTransfer.files;

			if(files.length && files.length <= self.maxFiles) {
				self.upload(files, e.target);
			}
		},
		"mouseout.upload": function () {
			self.$b.removeClass("swts-upload-drop");
			$active = undefined;
		}
	});
};

Upload.prototype.upload = function(files, target) {
	var self = this,
		r = {
			resource: "file",
			method: "create",
			body: {resource: self.resource},
			files: files,
			onprogress: function(e) {
				var pc = e.loaded / e.total * 100;
				self.$progress.css("width", pc+"%");
				self.progress && self.progress(e, pc);
			}
		};
	self.$b.append(self.$progress);
	self.startTimeout = setTimeout(function() {
		self.$progress.addClass('uploading');
	}, self.delay);

	self.start && self.start();

	swts.c(r, function(err, result) {
		clearTimeout(self.startTimeout);

		self.$progress.removeClass('uploading');
		setTimeout(function() {
			self.$progress.detach();
		}, self.delay);

		self.done(err, result, target);
	});
};

Upload.prototype.remove = function() {
	var self = this;

	self.$b.off(".upload");
};

exports("ui/upload", Upload);
})(window, document);
(function(window, document, undefined){
/*jshint
    browser:true,
    strict: false
*/

var $ = require('$'),
	Nipple = require('ui/nipple'),
	Input = require('ui/input'),
	Cover = require('ui/cover'),
	Selectah = require('ui/selectah'),
	Gregory = require('ui/gregory'),
	DateInput = require('ui/gregory/dateinput'),
	Gutenberg = require('ui/gutenberg'),
	Upload = require('ui/upload');

$(document).ready(function() {

	Nipple.defaults({
	    items: {
	        "tools": {
	            item: "tools",

	            options: {
	            	title: "Options",
	            	icon: "swts-icon-dots"
	            },

	            remove: {
	                confirm: true,
	                title: "Удалить",
	                icon: "swts-icon-trash"
	            }
	        },

	        "status/draft": {
	            title: "Draft"
	        },

	        "status/published": {
	            title: "Published"
	        }
	    }
	});

	//simple input
	var input = new Input({title: "Title"}, function(val) {
		console.log("Input", val);
	}).appendTo("#input-fields");

	//slug input
	var slug = new Input({title: "Slug", slugify: true}, function(val) {
		console.log("Slug", val);
	}).appendTo("#input-fields");

	//input complex example vimeo id
	var rxVimeoId = /^\d{2,20}$/,
		rxPaste = /^https?:\/\/(?:www\.)?vimeo.com\/(\d+)($|\/)/,
		vimeoId = new Input({
				title: "Vimeo id",
				rx: rxVimeoId,
				onPaste: function(e) {
					var inp = this;
					setTimeout(function () {
						var match = inp.value.match(rxPaste);
						if(match) {
							inp.value = match[1];
						}
					}, 32);
				}
			}, function(val) {
				console.log("Vimeo Id", val);
			}).appendTo("#input-fields");

	//cover
	var cover = new Cover("body");

	//nipple
	var userNipple = new Nipple({
			popup: "e",
			size: "medium",
			menu: true,
			autoHide: true,
			items: {
				"edit": {title: "Edit"},
				"profile": {title: "Username"},
				"logout": {title: "Logout"}
			}
		},{
			edit: function() {
				console.log("Edit mode");
			},

			profile: function() {
				console.log("User profile");
			},

			logout: function() {
				console.log("Logout");
			}
		})
		.addClass("swts-user")
		.appendTo("#nipple");

	var defaultNipple = new Nipple({
			status: function(status) {
				console.log("Nipple status", status);
				this.removeClass("draft published").addClass(status);
			},

			remove: function() {
				console.log("Nipple remove");
			},

			options: function() {
				console.log("Nipple options");
			}
		})
		.val("status/draft")
		.addClass("draft")
		.appendTo("#nipple");

	var optNipple = new Nipple({
			popup: "n",
			items: {
				"slug": {
					item: "input",
					title: "Slug",
					slugify: true
				},

				"title": {
					item: "input",
					title: "Title",
					value: "Item title"
				},
			}
		},{
			slug: function(val) {
				console.log("slug", val);
			},

			title: function(val) {
				console.log("title", val);
			}
		})
		.addClass("swts-options")
		.appendTo("#nipple");

	//selectah
	var singleSelectah = new Selectah([
			{draft: "Draft"},
			{ready: "Ready"},
			{published: "Published"}
		], function(val) {
			console.log("Selectah", val);
		})
		.addClass("simple")
		.appendTo("#selectah");

	var multipleSelectah = new Selectah([
			{app: "Application"},
			{code: "Code"},
			{design: "Design"},
			{photography: "Photography"},
			{web: "Web"}
		], {
			multiple: true,
			keepOrder: true,
			selected: ["app", "design"]
		}, function(val) {
			console.log("Selectah", val);
		})
		.addClass("multi")
		.appendTo("#selectah");

	//gregory
	var gregory = new Gregory(function(date) {
			console.log("Gregory", date);
		})
		.val(new Date())
		.appendTo("#gregory");

	//gregory + date input
	var dateInput = new DateInput({title: "Publication date"}, function(date) {
			console.log("Date input", date);
		})
		.appendTo("#dateinput");

	//gutenberg
	var gutenberg = new Gutenberg("#gutenberg > p", function(text) {
		console.log("Gutenberg", text);
	});

	//upload
	var upload = new Upload("#upload", "sponsor", {
		maxFiles: 1,
		start: function() {
			console.log("Upload start");
		},

		progress: function(e, pc) {
			console.log("Upload progress", pc);
		},

		done: function(err, data, target) {
			console.log("Upload done", err, data, target);
		}
	});

});
})(window, document);
})(window, document);

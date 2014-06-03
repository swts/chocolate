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

	if(!($b instanceof $)) {
		cb = opts;
		opts = $b;
		$b = undefined;
	}

	if(!opts) {
		opts = {};
	}

	self.$b = $b ? $b : $('<label class="swts-input"><input type="'+
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
		.on("keyup.input", function(e) {
			if(self.transform) {
				this.value = self.transform(this.value);
			}
			self.throttledUpdate(this.value);
		});

	self.value = opts.value;
	self.rx = opts.rx;
	self.transform = opts.slugify ? slugify : opts.transform;
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

			if(self.transform) {
				val = self.transform(val);
				self.$i.val(val);
			}

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

var Cover = function(selector) {
	var self = this;

	self.$parent = $(selector);
	self.isLoginVisible = false;

	self.editing = false;
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
				self.choco.create();
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
			.find(".swts-button").on("click.swts.login", function() {
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
				direction: "up",
				size: "medium",
				menu: true,
				autoHide: true,
				items: {
					"edit": {title: "Edit"},
					"profile": user.displayName ? user.displayName : user.id,
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
			userCp = self.ui.user;

		if (userCp) {
			if (self.editing) {
				self.editing = false;
				self.choco.remove();
				userCp.removeClass("swts-editing");
				userCp.items.edit.find('a').text("Edit");
			} else {
				self.choco.create();
				userCp.addClass("swts-editing");
				userCp.items.edit.find('a').text("Stop editing");
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

    self.build(opts.class);
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

	build: function(addClass) {
		var self = this,
			block = '<ul class="selectah'+ (addClass ? ' '+addClass : '') +'">';

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

var $ = require('$'),
	Nipple = require('ui/nipple'),
	Input = require('ui/input'),
	Cover = require('ui/cover'),
	Selectah = require('ui/selectah');

$(document).ready(function() {

//inputs
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
	var cpNipple = new Nipple({
			direction: "right",
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
			direction: "up",
			items: {
				"slug": {
					item: "input",
					title: "Slug",
					slugify: true
				},

				"title": {
					item: "input",
					title: "Title",
					val: "Item title"
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

});
})(window, document);
})(window, document);

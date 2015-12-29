"use strict";
;(function(window, document, undefined, modules) {
	var modules = modules || {};

	var require = function(name) {
		var module = modules[name] || window[name];
		if (!module) {
			throw new Error("Requested module '" + name + "' has not been defined.");
		}
		return module;
	};

	var exports = function(name, module, global) {
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
/*eslint-disable strict */
var extend = function() {
  var args = Array.prototype.slice.call(arguments);
  var deep = false;
  var org = args.shift();

  if (typeof org === 'boolean') {
    deep = org;
    org = args.shift();
  }

  for (var i = 0, c = args.length; i < c; i++) {
    var prop = args[i];
    for (var name in prop) {
      if (deep && typeof prop[name] === 'object' && typeof org[name] !== 'undefined') {
        extend(deep, org[name], prop[name]);
      } else {
        org[name] = prop[name];
      }
    }
  }
  return org;
};

exports('util/extend', extend);
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
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
/*eslint-disable strict */
var exposeToPrototype = [
  'css',
  'addClass',
  'removeClass',
  'toggleClass',
  'appendTo',
  'prependTo',
  'insertBefore',
  'insertAfter'
];

var Bar = function() {};

Bar.prototype = {
  error: function(errorClass) {
    var $b = this.$b.addClass(errorClass || 'ui-error');

    setTimeout(function() {
      $b.removeClass(errorClass || 'ui-error');
    }, 600);
  },

  remove: function(eventNs) {
    if (eventNs) {
      this.$b.off(eventNs);
    }

    this.$b.remove();
    this.$b = undefined;
  }
};

exposeToPrototype.forEach(function(method) {
  Bar.prototype[method] = function() {
    this.$b[method].apply(this.$b, arguments);
    return this;
  };
});

exports('ui/bar', Bar);
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
var $ = require('$');
var inherits = require('util/inherits');
var Bar = require('ui/bar');

var Confirm = function(action, id, cb) {
  var self = this;

  if (cb === undefined) {
    cb = id;
    id = undefined;
  }
  self.confirm = false;

  self.$b = $('<a href="#/' + action + (id ? '/' + id : '') + '" class="swts-button"></a>').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!self.confirm) {
      self.$b.one('mouseout', function() {
        self.$b.removeClass('swts-button-confirm');
        self.confirm = false;
      });
      self.confirm = true;
      self.$b.addClass('swts-button-confirm');
    } else {
      self.$b.removeClass('swts-button-confirm');
      self.confirm = false;
      cb(id);
    }
  });
};
inherits(Confirm, Bar);

Confirm.prototype.remove = function() {
  this.$b.remove();
};

exports('ui/buttons/confirm', Confirm);
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
var $ = require('$');
var Confirm = require('ui/buttons/confirm');

var button = function(action, cb) {
  return $('<a href="#/' + action + '" class="swts-button"></a>').on( 'click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    cb(action);
  });
};

var add = function(id, cb) {
  if (typeof id === 'function') {
    cb = id;
    id = undefined;
  }

  return button('add' + (id ? '/' + id : ''), function(action) {
    cb(action ? action.split('/')[1] : action);
  }).addClass('swts-add swts-icon-plus');
};

var remove = function(id, cb) {
  if (typeof id === 'function') {
    cb = id;
    id = undefined;
  }
  return new Confirm('remove', id, cb).addClass('swts-remove swts-icon-trash');
};

var addTemplate = function(id) {
  return '<a href="#/add' + (id ? '/' + id : '') + '" class="swts-button swts-add swts-icon-plus"></a>';
};

var removeTemplate = function(id) {
  return '<a href="#/remove' + (id ? '/' + id : '') + '" class="swts-button swts-remove swts-icon-trash"></a>';
};

exports('ui/buttons', {
  add: add,
  remove: remove,
  button: button,

  template: {
    add: addTemplate,
    remove: removeTemplate
  }
});
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
var charMap = {
  // latin
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
  // russian
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
  'я': 'ya',
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
  '“': '\'',
  '”': '\'',
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
  '₰': 'PF'
};

var slugify = function(text) {
  return text.toLowerCase().split('').map(function(char) {
    return charMap[char] || char;
  }).join('')
    .replace(' ', '-')
    .replace(/[^-a-z0-9]{1,60}/, '');
};

exports('ui/input/slugify', slugify);
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
var $ = require('$');
var inherits = require('util/inherits');
var Bar = require('ui/bar');

var Input = function($b, opts, cb) {
  var self = this;

  if (!($b instanceof $) && $b !== undefined) {
    cb = opts;
    opts = $b;
    $b = undefined;
  }

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  if (!opts) {
    opts = {};
  }

  self.name = opts.name;
  self.value = opts.value;
  self.rx = opts.rx;

  self.transforms = [];
  self.trim = opts.trim;

  if (opts.slugify) {
    self.transforms.push(require('ui/input/slugify'));
  }
  opts.transform && self.transforms.push(opts.transform);

  self.err = opts.errorClass || 'ui-error';
  self.cb = cb;

  if ($b && $b[0] instanceof HTMLInputElement) {
    $b = $b.parent();
  }

  self.build($b, opts);
};
inherits(Input, Bar);

Input.prototype.build = function($b, opts) {
  var self = this;

  self.$b = $b || $('<label class="input">' +
    '<input type="' + (opts.type || 'text') + '" ' +
    (opts.id ? 'id="' + self.id + '" ' : '') +
    (opts.name ? 'name="' + opts.name + '" ' : '') +
    (opts.value ? 'value="' + opts.value + '" ' : '') +
    '><span>' + opts.title + '</span></label>'
  );

  self.$b.on('click.input', function(e) {
    e.stopPropagation();
  });

  self.$i = self.$b.find('input')
    .on('blur.input', function() {
      if (self.trim) {
        this.value = this.value.trim();
      }
      self.$b.toggleClass('input-val', this.value !== '');
    })
    .trigger('blur')
    .on('keyup.input', function() {
      self
        .transform()
        .throttledUpdate(this.value);
    });

  if (opts.onPaste) {
    self.$i.on('paste', opts.onPaste);
  }
};

Input.prototype.val = function(val, silent) {
  if (val === undefined) {
    return this.$i.val();
  }

  this.$i.val(val).trigger('blur');
  this.transform();
  this.throttledUpdate(val, silent);
  return this;
};

Input.prototype.addTransform = function(fn) {
  this.transforms.push(fn);
  return this;
};

Input.prototype.transform = function() {
  var input = this.$i[0];
  if (this.transforms.length && this.value !== input.value) {
    var start = input.selectionStart;
    var end = input.selectionEnd;
    var val = input.value;

    this.transforms.forEach(function(fn) {
      val = fn(val);
    });

    input.value = val;
    input.setSelectionRange(start, end);
  }

  return this;
};

Input.prototype.focus = function() {
  this.$i.focus();
  return this;
};

Input.prototype.throttledUpdate = function(val, silent) {
  var self = this;

  clearTimeout(self.typingTimer);
  self.typingTimer = setTimeout( function() {
    if (val !== self.value) {
      if (self.rx) {
        if (self.rx.test(val)) {
          self.update(val, silent);
        } else {
          self.$b.addClass(self.err);
        }
      } else {
        self.update(val, silent);
      }
    }
  }, 300);
};

Input.prototype.update = function(val, silent) {
  var self = this;

  self.$b.removeClass(self.err);
  self.value = val;

  !silent && self.cb && self.cb(val);
};

Input.prototype.remove = function() {
  this.$i.off('.input');
  this.$i = undefined;
  Input.super_.prototype.remove.call(this, '.input');
};

exports('ui/input', Input);
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
var $ = require('$');
exports('ui/nipple/item', function($parent, action, opts) {
  return {
    $b: $('<a href="#/' + action + '">' + opts.title + '</a>')
  };
});
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
var Input = require('ui/input');

exports('ui/nipple/input', function($parent, a, opts, cb) {
  return new Input(opts, cb);
});
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
var $ = require('$');

var NippleTools = function($parent, opts) {
  var self = this;
  var toolsNum = 0;
  var b = '';

  for (var t in opts) {
    if (t !== 'item') {
      var tool = opts[t];
      toolsNum++;
      b += '<a href="#/' + (tool.confirm ? 'confirm/' : '') + t + '" class="' + tool.icon + '" ' + (tool.title ? 'title="' + tool.title + '"' : '') + '></a>';
    }
  }

  self.active = undefined;
  self.confirm = undefined;

  self.$b = $(b)
  .hover(function() {
    self.active = this.hash.split('/')[1];
    self.$parent.addClass('nipple-h-' + self.active);
    self.$b.not(this).addClass('nipple-hidden');
  }, function() {
    self.$parent.removeClass('nipple-h-' + self.active);
    self.$b.removeClass('nipple-hidden');
  });

  self.$parent = $parent
    .addClass('nipple-i-tools-' + toolsNum)
    .on('mouseout.nipple-confirm', function() {
      self.hideConfirm();
    })
    .on('click.nipple-confirm', 'a', function(e) {
      if (self.confirm && self.$parent.hasClass('nipple-confirmation')) {
        setTimeout(function() {
          self.hideConfirm();
        }, 0);
      } else if (this.hash.substring(0, 9) === '#/confirm' ) {
        e.preventDefault();
        e.stopPropagation();
        self.showConfirm(this);
      }
    });
};

NippleTools.prototype = {
  showConfirm: function(el) {
    this.$confirm = $(el);
    this.$parent.addClass('nipple-confirmation');
    this.confirm = this.$confirm.attr('href').slice(9);
    this.$confirm.attr('href', '#' + this.confirm);
  },

  hideConfirm: function() {
    if (this.confirm) {
      this.$confirm.attr('href', '#/confirm' + this.confirm);
      this.$parent.removeClass('nipple-confirmation');
      this.confirm = undefined;
    }
  },

  remove: function() {
    this.$parent.off('.nipple-confirm');
  }
};

exports('ui/nipple/tools', function($parent, a, opts) {
  return new NippleTools($parent, opts);
});
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
var $ = require('$');

var NippleToggle = function($parent, a, opts, cb) {
  var self = this;

  self.state = opts.state !== undefined ? opts.state : false;
  self.title = opts.title;
  self.cb = cb;
  self.$b = $('<a href="#/toggle/' + a + '"' + (opts.class ? ' class="' + opts.class + '"' : '') + ' title="' + opts.title[self.state] + '">' + opts.title[self.state] + '</a>')
    .on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.toggle();
    });

  self.$parent = $parent.addClass( 'nipple-state-' + (self.state ? 'on' : 'off') );
};

NippleToggle.prototype = {
  val: function(state) {
    if (state !== undefined) {
      if (state !== this.state) {
        var self = this;
        var title = self.title[ (state ? 'on' : 'off') ];
        self.$b.text(title).attr('title', title);
        self.$parent.removeClass( 'nipple-state-' + (self.state ? 'on' : 'off') ).addClass('nipple-state-' + (state ? 'on' : 'off'));
        self.state = state;
      }
    } else {
      return this.state;
    }
  },

  toggle: function() {
    this.val(!this.state);
    this.cb(this.state);
  }
};

exports('ui/nipple/toggle', function($parent, a, opts, cb) {
  return new NippleToggle($parent, a, opts, cb);
});
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
var $ = require('$');
var inherits = require('util/inherits');
var Bar = require('ui/bar');

var openedNipple;
var defaults;

$(document).on('click.nipple', function() {
  openedNipple && openedNipple.hide();
});

var Nipple = function(opts, cbs) {
  var self = this;

  if (cbs === undefined) {
    cbs = opts;
    opts = {};
  }

  self._popup = opts.popup || defaults.popup || 's';
  self.autoHide = opts.autoHide || defaults.autoHide;
  self.menu = opts.menu || defaults.menu;
  self.willOpen = opts.willOpen;
  self.cbs = cbs;
  self.items = {};

  self.active = false;
  self.build(opts.items || defaults.items, opts.size || defaults.size || 'small');
};
inherits(Nipple, Bar);

Nipple.prototype.build = function(items, size) {
  var self = this;
  var cbs = self.cbs;

  var $ul = $('<ul class="nipple-items"></ul>')
    .on('click.nipple', 'a', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var args = this.hash.split('/');

      if (self.autoHide) {
        self.hide();
      }

      if (!self.menu && $(this).parent().hasClass('nipple-i-item') ) {
        self.val(this.hash.slice(2));
      }

      cbs[args[1]] && cbs[args[1]].apply(self, args.slice(2));
    });

  for (var i in items) {
    var newItem;
    var item = items[i];
    var type = item.item || 'item';
    var $li = $('<li class="nipple-i-' + type + '"></li>');

    newItem = self.getItem(type)($li, i, items[i], cbs[i] && cbs[i].bind(self));
    $li.append(newItem.$b);
    $ul.append($li);
    self.items[i] = newItem;
  }

  self.$b = $('<div class="nipple nipple-' + size + ' nipple-' + self._popup + '"><a href="#nipple-open"></a></div>')
    .append($ul);

  self.$a = self.$b.children('a').on('click.nipple', function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!self.active && self.willOpen && !self.willOpen()) {
      return;
    }

    self.toggle();
  });

  self.$items = self.$b.find('.nipple-i-item');
};

Nipple.prototype.getItem = function(type) {
  return require('ui/nipple/' + type);
};

Nipple.prototype.val = function(val) {
  if (val === undefined) {
    return this._val;
  }

  if (this._val !== val) {
    if (!this.menu) {
      this.$items
        .find('[href="#/' + this._val + '"]')
          .parent()
            .removeClass('nipple-selected')
            .end()
          .end()
        .find('[href="#/' + val + '"]')
          .parent()
          .addClass('nipple-selected');
    }

    this._val = val;
  }
  return this;
};

Nipple.prototype.direction = function(dir) {
  if (dir === undefined) {
    return this._popup;
  }

  if (this._popup !== dir) {
    this.$b.removeClass('nipple-' + this._popup)
      .addClass('nipple-' + dir);
    this._popup = dir;
  }

  return this;
};

Nipple.prototype.confirm = function(tool) {
  var self = this;

  if (self.confirmTool !== tool) {
    self.$confirm
      .attr('href', '#/confirm/' + tool)
      .addClass('nipple-hot');
  } else {
    self.cbs[tool].apply(self, arguments.slice(1));
    self.hideConfirm();
  }
};

Nipple.prototype.hideConfirm = function() {
  this.confirmTool = undefined;
  this.$confirm.removeClass('nipple-hot');
};

Nipple.prototype.toggle = function() {
  if (this.active) {
    this.hide();
  } else {
    this.show();
  }
};

Nipple.prototype.show = function() {
  openedNipple && openedNipple.hide();
  openedNipple = this;
  this.$b.addClass('nipple-hot');
  this.active = true;
  return this;
};

Nipple.prototype.hide = function() {
  openedNipple = undefined;
  this.$b.removeClass('nipple-hot');
  this.active = false;
  return this;
};

Nipple.prototype.remove = function() {
  if (openedNipple === this) {
    openedNipple = undefined;
  }

  this.$a.off('.nipple');
  this.$a = undefined;
  Nipple.super_.prototype.remove.call(this);
};

Nipple.defaults = function(opts) {
  defaults = opts;
};

exports('ui/nipple', Nipple);
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
var $ = require('$');
var swts = require('swts');
var inherits = require('util/inherits');

var Bar = require('ui/bar');
var Nipple = require('ui/nipple');
var Input = require('ui/input');

var loginTepmlate = '<div class="swts-cover-login">' +
    '<label class="input" for="swts-cover-email"><input id="swts-cover-email" type="text"><span>Email</span></label>' +
    '<label class="input" for="swts-cover-password"><input id="swts-cover-password" type="password"><span>Password</span></label>' +
    '<a href="#/login" class="swts-button-m">Go</a>' +
  '</div>';

var $w = $(window);

var Cover = function(opts) {
  var self = this;

  if (!opts) {
    opts = {};
  }

  self.$parent = $(opts.parent || 'body');
  self.isLoginVisible = false;

  self.editing = false;
  self.popup = opts.popup || 'n';
  self.profile = opts.profile;
  self.ui = {};

  if (swts.u && swts.u.isStaff()) {
    self.showUser(swts.u);
  } else {
    self.buildLogin();
  }
};
inherits(Cover, Bar);

Cover.prototype.load = function() {
  var self = this;

  swts.load('/static/js/chocolate.js', function(err) {
    if (err) {
      return;
    }

    var Chocolate = require('chocolate');
    self.choco = new Chocolate();
    self.edit();
  });
};


Cover.prototype.buildLogin = function() {
  var self = this;

  self.$l = $(loginTepmlate)
    .appendTo(self.$parent)
    .on('click.swts.login', function(e) {
      e.stopPropagation();
    })
    .on('keypress.swts.login', function(e) {
      if (e.keyCode === 13) {
        self.login();
      }
    })
    .find('.swts-button-m').on('click.swts.login', function(e) {
      e.preventDefault();
      self.login();
    })
    .end();

  self.ui.login = new Input(self.$l.find('#swts-cover-email'));
  self.ui.password = new Input(self.$l.find('#swts-cover-password'));

  $w.on({
    'keydown.swts.login': function(e) {
      if (self.isLoginVisible) {
        if (e.keyCode === 27) {
          e.preventDefault();
          self.hideLogin();
        }
      } else if (e.altKey && e.ctrlKey && (e.keyCode === 99 || e.keyCode === 67) ) {
        e.preventDefault();
        self.showLogin();
      }
    },

    'click.swts.login': function() {
      self.isLoginVisible && self.hideLogin();
    }
  });
};

Cover.prototype.showLogin = function() {
  this.isLoginVisible = true;
  this.$l.addClass('active');
  this.ui.login.focus();
};

Cover.prototype.hideLogin = function() {
  this.$l.removeClass('active');

  this.ui.login.val('');
  this.ui.password.val('');
  this.isLoginVisible = false;
};

Cover.prototype.removeLogin = function() {
  var self = this;
  self.hideLogin();
  $w.off('.swts.login');

  setTimeout(function() {
    self.$l.remove();
    self.ui.login = undefined;
    self.ui.password = undefined;
  }, 650);
};

Cover.prototype.login = function() {
  var self = this;
  var ui = self.ui;

  swts.userLogin(ui.login.val(), ui.password.val(), function(err, user) {
    if (err) {
      self.error();
    } else if ( user.isStaff()) {
      self.removeLogin();
      self.showUser(user);
    }
  });
};

Cover.prototype.error = function() {
  var self = this;
  self.$l.addClass('ui-error');
  setTimeout(function() {
    self.$l.removeClass('ui-error');
  }, 500);
};

Cover.prototype.showUser = function(user) {
  if (!user) {
    return;
  }

  if (typeof user.get === 'function') {
    user = user.data;
  }

  var self = this;
  self.ui.user = new Nipple({
    popup: self.popup,
    size: 'medium',
    menu: true,
    autoHide: true,
    items: {
      'edit': { title: 'Edit' },
      'profile': { title: user.name || user.email },
      'logout': { title: 'Logout' }
    }
  }, {
    edit: self.edit.bind(self),
    logout: self.logout.bind(self),
    profile: function() {
      self.profile && self.profile(user);
    }
  })
  .addClass('swts-user')
  .appendTo(self.$parent);
};

Cover.prototype.edit = function() {
  var self = this;
  var cp = self.ui.user;

  if (self.choco) {
    if (self.editing) {
      self.editing = false;
      self.choco.off();
      cp.removeClass('swts-editing')
        .items.edit.$b.text('Edit');
    } else {
      self.choco.on();
      cp.addClass('swts-editing')
        .items.edit.$b.text('Stop editing');
      self.editing = true;
    }
  } else {
    self.load();
  }
};

Cover.prototype.logout = function() {
  swts.userLogout();
  this.ui.user.remove();
  this.ui = {};
  this.buildLogin();
};

exports('ui/cover', Cover);
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
var $ = require('$');
var inherits = require('util/inherits');
var Bar = require('ui/bar');

var rxChild = /(\/)/g;

var Selectah = function(items, opts, cb) {
  var self = this;

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  self.keepOrder = opts.keepOrder;
  self.isMultiple = opts.multiple;
  self.selected = opts.selected || (self.isMultiple ? [] : '');
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
  var self = this;
  var b = '';
  var selected = self.selected;
  var isSelected = (selected && selected.length);

  for (var i = 0, l = items.length; i < l; i++) {
    var activeClass = '';
    var item = items[i];
    var value = Object.keys(item)[0];

    self.order.push(value);
    if (isSelected) {
      if (value === selected || (self.isMultiple && selected.indexOf(value) !== -1)) {
        activeClass = ' selectah-active';
      }
    } else if (i === 0) {
      activeClass = ' selectah-active';
    }

    var match = value.match(rxChild);
    b += '<li class="selectah-level-' + (match ? match.length : 0) + activeClass + '"><a href="#:' + value + '">' + item[value] + '</a></li>';
  }
  return b;
};

Selectah.prototype.build = function() {
  var self = this;
  var block = '<ul class="selectah">';

  block += self.buildItems(self.items);
  block += '</ul>';

  self.$b = $(block).on('click.selectah', 'a', function(e) {
    e.preventDefault();
    e.stopPropagation();
    self.check(this);
  });

  self.$li = self.$b.find('li');
};

Selectah.prototype.pushInOrder = function(slug) {
  var self = this;
  var items = self.order;
  var selected = self.selected;

  slug = slug.split('/');
  while (slug.length) {
    var val = slug.join('/');
    selected.push(val);
    this.$b.find('a[href="#:' + val + '"]')
      .parent().addClass('selectah-active');
    slug.pop();
  }

  self.selected = [];

  for (var i in items) {
    if (selected.indexOf(items[i]) !== -1) {
      self.selected.push(items[i]);
    }
  }
};

Selectah.prototype.set = function(val) {
  var self = this;

  self.selected = val;
  self.$b.addClass('no-transition');
  self.$li.removeClass('selectah-active');
  self.$b.find('a[href="#:' + val + '"]')
      .parent()
      .addClass('selectah-active');

  setTimeout(function() {
    self.$b.removeClass('no-transition');
  }, 10);
  return this;
};

Selectah.prototype.val = function(val) {
  if (val === undefined) {
    return this.selected;
  }

  this.check( this.$b.find('a[href="#:' + val + '"]' )[0]);
  return this;
};

Selectah.prototype.check = function(el) {
  var self = this;
  var slug = el.hash.split(':')[1];
  var $parent = $(el).parent();

  if ($parent.hasClass('selectah-active')) {
    self.deactivate($parent, slug);
  } else {
    self.activate($parent, slug);
  }
};

Selectah.prototype.activate = function($parent, slug) {
  var self = this;

  if (!self.isMultiple) {
    self.$li.removeClass('selectah-active');
    self.selected = slug;
  } else if (self.keepOrder) {
    self.pushInOrder(slug);
  } else {
    self.selected.push(slug);
  }

  $parent.addClass('selectah-active');
  self.cb && self.cb(self.selected);
};

Selectah.prototype.deactivate = function($parent, slug) {
  var self = this;

  if (self.isMultiple && self.selected.length > 1) {
    $parent.removeClass('selectah-active');

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
  Selectah.super_.prototype.remove.call(this, '.selectah');
};

exports('ui/selectah', Selectah);
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
var $ = require('$');
var inherits = require('util/inherits');
var Bar = require('ui/bar');

var daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
var defaults = {
  startDay: 'MON',
  messages: {
    year: '',
    months: {
      0: {
        s: 'Jan',
        f: 'January'
      },
      1: {
        s: 'Feb',
        f: 'February'
      },
      2: {
        s: 'Mar',
        f: 'March'
      },
      3: {
        s: 'Apr',
        f: 'April'
      },
      4: {
        s: 'May',
        f: 'May'
      },
      5: {
        s: 'Jun',
        f: 'June'
      },
      6: {
        s: 'Jul',
        f: 'July'
      },
      7: {
        s: 'Aug',
        f: 'August'
      },
      8: {
        s: 'Sep',
        f: 'September'
      },
      9: {
        s: 'Oct',
        f: 'October'
      },
      10: {
        s: 'Nov',
        f: 'November'
      },
      11: {
        s: 'Dec',
        f: 'December'
      }
    }
  }
};

var Gregory = function(opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  var self = this;

  self.$b = $('<div class="gregory"></div>');

  self.modes = {
    day: 'day',
    month: 'month',
    year: 'year'
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
inherits(Gregory, Bar);

Gregory.prototype.build = function(popup) {
  var self = this;
  var flip = self.flip;
  var header = '<div class="gregory-header"><a class="gregory-change gregory-back" href="#"></a><a class="gregory-info" href="#/"></a><a class="gregory-change gregory-forward" href="#"></a></div>';
  var b = '<div class="gregory' + (popup ? ' gregory-popup' : '') + (flip ? ' gregory-up' : ' gregory-down') + '">';

  if (!flip) {
    b += header;
  }

  b += '<div class="gregory-wrapper"></div>';

  if (flip) {
    b += header;
  }

  b += '</div>';

  self.$b = $(b)
    .on('click.gregory', function(e) {
      e.stopPropagation();
    })
    .on('click.gregory', 'a.gregory-change', function(e) {
      e.preventDefault();

      var hash = this.hash.split('/');
      var year = parseInt(hash[1], 10);
      var month = hash[2] ? parseInt(hash[2], 10) : null;

      var displayState = {};

      displayState.year = year;

      if (month === 0 || month) {
        displayState.month = month;
      }

      self.changeState(displayState, 'dateChange');
    });

  self.$wrapper = self.$b.find('.gregory-wrapper')
    .on('click.gregory', 'a', function(e) {
      e.preventDefault();

      var $self = $(this);
      var hash = this.hash.split('/');
      var year = parseInt(hash[1], 10);
      var month = hash[2] ? parseInt(hash[2], 10) : null;
      var day = hash[3] ? parseInt(hash[3], 10) : null;

      self.changeSelectedState({
        year: year,
        month: month,
        day: day
      }, $self);

      self.cb && self.cb( new Date(year, month, day), !!day );
    });

  self.$date = self.$b.find('.gregory-info')
    .on('click.gregory', function(e) {
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

        self.changeState(displayState);
      }
    });

  self.$back = self.$b.find('.gregory-back');
  self.$forward = self.$b.find('.gregory-forward');
};

Gregory.prototype.val = function(state) {
  if (state === undefined) {
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

  this.changeState(newState);
  this.changeSelectedState(newState);
  return this;
};

Gregory.prototype.changeState = function(displayState) {
  var self = this;

  self.setState(displayState);
  self.buildCalendar();
  self.updateInfo();
};

Gregory.prototype.changeSelectedState = function(selectedState, $d) {
  var self = this;

  if (self.displayState.mode === self.modes.day) {
    self.$wrapper.find('.gregory-active').removeClass('gregory-active');

    if (!$d) {
      var selector = 'a[href="#/' + selectedState.year + (selectedState.month === 0 || selectedState.month ? ('/' + selectedState.month + (selectedState.day ? '/' + selectedState.day : '')) : '') + '"]';

      $d = self.$wrapper.find(selector);
    }

    $d.addClass('gregory-active');
  }

  self.setSelected(selectedState);
  self.updatePrevFullState();

  if (!selectedState.mode) {
    if (self.displayState.mode === self.modes.year) {
      selectedState.mode = self.modes.month;
    } else if (self.displayState.mode === self.modes.month) {
      selectedState.mode = self.modes.day;
    }
  }

  self.changeState(selectedState);
};

Gregory.prototype.buildCalendar = function() {
  var self = this;

  if (self.displayState.mode === self.modes.day) {
    self.buildDays();
  } else if (self.displayState.mode === self.modes.month) {
    self.buildMonths();
  } else {
    self.buildYears();
  }
};

Gregory.prototype.buildDays = function() {
  var self = this;
  var firstDay = new Date(self.displayState.year, self.displayState.month, 1).getDay();
  var daysInMonth = self.getDaysInMonth(self.displayState.year, self.displayState.month);
  var startingDay = self.weekStartDay === 'MON' ? (firstDay === 0 ? 6 : firstDay - 1) : firstDay;

  var html = '<ul class="gregory-day">';
  var day = 1;
  var dateBack = self.prevMonth(self.displayState.year, self.displayState.month);
  var dateFuture = self.nextMonth(self.displayState.year, self.displayState.month);

  self.setChange(dateBack.year + '/' + dateBack.month, dateFuture.year + '/' + dateFuture.month);

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j <= 6; j++) {
      if (day <= daysInMonth && ((j >= startingDay && i === 0) || i > 0)) {
        html += '<li><a class="' + (self.isDayActive(day) ? 'gregory-active' : '') + '" href="#/' + self.displayState.year + '/' + self.displayState.month + '/' + day + '">' + day + '</a></li>';
        day++;
      } else if (day > daysInMonth) {
        break;
      } else {
        html += '<li></li>';
      }
    }

    if (day > daysInMonth) {
      break;
    }
  }

  html += '</ul>';

  self.$wrapper.html(html);
};

Gregory.prototype.buildMonths = function() {
  var self = this;
  var html = '<ul class="gregory-month">';
  var month = 0;

  self.setChange(self.displayState.year - 1, self.displayState.year + 1);

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j <= 2; j++) {
      html += '<li><a class="' + (self.isMonthActive(month) ? 'gregory-active' : '') + '" href="#/' + self.displayState.year + '/' + month + '">' + self.messages.months[month].s + '</a></li>';
      month++;
    }

    if (month > 11) {
      break;
    }
  }

  html += '</ul>';

  self.$wrapper.html(html);
};

Gregory.prototype.buildYears = function() {
  var self = this;
  var html = '<ul class="gregory-year">';
  var year = self.displayState.twelfth - 11;

  self.setChange(year - 1, self.displayState.twelfth + 12);

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j <= 2; j++) {
      html += '<li><a class="' + (self.isYearActive(year) ? 'gregory-active' : '') + '" href="#/' + year + '">' + year + '</a></li>';
      year++;
    }

    if (year > self.displayState.twelfth) {
      break;
    }
  }

  html += '</ul>';

  self.$wrapper.html(html);
};

Gregory.prototype.setChange = function(back, future) {
  var self = this;

  self.$back.attr('href', '#/' + back);
  self.$forward.attr('href', '#/' + future);
};

Gregory.prototype.setDateActive = function() {
  this.$wrapper.find('a[href="#/' + this.formUrl + '"]').addClass('gregory-active');
};

Gregory.prototype.prevMonth = function(year, month) {
  var result = {};

  if (month === 0) {
    result.year = year - 1;
    result.month = 11;
  } else {
    result.year = year;
    result.month = month - 1;
  }

  return result;
};

Gregory.prototype.nextMonth = function(year, month) {
  var result = {};

  if (month === 11) {
    result.year = year + 1;
    result.month = 0;
  } else {
    result.year = year;
    result.month = month + 1;
  }

  return result;
};

Gregory.prototype.getDaysInMonth = function(year, month) {
  if (month === 1 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
    return 29;
  }
  return daysInMonth[month];
};

Gregory.prototype.updateInfo = function() {
  var self = this;
  var sds = self.displayState;
  var mode;

  if (sds.mode === self.modes.day) {
    self.$date.html(self.messages.months[sds.month].f + ' ' + sds.year);
  } else if (sds.mode === self.modes.month) {
    self.$date.html(sds.year + ' ' + self.messages.year);
  } else {
    self.$date.html(self.prevFullState.day + '.' + (self.prevFullState.month + 1) + '.' + self.prevFullState.year);
  }

  if (sds.mode === self.modes.day) {
    mode = self.modes.month;
  } else if (sds.mode === self.modes.month) {
    mode = self.modes.year;
  } else if (sds.mode === self.modes.year) {
    mode = self.modes.day;
  }

  self.$date.attr('href', '#/' + mode);
};

Gregory.prototype.setState = function(displayState) {
  var self = this;
  var sds = self.displayState;

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
};

Gregory.prototype.setSelected = function(selectedState) {
  var ss = this.selectedState;

  ss.year = selectedState.year;
  ss.month = selectedState.month;
  ss.day = selectedState.day ? selectedState.day : null;
};

Gregory.prototype.updatePrevFullState = function() {
  var ss = this.selectedState;
  var pfs = this.prevFullState;

  if (ss.day && (ss.month || ss.month === 0) && ss.year) {
    pfs.day = ss.day;
    pfs.month = ss.month;
    pfs.year = ss.year;
  }
};

Gregory.prototype.isDayActive = function(day) {
  return day === this.selectedState.day && this.displayState.month === this.selectedState.month && this.displayState.year === this.selectedState.year;
};

Gregory.prototype.isMonthActive = function(month) {
  return month === this.selectedState.month && this.displayState.year === this.selectedState.year;
};

Gregory.prototype.isYearActive = function(year) {
  return year === this.selectedState.year;
};

Gregory.prototype.show = function() {
  this.$b.addClass('gregory-hot');
  return this;
};

Gregory.prototype.hide = function() {
  this.$b.removeClass('gregory-hot');
  return this;
};

Gregory.prototype.toggle = function() {
  this.$b.toggleClass('gregory-hot');
  return this;
};

Gregory.prototype.remove = function() {
  var self = this;

  self.$b.off('.gregory');
  self.$b.remove();
  self.$b = undefined;

  self.$wrapper.off('.gregory');
  self.$wrapper = undefined;

  self.$date.off('.gregory');
  self.$date = undefined;

  self.$back = undefined;
  self.$forward = undefined;
};

Gregory.defaults = function(opts) {
  defaults = opts;
};

exports('ui/gregory', Gregory);
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
var $ = require('$');
var inherits = require('util/inherits');
var Input = require('ui/input');
var Gregory = require('ui/gregory');

var $d = $(document);
var rxDate = /^\d{1,2}.\d{1,2}.\d{4}$/;
var openedCalendar;

var DateInput = function($b, opts, cb) {
  var self = this;

  if (!($b instanceof $)) {
    cb = opts;
    opts = $b;
    $b = undefined;
  }

  if (!opts) {
    opts = {};
  }

  if (!opts.rx) {
    opts.rx = rxDate;
  }

  opts.type = 'text';

  Input.call(self, $b, opts);

  self.flip = opts.flip;
  self.cb = cb;

  this.active = false;

  self.gregory = new Gregory({ flip: self.flip, popup: true }, function(date, dateSelected) {
    dateSelected && self.update(date);
  })
  .appendTo(self.$b);

  self.$i.on('click.input', function() {
    self.toggle();
  });

  $d.on('click.input', function() {
    self.active && self.hide();
  });

  var val = parseInt(self.$i.val(), 10);
  self.value = undefined;

  if (val === val) { //checking for NaN
    self.update(val, true);
  } else {
    self.gregory.val(new Date());
  }
};
inherits(DateInput, Input);

DateInput.prototype.val2date = function(val) {
  var result;

  switch (typeof val) {
    case 'number':
      result = new Date(val);
      break;
    case 'string':
      val = val.split('.');
      result = new Date(val[2], val[1] - 1, val[0]);
      break;
    default:
      result = val;
  }

  return result && result.toString() === 'Invalid Date' ? undefined : result;
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
  if (this.active) {
    this.hide();
  } else {
    this.show();
  }
};

DateInput.prototype.formatDate = function(date) {
  return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
};

DateInput.prototype.val = function(val) {
  if (val === undefined) {
    return this.value;
  }

  this.update(val);
  return this;
};

DateInput.prototype.update = function(val, noUpdate) {
  var self = this;

  val = self.val2date(val);
  if ( (self.value === undefined && val) || (val && self.value.getTime() !== val.getTime()) ) {
    self.$b.removeClass(self.err);
    self.gregory.val(val);
    self.value = self.gregory.val();
    self.$i.val( self.formatDate(val) ).trigger('blur');
    !noUpdate && self.cb && self.cb(val);
  }
};

DateInput.prototype.remove = function() {
  var self = this;

  if (openedCalendar === this.gregory) {
    openedCalendar = undefined;
  }

  self.gregory.remove();
  self.$i.off('.input');
  self.$b.off('.input').remove();

  self.$b = undefined;
  self.$i = undefined;
};

exports('ui/gregory/dateinput', DateInput);
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
	rxNoTags = /<[^>]*>/ig,

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

	getRange = function() {
		var range;

		if (window.getSelection) {
	        var sel = window.getSelection();
	        if (sel.rangeCount) {
	            range = sel.getRangeAt(0);
	        }
	    } else if (document.selection && document.selection.createRange) {
	        range = document.selection.createRange();
	    }

	    return range;
	},

	wrapWithTag = function(tag) {
	    var range = getRange(),
	    	newNode = document.createElement(tag);

	    range.surroundContents(newNode);
	},

	availableCommands = {
		"orderedList": {
			icon: "swts-icon-ol",
			command: function(ctx) {
				// body...
			}
		},
		"bold": {
			icon: "swts-icon-bold",
			command: function(ctx) {
				wrapWithTag("strong");
				ctx.onTextEdit(ctx.$b.html());
			}
		},
		"italic": {
			icon: "swts-icon-italic",
			command: function(ctx) {
				wrapWithTag("em");
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
	self.initialVal = self.$b.html();
	self.curVal;
	self.commands = opts.commands;
	self.onChange = cb;
	self.onChangeDelay = opts.onChangeDelay || 500;
	self.stopLinks = opts.stopLinks;
	self.allowNewLine = opts.allowNewLine;
	self.allowTags = self.allowNewLine ? true : opts.allowTags;
	self.typingTimer;
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
	$instances.push(self.$controlsWrapper);
	$b.append(self.$controlsWrapper);
};

Gutenberg.prototype.initListeners = function() {
	var self = this;

	self.$b
		.on("paste.gutenberg", function(e) {
			self.onPaste(this, e);
		})
		.on("keydown.gutenberg", function(e) {
			switch(e.which) {
				case 8:
					setTimeout(function() {
						self.sanitizeBackspace();
					}, 0);
					break;

				case 13:
					!self.allowNewLine && e.preventDefault();
					break;

				case 27:
					self.restoreText();
					break;
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
			self.curVal = self.$b.html();
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
	document.execCommand("insertText", false, e.originalEvent.clipboardData.getData('text/plain'));
	e.preventDefault();
	e.stopPropagation();
	this.onTextEdit(this.$b.html());
};

Gutenberg.prototype.sanitizeBackspace = function() {
	this.$b.find("span").each(function() {
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
	if(!this.allowTags) {
		html = html.replace(rxNoTags, "");
	}

	if (this.curVal !== html) {
		this.onChange(html);
		this.curVal = html;
	}
};

Gutenberg.prototype.restoreText = function() {
	this.$b.html(this.initialVal);
	this.onTextEdit(this.initialVal);
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
/*eslint-disable strict */
var $ = require('$');
var swts = require('swts');
var inherits = require('util/inherits');
var Bar = require('ui/bar');

var $active;

var Upload = function($b, opts) {
  var self = this;

  self.$b = $($b);
  self.$progress = $('<div class="upload-progress"></div>');
  self.job = opts.job;
  self.resource = opts.resource || 'file';
  self.delay = opts.progressDelay || 500;
  self.start = opts.start;
  self.done = opts.done;
  self.progress = opts.progress;
  self.mouseover = opts.mouseover;
  self.mouseout = opts.mouseout;
  self.maxFiles = opts.maxFiles || 1;
  self.accept = opts.accept;
  self.uploading = false;

  self.$b.on({
    'dragover.upload': function(e) {
      self.ondragover(e);
    },
    'drop.upload': function(e) {
      self.ondrop(e);
    },
    'mouseout.upload': function(e) {
      self.onmouseout(e);
    }
  });
};
inherits(Upload, Bar);

Upload.prototype.ondragover = function(e) {
  e.preventDefault();
  $active && $active.removeClass('upload-drop');
  $active = this.$b.addClass('upload-drop');
  this.mouseover && this.mouseover();
};

Upload.prototype.ondrop = function(e) {
  e.preventDefault();
  var self = this;
  self.$b.removeClass('upload-drop');
  $active = undefined;

  if (self.r) {
    return this.done(new Error('Upload in progress'));
  }

  var files = e.originalEvent.dataTransfer.files;
  if (files.length && files.length <= self.maxFiles) {
    if (self.accept) {
      self.test(files, e.target);
    } else {
      self.upload(files, e.target);
    }
  }
  self.mouseout && self.mouseout();
};

Upload.prototype.onmouseout = function() {
  this.$b.removeClass('upload-drop');
  this.mouseout && this.mouseout();
  $active = undefined;
};

Upload.prototype.test = function(files, target) {
  var ok = true;
  for (var i = 0, l = files.length; i < l; i++ ) {
    if (!this.accept.test(files[i].name)) {
      ok = false;
      break;
    }
  }

  if (ok) {
    this.upload(files, target);
  } else {
    this.done(new Error('Not acceptable'));
  }
};

Upload.prototype.upload = function(files, target) {
  var self = this;
  var r = {
    resource: self.resource,
    method: 'create',
    body: { job: self.job },
    files: files,
    onprogress: function(e) {
      self.onprogress(e);
    }
  };

  self.send(r, target);
};

Upload.prototype.onprogress = function(e) {
  var pc = e.loaded / e.total * 100;
  this.$progress.css('width', pc + '%');
  this.progress && this.progress(e, pc);
};

Upload.prototype.willSend = function() {
  var self = this;

  self.$b.append(self.$progress);
  self.startTimeout = setTimeout(function() {
    self.$b.addClass('upload-uploading');
  }, self.delay);
  self.start && self.start();
};

Upload.prototype.send = function(r, target) {
  var self = this;
  self.willSend();
  self.r = swts.c(r, function(err, result) {
    self.didSend();
    self.done(err, result, target);
  });
};

Upload.prototype.didSend = function() {
  var self = this;
  self.r = undefined;
  clearTimeout(self.startTimeout);

  self.$b.removeClass('upload-uploading');
  setTimeout(function() {
    self.$progress.detach();
  }, self.delay);
};

Upload.prototype.abort = function() {
  this.r && this.r.abort();
};

Upload.prototype.remove = function() {
  this.$b.off('.upload');
  this.$progress.remove();
  this.$progress = undefined;
  this.$b = undefined;
};

exports('ui/upload', Upload);
})(window, document);
(function(window, document, undefined){
/*eslint-disable strict */
var $ = require('$');
var buttons = require('ui/buttons');
var Nipple = require('ui/nipple');
var Input = require('ui/input');
var Cover = require('ui/cover');
var Selectah = require('ui/selectah');
var Gregory = require('ui/gregory');
var DateInput = require('ui/gregory/dateinput');
var Gutenberg = require('ui/gutenberg');
var Upload = require('ui/upload');

$(document).ready(function() {

  Nipple.defaults({
    items: {
      'tools': {
        item: 'tools',

        options: {
          title: 'Options',
          icon: 'swts-icon-dots'
        },

        remove: {
          confirm: true,
          title: 'Delete',
          icon: 'swts-icon-trash'
        }
      },

      'active': {
        item: 'toggle',
        title: {
          on: 'Important',
          off: 'Not important'
        }
      },

      'status/draft': {
        title: 'Draft'
      },

      'status/published': {
        title: 'Published'
      }
    }
  });

  //buttons
  var addButton = buttons.add('id', function(id) {
    console.log('add button', id);
  }).appendTo('#simple-buttons');

  var removeButton = buttons.remove('id', function(id) {
    console.log('remove button', id);
  }).appendTo('#simple-buttons');

  //simple input
  var input = new Input({ title: 'Title' }, function(val) {
    console.log('Input', val);
  }).appendTo('#input-fields');

  //slug input
  var slug = new Input({ title: 'Slug', slugify: true }, function(val) {
    console.log('Slug', val);
  }).appendTo('#input-fields');

  //input complex example vimeo id
  var rxVimeoId = /^\d{2,20}$/;
  var rxPaste = /^https?:\/\/(?:www\.)?vimeo.com\/(\d+)($|\/)/;
  var vimeoId = new Input({
    title: 'Vimeo id',
    rx: rxVimeoId,
    onPaste: function(e) {
      var inp = this;
      setTimeout(function () {
        var match = inp.value.match(rxPaste);
        if (match) {
          inp.value = match[1];
        }
      }, 32);
    }
  }, function(val) {
    console.log('Vimeo Id', val);
  }).appendTo('#input-fields');

  //cover
  var cover = new Cover('body');

  //nipple
  var userNipple = new Nipple({
    popup: 'e',
    size: 'medium',
    menu: true,
    autoHide: true,
    items: {
      'edit': { title: 'Edit' },
      'profile': { title: 'Username' },
      'logout': { title: 'Logout' }
    }
  }, {
    edit: function() {
      console.log('Edit mode');
    },

    profile: function() {
      console.log('User profile');
    },

    logout: function() {
      console.log('Logout');
    }
  })
  .addClass('swts-user')
  .appendTo('#nipple');

  var defaultNipple = new Nipple({
    status: function(status) {
      console.log('Nipple status', status);
      this.removeClass('draft published').addClass(status);
    },

    remove: function() {
      console.log('Nipple remove');
    },

    options: function() {
      console.log('Nipple options');
    },

    active: function(state) {
      console.log('Nipple toggle state', state);
    }
  })
  .val('status/draft')
  .addClass('draft')
  .appendTo('#nipple');

  defaultNipple.items.active.val(true);

  var optNipple = new Nipple({
    popup: 'n',
    items: {
      'slug': {
        item: 'input',
        title: 'Slug',
        slugify: true
      },

      'title': {
        item: 'input',
        title: 'Title',
        value: 'Item title'
      },
    }
  },{
    slug: function(val) {
      console.log('slug', val);
    },

    title: function(val) {
      console.log('title', val);
    }
  })
  .addClass('swts-options')
  .appendTo('#nipple');

  //selectah
  var singleSelectah = new Selectah([
    { draft: 'Draft' },
    { ready: 'Ready' },
    { published: 'Published' }
  ], function(val) {
    console.log('Selectah', val);
  })
  .addClass('simple')
  .appendTo('#selectah');

  var multipleSelectah = new Selectah([
    { app: 'Application' },
    { code: 'Code' },
    { design: 'Design' },
    { photography: 'Photography' },
    { web: 'Web' }
  ], {
    multiple: true,
    keepOrder: true,
    selected: [ 'app', 'design' ]
  }, function(val) {
    console.log('Selectah', val);
  })
  .addClass('multi')
  .appendTo('#selectah');

  //gregory
  var gregory = new Gregory(function(date) {
    console.log('Gregory', date);
  })
  .val(new Date())
  .appendTo('#gregory');

  //gregory + date input
  var dateInput = new DateInput({ title: 'Publication date' }, function(date) {
    console.log('Date input', date);
  })
  .appendTo('#dateinput');

  //gutenberg
  var gutenberg = new Gutenberg('#gutenberg > p', function(text) {
    console.log('Gutenberg', text);
  });

  //upload
  var upload = new Upload('#upload', 'sponsor', {
    maxFiles: 1,
    start: function() {
      console.log('Upload start');
    },

    progress: function(e, pc) {
      console.log('Upload progress', pc);
    },

    done: function(err, data, target) {
      console.log('Upload done', err, data, target);
    }
  });

});
})(window, document);
})(window, document);

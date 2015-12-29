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

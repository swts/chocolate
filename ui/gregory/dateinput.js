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

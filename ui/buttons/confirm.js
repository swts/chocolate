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

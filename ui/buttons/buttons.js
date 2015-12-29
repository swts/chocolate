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

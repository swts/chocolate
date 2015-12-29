/*eslint-disable strict */
var $ = require('$');
exports('ui/nipple/item', function($parent, action, opts) {
  return {
    $b: $('<a href="#/' + action + '">' + opts.title + '</a>')
  };
});

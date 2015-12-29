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

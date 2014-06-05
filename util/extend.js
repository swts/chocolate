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

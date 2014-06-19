/*jshint browser:true, strict: false*/

var $ = require('$'),
	Confirm = require('ui/buttons/confirm');

var button = function(action, cb) {
    return $('<a href="#/'+ action +'" class="swts-button"></a>').on("click", function(e) {
    	e.preventDefault();
    	e.stopPropagation();
    	cb(action);
    });
},

add = function(id, cb) {
	return button("add"+ (id ? "/"+id : ""), function(id) {
		cb(id.split("/")[1]);
	}).addClass("swts-add swts-icon-plus");
},

remove = function(id, cb) {
	return new Confirm("remove", id, cb).addClass("swts-remove swts-icon-trash");
};


exports("ui/buttons",  {
	add: add,
    remove: remove,
	button: button
});

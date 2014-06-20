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
	if(typeof id === "function") {
		cb = id;
		id = undefined;
	}

	return button("add"+ (id ? "/"+id : ""), function(id) {
		cb(id ? id.split("/")[1] : id);
	}).addClass("swts-add swts-icon-plus");
},

remove = function(id, cb) {
	if(typeof id === "function") {
		cb = id;
		id = undefined;
	}
	return new Confirm("remove", id, cb).addClass("swts-remove swts-icon-trash");
},

removeTemplate = function(id) {
	return '<a href="#/remove'+ (id ? "/"+id : "") +'" class="swts-button swts-remove swts-icon-trash"></a>';
};

exports("ui/buttons",  {
	add: add,
    remove: remove,
	button: button,

	removeTemplate: removeTemplate
});

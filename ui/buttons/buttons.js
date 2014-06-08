/*jshint browser:true, strict: false*/

var add = function(id) {
    return '<a href="#/add'+ (id ? "/"+id : "") +'" class="swts-add swts-icon-plus"></a>';
},

remove = function(id) {
    return '<a href="#/remove'+ (id ? "/"+id : "") +'" class="swts-remove swts-icon-trash"></a>';
},

button = function(action) {
    return '<a href="#/'+ action +'" class="swts-button"></a>';
};

exports("ui/buttons",  {
	add: add,
    remove: remove,
	button: button
});

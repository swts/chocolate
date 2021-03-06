/*eslint-disable strict */
var $ = require('$');
var buttons = require('ui/buttons');
var Nipple = require('ui/nipple');
var Input = require('ui/input');
var Cover = require('ui/cover');
var Selectah = require('ui/selectah');
var Gregory = require('ui/gregory');
var DateInput = require('ui/gregory/dateinput');
var Gutenberg = require('ui/gutenberg');
var Upload = require('ui/upload');

$(document).ready(function() {

  Nipple.defaults({
    items: {
      'tools': {
        item: 'tools',

        options: {
          title: 'Options',
          icon: 'swts-icon-dots'
        },

        remove: {
          confirm: true,
          title: 'Delete',
          icon: 'swts-icon-trash'
        }
      },

      'active': {
        item: 'toggle',
        title: {
          on: 'Important',
          off: 'Not important'
        }
      },

      'status/draft': {
        title: 'Draft'
      },

      'status/published': {
        title: 'Published'
      }
    }
  });

  //buttons
  var addButton = buttons.add('id', function(id) {
    console.log('add button', id);
  }).appendTo('#simple-buttons');

  var removeButton = buttons.remove('id', function(id) {
    console.log('remove button', id);
  }).appendTo('#simple-buttons');

  //simple input
  var input = new Input({ title: 'Title' }, function(val) {
    console.log('Input', val);
  }).appendTo('#input-fields');

  //slug input
  var slug = new Input({ title: 'Slug', slugify: true }, function(val) {
    console.log('Slug', val);
  }).appendTo('#input-fields');

  //input complex example vimeo id
  var rxVimeoId = /^\d{2,20}$/;
  var rxPaste = /^https?:\/\/(?:www\.)?vimeo.com\/(\d+)($|\/)/;
  var vimeoId = new Input({
    title: 'Vimeo id',
    rx: rxVimeoId,
    onPaste: function(e) {
      var inp = this;
      setTimeout(function () {
        var match = inp.value.match(rxPaste);
        if (match) {
          inp.value = match[1];
        }
      }, 32);
    }
  }, function(val) {
    console.log('Vimeo Id', val);
  }).appendTo('#input-fields');

  //cover
  var cover = new Cover('body');

  //nipple
  var userNipple = new Nipple({
    popup: 'e',
    size: 'medium',
    menu: true,
    autoHide: true,
    items: {
      'edit': { title: 'Edit' },
      'profile': { title: 'Username' },
      'logout': { title: 'Logout' }
    }
  }, {
    edit: function() {
      console.log('Edit mode');
    },

    profile: function() {
      console.log('User profile');
    },

    logout: function() {
      console.log('Logout');
    }
  })
  .addClass('swts-user')
  .appendTo('#nipple');

  var defaultNipple = new Nipple({
    status: function(status) {
      console.log('Nipple status', status);
      this.removeClass('draft published').addClass(status);
    },

    remove: function() {
      console.log('Nipple remove');
    },

    options: function() {
      console.log('Nipple options');
    },

    active: function(state) {
      console.log('Nipple toggle state', state);
    }
  })
  .val('status/draft')
  .addClass('draft')
  .appendTo('#nipple');

  defaultNipple.items.active.val(true);

  var optNipple = new Nipple({
    popup: 'n',
    items: {
      'slug': {
        item: 'input',
        title: 'Slug',
        slugify: true
      },

      'title': {
        item: 'input',
        title: 'Title',
        value: 'Item title'
      },
    }
  },{
    slug: function(val) {
      console.log('slug', val);
    },

    title: function(val) {
      console.log('title', val);
    }
  })
  .addClass('swts-options')
  .appendTo('#nipple');

  //selectah
  var singleSelectah = new Selectah([
    { draft: 'Draft' },
    { ready: 'Ready' },
    { published: 'Published' }
  ], function(val) {
    console.log('Selectah', val);
  })
  .addClass('simple')
  .appendTo('#selectah');

  var multipleSelectah = new Selectah([
    { app: 'Application' },
    { code: 'Code' },
    { design: 'Design' },
    { photography: 'Photography' },
    { web: 'Web' }
  ], {
    multiple: true,
    keepOrder: true,
    selected: [ 'app', 'design' ]
  }, function(val) {
    console.log('Selectah', val);
  })
  .addClass('multi')
  .appendTo('#selectah');

  //gregory
  var gregory = new Gregory(function(date) {
    console.log('Gregory', date);
  })
  .val(new Date())
  .appendTo('#gregory');

  //gregory + date input
  var dateInput = new DateInput({ title: 'Publication date' }, function(date) {
    console.log('Date input', date);
  })
  .appendTo('#dateinput');

  //gutenberg
  var gutenberg = new Gutenberg('#gutenberg > p', function(text) {
    console.log('Gutenberg', text);
  });

  //upload
  var upload = new Upload('#upload', 'sponsor', {
    maxFiles: 1,
    start: function() {
      console.log('Upload start');
    },

    progress: function(e, pc) {
      console.log('Upload progress', pc);
    },

    done: function(err, data, target) {
      console.log('Upload done', err, data, target);
    }
  });

});

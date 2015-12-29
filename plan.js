'use strict';

var options = {
  src: './',
  dst: './'
};

var less = {
  'style.css': 'demo/less/style.less'
};

var js = {
  'script.js': [
    'demo/js/jquery.js',
    'demo/js/swts.js',

    'ui/util/extend.js',
    'ui/util/inherits.js',

    'ui/bar/bar.js',

    'ui/buttons/confirm.js',
    'ui/buttons/buttons.js',

    'ui/input/slugify.js',
    'ui/input/input.js',

    'ui/nipple/item.js',
    'ui/nipple/input.js',
    'ui/nipple/tools.js',
    'ui/nipple/toggle.js',
    'ui/nipple/nipple.js',

    'ui/cover/cover.js',

    'ui/selectah/selectah.js',

    'ui/gregory/gregory.js',
    'ui/gregory/dateinput.js',

    'ui/gutenberg/gutenberg.js',

    'ui/upload/upload.js',

    'demo/js/index.js'
  ]
};

module.exports = {
  options: options,

  'default': {
    js: js,
    css: less
  },

  'belt:js': {
    options: {
      dst: 'demo/js'
    },
    tools: [ 'src-files', 'common-js', 'uglify', 'dst-file' ]
  },

  'belt:css': {
    options: {
      dst: 'demo/css',
      browsers: 'last 2 versions'
    },

    tools: [ 'src-file', 'less', 'autoprefixer', 'dst-file' ]
  }
};

/*eslint-disable strict */
var $ = require('$');
var swts = require('swts');
var inherits = require('util/inherits');
var Bar = require('ui/bar');

var $active;

var Upload = function($b, opts) {
  var self = this;

  self.$b = $($b);
  self.$progress = $('<div class="upload-progress"></div>');
  self.job = opts.job;
  self.resource = opts.resource || 'file';
  self.delay = opts.progressDelay || 500;
  self.start = opts.start;
  self.done = opts.done;
  self.progress = opts.progress;
  self.mouseover = opts.mouseover;
  self.mouseout = opts.mouseout;
  self.maxFiles = opts.maxFiles || 1;
  self.accept = opts.accept;
  self.uploading = false;

  self.$b.on({
    'dragover.upload': function(e) {
      self.ondragover(e);
    },
    'drop.upload': function(e) {
      self.ondrop(e);
    },
    'mouseout.upload': function(e) {
      self.onmouseout(e);
    }
  });
};
inherits(Upload, Bar);

Upload.prototype.ondragover = function(e) {
  e.preventDefault();
  $active && $active.removeClass('upload-drop');
  $active = this.$b.addClass('upload-drop');
  this.mouseover && this.mouseover();
};

Upload.prototype.ondrop = function(e) {
  e.preventDefault();
  var self = this;
  self.$b.removeClass('upload-drop');
  $active = undefined;

  if (self.r) {
    return this.done(new Error('Upload in progress'));
  }

  var files = e.originalEvent.dataTransfer.files;
  if (files.length && files.length <= self.maxFiles) {
    if (self.accept) {
      self.test(files, e.target);
    } else {
      self.upload(files, e.target);
    }
  }
  self.mouseout && self.mouseout();
};

Upload.prototype.onmouseout = function() {
  this.$b.removeClass('upload-drop');
  this.mouseout && this.mouseout();
  $active = undefined;
};

Upload.prototype.test = function(files, target) {
  var ok = true;
  for (var i = 0, l = files.length; i < l; i++ ) {
    if (!this.accept.test(files[i].name)) {
      ok = false;
      break;
    }
  }

  if (ok) {
    this.upload(files, target);
  } else {
    this.done(new Error('Not acceptable'));
  }
};

Upload.prototype.upload = function(files, target) {
  var self = this;
  var r = {
    resource: self.resource,
    method: 'create',
    body: { job: self.job },
    files: files,
    onprogress: function(e) {
      self.onprogress(e);
    }
  };

  self.send(r, target);
};

Upload.prototype.onprogress = function(e) {
  var pc = e.loaded / e.total * 100;
  this.$progress.css('width', pc + '%');
  this.progress && this.progress(e, pc);
};

Upload.prototype.willSend = function() {
  var self = this;

  self.$b.append(self.$progress);
  self.startTimeout = setTimeout(function() {
    self.$b.addClass('upload-uploading');
  }, self.delay);
  self.start && self.start();
};

Upload.prototype.send = function(r, target) {
  var self = this;
  self.willSend();
  self.r = swts.c(r, function(err, result) {
    self.didSend();
    self.done(err, result, target);
  });
};

Upload.prototype.didSend = function() {
  var self = this;
  self.r = undefined;
  clearTimeout(self.startTimeout);

  self.$b.removeClass('upload-uploading');
  setTimeout(function() {
    self.$progress.detach();
  }, self.delay);
};

Upload.prototype.abort = function() {
  this.r && this.r.abort();
};

Upload.prototype.remove = function() {
  this.$b.off('.upload');
  this.$progress.remove();
  this.$progress = undefined;
  this.$b = undefined;
};

exports('ui/upload', Upload);

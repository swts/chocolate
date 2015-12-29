/*eslint-disable strict */
var inherits = require('util/inherits');
var Upload = require('ui/upload');
var Request = require('swts/request');
var settings = require('settings').dropbox;
var slugify = require('ui/input/slugify');

var apiBase = 'https://content.dropboxapi.com/2-beta-2/';
var apiUpload = apiBase + 'files/upload';

var sanitize = function(filepath) {
  return filepath.split('/').map(function(str) {
    return slugify(str, true);
  }).join('/');
};

var upload = function(opts, cb) {
  return Request.send({
    url: apiUpload,
    method: 'post',
    body: opts.body,
    onprogress: opts.onprogress,
    headers: {
      'Authorization': 'Bearer ' + settings.token,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': '{"path":"' + settings.root + opts.filepath + '","autorename":true}'
    }
  }, cb);
};

var DropboxUpload = function($b, opts) {
  Upload.call(this, $b, opts);
  this.filepath = opts.filepath;
  this.maxFiles = 1;
};
inherits(DropboxUpload, Upload);

DropboxUpload.upload = upload;

DropboxUpload.prototype.upload = function(files, target) {
  var file = files[0];
  var parts = file.name.trim().split('.');
  var ext = parts.pop();
  var name = parts.join('');
  var fullname = name + '.' + ext;

  // console.log('!!!', file.size);

  var self = this;
  var r = {
    filepath: sanitize( self.filepath.replace('{name}', fullname).replace('{ext}', ext) ),
    onprogress: function(e) {
      self.onprogress(e);
    }
  };

  self.willSend();
  var fileReader = new FileReader();
  fileReader.onload = function() {
    r.body = fileReader.result;
    self.send(r, target);
  };
  fileReader.onerror = function(e) {
    self.done(e);
    self.didSend();
  };
  fileReader.readAsArrayBuffer(file);
};

DropboxUpload.prototype.send = function(r, target) {
  var self = this;

  self.r = upload(r, function(res) {
    self.didSend();

    if (res.status === 200) {
      self.done(null, res.body, target);
    } else {
      self.done(res);
    }
  });
};



exports('ui/dropbox', DropboxUpload);

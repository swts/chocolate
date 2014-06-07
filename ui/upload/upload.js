/*jshint
    browser:true,
    strict: false
*/

/*global escape*/

var $ = require('$'),
	swts = require('swts');

var Upload = function($b, resource, options) {
	var self = this;

	self.$b = $b;
	self.$progress = $('<div class="swts-ui-upload-progress"></div>');
	self.delay = options.progressDelay || 300;
	self.resource = resource;
	self.start = options.start;
	self.done = options.done;
	self.progress = options.progress;
	self.maxFiles = options.maxFiles || 1;

	self.$b.on({
		"dragover.upload": function () {
			self.$b.addClass("swts-ui-upload-drop");
			return false;
		},
		"drop.upload": function (e) {
			e.preventDefault();
			self.$b.removeClass("swts-ui-upload-drop");

			var files = e.originalEvent.dataTransfer.files;

			if(files.length && files.length <= self.maxFiles) {
				self.upload(files, e.target);
			}
		},
		"mouseout.upload": function () {
			self.$b.removeClass("swts-ui-upload-drop");
		}
	});
};

Upload.prototype.upload = function(files, target) {
	var self = this,
		r = {
			resource: "file",
			method: "create",
			body: {resource: self.resource},
			files: files,
			onprogress: function(e) {
				var pc = e.loaded / e.total * 100;
				self.$progress.css("width", pc+"%");
				self.progress && self.progress(e, pc);
			}
		};
	self.$b.append(self.$progress);
	self.startTimeout = setTimeout(function() {
		self.$progress.addClass('uploading');
	}, self.delay);

	self.start && self.start();

	swts.c(r, function(err, result) {
		clearTimeout(self.startTimeout);

		self.$progress.removeClass('uploading');
		setTimeout(function() {
			self.$progress.detach();
		}, self.delay);

		self.done(err, result, target);
	});
};

Upload.prototype.remove = function() {
	var self = this;

	self.$b.off(".upload");
};

exports("ui/upload", Upload);

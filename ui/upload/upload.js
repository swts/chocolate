/*eslint-disable strict */

var $ = require("$"),
	swts = require("swts");

var $active;

var Upload = function($b, job, options) {
	var self = this;

	self.$b = $($b);
	self.$progress = $('<div class="upload-progress"></div>');
	self.job = job;
	self.resource = options.resource || "file";
	self.delay = options.progressDelay || 500;
	self.start = options.start;
	self.done = options.done;
	self.progress = options.progress;
	self.mouseover = options.mouseover;
	self.mouseout = options.mouseout;
	self.maxFiles = options.maxFiles || 1;

	self.$b.on({
		"dragover.upload": function () {
			$active && $active.removeClass("upload-drop");
			$active = self.$b.addClass("upload-drop");
			self.mouseover && self.mouseover();
			return false;
		},
		"drop.upload": function (e) {
			e.preventDefault();
			self.$b.removeClass("upload-drop");
			$active = undefined;

			var files = e.originalEvent.dataTransfer.files;

			if(files.length && files.length <= self.maxFiles) {
				self.upload(files, e.target);
			}
			self.mouseout && self.mouseout();
		},
		"mouseout.upload": function () {
			self.$b.removeClass("upload-drop");
			self.mouseout && self.mouseout();
			$active = undefined;
		}
	});
};

Upload.prototype.upload = function(files, target) {
	var self = this,
		r = {
			resource: self.resource,
			method: "create",
			body: {job: self.job},
			files: files,
			onprogress: function(e) {
				var pc = e.loaded / e.total * 100;
				self.$progress.css("width", pc + "%");
				self.progress && self.progress(e, pc);
			}
		};
	self.$b.append(self.$progress);
	self.startTimeout = setTimeout(function() {
		self.$progress.addClass("upload-uploading");
	}, self.delay);

	self.start && self.start();

	swts.c(r, function(err, result) {
		clearTimeout(self.startTimeout);

		self.$progress.removeClass("upload-uploading");
		setTimeout(function() {
			self.$progress.detach();
		}, self.delay);

		self.done(err, result, target);
	});
};

Upload.prototype.remove = function() {
	this.$b.off(".upload");
	this.$progress.remove();
	this.$progress = undefined;
	this.$b = undefined;
};

exports("ui/upload", Upload);

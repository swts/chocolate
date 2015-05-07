/*eslint-disable strict */
var $ = require("$"),
	swts = require("swts"),
	inherits = require("util/inherits"),

	Bar = require("ui/bar"),
	Nipple = require("ui/nipple"),
	Input = require("ui/input");

var loginTepmlate = '<div class="swts-cover-login">' +
		'<label class="input" for="swts-cover-email"><input id="swts-cover-email" type="text"><span>Email</span></label>' +
		'<label class="input" for="swts-cover-password"><input id="swts-cover-password" type="password"><span>Password</span></label>' +
		'<a href="#/login" class="swts-button-m">Go</a>' +
	"</div>";

var $w = $(window);

var Cover = function(opts) {
	var self = this;

	if(!opts) {
		opts = {};
	}

	self.$parent = $(opts.parent || "body");
	self.isLoginVisible = false;

	self.editing = false;
	self.popup = opts.popup || "n";
	self.profile = opts.profile;
	self.ui = {};

	if(swts.u) {
		self.showUser(swts.u);
	} else {
		self.buildLogin();
	}
};
inherits(Cover, Bar);

Cover.prototype.load = function() {
	var self = this,
		script = document.createElement("script");
	exports("swts", swts, true);
	script.src = "/static/js/chocolate.js";
	script.onload = function() {
		if(window.Chocolate) {
			self.choco = new window.Chocolate(swts);
			self.choco.on();
			self.edit();
		}
	};
	document.body.appendChild(script);
};

Cover.prototype.buildLogin = function() {
	var self = this;

	self.$l = $(loginTepmlate)
		.appendTo(self.$parent)
		.on("click.swts.login", function(e){
			e.stopPropagation();
		})
		.on("keypress.swts.login", function(e) {
			if (e.keyCode === 13) {
				self.login();
			}
		})
		.find(".swts-button-m").on("click.swts.login", function(e) {
			e.preventDefault();
			self.login();
		})
		.end();

	self.ui.login = new Input(self.$l.find("#swts-cover-email"));
	self.ui.password = new Input(self.$l.find("#swts-cover-password"));

	$w.on({
		"keydown.swts.login": function(e) {
			if(self.isLoginVisible) {
				if (e.keyCode === 27) {
					e.preventDefault();
					self.hideLogin();
				}
			} else {
				if (e.shiftKey && e.keyCode === 48) {
					e.preventDefault();
					self.showLogin();
				}
			}
		},

		"click.swts.login": function() {
			self.isLoginVisible && self.hideLogin();
		}
	});
};

Cover.prototype.showLogin = function() {
	this.isLoginVisible = true;
	this.$l.addClass("active");
	this.ui.login.focus();
};

Cover.prototype.hideLogin = function() {
	this.$l.removeClass("active");

	this.ui.login.val("");
	this.ui.password.val("");
	this.isLoginVisible = false;
};

Cover.prototype.removeLogin = function() {
	var self = this;
	self.hideLogin();
	$w.off(".swts.login");

	setTimeout(function () {
		self.$l.remove();
		self.ui.login = undefined;
		self.ui.password = undefined;
	}, 650);
};

Cover.prototype.login = function() {
	var self = this,
		ui = self.ui;

	swts.userLogin(ui.login.val(), ui.password.val(), function(err, user) {
		if (err) {
			self.error();
		} else {
			self.removeLogin();
			self.showUser(user);
		}
	});
};

Cover.prototype.error = function() {
	var self = this;
	self.$l.addClass("swts-error");
	setTimeout(function() {
		self.$l.removeClass("swts-error");
	}, 500);
};

Cover.prototype.showUser = function(user) {
	if (!user) {
		return;
	}

	var self = this;
	self.ui.user = new Nipple({
			popup: self.popup,
			size: "medium",
			menu: true,
			autoHide: true,
			items: {
				"edit": {title: "Edit"},
				"profile": {title: user.name || user.email},
				"logout": {title: "Logout"}
			}
		}, {
			edit: self.edit.bind(self),
			logout: self.logout.bind(self),
			profile: function() {
				self.profile && self.profile(user);
			}
		})
		.addClass("swts-user")
		.appendTo(self.$parent);
};

Cover.prototype.edit = function() {
	var self = this,
		cp = self.ui.user;

	if (self.choco) {
		if (self.editing) {
			self.editing = false;
			self.choco.off();
			cp.removeClass("swts-editing")
				.items.edit.$b.text("Edit");
		} else {
			self.choco.on();
			cp.addClass("swts-editing")
				.items.edit.$b.text("Stop editing");
			self.editing = true;
		}
	} else {
		self.load();
	}
};

Cover.prototype.logout = function() {
	swts.userLogout();
	this.ui.user.remove();
	this.ui = {};
	this.buildLogin();
};

exports("ui/cover", Cover);

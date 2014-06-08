/*jshint
    browser:true,
    strict: false
*/

var $ = require('$'),
	$w = $(window),
    swts = require("swts"),
    Nipple = require('ui/nipple'),
	Input = require('ui/input');

var loginTepmlate = '<div class="swts-cover-login">'+
        '<label class="swts-input" id="swts-cover-email"><input type="text"><span>Email</span></label>'+
        '<label class="swts-input" id="swts-cover-password"><input type="password"><span>Password</span></label>'+
        '<a href="#/login" class="swts-button">Go</a>'+
    '</div>';

var Cover = function(opts) {
	var self = this;

	if(!opts) {
		opts = {};
	}

	self.$parent = $(opts.parent || "body");
	self.isLoginVisible = false;

	self.editing = false;
	self.popup = opts.popup || "n";
	self.ui = {};

	if(swts.u) {
		self.showUser(swts.u);
	} else {
		self.buildLogin();
	}
};

Cover.prototype = {
	load: function() {
		var self = this,
			script = document.createElement('script');
		exports("swts", swts, true);
		script.src = "/static/js/chocolate.js";
		script.onload = function() {
			if(window.Chocolate) {
				self.choco = new window.Chocolate(swts);
				self.choco.create();
				self.edit();
			}
		};
		document.body.appendChild(script);
	},

	buildLogin: function() {
		var self = this;

		self.$l = $(loginTepmlate)
			.appendTo(self.$parent)
			.on('click.swts.login', function(e){
				e.stopPropagation();
			})
			.on("keypress.swts.login", function(e) {
				if (e.keyCode === 13) {
					self.login();
				}
			})
			.find(".swts-button").on("click.swts.login", function() {
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

			"click.swts.login": function(e) {
				self.isLoginVisible && self.hideLogin();
			}
		});
	},

	showLogin: function() {
		this.isLoginVisible = true;
		this.$l.addClass("active");
		this.ui.login.focus();
	},

	hideLogin: function() {
		this.$l.removeClass("active");

		this.ui.login.val('');
		this.ui.password.val('');
		this.isLoginVisible = false;
	},

	removeLogin: function() {
		var self = this;
		self.hideLogin();
		$w.off(".swts.login");

		setTimeout(function () {
			self.$l.remove();
			self.ui.login = undefined;
			self.ui.password = undefined;
		}, 650);
	},

	login: function() {
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
	},

	error: function() {
		var self = this;
		self.$l.addClass("swts-error");
		setTimeout(function() {
			self.$l.removeClass("swts-error");
		}, 500);
	},

	showUser: function(user) {
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
					"profile": {title: user.name || user.id},
					"logout": {title: "Logout"}
				}
			},{
				edit: self.edit.bind(self),
				logout: self.logout.bind(self),
				profile: function() {
					console.log("User profile");
				},
			})
			.addClass("swts-user")
			.appendTo(self.$parent);
	},

	edit: function() {
		var self = this,
			cp = self.ui.user;

		if (self.choco) {
			if (self.editing) {
				self.editing = false;
				self.choco.remove();
				cp.removeClass("swts-editing")
					.items.edit.$b.text("Edit");
			} else {
				self.choco.create();
				cp.addClass("swts-editing")
					.items.edit.$b.text("Stop editing");
				self.editing = true;
			}
		} else {
			self.load();
		}
	},

	logout: function() {
		swts.userLogout();
		this.ui.user.remove();
		this.ui = {};
		this.buildLogin();
	}
};

exports("ui/cover", Cover);

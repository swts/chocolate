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

var Cover = function(selector) {
	var self = this;

	self.$parent = $(selector);
	self.isLoginVisible = false;

	self.editing = false;
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
				self.ui.choco = new window.Chocolate(swts);
				self.ui.choco.create();
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
		this.$l.addClass("active").find('#swts-cover-email').focus();
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
		}, 1000);
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

		var self = this,
			block = '<div class="swts-cp">'+
						'<div class="swts-cp-menu">'+
							'<a id="swts-godmode">Edit</a>'+
							'<a>' + (user.displayName ? user.displayName : user.id) + '</a>'+
							'<a id="swts-logout" value="Logout">Log out</a>'+
						'</div>'+
						'<a class="swts-cp-swts">sweets</a>'+
					'</div>';

		self.$cp = $(block).on("click.swts.cp", "#swts-logout", function(e) {
			e.preventDefault();
			self.logout();
		});

		self.$godmode = self.$cp
			.find("#swts-godmode")
			.on("click.swts.cp", function(e) {
				e.preventDefault();
				e.stopPropagation();
				if (self.ui) {
					if (self.editing) {
						self.ui.remove();
						self.editing = false;
						self.$cp.removeClass("editing");
						self.$godmode.html("Edit");
					} else {
						self.ui.create();
						self.editing = true;
						self.$cp.addClass("editing");
						self.$godmode.html("Stop editing");
					}
				} else {
					self.load();
					self.editing = true;
					self.$cp.addClass("editing");
					self.$godmode.html("Stop editing");
				}
			});
		self.$parent.append(self.$cp);
	},

	logout: function() {
		swts.userLogout();
		this.$cp.off(".swts.cp").remove();
		this.$cp = undefined;
		this.ui && this.ui.remove();
		this.buildLogin();
	}
};

exports("ui/cover", Cover);

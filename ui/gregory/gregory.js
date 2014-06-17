/*jshint
    browser:true,
    strict: false
*/

/*global jQuery*/

var $ = require('$'),
	daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	defaults = {
		startDay: "MON",
		messages: {
			year: "",
			months: {
				0: {
					s: "Jan",
					f: "January"
				},
				1: {
					s: "Feb",
					f: "February"
				},
				2: {
					s: "Mar",
					f: "March"
				},
				3: {
					s: "Apr",
					f: "April"
				},
				4: {
					s: "May",
					f: "May"
				},
				5: {
					s: "Jun",
					f: "June"
				},
				6: {
					s: "Jul",
					f: "July"
				},
				7: {
					s: "Aug",
					f: "August"
				},
				8: {
					s: "Sep",
					f: "September"
				},
				9: {
					s: "Oct",
					f: "October"
				},
				10: {
					s: "Nov",
					f: "November"
				},
				11: {
					s: "Dec",
					f: "December"
				},
			}
		}
	};

var Gregory = function (opts, cb) {
	if(typeof opts === "function") {
		cb = opts;
		opts = {};
	}

	var self = this;

	self.$b = $("<div class='gregory'></div>");

	self.modes = {
		day: "day",
		month: "month",
		year: "year"
	};

	self.displayState = {}; // {twelfth: 0..2013, year: 0..2013, month: 0..11, day: 1..31, mode: self.modes.month}
	self.selectedState = {}; // {year: 0..2013, month: 0..11, day: 1..31}
	self.prevFullState = {};
	self.weekStartDay = opts.weekStartDay || defaults.startDay;
	self.messages = opts.messages || defaults.messages;
	self.flip = opts.flip;
	self.cb = cb;

	self.build(opts.popup);

	self.prevFullState.mode = self.modes.day;
};

Gregory.prototype = {
	build: function(popup) {
		var self = this,
			flip = self.flip,
			header = '<div class="gregory-header"><a class="gregory-change gregory-back" href="#"></a><a class="gregory-info" href="#/"></a><a class="gregory-change gregory-forward" href="#"></a></div>',
			b = '<div class="gregory'+ (popup ? " gregory-popup" : "") + (flip ? " gregory-up" : " gregory-down") +'">';

		if(!flip) {
			b += header;
		}

		b += '<div class="gregory-wrapper"></div>';

		if(flip) {
			b += header;
		}

		b += '</div>';

		self.$b = $(b)
			.on("click.gregory", function(e) {
				e.stopPropagation();
			})
			.on("click.gregory", "a.gregory-change", function(e) {
				e.preventDefault();

				var hash = this.hash.split("/"),
					year = parseInt(hash[1], 10),
					month = hash[2] ? parseInt(hash[2], 10) : null;

				var displayState = {};

				displayState.year = year;

				if (month === 0 || month) {
					displayState.month = month;
				}

				self.changeDisplayState(displayState, "dateChange");
			});

		self.$wrapper = self.$b.find(".gregory-wrapper")
			.on("click.gregory", "a", function(e) {
				e.preventDefault();

				var $self = $(this),
					hash = this.hash.split("/"),
					year = parseInt(hash[1], 10),
					month = hash[2] ? parseInt(hash[2], 10) : null,
					day = hash[3] ? parseInt(hash[3], 10) : null;

				self.changeSelectedState({
					year: year,
					month: month,
					day: day
				}, $self);

				self.cb && self.cb( new Date(year, month, day), !!day );
			});

		self.$date = self.$b.find(".gregory-info")
			.on("click.gregory", function(e) {
				e.preventDefault();

				var displayState = {};

				displayState.mode = this.hash.split('/')[1];

				if (displayState.mode === self.modes.day) {
					self.changeSelectedState(self.prevFullState);
				} else {
					if (self.displayState.month === null) {
						displayState.month = self.selectedState.month;
					} else {
						displayState.month = self.displayState.month;
					}

					if (!self.isYearActive(self.displayState.year) && self.displayState.mode === self.modes.month) {
						displayState.year = self.selectedState.year;
					}

					self.changeDisplayState(displayState);
				}
			});

		self.$back = self.$b.find(".gregory-back");
		self.$forward = self.$b.find(".gregory-forward");
	},

	val: function(state) {
		if(state === undefined) {
			var s = this.selectedState;
			return new Date(s.year, s.month, s.day);
		}

		var newState;

		if (state instanceof Date) {
			newState = {
				year: state.getFullYear(),
				month: state.getMonth(),
				day: state.getDate()
			};
		} else {
			newState = state;
		}

		newState.mode = newState.day ? this.modes.day : this.modes.month;

		this.changeDisplayState(newState);
		this.changeSelectedState(newState);
		return this;
	},

	changeDisplayState: function(displayState) {
		var self = this;

		self.setDisplayState(displayState);
		self.generateCalendar();
		self.updateInfo();
	},

	changeSelectedState: function(selectedState, $d) {
		var self = this;

		if (self.displayState.mode === self.modes.day) {
			self.$wrapper.find(".gregory-active").removeClass("gregory-active");

			if (!$d) {
				var selector = "a[href='#/" + selectedState.year + (selectedState.month === 0 || selectedState.month ? ("/" + selectedState.month + (selectedState.day ? "/" + selectedState.day : "")) : "") + "']";

				$d = self.$wrapper.find(selector);
			}

			$d.addClass("gregory-active");
		}

		self.setSelectedState(selectedState);
		self.updatePrevFullState();

		if (!selectedState.mode) {
			if (self.displayState.mode === self.modes.year) {
				selectedState.mode = self.modes.month;
			} else if (self.displayState.mode === self.modes.month) {
				selectedState.mode = self.modes.day;
			}
		}

		self.changeDisplayState(selectedState);
	},
	generateCalendar: function() {
		var self = this;

		if (self.displayState.mode === self.modes.day) {
			self.generateDayCalendar();
		} else if (self.displayState.mode === self.modes.month) {
			self.generateMonthCalendar();
		} else {
			self.generateYearCalendar();
		}
	},
	generateDayCalendar: function() {
		var self = this,
			firstDay = new Date(self.displayState.year, self.displayState.month, 1).getDay(),
			daysInMonth = self.getDaysInMonth(self.displayState.year, self.displayState.month),
			startingDay = self.weekStartDay === "MON" ? (firstDay === 0 ? 6 : firstDay - 1) : firstDay;

		var html = '<ul class="gregory-day">',
			day = 1,
			dateBack = self.decrementMonth(self.displayState.year, self.displayState.month),
			dateFuture = self.incrementMonth(self.displayState.year, self.displayState.month);


		self.setChange(dateBack.year + "/" + dateBack.month, dateFuture.year + "/" + dateFuture.month);

		for (var i = 0; i < 9; i++) {
			for (var j = 0; j <= 6; j++) {
				if (day <= daysInMonth && ((j >= startingDay && i === 0) || i > 0)) {
					html += "<li><a class='" + (self.isDayActive(day) ? "gregory-active" : "") + "' href='#/" + self.displayState.year + "/" + self.displayState.month + "/" + day + "'>" + day + "</a></li>";
					day++;
				} else if (day > daysInMonth) {
					break;
				} else {
					html += "<li></li>";
				}
			}

			if (day > daysInMonth) {
				break;
			}
		}

		html += '</ul>';

		self.$wrapper.html(html);
	},
	generateMonthCalendar: function() {
		var self = this,
			html = '<ul class="gregory-month">',
			month = 0;

		self.setChange(self.displayState.year - 1, self.displayState.year + 1);

		for (var i = 0; i < 4; i++) {
			for (var j = 0; j <= 2; j++) {
				html += "<li><a class='" + (self.isMonthActive(month) ? "gregory-active'" : "") + "' href='#/" + self.displayState.year + "/" + month + "'>" + self.messages.months[month].s + "</a></li>";
				month++;
			}

			if (month > 11) {
				break;
			}
		}

		html += '</ul>';

		self.$wrapper.html(html);
	},
	generateYearCalendar: function() {
		var self = this,
			html = '<ul class="gregory-year">',
			year = self.displayState.twelfth - 11;

		self.setChange(year - 1, self.displayState.twelfth + 12);

		for (var i = 0; i < 4; i++) {
			for (var j = 0; j <= 2; j++) {
				html += "<li><a class='" + (self.isYearActive(year) ? "gregory-active'" : "") + "' href='#/" + year + "'>" + year + "</a></li>";
				year++;
			}

			if (year > self.displayState.twelfth) {
				break;
			}
		}

		html += '</ul>';

		self.$wrapper.html(html);
	},
	setChange: function(back, future) {
		var self = this;

		self.$back.attr("href", "#/" + back);
		self.$forward.attr("href", "#/" + future);
	},
	setDateActive: function() {
		var self = this;

		self.$wrapper.find("a[href='#/" + self.formUrl + "']").addClass("gregory-active");
	},
	decrementMonth: function(year, month) {
		var self = this,
			result = {};

		if (month === 0) {
			result.year = year - 1;
			result.month = 11;
		} else {
			result.year = year;
			result.month = month - 1;
		}

		return result;
	},
	incrementMonth: function(year, month) {
		var self = this,
			result = {};

		if (month === 11) {
			result.year = year + 1;
			result.month = 0;
		} else {
			result.year = year;
			result.month = month + 1;
		}

		return result;
	},
	getDaysInMonth: function(year, month) {
		var self = this;

		if(self.displayState.month === 1 && ((self.displayState.year % 4 === 0 && self.displayState.year % 100 !== 0) || self.displayState.year % 400 === 0)) {
			return 29;
		}
		return daysInMonth[self.displayState.month];
	},

	updateInfo: function() {
		var self = this,
			sds = self.displayState,
			mode;

		if (sds.mode === self.modes.day) {
			self.$date.html(self.messages.months[sds.month].f + " " + sds.year);
		} else if (sds.mode === self.modes.month) {
			self.$date.html(sds.year + " " + self.messages.year);
		} else {
			self.$date.html(self.prevFullState.day + "." + (self.prevFullState.month + 1) + "." + self.prevFullState.year);
		}

		if (sds.mode === self.modes.day) {
			mode = self.modes.month;
		} else if (sds.mode === self.modes.month) {
			mode = self.modes.year;
		} else if (sds.mode === self.modes.year) {
			mode = self.modes.day;
		}

		self.$date.attr("href", "#/" + mode);
	},

	setDisplayState: function(displayState) {
		var self = this,
			sds = self.displayState;

		if (displayState.year) {
			sds.year = displayState.year;
			sds.twelfth = displayState.year;
		}

		if (displayState.month === 0 || displayState.month) {
			sds.month = displayState.month;
		} else {
			sds.month = null;
		}

		if (displayState.mode) {
			sds.mode = displayState.mode;
		}

		if (!sds.mode) {
			sds.mode = displayState.month === 0 || displayState.month ? self.modes.day : self.modes.month;
		}
	},
	setSelectedState: function(selectedState) {
		var ss = this.selectedState;

		ss.year = selectedState.year;
		ss.month = selectedState.month;
		ss.day = selectedState.day ? selectedState.day : null;
	},
	updatePrevFullState: function() {
		var ss = this.selectedState,
			pfs = this.prevFullState;

		if (ss.day && (ss.month || ss.month === 0) && ss.year) {
			pfs.day = ss.day;
			pfs.month = ss.month;
			pfs.year = ss.year;
		}
	},
	isDayActive: function(day) {
		return day === this.selectedState.day && this.displayState.month === this.selectedState.month && this.displayState.year === this.selectedState.year;
	},
	isMonthActive: function(month) {
		return month === this.selectedState.month && this.displayState.year === this.selectedState.year;
	},
	isYearActive: function(year) {
		return year === this.selectedState.year;
	},

	show: function() {
		this.$b.addClass("gregory-hot");
		return this;
	},

	hide: function() {
		this.$b.removeClass("gregory-hot");
		return this;
	},

	toggle: function() {
		this.$b.toggleClass("gregory-hot");
		return this;
	},

	addClass: function(className) {
		this.$b.addClass(className);
		return this;
	},

	removeClass: function(className) {
		this.$b.removeClass(className);
		return this;
	},

	appendTo: function($container) {
		this.$b.appendTo($container);
		return this;
	},

	prependTo: function($container) {
		this.$b.prependTo($container);
		return this;
	},

	remove: function() {
		var self = this;

		self.$b.off(".gregory");
		self.$b.remove();
	}
};

Gregory.defaults = function(opts) {
	defaults = opts;
};

exports("ui/gregory", Gregory);

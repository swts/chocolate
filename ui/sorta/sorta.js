/*eslint-disable strict */
var $ = require("$"),
	detective = require("util/detective");

var $d = $(document),
	addData = detective.addData,
	getData = detective.getData,
	removeData = detective.removeData,
	cssTransform = detective.transform,
	requestAnimationFrame = detective.requestAnimationFrame,

	translate = function(el, x, y) {
		el.style[cssTransform] = "translate(" + x + "px, " + y + "px)";
	},
	resizeTimeout;

var Sorta = function(base, element, options, cb) {
	var self = this;

	self.$b = $(base);

	self.grid = {
		width: options.gridWidth,
		height: options.gridHeight,
		steps: undefined //calcs in resize;
	};
	self.snapWidth = self.grid.width - (options.snapWidth || 0);
	self.snapHeight = self.grid.height - (options.snapHeight || 0);
	self.element = element;

	self.stickyLast = options.stickyLast;
	self.last;

	self.handle = options.handle;
	self.cb = cb;
	self.changed = false;

	self.mapping = options.mapping;
	self.order = [];
	self.update(true);

	self.target = undefined;
	self.isEnabled = true;
	self.isDragging = false;
	self.dragging = false;

	self.$b.on("mousedown.sorta", element, function(e) {
			if(this === self.last) { return;}
			var button = e.button;
			if ( button !== 0 && button !== 1 ) { return; }
			self.dragStart( this, e);
		}).on("dragstart.sorta", element, function(e) {
			e.preventDefault();
		});

	$(window).on("resize", function() {
		if(resizeTimeout) {
			clearTimeout(resizeTimeout);
		}

		resizeTimeout = setTimeout(function() {
			self.resize();
		}, options.resizeDelay || 100);
	});

	self.resize();
};

Sorta.prototype = {
	update: function(notMove) {
		var self = this,
			order = self.order = [];

		self.$b.find(self.element).each(function(i, el) {
			el.style.position = "absolute";

			addData(el, "sortaOriginalIndex", i);
			order[i] = el;
		});

		if(self.stickyLast) {
			self.last = order[order.length - 1];
		}

		if(!notMove) {
			self.moveBlocks();
		}
	},

	dragStart: function(el, event) {
		if(!this.isEnabled) { return;}

		event.preventDefault();
		event.stopPropagation();

		var self = this,
			pos = self.getGridPosition(self.order.indexOf(el)),
			start = {
				x: event.pageX,
				y: event.pageY
			};

		el.classList.add("dragging");
		self.target = pos;
		self.isDragging = true;
		self.dragEl = el;
		self.dragMove();

		$d.on("mousemove.sorta", function(e) {
				self.dragging = true;
				self.target = {
					x: e.pageX - start.x + pos.x,
					y: e.pageY - start.y + pos.y
				};

				self.rearrange();
			})
			.one("mouseup.sorta", function() {
				self.dragEnd();
			});
	},

	dragMove: function() {
		if(!this.isDragging) { return; }

		var self = this,
			target = self.target;

		translate(self.dragEl, target.x, target.y);
		requestAnimationFrame(function() {
			self.dragMove();
		});
	},

	dragEnd:  function() {
		var self = this;
		$d.off("mousemove.sorta");
		self.dragEl.classList.remove("dragging");
		self.dragEl = undefined;
		self.moveBlocks();
		if(self.changed) {
			var res = self.order.map(function(el) {
				return getData(el, self.mapping ? "sortaMapping" : "sortaOriginalIndex");
			});

			if(self.stickyLast) {
				res.pop();
			}

			self.cb(res);
		}
		self.changed = false;
		self.isDragging = false;

		setTimeout(function() {
			self.dragging = false;
		}, 1);
	},

	calcSnap: function(index) {
		var self = this,
			resultIndex = index,
			num = self.order.length - (self.stickyLast ? 2 : 1),
			pos = self.getGridPosition(index),
			target = self.target,
			dx = target.x - pos.x,
			dy = target.y - pos.y;

		if(dx > 0 && dx > self.snapWidth)   { resultIndex = Math.min(num, resultIndex + 1); } //right;
		if(dx < 0 && dx < -self.snapWidth)  { resultIndex = Math.max(0, resultIndex - 1); } //left;
		if(dy > 0 && dy > self.snapHeight)  { resultIndex = Math.min(num, resultIndex + self.grid.steps); } //down
		if(dy < 0 && dy < -self.snapHeight) { resultIndex = Math.max(0, resultIndex - self.grid.steps);} //up

		return resultIndex;
	},

	getGridPosition: function(index) {
		var self = this, x, y;

		if(index < self.grid.steps - 1) {
			x = index * self.grid.width;
			y = 0;
		} else {
			y = Math.floor(index / self.grid.steps);
			x = (index - self.grid.steps * y) * self.grid.width;
			y *= self.grid.height;
		}

		return { x:x, y:y };
	},

	rearrange: function() {
		var self = this,
			index = self.order.indexOf(self.dragEl),
			newIndex = self.calcSnap(index);

		if(newIndex !== index) {
			self.changed = true;
			self.order.splice(newIndex, 0, this.order.splice(index, 1)[0]);
			self.moveBlocks();
		}
	},

	moveBlocks: function() {
		var self = this;
		for(var i in self.order) {
			var block = self.order[i], pos;

			if(block === self.dragEl) {continue;}

			pos = self.getGridPosition(i);
			translate(block, pos.x, pos.y);
		}
	},

	resize: function() {
		var self = this;
		self.width = self.$b.innerWidth();
		self.grid.steps = Math.floor(self.width / self.grid.width);
		self.moveBlocks();
	},

	addElement: function(el, index, mappingValue) {
		var self = this,
			order = self.order,
			mapping = self.mapping;

		el.style.position = "absolute";

		if(self.stickyLast && (index === undefined || index === order.length)) {
			index = order.length - 1;
		}

		if(index === undefined || index === order.length) {
			order.push(el);
			addData(el, "sortaOriginalIndex", order.length);
		} else {
			order.splice(index, 0, el);
			for(var i = index, l = order.length; i < l; i++) {
				addData(order[i], "sortaOriginalIndex", i);
			}
		}

		if(mapping) {
			addData(el, "sortaMapping", mappingValue);
		}

		self.moveBlocks();
	},

	removeElement: function(el) {
		var order = this.order,
			index = this.order.indexOf(el);

		order.splice(index, 1);
		for(var i = index, l = order.length; i < l; i++) {
			addData(order[i], "sortaOriginalIndex", i);
		}

		this.moveBlocks();
	},

	enable: function() {
		this.isEnabled = true;
	},

	disable: function() {
		this.isEnabled = false;
		if ( this.isDragging ) {
			this.dragEnd();
		}
	},

	remove: function() {
		this.$b.off(".sorta");
		this.disable();

		var order = this.order;

		for (var i in order) {
			var el = order[i];

			removeData(el, "sortaOriginalIndex");
			this.mapping && removeData(el, "sortaMapping");
		}

		this.order = [];
	}
};

exports("ui/sorta", Sorta);

/*jshint
	browser:true,
	strict: false
*/

/*global jQuery*/

var $ = require("$"),
	$w = $(window),
	$b = $("body"),
	$instances = [],

	hideInstances = function() {
		for (var i in $instances) {
			$instances[i].addClass("gutenberg-hidden");
		}
	},

	spliceInstance = function($instance) {
		for (var i in $instances) {
			if ($instance === $instances[i]) {
				$instances.splice(i, 1);
			}
		}
	},

	availableCommands = {
		"bold": {
			icon: "swts-icon-bold",
			command: function(ctx) {
				document.execCommand("bold");
				ctx.onTextEdit(ctx.$b.html());
			}
		},
		"removeFormat": {
			icon: "swts-icon-clean",
			command: function(ctx) {
				document.execCommand("removeFormat");
				ctx.onTextEdit(ctx.$b.html());
			}
		},
		"italic": {
			icon: "swts-icon-italic",
			command: function(ctx) {
				document.execCommand("italic");
				ctx.onTextEdit(ctx.$b.html());
			}
		},
		"link": {
			icon: "swts-icon-link",
			iconUnlink: "swts-icon-unlink",
			additionalInit: function(ctx) {
				ctx.selectionIsLink = function() {
					var result = false,
						sel = window.getSelection();

					if (navigator.userAgent.match(/webkit/i) ? true : false) {
						result = ctx.findNodeWithTags(sel.focusNode, 'A');
					} else if (navigator.userAgent.match(/firefox/i) ? true : false) {
						result = ctx.firefoxSelectionIsLink();
					}

					return result;
				};

				ctx.firefoxSelectionIsLink = function() {
					var sel = window.getSelection(),
						range = ctx.getRange(),
						fragment = range.cloneContents();

					if (fragment.childNodes.length === 1 && fragment.firstChild.tagName === "A") {
						return true;
					}

					return ctx.findNodeWithTags(sel.focusNode, 'A');
				};

				ctx.findNodeWithTags = function(node, tags) {
					if (!$.isArray(tags)) {

						tags = [tags];
					}
					while (node) {
						if (node.nodeType !== 3) {
							var index = tags.indexOf(node.tagName);
							if (index !== -1) {
								return node;
							}
						}

						node = node.parentNode;
					}

					return null;
				};

				ctx.buildLink = function() {
					ctx.$link = ctx.$controlsWrapper.find("a.swts-icon-link");
					ctx.$linkWrapper = $('<li class="gutenberg-hidden"><input type="text" placeholder="Type link here"/></li>');
					ctx.$linkInput = ctx.$linkWrapper.find("input");
					ctx.$link.parent().parent().append(ctx.$linkWrapper);
				};

				ctx.initLinkListeners = function() {
					ctx.$linkInput.on("keypress", function(e) {
						if (e.which === 13) {
							ctx.onLinkEnter();
						}
					});

					ctx.$b.on("mousedown.gutenberg", function(e) {
						ctx.hide(ctx.$linkWrapper, true);

						$(document)
						.one("mousedown.gutenberg", function() {
							ctx.hide(ctx.$linkWrapper, true);
						})
						.one("mouseup.gutenberg", function() {
							if (ctx.clicked && ctx.selectionIsLink()) {
								ctx.$link.removeClass("swts-icon-link").addClass("swts-icon-unlink");
							} else if (ctx.clicked && !ctx.selectionIsLink()) {
								ctx.$link.removeClass("swts-icon-unlink").addClass("swts-icon-link");
							}
						});
					});


				};

				ctx.onLinkEnter = function() {
					var sel = window.getSelection();

					ctx.$linkInput.blur();
					sel.removeAllRanges();
					sel.addRange(ctx.$linkInput.data('selection'));

					document.execCommand("createlink", false, ctx.$linkInput.val());

					ctx.hide(ctx.$linkWrapper, true);
					ctx.$link.removeClass("swts-icon-link").addClass("swts-icon-unlink");

					ctx.onTextEdit(ctx.$b.html());
				};

				ctx.buildLink();
				ctx.initLinkListeners();
			},
			command: function(ctx) {
				if (ctx.selectionIsLink()) {
					document.execCommand("unlink");
					ctx.$link.removeClass("swts-icon-unlink").addClass("swts-icon-link");

					ctx.onTextEdit(ctx.$b.html());
				} else {
					ctx.$linkInput.data('selection', window.getSelection().getRangeAt(0));
					ctx.hide(ctx.$linkWrapper, false);
					ctx.$linkInput.focus();
				}
			}
		}
	};

var Gutenberg = function(selector, opts, cb) {
	var self = this;

	if(typeof opts === "function") {
		cb = opts;
		opts = {};
	}

	self.$b = $(selector);
	self.$controlsWrapper;
	self.$links;
	self.initialVal = self.$b.html();
	self.tempVal;
	self.commands = opts.commands;
	self.onChange = cb;
	self.onChangeDelay = opts.onChangeDelay || 1000;
	self.stopLinks = opts.stopLinks;
	self.typingTimer;

	self.init();
};

Gutenberg.prototype.init = function() {
	var self = this;

	self.$b.attr("contenteditable", true);
	self.buildDOM();
	self.initListeners();
};

Gutenberg.prototype.buildDOM = function() {
	var self = this,
		html;

	if (!self.commands) {
		return;
	}

	self.$controlsWrapper = $('<ul class="gutenberg-ctrl gutenberg-hidden">');

	$b.append(self.$controlsWrapper);
	$instances.push(self.$controlsWrapper);

	for (var i in self.commands) {
		var cmdName = self.commands[i],
			cmdObj = availableCommands[cmdName];

		if (cmdObj) {
			html = '<li><a href="#' + cmdName + '" class="' + cmdObj.icon + '"></a></li>';
			self.$controlsWrapper.append(html);

			cmdObj.additionalInit && cmdObj.additionalInit(self);
		}
	}

	self.$links = self.$controlsWrapper.find("a");
};

Gutenberg.prototype.initListeners = function() {
	var self = this;

	self.$b
		.on("paste.gutenberg", function(e) {
			self.onPaste(this, e);
		})
		.on("keydown.gutenberg", function(e) {
			if (e.which === 27) {
				self.restoreText();
			} else if (e.which === 8) {
				setTimeout(function() {
					self.sanitizeBackspace();
				}, 2);
			}
		})
		.on("keyup.gutenberg", function(e) {
			self.onTextEdit(self.$b.html());
		})
		.on("mousedown.gutenberg", function(e) {
			self.clicked = true;

			e.stopPropagation();

			hideInstances();

			$(document).one("mousedown.gutenberg", function(e) {
				hideInstances();
			}).one("mouseup.gutenberg", function(e) {
				self.onTextSelect(e);
			});
		})
		.on("focus.gutenberg", function(e) {
			self.tempVal = self.$b.html();
		});

	if(self.stopLinks) {
		self.$b.on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
		});
	}

	if (self.$controlsWrapper) {
		self.$controlsWrapper
		.on("mousedown.gutenberg", function(e) {
			e.stopPropagation();
		})
		.on("mouseup.gutenberg", function(e) {
			e.stopPropagation();
		});
		self.$controlsWrapper
		.on("click.gutenberg", "a", function(e) {
			e.preventDefault();
			self.onToolClick(this.href.split("#")[1]);
		});
	}
};

Gutenberg.prototype.onPaste = function(elem, e) {
	var self = this;

	document.execCommand("insertText", false, e.originalEvent.clipboardData.getData('text/plain'));
	e.preventDefault();
	e.stopPropagation();
	self.onTextEdit(self.$b.html());
};

Gutenberg.prototype.sanitizeBackspace = function() {
	var self = this;

	self.$b.find("span").each(function() {
		if (this.style) {
			$(this).contents().unwrap();
		}
	});
};

Gutenberg.prototype.onTextSelect = function(e) {
	var self = this,
		range = self.getRange();

	if (!self.$controlsWrapper || (range.startOffset === range.endOffset) || !self.clicked) {
		return;
	}

	if (self.prevStartOffset === range.startOffset && self.prevEndOffset === range.endOffset) {
		self.hide(self.$controlsWrapper, true);
		return;
	}

	self.hide(self.$controlsWrapper, false);

	var p = self.getSelectionPosition(e);

	self.$controlsWrapper.css({
		left: p.left,
		top: p.top
	});

	self.clicked = true;
	self.prevStartOffset = range.startOffset;
	self.prevEndOffset = range.endOffset;
};

Gutenberg.prototype.onToolClick = function(tool) {
	availableCommands[tool].command(this);
};

Gutenberg.prototype.onTextEdit = function(val) {
	var self = this;

	clearTimeout(self.typingTimer);
	self.typingTimer = setTimeout( function() {
		self.updateContent(val);
	}, self.onChangeDelay);
};

Gutenberg.prototype.updateContent = function(html) {
	if (this.tempVal !== html) {
		this.onChange(html);
		this.tempVal = html;
	}
};

Gutenberg.prototype.restoreText = function() {
	var self = this;

	self.$b.html(self.initialVal);
	self.onTextEdit(self.initialVal);
};

Gutenberg.prototype.val = function(val) {
	this.$b.html(val);
};

Gutenberg.prototype.getRange = function() {
	if (window.getSelection) {
		var sel = window.getSelection();
		if (sel.rangeCount > 0) {
			return sel.getRangeAt(0);
		}
	} else if (document.selection && document.selection.createRange) {
		return document.selection.createRange();
	}
	return null;
};

Gutenberg.prototype.getSelectionPosition = function(e) {
	var self = this,
		rect = self.getRange().getBoundingClientRect(),
		left = e.pageX - self.$controlsWrapper.width() / 2,
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

	if (left < 0) {
		left = 10;
	}

	var top = scrollTop + rect.top - self.$controlsWrapper.height() - 10;

	return {left: left, top: top};
};

Gutenberg.prototype.remove = function() {
	var self = this;

	self.$b.off(".gutenberg");
	self.$b.attr("contenteditable", false);
	self.$controlsWrapper && self.$controlsWrapper.remove();
	spliceInstance(self.$controlsWrapper);
};

Gutenberg.prototype.hide = function($el, hide) {
	var self = this;

	if (hide) {
		$el.addClass("gutenberg-hidden");
	} else {
		$el.removeClass("gutenberg-hidden");
	}
};

exports('ui/gutenberg', Gutenberg);

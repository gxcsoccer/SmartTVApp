define(function(require, exports, module) {
	'use strict';
	var Class = require('./Class'),
		Util = require('./Util');

	return Class.extend({
		init: function(container, $el) {
			this.container = container;
			this.container.children.push(this);
			if (Util.isString($el)) {
				this.id = $el;
				$el = $('#' + $el);
			}
			$el = $el.length ? $el : this.makeElement();
			this.$el = $el;
			this.attach();
			this.children = [];
		},
		$: function(selector) {
			return this.$el.find(selector);
		},
		makeElement: function() {
			return $('<div>', {
				id: this.id
			});
		},
		attach: function() {
			if (!$.contains(this.container.$el[0], this.$el[0])) {
				this.container.$el.append(this.$el);
			}
		},
		show: function() {
			this.$el.show();
			this.active();
		},
		hide: function() {
			this.$el.hide();
			this.deactive();
		},
		active: function() {
			this.isActive = true;
		},
		deactive: function() {
			this.isActive = false;
		},
		dispathEvent: function(event) {
			if (!this.isActive) {
				return 0;
			}
			var body = event.getBody();
			if (body.target && body.target != document.body && !$.contains(this.$el[0], body.target)) {
				return 0;
			}

			var ret = 0;
			$.each(this.children, function(index, child) {
				ret = child.dispathEvent(event);
				return ret === 0;
			});

			return ret || this.handleEvent(event);
		},
		handleEvent: function() {
			return 0;
		},
		destory: function() {
			this.$el.remove();
			var index = this.container.children.indexOf(this);
			index >= 0 && this.container.children.splice(index, 1);

			this.children.forEach(function(child) {
				child.onDestory();
			});
			this.onDestory();
		},
		onDestory: function() {

		}
	});
});
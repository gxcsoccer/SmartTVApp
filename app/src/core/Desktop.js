define(function(require, exports, module) {
	'use strict';
	var View = require('./View'),
		Desktop = View.extend({
		init: function() {
			this.$el = $('#desktop');
			this.children = [];
			this.attach();
		},
		attach: function() {
			if (!this.$.contains(document.body, this.$el[0])) {
				$(document.body).append(this.$el[0]);
			}
		}
	});

	return new Desktop();
});
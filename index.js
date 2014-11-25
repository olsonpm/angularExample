var $ = require('jquery');
var angular = require('angular');

var app = angular.module('myApp', []);

app.directive('clickable', function(){
	return {
		restrict: 'A'
		, compile: function(element, attrs) {
			if (element instanceof $) {
				console.log('jquery dependency properly loaded');
			} else {
				console.log('jqLite is being used instead of jQuery');
			}
		}
	};
});

var angular = require('angular');

var app = angular.module('myApp', []);

app.directive('clickable', function(){
	return {
		restrict: 'A'
		, compile: function(element, attrs) {
			console.log('immediate proof that angular is working');
		}
	};
});

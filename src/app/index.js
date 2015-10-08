var angular = require('angular');

require('../vendor/angular-bootstrap-npm/angular-bootstrap.js');

var app = angular.module('myApp', ['ui.bootstrap.datepicker']);

app.controller('myController', function($scope) {
		$scope.aDate = new Date();
	})
	.directive('clickable', function(){
		return {
			restrict: 'A'
			, compile: function(element, attrs) {
				console.log('immediate proof that angular is working');
			}
		};
	});

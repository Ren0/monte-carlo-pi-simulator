// Create Module
// [] is for dependency injection: the module could rely on other modules to retrieve data
var piEstimationModule = angular.module('piEstimationModule', []);
//'piEstimationModule.controllers'

// Value
piEstimationModule.value('version', {message:"0.9.1"});

// Configure the Module with Routes
// $routeProvider is injected dynamically (like $scope)
// Views are sometimes called partials because they are part of the page
piEstimationModule.config(function ($routeProvider) {
	$routeProvider
		.when('/dartBoard',
			{
				controller: 'DartBoardController',
				templateUrl: 'partials/DartBoard.html'
			})
		.when('/buffonsNeedles',
			{
				controller: 'BuffonsNeedlesController',
				templateUrl: 'partials/BuffonsNeedles.html'
			})
		.otherwise({redurectTo: '/'});
});


//piEstimationModule.controller('DartBoardController', ['$scope', function($scope) {
	//console.log('DartBoardController');
//}]);
//piEstimationModule.controller('BuffonsNeedlesController', ['$scope', function($scope) {
//	console.log('BuffonsNeedlesController');
//}]);

// Create Controllers
// in AngularJS $scope is the ViewModel in the MVVM architecture
// it is the glue between the view and the controller
//var controllers = {};

//controllers.DartBoardController = function($scope) {
//	$scope.initialPoints = [{x: '0.5'},{y: '0.5'}];
	
//	init();
	
//	function init() {
//		$scope.numberPointsTotal = 0;
//	};
	
//	$scope.addPoints = function() {
//		console.log('In addPoints');
//	};
//};

//controllers.BuffonsNeedlesController = BuffonsNeedlesController;
//piEstimationModule.controller(controllers);

// Factory - Service - Provider
// Are all similar: retrive data to share, and inject it into Controller at runtime 
// For example:  .controller('MyController', function ($scope, sampleFactory) {...});
// Data can be fetched from Ajax call - by injecting $http variable into the Factory
//piEstimationModule.factory('PiFactory', function() {
//	var points = [{x:'0.2', y:'0.6'}, {x:'0.4', y:'0.3'}];
//	
//	var factory = {};
//	factory.getPoints = function() {
//		return points;
//	}
//	
//	return factory;
//});
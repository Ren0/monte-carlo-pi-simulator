// Create Module
// [] is for dependency injection: the module could rely on other modules to retrieve data
var piEstimationModule = angular.module('piEstimationModule', ['highchart.directive']);

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
		//.when('/mandelbrotSet',
			//{
			//	controller: 'MandelbrotSetController',
			//	templateUrl: 'partials/MandelbrotSet.html'
			//})	
		.otherwise({redirectTo: '/dartBoard'});
});

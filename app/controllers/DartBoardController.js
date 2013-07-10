// Create Controller
// in AngularJS $scope is the ViewModel in the MVVM architecture
// it is the glue between the view and the controller
function DartBoardController($scope, piEstimationService, dartBoardService, chartService) {
	
	piEstimationService.reset();
	dartBoardService.initDartBoard();

	$scope.reset = function() {
		piEstimationService.reset();
		chartService.drawChart(piEstimationService.getAllTrackedValue(), piEstimationService.getLabels(10));
		dartBoardService.initDartBoard();
		$scope.resetTimes(true);
		$scope.resetComputations();
	};	
	
	$scope.resetComputations = function() {
		$scope.numberPointsTotal = 0;
		$scope.numberPointsInside = 0;
		$scope.piEstimation = 0;
		$scope.piError = 0;
	};
	
	$scope.resetTimes = function(resetTotalTime) {
		if (resetTotalTime) $scope.totalTime = 0;
		$scope.calculateTime = 0;
		$scope.drawPointsTime = 0;
		$scope.drawChartTime = 0;
	};
	
	$scope.addPoints = function() {
		$scope.resetTimes(false);
		
		var startTime = new Date().getTime();
		
		var stepTime = new Date().getTime();
		piEstimationService.calculateNewPoints($scope.nbPointsToAdd);
		this.updateComputations();
		$scope.calculateTime = Date.now() - stepTime;
		
		stepTime = new Date().getTime();
		dartBoardService.drawNewPoints(piEstimationService.getPointsToAdd());
		$scope.drawPointsTime = Date.now() - stepTime;
		
		stepTime = new Date().getTime();
		chartService.drawChart(piEstimationService.getAllTrackedValue(), piEstimationService.getLabels(10));
		$scope.drawChartTime = Date.now() - stepTime;
		
		$scope.totalTime = Date.now() - startTime;
	};
	
	$scope.updateComputations = function() {
		$scope.numberPointsTotal = piEstimationService.getNumberOfPoints();
		$scope.numberPointsInside = piEstimationService.getNumberOfPointsInside();
		$scope.piEstimation = piEstimationService.calculatePi();
		$scope.piError = piEstimationService.calculatePiError();
	};

	$scope.reset();
	
}
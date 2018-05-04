// Create Controller
// in AngularJS $scope is the ViewModel in the MVVM architecture
// it is the glue between the view and the controller
function DartBoardController($scope, $http, piEstimationService, dartBoardService, chartService, timeTrackerService) {

	piEstimationService.reset();
	dartBoardService.initDartBoard();

	$scope.reset = function() {
		piEstimationService.reset();
		$scope.chart = chartService.drawChart($scope, piEstimationService.getAllTrackedValue(), piEstimationService.getLabels(10));
		dartBoardService.initDartBoard();
		$scope.resetComputations();
	};

	$scope.resetComputations = function() {
		$scope.numberPointsTotal = 0;
		$scope.numberPointsInside = 0;
		$scope.piEstimation = 0;
		$scope.piError = 0;
	};

	$scope.addDarts = function() {
		timeTrackerService.resetTimes();

		timeTrackerService.newStep();
		piEstimationService.calculateNewPoints($scope.nbPointsToAdd);
		this.updateComputations();
		timeTrackerService.update();

		timeTrackerService.newStep();
		dartBoardService.drawNewPoints(piEstimationService.getPointsToAdd());
		timeTrackerService.update();

		timeTrackerService.newStep();
		$scope.chart = chartService.drawChart($scope,piEstimationService.getAllTrackedValue(), piEstimationService.getLabels(10));
		timeTrackerService.update();

		$scope.stepTimes = timeTrackerService.getStepTimes();
		$scope.totalTime = timeTrackerService.getTotalTime();
	};

	$scope.updateComputations = function() {
		$scope.numberPointsTotal = piEstimationService.getNumberOfPoints();
		$scope.numberPointsInside = piEstimationService.getNumberOfPointsInside();
		$scope.piEstimation = piEstimationService.calculatePi("darts");
		$scope.piError = piEstimationService.calculatePiError();
	};

	$scope.reset();

}

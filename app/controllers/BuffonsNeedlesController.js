function BuffonsNeedlesController($scope, $http, piEstimationService, buffonsNeedlesService, chartService, timeTrackerService) {
	piEstimationService.reset();
	buffonsNeedlesService.initBuffonsNeedles();

	$scope.reset = function() {
		piEstimationService.reset();
		$scope.chart = chartService.drawChart($scope, piEstimationService.getAllTrackedValue(), piEstimationService.getLabels(10));
		buffonsNeedlesService.initBuffonsNeedles();
		$scope.resetComputations();
	};

	$scope.resetComputations = function() {
		$scope.numberPointsTotal = 0;
		$scope.numberPointsInside = 0;
		$scope.piEstimation = 0;
		$scope.piError = 0;
	};

	$scope.addNeedles = function() {
		timeTrackerService.resetTimes();

		piEstimationService.calculateNewNeedles($scope.nbNeedlesToAdd);
		this.updateComputations();
		timeTrackerService.update();

		buffonsNeedlesService.drawNewNeedles(piEstimationService.getPointsToAdd());
		timeTrackerService.update();

		$scope.chart = chartService.drawChart($scope,piEstimationService.getAllTrackedValue(), piEstimationService.getLabels(10));
		timeTrackerService.update();

		$scope.stepTimes = timeTrackerService.getStepTimes();
		$scope.totalTime = timeTrackerService.getTotalTime();
	}

	$scope.updateComputations = function() {
		$scope.numberPointsTotal = piEstimationService.getNumberOfPoints();
		$scope.numberPointsInside = piEstimationService.getNumberOfPointsInside();
		$scope.piEstimation = piEstimationService.calculatePi("needles");
		$scope.piError = piEstimationService.calculatePiError();
	};

	$scope.reset();
}

function DartBoardController($scope, piEstimationService, dartBoardService) {
	
	piEstimationService.reset();
	dartBoardService.initDartBoard();
	$scope.chartCanvas = document.getElementById("chart");	

	$scope.reset = function() {
		piEstimationService.reset();
		$scope.drawChart();
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
		var startTime = new Date().getTime();
		var stepTime = new Date().getTime();
		$scope.resetTimes(false);
		piEstimationService.calculateNewPoints($scope.nbPointsToAdd);
		$scope.numberPointsTotal = piEstimationService.getNumberOfPoints();
		$scope.numberPointsInside = piEstimationService.getNumberOfPointsInside();
		$scope.piEstimation = piEstimationService.calculatePi();
		$scope.piError = piEstimationService.calculatePiError();
		$scope.calculateTime = Date.now() - stepTime;
		stepTime = new Date().getTime();
		dartBoardService.drawNewPoints(piEstimationService.getPointsToAdd());
		$scope.drawPointsTime = Date.now() - stepTime;
		stepTime = new Date().getTime();
		$scope.drawChart();
		$scope.drawChartTime = Date.now() - stepTime;
		$scope.totalTime = Date.now() - startTime;
	};

	$scope.drawChart = function() {
		var context = $scope.chartCanvas.getContext('2d');
		var tv = piEstimationService.getAllTrackedValue();
		var labels = piEstimationService.getLabels(10);
		var resultKey = [];
		var resultValue = [];
		var resultRef = [];
		for (i = 0; i < tv.length; i++) {
			resultKey[i] = tv[i]['key'];
			resultValue[i] = tv[i]['value'];
			resultRef[i] = Math.PI;
		}		

		var data = {
			labels : resultKey,
			//labels : labels,
			datasets : [
				{
					fillColor : "rgba(220,220,220,0)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "blue",
					data : resultValue
				},
				{
					fillColor : "rgba(151,187,205,0)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "red",
					data : resultRef
				}
			]
		}
		
		var myNewChart = new Chart(context).Line(data, {animation: false, scaleShowGridLines: false});		
	}
	
	$scope.reset();
	
}
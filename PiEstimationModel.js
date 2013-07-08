function PiEstimationModel($scope){

	$scope.currentSimulation = new PiEstimationSimulation();
	$scope.pointsCanvas = document.getElementById("points");	
	$scope.chartCanvas = document.getElementById("chart");	

	$scope.reset = function() {
		$scope.currentSimulation = new PiEstimationSimulation();
		$scope.drawChart();
		$scope.initCanvas();
		$scope.resetTimes();
		$scope.totalTime = 0;
		$scope.resetComputations();
	};	
	
	$scope.resetComputations = function() {
		$scope.numberPointsTotal = 0;
		$scope.numberPointsInside = 0;
		$scope.piEstimation = 0;
		$scope.piError = 0;
	};
	
	$scope.resetTimes = function() {
		$scope.calculateTime = 0;
		$scope.drawPointsTime = 0;
		$scope.drawChartTime = 0;
	};
	
	$scope.addPoints = function() {
		var startTime = new Date().getTime();
		var stepTime = new Date().getTime();
		$scope.resetTimes();
		$scope.currentSimulation.addPoints($scope.nbPointsToAdd);
		$scope.numberPointsTotal = $scope.currentSimulation.getNumberOfPoints();
		$scope.numberPointsInside = $scope.currentSimulation.getNumberOfPointsInside();
		$scope.piEstimation = $scope.currentSimulation.calculatePi();
		$scope.piError = $scope.currentSimulation.calculatePiError();
		$scope.calculateTime = Date.now() - stepTime;
		stepTime = new Date().getTime();
		$scope.drawNewPoints();
		$scope.drawPointsTime = Date.now() - stepTime;
		stepTime = new Date().getTime();
		$scope.drawChart();
		$scope.drawChartTime = Date.now() - stepTime;
		$scope.totalTime = Date.now() - startTime;
	};

	$scope.drawChart = function() {
		var context = $scope.chartCanvas.getContext('2d');
		var tv = $scope.currentSimulation.getAllTrackedValue();
		var labels = $scope.currentSimulation.getLabels(10);
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
	
	$scope.initCanvas = function() {
		var context = $scope.pointsCanvas.getContext('2d');
		var width = $scope.pointsCanvas.width;
		var height = $scope.pointsCanvas.height;
		context.save();
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, width, height);
		context.restore();
		
		// circle
		var centerX = width / 2;
		var centerY = height / 2;
		var radius = (height) / 2;
		var startAngle = 0;
		var endAngle = 2 * Math.PI;
		var counterClockwise = false;
		context.beginPath();
		context.arc(centerX, centerY, radius, startAngle, endAngle, counterClockwise);
		context.lineWidth = 1;
		context.strokeStyle = 'blue';
		context.stroke();

		// rectangle
		context.beginPath();
		context.rect(centerX - radius, 0, radius * 2, radius * 2);
		context.lineWidth = 1;
		context.strokeStyle = 'red';
		context.stroke();
	}
	
	$scope.drawNewPoints = function() {
		var context = $scope.pointsCanvas.getContext('2d');
		var centerX = $scope.pointsCanvas.width / 2;
		var radius = ($scope.pointsCanvas.height) / 2;
	
		// points
		context.beginPath();
		var result = $scope.currentSimulation.getPointsToAdd();
		for (i = 0; i < result.length; i++) {
			var x = result[i]["x"];
			var y = result[i]["y"];;
			var xPos = (centerX - radius) + 2 * radius * x;
			var yPos = 2 * radius * y;
			context.fillRect(xPos, yPos, 1, 1);
		}
		context.strokeStyle = 'black';
		context.stroke();
	}
	
	$scope.reset();
}
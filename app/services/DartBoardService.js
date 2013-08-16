piEstimationModule.service('dartBoardService', function () {
	
	var dartBoardCanvas = document.getElementById("dartBoard");	
	var context = dartBoardCanvas.getContext('2d');
	var width = dartBoardCanvas.width;
	var height = dartBoardCanvas.height;
	var centerX = width / 2;
	var centerY = height / 2;
	var radius = (height) / 2;
	
	this.initDartBoard = function() {

		dartBoardCanvas = document.getElementById("dartBoard");	
		context = dartBoardCanvas.getContext('2d');
	
		context.save();
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, width, height);
		context.restore();
		
		// circle
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

	this.drawNewPoints = function(newPoints) {
		context.beginPath();
		for (i = 0; i < newPoints.length; i++) {
			var x = newPoints[i]["x"];
			var y = newPoints[i]["y"];
			var xPos = (centerX - radius) + 2 * radius * x;
			var yPos = 2 * radius * y;
			context.fillRect(xPos, yPos, 1, 1);
		}
		context.strokeStyle = 'black';
		context.stroke();
	}
	
});
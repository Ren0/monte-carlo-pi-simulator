piEstimationModule.service('buffonsNeedlesService', function () {
	
	var dartBoardCanvas = document.getElementById("buffonsNeedles");	
	var context = dartBoardCanvas.getContext('2d');
	var width = dartBoardCanvas.width;
	var height = dartBoardCanvas.height;
	var needleLength = width / 20;
	
	this.initBuffonsNeedles = function() {

		dartBoardCanvas = document.getElementById("buffonsNeedles");	
		context = dartBoardCanvas.getContext('2d');
	
		context.save();
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, width, height);
		context.restore();
		
		// rectangle
		context.beginPath();
		context.rect(0, 0, width, height);
		context.lineWidth = 1;
		context.strokeStyle = 'black';
		context.stroke();
		
		// lines
		for (var x = needleLength / 2; x <= width; x += needleLength) {
			context.beginPath();
			context.strokeStyle = 'black';
			context.moveTo(x, 0);
			context.lineWidth = 1;
			context.lineTo(x, height);
			context.stroke();
		}
	}
	
	this.drawNewNeedles = function(newNeedles) {
		var x1, y1, x2, y2, crossedLine;

		for (i = 0; i < newNeedles.length; i++) {
			x1 = width * newNeedles[i]["x1"];
			y1 = height * newNeedles[i]["y1"];
			x2 = width * newNeedles[i]["x2"];
			y2 = height * newNeedles[i]["y2"];
			crossedLine = newNeedles[i]["hit"];
			
			// Draw the needle
			context.beginPath();
			context.strokeStyle = (crossedLine ? "blue" : "red");
			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
			context.stroke();			
		}
	
	}
	
});
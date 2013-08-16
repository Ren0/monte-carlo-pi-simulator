piEstimationModule.service('piEstimationService', function () {
	var totalPoints = 0;
	var totalInside = 0;
	var trackedValue = [];
	var result = [];
	var pointsToAdd = [];
	var piEstimate = 0;
	
	this.reset = function() {
		totalPoints = 0;
		totalInside = 0;
		trackedValue = [];
		result = [];
		pointsToAdd = [];
	}
	
	this.calculateNewPoints = function(nbToAdd) {
		pointsToAdd = [];
		var keepTrackEvery = getTrackEvery(nbToAdd);		
		 
		var current = 0;
		while(current < nbToAdd){
			var x = Math.random();
			var y = Math.random();
			if (x * x + y * y <= 1) {totalInside++;} // the point is within the circle
			totalPoints++;
			if(totalPoints % keepTrackEvery == 0 ){
				trackedValue.push({	
					key: totalPoints,
					value: this.calculatePi("darts")}
				);
			}			
			result[result.length] = {"x":x,"y":y};
			pointsToAdd[pointsToAdd.length] = {"x":x,"y":y};
			current++;
		}
	}
	
	this.calculateNewNeedles = function(nbToAdd) {
		pointsToAdd = [];
		var keepTrackEvery = getTrackEvery(nbToAdd);		
		 
		var current = 0;
		while(current < nbToAdd){
		
			var x1, y1, theta, x2, y2;
			var needleLength = 1 / 20;
		
			// Drop a new needle: random position (x,y) and angle (theta)
			x1 = (Math.random() * (1 - 2 * needleLength)) + needleLength;
			y1 = (Math.random() * (1 - 2 * needleLength)) + needleLength;
			theta = Math.random() * 2 * Math.PI;
			
			x2 = x1 + needleLength * Math.cos(theta);
			y2 = y1 + needleLength * Math.sin(theta);
			
			// Check if it hits a line
			var hit = false;
			for (var x = needleLength / 2; x <= 1; x += needleLength) {
				if ((x1 <= x && x <= x2) || (x2 <= x && x <= x1))
					hit = true;
			}
			
			totalPoints++;
			if (hit) totalInside += 1;
				
			if(totalPoints % keepTrackEvery == 0 ){
				trackedValue.push({	
					key: totalPoints,
					value: this.calculatePi("needles")}
				);
			}
		
			result[result.length] = {"x1":x1,"y1":y1,"x2":x2,"y2":y2,"hit":hit};
			pointsToAdd[pointsToAdd.length] = {"x1":x1,"y1":y1,"x2":x2,"y2":y2,"hit":hit};
			current++;
		
		}
	}
	
	this.calculatePi = function(method){
		if (method == "darts") {
			piEstimate = (totalInside / totalPoints) * 4;
			return piEstimate.toFixed(5);
		}
		else if (method == "needles") {
			piEstimate = (2 * totalPoints) / totalInside;
			return piEstimate.toFixed(5);
		}
	}
	
	this.calculatePiError = function(){
		return (Math.abs(((Math.PI-piEstimate)/Math.PI) * 100)).toFixed(5);
	}
	
	this.getAllPoints = function(){
		return result;
	}
	
	this.getPointsToAdd = function(){
		return pointsToAdd;
	}
	
	this.getNumberOfPoints = function(){
		return totalPoints;
	}
	
	this.getNumberOfPointsInside = function(){
		return totalInside;
	}
	
	this.getAllTrackedValue = function(){
		return trackedValue;
	}
	
	this.getLabels = function(nbLabels){
		var result = [];
		for (i = 0; i < totalPoints; i++) {
			if ( i % (totalPoints/nbLabels) == 0) result[result.length] = i;
		}
		return result;
	}

	var getTrackEvery = function(nbToAdd) {
		return (totalPoints + parseInt(nbToAdd)) / 10;
	}
});
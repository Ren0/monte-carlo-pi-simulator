piEstimationModule.service('piEstimationService', function () {
	var totalPoints = 0;
	var totalInside = 0;
	var trackedValue = [];
	var result = [];
	var pointsToAdd = [];
	
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
					value: this.calculatePi()}
				);
			}			
			result[result.length] = {"x":x,"y":y};
			pointsToAdd[pointsToAdd.length] = {"x":x,"y":y};
			current++;
		}
	}
	
	this.calculatePi = function(){
		var piEstimate = (totalInside / totalPoints) * 4;
		return piEstimate.toFixed(5);
	}
	
	this.calculatePiError = function(){
		var pi = Math.PI;
		var piEstimate = (totalInside / totalPoints) * 4;
		return (Math.abs(((pi-piEstimate)/pi) * 100)).toFixed(5);
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
		return totalPoints + parseInt(nbToAdd) / 10;
	}
});
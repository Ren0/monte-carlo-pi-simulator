function PiEstimationSimulation(){
	var totalPoints = 0;
	var totalInside = 0;
	var trackedValue = [];
	var result = [];
	
	this.addPoints = function(nbToAdd) {
	
		var keepTrackEvery = getTrackEvery(nbToAdd);		
		 
		var current = 0;
		while(current < nbToAdd){			
			var x = Math.random();
			var y = Math.random();
			if (x * x + y * y <= 1) {totalInside++;}
			totalPoints++;
			if(totalPoints%keepTrackEvery == 5){
				trackedValue.push({	
					key:totalPoints,
					value: this.calculatePi()}
				);
			}			
			result[result.length] = {"x":x,"y":y};
			current++;
		}
	}
	
	this.calculatePi = function(){
		var piEstimate = (totalInside / totalPoints) * 4;
		return piEstimate;
	}
	this.calculatePiError = function(){
		var pi = 3.14159265359;
		var piEstimate = (totalInside / totalPoints) * 4;
		return Math.abs(((pi-piEstimate)/pi)*100);
	}
	
	this.getAllPoints = function(){
		return result;
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
	var getTrackEvery = function(nbToAdd) {
		if(nbToAdd<200){
			return 20;
		}
		else{
			return Math.ceil(nbToAdd/20);
		}
	}
}
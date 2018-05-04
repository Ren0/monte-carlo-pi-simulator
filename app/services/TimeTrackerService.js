piEstimationModule.service('timeTrackerService', function () {

	var startTime = new Date().getTime();
	var stepTimes = [];
	var nbSteps = 0;

	this.resetTimes = function() {
		startTime = new Date().getTime();
		stepTimes = [];
		nbSteps = 0
	}

	this.newStep = function() {
		startTime = new Date().getTime();
	}

	this.update = function() {
		stepTimes[nbSteps] = new Date().getTime() - startTime;
		nbSteps++;
	}

	this.getStepTimes = function() {
		return stepTimes;
	}

	this.getTotalTime = function() {
		var totalTime = 0;
		for (var i = 0; i < stepTimes.length; i++) {
			totalTime += stepTimes[i] << 0;
		}
		return totalTime;
	}

});

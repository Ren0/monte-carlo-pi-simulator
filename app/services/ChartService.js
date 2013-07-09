piEstimationModule.service('chartService', function () {

	var chartCanvas = document.getElementById("chart");	

	var context = chartCanvas.getContext('2d');
	var width = chartCanvas.width;
	var height = chartCanvas.height;
	
	
	this.drawChart = function(tv, labels) {
		//console.log(width);
		//console.log(height);
	
		var context = chartCanvas.getContext('2d');
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

});
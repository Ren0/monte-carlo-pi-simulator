piEstimationModule.service('chartService', function () {

	this.drawChart = function($scope, tv, labels) {
		console.log("Draw values: " + tv.length);
	
		var resultKey = [];
		var resultValue = [];
		var resultRef = [];
		
		for (i = 0; i < tv.length; i++) {
			resultKey[i] = tv[i]['key'];
			resultValue[i] = parseFloat(tv[i]['value']);
			resultRef[i] = Math.PI;
		}	
		
		if(tv.length > 0) {
		
			$scope.chart = {
				"chart": {
					"type": "spline"
				},
				"title": {
					"text": ""
				},
				"credits": {
					"enabled": false
				},
				"xAxis": {
					"labels":
					{
						"enabled": false
					}
				},
				"yAxis": {
					"title": {
						"text": ""
					},
					"plotBands": [{
						"from": 3.13159265359,
						"to": 3.15159265359,
						"color": "rgba(255, 0, 0, 0.3)",
						"label": {
							"text": "Pi \xB1 0.01",
							//"align": "center",
							"verticalAlign": "bottom",
							"x": 20,
							"y": 15,
							"style": {
								"color": "#606060"
							}
						}
					}]
				},
				"plotOptions": {
					"spline": {
						"dataLabels": {
							"enabled": false
						},
						"enableMouseTracking": false,
						"animation": false
					}
				},
				"series": [{
					"name": "Pi",
					"color": "red",
					"lineWidth": 1,
					"marker": {
						"enabled": false
					},
					"data": []
				}, {
					"name": "Estimation",
					"color": "blue",
					"lineWidth": 1,
					"marker": {
						"enabled": false
					},
					"data": []
				}]
			}
			
			$scope.chart.series[0].data = resultRef;
			$scope.chart.series[1].data = resultValue;
		
		}
	}

});
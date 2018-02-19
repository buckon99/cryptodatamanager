function setup(label, values){
var MONTHS = label;
	var config = {
		type: 'line',
		data: {
			labels: label,
			datasets: [{
				label: "My First dataset",
				backgroundColor: 'rgba(244, 125, 66, 1)',
				borderColor: 'rgba(244, 125, 66, 1)',
				steppedLine: true,
				data: values,
				fill: true,
			}]
		},
		options: {
			responsive: true,
			title:{
				display:true,
				text:'Order Book'
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Month'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Value'
					}
				}]
			}
		}
	};

	window.onload = function() {
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myLine = new Chart(ctx, config);
	};

	var colorNames = Object.keys(window.chartColors);
}
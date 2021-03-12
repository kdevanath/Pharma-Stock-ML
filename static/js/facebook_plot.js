$(function(){
	$('#navbar-search-form').submit((event) => {
		const symbol = $('#search-input').val();

		// Get data for facebook chart
    $.ajax({
      type: "GET",
      url: `/facebook_model/${symbol}`,
      success: function(data) {
        updateFSymbol(data, symbol);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.status);
      },
    });

		// // Get data for arima chart
    // $.ajax({
    //   type: "GET",
    //   url: `/arima_model/${symbol}`,
    //   success: function(data) {
    //     updateASymbol(data);
    //   },
    //   error: function(jqXHR, textStatus, errorThrown) {
    //     alert(jqXHR.status);
    //   },
    // });

		// Prevent form from being submitted to server
		return false;
	});
});

function convertDate(timestamp) {
	var time = new Date(timestamp);
	var dd = time.getDate();
	var mm = time.getMonth()+1;
	var yy = time.getFullYear();
	return dd +"/" + mm+"/" + yy;
}

function updateFSymbol(facebookData, symbol) {
	console.log('Starting to update graph')
	let fbData = JSON.parse(facebookData)
	x_var = [],
	y_act = [],
	y_pred = [],
	yupper = [],
	ylower = [],
	fbData.forEach((item, i) => {
		x_var.push(convertDate(item['date']));
		y_act.push(item['actual']);
		y_pred.push(item['prediction']);
		ylower.push(item['yhat_lower']);
		yupper.push(item['yhat_upper']);
	});
	console.log('finsished  fbData')
	title = 'Forecasting for ' + symbol;

	let trace1 = {
		x: x_var,
	 	y: y_act,
		 type: "scatter",
		 mode: "markers",
	 	marker: {
		 color: '#fffaef',
		 size: 2,
		 line: {
			color: '#000000',
			width: 0.75
		  }
		 },
		 name: 'Actual',
	};

	let trace2 = {
		x: x_var,
		y: y_pred,
		mode: "line",
	 	markers: {
		 color: '#00FFFF'
		 },
		 line: {
			'width': 1
		  },
		  backgroundColor: "rgba(54, 162, 235, 0.2)",
		  name: 'Forecast',
	};

	yhat_lower = {
		x: x_var,
		y: ylower,
		marker: {
		  color: 'rgba(0,0,0,0)'
		},
		showlegend: false,
		hoverinfo: 'none',
	};

	yhat_upper = { 
		x: x_var,
		y: yupper,
		fill:'tonexty',
		fillcolor: 'rgb(142, 223, 255)',
		name: 'Confidence',
		hoverinfo: 'none',
		mode: 'none'
	}
	
	let data = [yhat_lower, yhat_upper, trace1,trace2];
	const layout = {
	  title: title,
	  margin: {
		't': 20,
		'b': 50,
		'l': 60,
		'r': 10
	  },
	  legend: {
		'bgcolor': 'rgba(0,0,0,0)'
	  },
	  xaxis: {
        type: "date"
      },

	};
	console.log('strating  plot')
	Plotly.newPlot("plot", data, layout);
};

// function updateASymbol(arimaData) {
// 	let arData = JSON.parse(arimaData)
//   console.log(arimaData);
// 	x_var = [],
// 	y_act = [],
// 	y_pred = [],
// 	arData.forEach((item, i) => {
// 		console.log(item);
// 		x_var.push(convertDate(item['date']));
// 		y_act.push(item['actual']);
// 		y_pred.push(item['prediction']);
// 	});
//
// 	console.log(x_var);
//
// 	let trace1 = {
// 		x: x_var,
// 	 	y: y_act,
// 	 	type: "line",
// 	 	marker: {
// 		 color: ['#1DB954']
// 	 	}
// 	};
//
// 	let trace2 = {
// 		x: x_var,
// 		y: y_pred,
// 		type: "line",
// 	 	marker: {
// 		 color: ['#441DB9']
// 	 	}
// 	};
//
// 	let data = [trace1,trace2]
//
// 	const layout = {
// 	  title: "<Symbol> FB Stock Market Values"
// 	};
// 	Plotly.newPlot("graph", data, layout);
// };

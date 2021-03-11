$(function(){
	$('#navbar-search-form').submit((event) => {
		const symbol = $('#search-input').val();

		// Get data for facebook chart
    $.ajax({
      type: "GET",
      url: `/facebook_model/${symbol}`,
      success: function(data) {
        updateFSymbol(data);
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

	let fbData = JSON.parse(facebookData)
	x_var = [],
	y_act = [],
	y_pred = [],
	fbData.forEach((item, i) => {
		x_var.push(convertDate(item['date']));
		y_act.push(item['actual']);
		y_pred.push(item['prediction']);
	});

	let trace1 = {
		x: x_var,
	 	y: y_act,
	 	type: "line",
	 	marker: {
		 color: ['#1DB954']
	 	}
	};

	let trace2 = {
		x: x_var,
		y: y_pred,
		type: "line",
	 	marker: {
		 color: ['#441DB9']
	 	}
	};

	let data = [trace1,trace2]

	const layout = {
	  title: title
	};
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

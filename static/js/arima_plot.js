function updateASymbol(arimaData) {
	let arData = JSON.parse(arimaData)
  console.log(arimaData);
	x_var = [],
	y_act = [],
	y_pred = [],
	arData.forEach((item, i) => {
		console.log(item);
		x_var.push(convertDate(item['date']));
		y_act.push(item['actual']);
		y_pred.push(item['prediction']);
	});

	console.log(x_var);

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
	title = "Predictions using Arima Model: " + symbol;
	const layout = {
	  title: title
	};
	Plotly.newPlot("graph", data, layout);
};

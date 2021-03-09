$(function(){
    // names of id go with # symbol (for all)
    // creates an event to pull information
    // based on what we need
	$('#').click((event) => {
		$.ajax({
	    type:"GET",
	    url: "/facebook_model/<symbol>",
			data: {
         symbol: event.target.textContent
	    },
		});
		$.ajax({
			type:"GET",
			url: "/arima_model/<symbol>",
			data: {
				 symbol: event.target.textContent
			},
		});
	});
});
function updateSymbol(facebookData) {
	let data = {
	  x: [],
	  y: [],
	  type: "line",
	  marker: {
	    color: '#1DB954','#441DB9'
	  }
	};
	symbolData.forEach((item, i) => {
		data.x.push(item['date']);
		data.y.push(item['close']);
	});
	console.log(symbolData);
	const layout = {
	  title: "<Symbol> Stock Market Values"
	};
	Plotly.newPlot("plot", [data], layout);

function updateSymbol(arimaData) {
	let data = {
	  x: [],
	  y: [],
	  type: "line",
	  marker: {
	    color: '#1DB954','#441DB9'
	  }
	};
	symbolData.forEach((item, i) => {
		data.x.push(item['date']);
		data.y.push(item['close']);
	});
	console.log(symbolData);
	const layout = {
	  title: "<Symbol> Stock Market Values"
	};
	Plotly.newPlot("plot", [data], layout);

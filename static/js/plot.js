$(function(){
    // names of id go with # symbol (for all)
    // creates an event to pull information
    // based on what we need
	$('#dropDown .dropdown-item').click((event) => {
		$.ajax({
	    type:"GET",
	    url: "/facebook_model/<symbol>",
			data: {
         symbol: event.target.textContent
	    },
			success: function(data) {
				$('#dropDown .dropdown-menu').hide(200);
				updateSymbol(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				$('#dropDown .dropdown-menu').hide(200);
				alert(jqXHR.status);
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
	    color: ['#1DB954','#441DB9']
	  }
	};
	console.log(facebookData);
	fbData = JSON.parse(facebookData)
	fbData.forEach((item, i) => {
		data.x.push(item['date']);
		data.y.push(item['close']);
	});
	console.log(fbData);
	
	const layout = {
	  title: "<Symbol> Stock Market Values"
	};
	Plotly.newPlot("plot", [data], layout);

	};

//function updateSymbol(arimaData) {
	//let data1 = {
	  //x: [],
	  //y: [],
	  //type: "line",
	  //marker: {
	    //color: ['#1DB954','#441DB9']
	  //}
	//};
	//symbolData.forEach((item, i) => {
		//data.x.push(item['date']);
		//data.y.push(item['close']);
	//});
	//console.log(symbolData);
	//const layout = {
	  //title: "<Symbol> Stock Market Values"
	//};
	//Plotly.newPlot("graph", [data1], layout);
	//};

$(function(){
  $('#dropDown .dropdown-item').click((event) => {
    $.ajax({
      type:"GET",
      url: "/arima_model/<symbol>",
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

function updateASymbol(arimaData) {
	let data = {
	  x: [],
	  y: [],
	  type: "line",
	  marker: {
	    color: ['#1DB954','#441DB9']
	  }
	};
	console.log(arimaData);
	arData = JSON.parse(arimaData)
	arData.forEach((item, i) => {
		data.x.push(item['date']);
		data.y.push(item['actual']);
	});
	console.log(arData);

	const layout = {
	  title: "<Symbol> ARIMA Stock Market Values"
	};
	Plotly.newPlot("graph", [data], layout);

	};

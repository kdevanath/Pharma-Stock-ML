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

function convertDate(timestamp) {
	var time = new Date(timestamp);
	var dd = time.getDate();
	var mm = time.getMonth()+1;
	var yy = time.getFullYear();
	return dd +"/" + mm+"/" + yy;
}

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

	const layout = {
	  title: "<Symbol> FB Stock Market Values"
	};
	Plotly.newPlot("graph", data, layout);
	};

	};

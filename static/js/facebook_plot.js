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
				updateFSymbol(data);
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

function updateFSymbol(facebookData) {
	let data = {
	  x: [],
	  y: [],
	  type: "line",
	  marker: {
	    color: ['#1DB954']
	  }
	};

	fbData = JSON.parse(facebookData)
	fbData.forEach((item, i) => {
		data.x.push(convertDate(item['date']));
		data.y.push(item['actual']);
	});

	console.log('Done conversion?')
	const layout = {
	  title: "<Symbol> FB Stock Market Values"
	};
	console.log('Am I here already?');
	Plotly.newPlot("plot", [data], layout);
	};

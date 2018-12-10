function createMap(fullscreen) {
	// req_loc_acc();
	// req_loc_auth();

	setTitle( '' );
	// document.getElementById(div).innerHTML = "<div style='position: relative' id='super_frame'><div id='mainframe' style='padding:0; margin:0; position:relative; width:500px; height:500px; overflow:hidden;' onclick='onmyclick(event);' onmousedown='onmdown(event);' onmouseup='onmup(event);' onmousemove='onmmove(event);'>" +
	// 	"<canvas width='1280' height='1280' id=\"myCanvas\" style='position:absolute; left:0px; top:0px; width:1280px;  height:1280px;  ' ></canvas>" +
	//
	// 	"" +
	// 	"<div id='image_loader' style='display:none;'></div>\n" +
	// 	"\t<div id='image_pre_loader' style='display:none;'></div>\t</div>" +
	// 	"" +
	// 	"<a href='javascript: zoomin();' style='text-decoration:none; padding:5px; border:1px solid gray; background-color:white; position:absolute; right:10px;bottom:80px;'>+</a>" +
	// 	"<a href='javascript: zoomout();' style='text-decoration:none; padding:5px; border:1px solid gray; background-color:white; position:absolute; right:10px;bottom:10px;'>-</a>" +
	// 	"<a href='javascript: temp_center();' style='text-decoration:none; padding:5px; border:1px solid gray; background-color:white; position:absolute; right:10px; bottom:45px;'>o</a>" +
	// 	"</div>";


	var mapWidth = window.screen.width;

	var mapHeight;
	if (fullscreen) {
		// var headerHeight = 66;
		var headerHeight = 0;
		var footerHeight = 44;
		mapHeight = window.screen.height - (headerHeight + footerHeight);
	}
	else {
		mapHeight = 200;
	}
	// console.log(windowWidth);
	var mainFrame = $('#map-map');
	mainFrame.css('width', mapWidth);
	mainFrame.css('height', mapHeight);

	gps_init();
	console.log('aaa');
	// map_init(500,500,false, 1);
	init_map(mapWidth, mapHeight, 13);
	console.log('bbbb');
	// $.ajax({
	// 	url: siteURL + '/api/get-coordinates.php',
	// 	type: 'GET',
	// 	// dataType: 'json',
	// 	contentType: "application/json; charset=utf-8",
	// 	success: function (response) {
	// 		routeTemp = JSON.parse(response);
	// 		console.log(routeTemp);
	// 		for (var i = 0; i < routeTemp.length; i++) {
	// 			// console.log(route[i]);
	// 			// console.log('a123');
	// 			for (var j = 0; j < routeTemp[i].points.length; j++) {
	// 				console.log('aa' + parseFloat(routeTemp[i].points[j][1]));
	// 				add_route_point(0, parseFloat(routeTemp[i].points[j][0]), parseFloat(routeTemp[i].points[j][1]));
	// 			}
	// 		}
	// 	},
	// 	error: function () {
	//
	// 	}
	// });


	//
	$('#mainframe').on('touchmove', function(event) {
		event.preventDefault();
		event.stopPropagation();
	});
	$('#mainframe').on('touchstart', function(event) {
		event.preventDefault();
		event.stopPropagation();
	});
	// map_init();
}

function clean_map() {

}
function createTourItemLayout(data) {
	var tour = data.tour;
	var objects = data.objects;
	console.log(tour.rating);
	contentDiv.innerHTML =
		'<div class="tour-item">' +
			'<div class="tour-item-image-div">' +
				'<div class="tour-item-image" style="background-image: url(' + tour.image + ')"></div>' +
				'<div class="tour-item-bottom row">' +
					'<div class="tour-item-title col-8">' + tour['name' + lang]+ '</div>' +
					'<div class="tour-item-rating col-4">' +
						'<i class="my-icon my-icon-route"></i> <span onclick="openReviewPopup(\'tour\', ' + tour.id + ')">' + (tour.rating ? tour.rating : '') + '<i class="my-icon my-icon-star-empty-white-bold"></i><span class="tour-item-star-quantity">(' + (tour.stars ? tour.stars : '') + ')</span> </span>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="tour-item-padding">' +
				'<div class="tour-item-first-row row">' +
					'<div class="col-5"><i class="my-icon icon-2x "></i></div>' +
					'<div class="col-7"><span class="now" id="heart-div"><i class="my-icon my-icon-blue-heart" id="heart"></i> ' + string('button_favourite') + '</span><span class="now ml-2" onclick="window.plugins.socialsharing.share(\'' + escapeHtml(tour['name' + lang]) + '\', \'The subject\')"><i class="my-icon my-icon-share now"></i> ' + string('button_share') + '</span></div></div>' +
				'<div class="tour-item-description">' + tour['description' + lang] + '</div>' +
			'</div>' +
			'<div id="geo-map"></div>' +
			'<div class="tour-item-hr"></div>' +
			'<div class="inner-padding" id="rating-div"></div>';
	renderReviews('tour', tour.id, 'rating-div');
	// createMap('map-map', false);
	console.log(tour);
	
		
	routeTemp = JSON.parse(tour.tour_driving_map_data);
	console.log('gzaaaaaaaaaaaaaaaaaaaaa');
	console.log(routeTemp);
	if (routeTemp!=null)
	{
		init_map(parseFloat(routeTemp[0][0].points[0][0]), parseFloat(routeTemp[0][0].points[0][1]), 14, 'geo-map', false);
	}
		// init_map(parseFloat(routeTemp[0][0].points[0][0]), parseFloat(routeTemp[0][0].points[0][1]), 13);
		// init_map(parseFloat(routeTemp[0][0].points[0][0]), parseFloat(routeTemp[0][0].points[0][1]), 14, 'geo-map', false);
		
		
	for (var routeInt = 0; routeInt < routeTemp.length; routeInt++) {
		for (var i = 0; i < (routeTemp[routeInt].length); i++) {
			// console.log(route[i]);
			// console.log('a123');
			for (var j = 0; j < routeTemp[routeInt][i].points.length; j++) {
				// add_route_point(routeInt, parseFloat(routeTemp[routeInt][i].points[j][0]), parseFloat(routeTemp[routeInt][i].points[j][1]));

			}
			new_route(routeInt, routeTemp[routeInt][i].points)
		}
	}
	console.log('objecctttsss');
	console.log(objects);
	for (i = 0; i < objects.length; i++) {
		console.log('aeee obbbbobb');
		add_marker(objects[i].latitude, objects[i].longitude, objects[i]['name' + lang], objects[i].id, "images/marker.png");
	}
	//center_on_location(parseFloat(routeTemp[0][0].points[0][0]), parseFloat(routeTemp[0][0].points[0][1]), 14);
	//refresh_map();
	checkFavourite(tour.id, 1, function() {
		$('#heart').removeClass('my-icon-blue-heart');
		$('#heart').addClass('my-icon-blue-heart-full');
	});

	$('#heart-div').on('click', function() {
		console.log('asdf');
		handleHeart(tour.id, 1, this, function() {
			$('#heart').removeClass('my-icon-blue-heart');
			$('#heart').addClass('my-icon-blue-heart-full');
		}, function() {
			$('#heart').removeClass('my-icon-blue-heart-full');
			$('#heart').addClass('my-icon-blue-heart');
		})
	});

	// add_route_point(0, 41.70945, 44.75519);
	// add_route_point(0, 41.70984, 44.75527);
	// add_route_point(0, 41.70984, 44.75527);
	// add_route_point(0, 41.70962, 44.75708);
	// add_route_point(0, 41.70946, 44.75879);
	// add_route_point(0, 41.70915, 44.76166);
	// add_route_point(0, 41.70915, 44.76166);
	// add_route_point(0, 41.70972, 44.76179);
	// add_route_point(0, 41.71022, 44.7619);
	// add_route_point(0, 41.71044, 44.76194);
	// add_route_point(0, 41.71044, 44.76194);
	// add_route_point(0, 41.71039, 44.76237);
	// add_route_point(0, 41.71036, 44.76258);
	// add_route_point(0, 41.71029, 44.76309);
	// add_route_point(0, 41.71023, 44.76363);
	// add_route_point(0, 41.71019, 44.76408);
	// add_route_point(0, 41.71009, 44.76497);
	// add_route_point(0, 41.70997, 44.76596);
	// add_route_point(0, 41.70988, 44.76684);
	// add_route_point(0, 41.70983, 44.76722);
	// add_route_point(0, 41.7098, 44.76751);
	// add_route_point(0, 41.70972, 44.76808);
	// add_route_point(0, 41.70947, 44.76947);
	// add_route_point(0, 41.70941, 44.76981);
	// add_route_point(0, 41.70934, 44.77016);
	// add_route_point(0, 41.70929, 44.77042);
	// add_route_point(0, 41.70922, 44.77083);
	// add_route_point(0, 41.70918, 44.77106);
	// add_route_point(0, 41.70903, 44.77188);
	// add_route_point(0, 41.70903, 44.7719);
	// add_route_point(0, 41.70897, 44.77219);
	// add_route_point(0, 41.70887, 44.77286);
	// add_route_point(0, 41.70885, 44.77314);
	// add_route_point(0, 41.70886, 44.77338);
	// add_route_point(0, 41.7089, 44.77362);
	// add_route_point(0, 41.70896, 44.77405);
	// add_route_point(0, 41.70915, 44.77487);
	// add_route_point(0, 41.70919, 44.77514);
	// add_route_point(0, 41.70931, 44.77587);
	// add_route_point(0, 41.70938, 44.77663);
	// add_route_point(0, 41.70939, 44.77686);
	// add_route_point(0, 41.7094, 44.7771);
	// add_route_point(0, 41.70941, 44.77743);
	// add_route_point(0, 41.70941, 44.77758);
	// add_route_point(0, 41.7094, 44.77783);
	// add_route_point(0, 41.70935, 44.77818);
	// add_route_point(0, 41.70928, 44.77862);
	// add_route_point(0, 41.70926, 44.77871);
	// add_route_point(0, 41.70924, 44.7788);
	// add_route_point(0, 41.70915, 44.77924);
	// add_route_point(0, 41.70912, 44.77944);
	// add_route_point(0, 41.70912, 44.77944);
	// add_route_point(0, 41.70906, 44.77964);
	// add_route_point(0, 41.70904, 44.77974);
	// add_route_point(0, 41.7089, 44.78022);
	// add_route_point(0, 41.70863, 44.78129);
	// add_route_point(0, 41.70863, 44.78129);
	// add_route_point(0, 41.70915, 44.78171);
	// add_route_point(0, 41.70982, 44.78235);
	// add_route_point(0, 41.71014, 44.78268);
	// add_route_point(0, 41.71036, 44.78287);
	// add_route_point(0, 41.71081, 44.78326);
	// add_route_point(0, 41.71084, 44.7833);
	// add_route_point(0, 41.71107, 44.78354);
	// add_route_point(0, 41.71111, 44.78358);
	// add_route_point(0, 41.71112, 44.78362);
	// add_route_point(0, 41.71112, 44.78364);
	// add_route_point(0, 41.71112, 44.78367);
	// add_route_point(0, 41.71111, 44.78369);
	// add_route_point(0, 41.71109, 44.7837);
	// add_route_point(0, 41.71105, 44.78373);
	// add_route_point(0, 41.71102, 44.78375);
	// add_route_point(0, 41.71098, 44.78377);
	// add_route_point(0, 41.71093, 44.7838);
	// add_route_point(0, 41.71067, 44.78395);
	// add_route_point(0, 41.71054, 44.78417);
	// add_route_point(0, 41.71054, 44.78417);
	// add_route_point(0, 41.71108, 44.78395);
	// add_route_point(0, 41.71122, 44.7839);
	// add_route_point(0, 41.71135, 44.78383);
	// add_route_point(0, 41.71149, 44.78375);
	// add_route_point(0, 41.71156, 44.78368);
	// add_route_point(0, 41.71156, 44.78368);
	// add_route_point(0, 41.71236, 44.78291);
	// add_route_point(0, 41.71244, 44.78288);
	// add_route_point(0, 41.71253, 44.78286);
	// add_route_point(0, 41.71258, 44.78286);
	// add_route_point(0, 41.71263, 44.78286);
	// add_route_point(0, 41.71267, 44.78288);
	// add_route_point(0, 41.71272, 44.7829);
	// add_route_point(0, 41.71286, 44.78303);
	// add_route_point(0, 41.7129, 44.78306);
	// add_route_point(0, 41.71296, 44.78311);
	// add_route_point(0, 41.713, 44.78315);
	// add_route_point(0, 41.71305, 44.78316);
	// add_route_point(0, 41.71311, 44.78318);
	// add_route_point(0, 41.71317, 44.78319);
	// add_route_point(0, 41.71323, 44.78319);
	// add_route_point(0, 41.71329, 44.78318);
	// add_route_point(0, 41.71332, 44.78318);
	// add_route_point(0, 41.71332, 44.78318);
	// add_route_point(0, 41.71339, 44.78314);
	// add_route_point(0, 41.71346, 44.7831);
	// add_route_point(0, 41.7135, 44.78307);
	// add_route_point(0, 41.71355, 44.78303);
	// add_route_point(0, 41.7136, 44.78298);
	// add_route_point(0, 41.71364, 44.78291);
	// add_route_point(0, 41.71368, 44.78284);
	// add_route_point(0, 41.71371, 44.78277);
	// add_route_point(0, 41.71373, 44.7827);
	// add_route_point(0, 41.71374, 44.78268);
	// add_route_point(0, 41.71375, 44.78264);
	// add_route_point(0, 41.71375, 44.78257);
	// add_route_point(0, 41.71375, 44.7825);
	// add_route_point(0, 41.71373, 44.78242);
	// add_route_point(0, 41.71373, 44.78242);
	// add_route_point(0, 41.71373, 44.78237);
	// add_route_point(0, 41.71373, 44.78231);
	// add_route_point(0, 41.71373, 44.78223);
	// add_route_point(0, 41.71374, 44.78209);
	// add_route_point(0, 41.71378, 44.78174);
	// add_route_point(0, 41.71381, 44.78154);
	// add_route_point(0, 41.71383, 44.78142);
	// add_route_point(0, 41.71386, 44.78131);
	// add_route_point(0, 41.7139, 44.78118);
	// add_route_point(0, 41.714, 44.78086);
	// add_route_point(0, 41.71416, 44.78044);
	// add_route_point(0, 41.71421, 44.78028);
	// add_route_point(0, 41.71427, 44.78014);
	// add_route_point(0, 41.71433, 44.78);
	// add_route_point(0, 41.71443, 44.77982);
	// add_route_point(0, 41.71443, 44.77982);
	// add_route_point(0, 41.71447, 44.77978);
	// add_route_point(0, 41.71455, 44.77971);
	// add_route_point(0, 41.71462, 44.77964);
	// add_route_point(0, 41.71471, 44.77958);
	// add_route_point(0, 41.71528, 44.77924);
	// add_route_point(0, 41.71566, 44.77899);
	// add_route_point(0, 41.71604, 44.77876);
	// add_route_point(0, 41.71614, 44.77871);
	// add_route_point(0, 41.71627, 44.77869);
	// add_route_point(0, 41.71639, 44.77868);
	// add_route_point(0, 41.71654, 44.77868);
	// add_route_point(0, 41.71669, 44.7787);
	// add_route_point(0, 41.71708, 44.77879);
	// add_route_point(0, 41.71715, 44.77886);
	// add_route_point(0, 41.71722, 44.77889);
	// add_route_point(0, 41.71729, 44.7789);
	// add_route_point(0, 41.71742, 44.77889);
	// add_route_point(0, 41.71746, 44.77888);
	// add_route_point(0, 41.71753, 44.77886);
	// add_route_point(0, 41.7177, 44.77881);
	// add_route_point(0, 41.71781, 44.77878);
	// add_route_point(0, 41.71814, 44.77865);
	// add_route_point(0, 41.71861, 44.77849);
	// add_route_point(0, 41.71883, 44.77842);
	// add_route_point(0, 41.71889, 44.7784);
	// add_route_point(0, 41.71896, 44.77837);
	// add_route_point(0, 41.71996, 44.77805);
	// add_route_point(0, 41.72007, 44.77802);
	// add_route_point(0, 41.72018, 44.77798);
	// add_route_point(0, 41.72018, 44.77798);
	// add_route_point(0, 41.72037, 44.77903);
	// add_route_point(0, 41.72051, 44.77978);
	// add_route_point(0, 41.72053, 44.77977);
	// add_route_point(0, 41.72057, 44.77977);
	// add_route_point(0, 41.72059, 44.77977);
	// add_route_point(0, 41.72062, 44.77978);
	// add_route_point(0, 41.72064, 44.7798);
	// add_route_point(0, 41.72067, 44.77985);
	// add_route_point(0, 41.72086, 44.78017);
	// add_route_point(0, 41.72092, 44.78025);
	// add_route_point(0, 41.72098, 44.78032);
	// add_route_point(0, 41.72108, 44.78047);
	// add_route_point(0, 41.72116, 44.78058);
	// add_route_point(0, 41.72124, 44.78078);
	// add_route_point(0, 41.72136, 44.78121);
	// add_route_point(0, 41.72136, 44.78121);
	// add_route_point(0, 41.72153, 44.78111);
	// add_route_point(0, 41.72209, 44.78087);
	// add_route_point(0, 41.72219, 44.78088);
	// add_route_point(0, 41.72225, 44.78089);
	// add_route_point(0, 41.72231, 44.78088);
	// add_route_point(0, 41.72242, 44.78084);
	// add_route_point(0, 41.72272, 44.78074);
	// add_route_point(0, 41.72278, 44.78072);
	// add_route_point(0, 41.7228, 44.78069);
	// add_route_point(0, 41.72286, 44.78021);

}
function handleTourItem(data){
	console.log(data);
	for (i = 0; i < data.length; i++) {
		createTourListDiv(data[i]['name' + lang], data[i].image, data[i].id);
	}
	$('.region').on('click', function() {
		alert($(this).attr('data-id'));
	});
}

function renderTourItem(id) {
	logOperation('tour-item', id);
	clearContent();
	setTitle(name);


	// var url = siteURL + '/api/tour-item.php?id=' + id;
	//
	// $.ajax({
	// 	url: url,
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	contentType: "application/json; charset=utf-8",
	// 	success: function (array) {
	// 		console.log(array)
	// 		createTourItemLayout(array);
	// 	},
	// 	error: function () {
	//
	// 	}
	// });
	var data = {
		tour: new Array(),
		objects: new Array()
	};
	logView(id, 1);
	db.transaction(function (txn) {
					txn.executeSql('SELECT * FROM tours WHERE id = ?', [id], function (tx,resultSet) {
		console.log('turi daiwyooo');
		for(var x = 0; x < resultSet.rows.length; x++) {
			data.tour = (resultSet.rows.item(x));
		}
		console.log('turi morchaaa');
		console.log(data);
					});
	});
	db.transaction(function (txn) {
					txn.executeSql('SELECT * FROM objects WHERE id IN (SELECT object_id FROM tour_objects WHERE tour_id = ?)', [id], function (tx,resultSet) {
		for(var x = 0; x < resultSet.rows.length; x++) {
			data.objects.push(resultSet.rows.item(x));
		}
		console.log('obieqti morchaaa');
		console.log(data);
		createTourItemLayout(data);

		});
	});
}
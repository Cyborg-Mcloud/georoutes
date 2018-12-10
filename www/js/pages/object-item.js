function createObjectItemLayout(data) {
	var object = data;
	contentDiv.innerHTML =
		'<div class="object-item">' +
			'<div class="object-item-image-div">' +
				'<div class="object-item-image" style="background-image: url(' + object.image + ')"></div>' +
				'<div class="object-item-bottom row">' +
					'<div class="object-item-title col-8">' + object['name' + lang]+ '</div>' +
					'<div class="object-item-rating col-4">' +
						'<i class="my-icon my-icon-marker"></i> <span onclick="openReviewPopup(\'object\', ' + object.id + ')">' + (object.rating ? object.rating : '') + '<i class="my-icon my-icon-star-empty-white-bold"></i><span class="object-item-star-quantity">(' + (object.stars ? object.stars : '') + ')</span> </span>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="object-item-padding">' +
				'<div class="object-item-first-row row">' +
					'<div class="col-5"><i class="my-icon icon-2x "></i></div>' +
					'<div class="col-7"><span class="now" id="heart-div"><i class="my-icon my-icon-blue-heart" id="heart"></i> ' + string('button_favourite') + '</span><span class="now ml-2"><i class="my-icon my-icon-share now"></i> ' + string('button_share') + '</span></div></div>' +
				'<div class="object-item-description">' + object['description' + lang] + '</div>' +
			'</div>' +
			'<div id="geo-map"></div>' +
			'<div class="object-item-padding">' +
				'<div class="object-item-infos">' +
					'<a class="object-item-info" href="#"><i class="icon icon-info"></i> ' + object['official_name' + lang] + '</a>' +
					'<a class="object-item-info" href="tel:' + object.number + '"><i class="icon icon-phone"></i> ' + object.number + '</a>' +
					'<a class="object-item-info" href="mailto:' + object.email + '"><i class="icon icon-mail3"></i> ' + object.email + '</a>' +
					'<a class="object-item-info" href="' + object.website + '"><i class="icon icon-earth"></i> ' + object.website + '</a>' +
				'</div>' +
			'</div>' +
			'<div class="object-item-hr"></div> ' +
			'<div class="inner-padding" id="rating-div"></div>' +
		'</div>';
	renderReviews('object', object.id, 'rating-div');
	// createMap('map-map', false);
	// init_map(41.8381203,44.7309707,13);
	init_map(object.latitude,object.longitude,14, 'geo-map', false);
	console.log(object.latitude);
	console.log(object.longitude);
	add_marker(object.latitude, object.longitude, object['name' + lang], object.id, "images/marker.png");

	checkFavourite(object.id, 2, function() {
		$('#heart').removeClass('my-icon-blue-heart');
		$('#heart').addClass('my-icon-blue-heart-full');
	});

	$('#heart-div').on('click', function() {
		console.log('asdf');
		handleHeart(object.id, 2, this, function() {
			$('#heart').removeClass('my-icon-blue-heart');
			$('#heart').addClass('my-icon-blue-heart-full');
		}, function() {
			$('#heart').removeClass('my-icon-blue-heart-full');
			$('#heart').addClass('my-icon-blue-heart');
		})
	});


	// live_loc = 0;
	// mzoom = 15;
	// mlng = parseFloat(object.longitude);
	// mlat = parseFloat(object.latitude);
	// set_map_center();
	// map.panTo(new L.LatLng(40.737, -73.923));

	// mlat = 41.7712;
	// mlng = 44.7525;
	// add_marker(41.8378,44.7311, "ლიკას სახლი", 167, "https://smartgps.ge/ika/rest.png");
}

function renderObjectItem(id) {
	logOperation('object-item', id);
	clearContent();
	setTitle(name);

	logView(id, 2);
	// var url = siteURL + '/api/object-item.php?id=' + id;
	//
	// $.ajax({
	// 	url: url,
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	contentType: "application/json; charset=utf-8",
	// 	success: function (array) {
	// 		console.log(array);
	// 		createObjectItemLayout(array);
	// 	},
	// 	error: function () {
	//
	// 	}
	// });
	db.executeSql('SELECT * FROM objects WHERE id = ?', [id], function (resultSet) {
		createObjectItemLayout(resultSet.rows.item(0));
	});
}
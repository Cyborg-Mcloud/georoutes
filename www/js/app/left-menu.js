function updateLeftCategories() {

	// var url = siteURL + '/api/object-categories.php';
	//
	// $.ajax({
	// 	url: url,
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	contentType: "application/json; charset=utf-8",
	// 	success: function (array) {
	// 		handleLeftCategories(array);
	// 	},
	// 	error: function () {
	//
	// 	}
	// });
	db.transaction(function (txn) {
					txn.executeSql('SELECT * FROM object_categories', [], function (tx,resultSet) {
		var data = new Array();
		for(var x = 0; x < resultSet.rows.length; x++) {
			data.push(resultSet.rows.item(x));
			// console.log(resultSet.rows.item(x));
		}
		handleLeftCategories(data);
					});
	});
}
function handleLeftCategories(data){
	var categorySubMenu = $('#sub-menu-categories');
	categorySubMenu.html('');
	for (i = 0; i < data.length; i++) {
		categorySubMenu.append('' +
			'<a href="#" class="sub-category-item" data-id="' + data[i].id + '">' +
				'<div class="row">' +
					'<div class="col-3 sub-menu-icon"><img src="' + data[i].image + '" /> </div>' +
					'<div class="col-9">' + data[i]['name' + lang] + '</div>' +
				'</div>' +
			'</a>');
	}
	$('.sub-category-item').on('click', function() {
		var id = $(this).attr('data-id');
		renderObjectList(id);
		menuCloseClick('left');
		// if (searchCategory != id) {
		// 	$('.sub-category-item').removeClass('active');
		// 	$(this).addClass('active');
		// 	searchCategory = id;
		// }
		// else {
		// 	$(this).removeClass('active');
		// 	searchCategory = 0;
		// }
	});
}
function updateNearest() {
	// var onSuccess = function(position) {
	// 	alert('Latitude: '          + position.coords.latitude          + '\n' +
	// 		'Longitude: '         + position.coords.longitude         + '\n' +
	// 		'Altitude: '          + position.coords.altitude          + '\n' +
	// 		'Accuracy: '          + position.coords.accuracy          + '\n' +
	// 		'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	// 		'Heading: '           + position.coords.heading           + '\n' +
	// 		'Speed: '             + position.coords.speed             + '\n' +
	// 		'Timestamp: '         + position.timestamp                + '\n');
	// };
	//
	// // onError Callback receives a PositionError object
	// //
	// function onError(error) {
	// 	alert('code: '    + error.code    + '\n' +
	// 		'message: ' + error.message + '\n');
	// }
	//
	// navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
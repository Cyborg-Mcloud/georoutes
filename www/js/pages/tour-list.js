function createTourListLayout() {
	contentDiv.innerHTML =
		'<div class="tour-list-categories row">' +
			'<div class="tour-list-category active col-4" data-id="tour-popular">' + string('tour_list_popular') + '<br><div class="tour-list-category-dot"></div></div>' +
			'<div class="tour-list-category col-4" data-id="tour-new">' + string('tour_list_new') + '<br><div class="tour-list-category-dot"></div></div>' +
			'<div class="tour-list-category col-4" data-id="tour-recommended">' + string('tour_list_recommended') + '<br><div class="tour-list-category-dot"></div></div>' +
		'</div>';
	var div = document.createElement("div");
	div.className = "tour-list active";
	div.id = "tour-popular";
	contentDiv.appendChild(div)

	var div = document.createElement("div");
	div.className = "tour-list";
	div.id = "tour-new";
	contentDiv.appendChild(div)

	var div = document.createElement("div");
	div.className = "tour-list";
	div.id = "tour-recommended";
	contentDiv.appendChild(div);

	$('.tour-list-category').click(function() {
		if ($(this).hasClass("active")) {
		} else {
			var activeDiv = $('.tour-list-category.active');
			var thisDiv = this;
			var divFade = '#' + activeDiv.attr('data-id');
			if ($(divFade).is(":visible")) {
				$(divFade).fadeOut("fast", function() {
					activeDiv.removeClass('active');
					$(thisDiv).addClass('active');
					$('#' + thisDiv.getAttribute('data-id')).fadeIn("fast");
				});
			} else {
				activeDiv.removeClass('active');
				$(thisDiv).addClass('active');
				$('#' + thisDiv.getAttribute('data-id')).fadeIn("fast");
			}
		}
	})
}

function createTourListDiv(text, image, id, tourListDiv) {
	var div = document.createElement("div");
	div.className = "tour-list-item";
	div.setAttribute('data-id', id);

	var detailDiv = document.createElement("div");
	detailDiv.className = "tour-list-item-photo jarallax";
	detailDiv.style.backgroundImage = 'url(\'' + image + '\')';

	var textDiv = document.createElement("div");
	textDiv.className = "tour-list-item-text";
	textDiv.innerHTML = text;

	div.appendChild(detailDiv);
	div.appendChild(textDiv);
	tourListDiv.appendChild(div);

	return div;
}
function handleTours(data, div){
	console.log('aq  asdfasdfkivar');
	console.log(data);
	console.log(data.length);
	console.log(div);
	div = document.getElementById(div);
	for (i = 0; i < data.length; i++) {
		createTourListDiv(data[i]['name' + lang], data[i].image, data[i].id, div);
	}
	$('.jarallax').jarallax({
		speed: 0.85
	});
	$('.tour-list-item').on('click', function() {
		renderTourItem($(this).attr('data-id'));
	});
}

function renderTourList(id, name) {
	logOperation('tours', [id, name]);
	clearContent();
	setTitle(name);
	createTourListLayout();
	setRegion(id, name);

	console.log('aq  kivar');
	db.transaction(function (txn) {
					txn.executeSql('SELECT * FROM tours WHERE id IN (SELECT tour_id FROM tour_regions WHERE region_id = ?)', [id], function (tx,resultSet) {
		var data = new Array();
		for(var x = 0; x < resultSet.rows.length; x++) {
			data.push(resultSet.rows.item(x));
		}
		console.log('aq  tour-new');
		console.log(data);
		handleTours(data, 'tour-new');
		});
	});
	db.transaction(function (txn) {
					txn.executeSql('SELECT * FROM tours WHERE id IN (SELECT tour_id FROM tour_regions WHERE region_id = ?) AND is_recommended = 1', [id], function (tx,resultSet) {
		var data = new Array();
		for(var x = 0; x < resultSet.rows.length; x++) {
			data.push(resultSet.rows.item(x));
		}
		console.log('aq  tour-recomend');
		console.log(data);
		handleTours(data, 'tour-recommended');
		});
	});
	db.transaction(function (txn) {
					txn.executeSql('SELECT * FROM tours WHERE id IN (SELECT tour_id FROM tour_regions WHERE region_id = ?) AND is_popular = 1', [id], function (tx,resultSet) {
		var data = new Array();
		for(var x = 0; x < resultSet.rows.length; x++) {
			data.push(resultSet.rows.item(x));
		}
		console.log('aq  tour-pop');
		console.log(data);

		handleTours(data, 'tour-popular');
		});
	});

	// var url = '';
	// if (id) url = siteURL + '/api/tours.php?region=' + id;
	// else url = siteURL + '/api/tours.php';
	//
	//
	// $.ajax({
	// 	url: url,
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	contentType: "application/json; charset=utf-8",
	// 	success: function (arr) {
	// 		handleTours(arr, 'tour-new');
	// 	},
	// 	error: function () {
	// 		alert('2');
	// 	}
	// });
	//
	// url = siteURL + '/api/tours.php?recommended=1&region=' + id;
	//
	// $.ajax({
	// 	url: url,
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	contentType: "application/json; charset=utf-8",
	// 	success: function (arr) {
	// 		handleTours(arr, 'tour-recommended');
	// 	},
	// 	error: function () {
	// 		alert('2');
	// 	}
	// });
	//
	// url = siteURL + '/api/tours.php?popular=1&region=' + id;
	//
	// $.ajax({
	// 	url: url,
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	contentType: "application/json; charset=utf-8",
	// 	success: function (arr) {
	// 		handleTours(arr, 'tour-popular');
	// 	},
	// 	error: function () {
	// 		alert('2');
	// 	}
	// });
}
var searchCategory = 0;

function handleSearchResults(data) {
	// $(div).fadeIn();

	var div = createCustomList(contentDiv);

	for (var i = 0; i < data.length; i++) {
		createCustomListDiv(data[i]['name' + lang], data[i].image, data[i].id, data[i].type, div, true, data[i].rating, data[i].ratingQuantity);
	}
	$('.jarallax').jarallax({
		speed: 0.85
	});
	$('.tour-list-item').on('click', function() {
		renderTourItem($(this).attr('data-id'));
	});
}

function setSearchCategory(id) {
	if (id) {
		searchCategory = id;
		setCategoryNameToSearch(id);
	}
	else {
		searchCategory = 0;
		updateSearchPlaceholder();
	}
}
function setCategoryNameToSearch(id) {
	db.executeSql('SELECT `name_ge`, `name_en` FROM object_categories WHERE id = ?', [id], function (resultSet) {
		var category = resultSet.rows.item(0);
		updateSearchPlaceholder( category['name' + lang] );
	});
}
function updateSearchPlaceholder(text) {
	if (text) $('#left-menu-search').attr('placeholder', text);
	else $('#left-menu-search').attr('placeholder', string('left_menu_search_placeholder'));
}

function renderSearch(searchTerm) {
	logOperation('search', searchTerm);
	clearContent();
	setTitle( string('search_title') );
	// var url = siteURL + '/api/search.php';
	// var category = '';
	// if (searchCategory) category = '&category=' + encodeURIComponent(searchCategory);
	//
	// $.ajax({
	// 	url: url,
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	data: 'search=' + encodeURIComponent(searchTerm) + category,
	// 	contentType: "application/json; charset=utf-8",
	// 	success: function (array) {
	// 		handleSearchResults(array);
	// 	},
	// 	error: function () {
	// 		showAjaxError();
	// 	}
	// });
	var query = '';
	var parameters = new Array();
	searchTerm = '%' + searchTerm + '%';
	if (searchCategory) {
		query = 'SELECT id, name_ge, name_en, `image`, 2 as `type`, rating, `stars` FROM objects WHERE category = ? AND (name_ge LIKE ? OR name_en LIKE ?) ORDER BY name_en ASC';
		parameters.push(searchCategory);
		parameters.push(searchTerm);
		parameters.push(searchTerm);
	}
	else {
		query = 'SELECT id, name_ge, name_en, `image`, 1 as `type`, rating, `stars` FROM tours WHERE name_ge LIKE ? OR name_en LIKE ? UNION SELECT id, name_ge, name_en, `image`, 2 as `type`, rating, `stars` FROM objects WHERE name_ge LIKE ? OR name_en LIKE ? ORDER BY name_en ASC';
		parameters.push(searchTerm);
		parameters.push(searchTerm);
		parameters.push(searchTerm);
		parameters.push(searchTerm);
	}
	console.log(query);
	console.log(parameters);

	db.executeSql(query, parameters, function (resultSet) {
		var data = new Array();
		for(var x = 0; x < resultSet.rows.length; x++) {
			data.push(resultSet.rows.item(x));
			// console.log(resultSet.rows.item(x));
		}
		handleSearchResults(data);
	});
}

// სერჩზე მისაბმელი

function doSearch() {
	renderSearch( $('#left-menu-search').val() );
	menuCloseClick('left');
}

$(function() {
	$('#menu-search-form').submit(function ( event ) {
		doSearch();
		event.preventDefault();
	});


	// $(".search-close-tigger").click(function(){
	// 	doSearch();
	// });
});

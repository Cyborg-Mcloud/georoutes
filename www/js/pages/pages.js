var contentDiv, headerTitleDiv;
var lang = '';
var chosenRegion = false;
var siteURL = 'http://georoads.design.ge';

function bodyLoad() {
	lang = getLanguage();
	contentDiv = document.getElementById('content');
	headerTitleDiv = document.getElementById('header-title');
	console.log('vqeni');
	console.log(contentDiv);
	// renderRegions();
	console.log("connecting");
	connectDB();
	connectUserDB();
		localStorage.setItem("launched", '0');
	console.log("connected "+localStorage.getItem("launched"));
	if (localStorage.getItem("launched") != '1') 
		{
		console.log("vqmni db-ebs");
		createDB();
		createUserDB();
		console.log("createbi");
		synchronize();
		localStorage.setItem("launched", '1');
		}
	else {
		setTimeout("timedelay()",1000);
	}
	updateLeftMenuStrings();
	renderRightMenuList();
}

function timedelay()
	{
	showHome();
	updateLeftCategories();
	updateNearest();
	}

function clearContent(page) {
	removeExistingMap(mymap);
	mymap = null;
	contentDiv.innerHTML = '';
	// clean_map();
	if (page !== 'object-list') setSearchCategory(0);
	// $(contentDiv).fadeOut("normal", function() {
	// 	contentDiv.innerHTML = '';
	// 	$(contentDiv).show();
	// });
}

function setTitle(title) {
	if (title.length > 0) headerTitleDiv.style.display = 'block';
	else headerTitleDiv.style.display = 'none';
	headerTitleDiv.innerHTML = title;
}

// var lastOperation = ''; // გამოიყენება უკან დაბრუნების ღილაკზე დაჭერისას
// var currentOperation = ''; // ესეც
// var lastOperationParam = ''; // ესეც
// function logOperation(operation, parameter) {
// 	lastOperation = currentOperation;
// 	lastOperationParam = parameter;
// 	currentOperation = operation;
// }
// function callLastOperation() {
// 	switch (lastOperation) {
// 		case 'region': renderRegions(); break;
// 		case 'tours': renderTourList(lastOperationParam); break;
// 		case 'registration': renderRegistration(); break;
// 		case 'tour-item': renderTourItem(lastOperationParam); break;
// 	}
// }

var lastOperation = [] // გამოიყენება უკან დაბრუნების ღილაკზე დაჭერისას
var currentOperation = []; // ესეც
var lastOperationParam = []; // ესეც
var currentOperationParam = []; // ესეც

function logOperation(operation, parameter) {
	lastOperation.push(currentOperation);
	lastOperationParam.push(currentOperationParam);
	currentOperation = operation;
	if (!parameter) parameter = 0;
	if (typeof(parameter) == "object") currentOperationParam = parameter;
	else currentOperationParam = [parameter];
}
function callLastOperation() {
	var operation = lastOperation[lastOperation.length - 1];
	var operationParam = lastOperationParam[lastOperationParam.length - 1];
	console.log(operation);
	console.log(operationParam);
	switch (operation) {
		case 'region': renderRegions(); break;
		case 'tours': renderTourList(operationParam[0], operationParam[1]); break;
		case 'registration': renderRegistration(); break;
		case 'login':  renderLogin(); break;
		case 'tour-item': renderTourItem(operationParam); break;
		case 'object-item': renderObjectItem(operationParam); break;
		case 'object-list': renderObjectList(operationParam); break;
		case 'search': renderSearch(operationParam); break;
		case 'history': renderHistory(); break;
		case 'favourites': renderFavourites(); break;
	}
	lastOperation.pop(); lastOperationParam.pop();
	lastOperation.pop(); lastOperationParam.pop();
}

function showHome() {
	if (getRegion()) renderTourList(getRegion(), getRegionName());
	else renderRegions();
}
// menu
function renderRightMenuList() {
	var div = $('#menu-right-content');
	if (isLogged()) {
		div.html('' +
			'<div class="menu-profile row">' +
				'<div class="col-4 menu-user-icon" style="text-align: center;"><i class="icon icon-user" style="font-size: 2.5em; border-radius:50%; border: 3px solid white; padding: 8px; display: inline-block"></i></div>' +
				'<div class="col-8 menu-user-info">' +
					'<div class="menu-user-username">' + getUser()['fullname'] + '</div>' +
					'<div class="menu-user-location">ადგილმდეობა - ხზ</div>' +
				'</div>' +
			'</div>' +
			'' +
			'<a class="menu-button-style" href="#" onClick="renderHistory();"><i class="icon icon-eye"></i> ' + string('menu_right_history') + '</a>' +
			'<a class="menu-button-style" href="#" onClick="renderFavourites()"><i class="icon icon-heart"></i> ' + string('menu_right_favourites') + '</a>' +
			'<a class="menu-button-style" href="#"><i class="icon icon-road"></i> ' + string('menu_right_tours') + '</a>' +
			'<a class="menu-button-style" href="#"><i class="icon icon-star-full"></i> ' + string('menu_right_rated') + '</a>' +
			'<a class="menu-button-style" href="#" onClick="renderRegions(); closeAndUpdateRightMenu()"><i class="icon icon-earth"></i> ' + string('menu_right_change_region') + '</a>' +
			'<a class="button-secondary mt-4" href="#reg" onClick="logOut()">' + string('menu_right_logout') + '</a>');
	}
	else {
		div.html('<a class="menu-button-style mt-4" href="#" onClick="doManualSync(); closeAndUpdateRightMenu()"><i class="icon icon-earth"></i> ' + string('menu_sync') + '</a>' +
		'<a class="button-primary mt-1" href="#reg" onClick="renderLogin(); closeAndUpdateRightMenu()">' + string('menu_right_login') + '</a>' +
		' <a class="button-secondary mt-1" href="#reg" onClick="renderRegistration()">' + string('menu_right_register') + '</a>' +
			'<a class="menu-button-style mt-4" href="#" onClick="renderRegions(); closeAndUpdateRightMenu()"><i class="icon icon-arrow-down"></i> ' + string('menu_right_change_region') + '</a>');
	}
	if (getLanguage() === '_ge') div.append('<div onclick="setLanguage(\'en\')" class="menu-languages mt-3"><img height="24" src="images/eng.png" /> <span>English</span></div>');
	else if (getLanguage() === '_en') div.append('<div onclick="setLanguage(\'ge\')" class="menu-languages mt-3"><img height="24" src="images/geo.png" /> <span>ქართული</span></div>')
}

function closeAndUpdateRightMenu() {
	menuCloseClick('right');
	setTimeout(function() {renderRightMenuList()}, 1000);
}
// მარცხენა მენიუ

function updateLeftMenuStrings() {
	$('#left-menu-categories').html( string('left_menu_categories') );
	$('#left-menu-nearest').html( string('left_menu_nearest') );
	// updateSearchPlaceholder( string('left_menu_search_placeholder') );
	updateSearchPlaceholder();
	// $('#left-menu-search').attr('placeholder', string('left_menu_search_placeholder') );
}

function escapeHtml(text) {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};

	return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}


/*function createCustomListDiv(text, image, id, type, div, isShareable, stars, starQuantity) {
	/!* type:
	* 1 - ტური
	* 2 - ობიექტი
	*!/
	// stars = 3;
	// starQuantity = 10;

	switch (type) {
		case 1: typeClass = 'my-icon-route'; functionName = 'renderTourItem'; break;
		case 2: typeClass = 'my-icon-marker'; functionName = 'renderObjectItem'; break;
	}

	$(div).append('' +
		'<div class="custom-list-item row">' +
			'<div class="col-2 custom-list-icon"><i class="my-icon ' + typeClass + ' my-icon-black"></i></div>' +
			'<div class="col-10" onclick="' + functionName + '(' + id + ')">' +
				'<div class="custom-list-title">' + escapeHtml(text) + '</div>' +
				'<div class="custom-list-bottom row">' +
					'<div class="custom-list-rating col-6">' + renderStars(stars, starQuantity, 1, false) + '</div> ' +
					(isShareable ? '<div class="custom-list-share col-6" onclick="event.stopPropagation(); window.plugins.socialsharing.share(\'' + escapeHtml(text) + '\', \'The subject\')"><i class="icon icon-earth"></i> ' + string('share') + '</div>' : '') +
				'</div>' +
			'</div>' +
		'</div>');

}*/

function createCustomList(parentDiv) {
	var div = document.createElement("div");
	div.className = "custom-list";
	parentDiv.appendChild(div);
	return div;
}
function createCustomListDiv(text, image, id, type, div, isShareable, stars, starQuantity) {
	/* type:
	* 1 - ტური
	* 2 - ობიექტი
	*/
	// stars = 3;
	// starQuantity = 10;

	switch (type) {
		case 1: typeClass = 'my-icon-route'; functionName = 'renderTourItem'; break;
		case 2: typeClass = 'my-icon-marker'; functionName = 'renderObjectItem'; break;
	}

	$(div).append('' +
		'<div class="custom-list-item">' +
			'<div class="custom-list-item-photo jarallax" onclick="' + functionName + '(' + id + ')" style="background-image: url(\'' + image + '\')"></div>' +
			'<div class="custom-list-item-text">' + escapeHtml(text) + '</div>' +
			'<div class="custom-list-item-bottom">' +
				'<div class="float-left custom-list-icon"><i class="my-icon ' + typeClass + '"></i></div>' +
				'<span class="float-right">' + (stars ? stars + '<i class="my-icon icon-0-8x my-icon-star-empty-white-bold"></i>' : '') + '</span>' +
			'</div>' +
		'</div>');

	// '<div class="custom-list-rating col-6">' + renderStars(stars, starQuantity, 1, false) + '</div> ' +
	// (isShareable ? '<div class="custom-list-share col-6" onclick="event.stopPropagation(); window.plugins.socialsharing.share(\'' + escapeHtml(text) + '\', \'The subject\')"><i class="icon icon-earth"></i> ' + string('share') + '</div>' : '') +


}

function showToast(message, delay) {
	// delay - short, long
	if (window.plugins) {
		if (window.plugins.toast) {
			window.plugins.toast.showWithOptions(
				{
					message: message,
					duration: delay, // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
					position: "bottom",
					addPixelsY: -40  // added a negative value to move it up a bit (default 0)
				}
			);
		}
	}
	else console.log(message);
}
function showAjaxError() {
	showToast( string('ajax_error') , 'long');
}

// function showToast() {
// 	window.plugins.toast.showShortTop('Hello there!', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
// }


function logView(id, type) {
	console.log('LOG DAIWYO' + id + ' t: ' + type);
	userDB.transaction(function (txn) {
					txn.executeSql('SELECT `record_id` FROM history WHERE type = ? ORDER BY id DESC LIMIT 1;', [type], function (tx,resultSet) {
		console.log('LOG GAGRDZELDA');
		var lastHistoryItem = resultSet.rows.item(0);
		console.log(lastHistoryItem);
		if (lastHistoryItem) {
			if (lastHistoryItem['record_id'] != id) {
				console.log('არაა ბოლო');
				userDB.transaction(function (txn) {
					txn.executeSql('INSERT INTO history(`record_id`, `type`) VALUES (?, ?)', [id, type], function (tx,resultSet) {
					console.log('history record added');
					});
				});
			} else {
				console.log('ბოლოა');
			}
		} else {
			userDB.transaction(function (txn) {
					txn.executeSql('INSERT INTO history(`record_id`, `type`) VALUES (?, ?)', [id, type], function (tx,resultSet) {
				console.log('history record added');
					});
			});
		}
					});
	});
}

function renderFullScreenMap() {
	clearContent();
	setTitle('');
	$(contentDiv).html('<div id="fullscreen-map"></div>');
	init_map(41.8381203,44.7309707,13, 'fullscreen-map', true);
}
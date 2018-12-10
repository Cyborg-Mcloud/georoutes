//
// function createRegionDiv(text, image) {
// 	var div = document.createElement("div");
// 	div.className = "region";
// 	div.style.position = "relative";
// 	div.style.width = "100%";
//
// 	var detailDiv = document.createElement("div");
// 	detailDiv.className = "detail-main-photo";
// 	detailDiv.style.backgroundImage = image;
//
// 	var textDiv = document.createElement("div");
// 	textDiv.textAlign = "center";
// 	textDiv.position = "absolute";
// 	textDiv.offsetTop = "90px";
// 	textDiv.color = "white";
// 	textDiv.fontSize = "20px";
//
// 	div.appendChild(detailDiv);
// 	div.appendChild(textDiv);
// 	document.getElementById('content').appendChild(div);
// 	return div;
// }

function returnRegion(text, image) {
	return '<div class="region" style="position: relative; width: 100%;"><div class="detail-main-photo" style="background-image: url(\'' + image + '\')"></div> <div style="text-align: center; position: absolute; top: 90px; color: white; font-size: 20px;">' + text + '</div></div>';
}
function createRegionDiv(text, image, id) {

	var div = document.createElement("div");
	div.className = "region";
	div.setAttribute('data-id', id);
	div.setAttribute('data-name', text);

	var detailDiv = document.createElement("div");
	detailDiv.className = "detail-main-photo jarallax";
	detailDiv.style.backgroundImage = 'url(\'' + image + '\')';

	var textDiv = document.createElement("div");
	textDiv.className = "text-div";
	textDiv.innerHTML = text;

	div.appendChild(detailDiv);
	div.appendChild(textDiv);
	document.getElementById('content').appendChild(div);

	return div;
}
function handleRegions(arr){
	console.log('arrrrrrrrrrr');
	console.log(arr);
	console.log('arrrrrrrrrrr 2');
	console.log(arr[0].name + lang);
	// console.log(arr[0]['name' + lang]);
	console.log(arr[0].image);
	// var textPropery = 'name' + lang;
	for (i = 0; i < arr.length; i++) {
		// document.getElementById('content').innerHTML += returnRegion(arr[i].name_ge, arr[i].image)
		var target = createRegionDiv(arr[i]['name' + lang], arr[i].image, arr[i].id);
		target = target.children[0];

		console.log('a');
		// ImgCache.isBackgroundCached(target, function(path, success) {
		// 	if (success) {
		// 		console.log('is');
		// 		// already cached
		// 		ImgCache.useCachedBackground(target);
		// 	} else {
		// 		console.log('notis');
		// 		// not there, need to cache the image
		//
		// 		var bg = $(target).css('background-image');
		// 		bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
		// 		ImgCache.cacheFile(bg, function () {
		// 			console.log('gamovida');
		// 			ImgCache.useCachedBackground(target);
		// 		});
		// 	}
		// });
		console.log('b');
	}
	$('.jarallax').jarallax({
		speed: 0.85
	});
	// for (x in arr) {
	// 	txt += arr[x].name_ge + "<br>";
	// }
	// console.log(txt);
	//document.write(abc.tbilisi) //your JSON resuls are now in arr. Do what you need with the array.

	$('.region').on('click', function() {
		// alert($(this).attr('data-id'));
		renderTourList($(this).attr('data-id'), $(this).attr('data-name'));
	})
}

function renderRegions() {
	logOperation('region');
	clearContent();
	setTitle(string('regions_title'));

	// $.ajax({
	// 	url: siteURL + "/api/regions.php",
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	contentType: "application/json; charset=utf-8",
	// 	success: function (arr) {
	// 		handleRegions(arr);
	// 	},
	// 	error: function () {
	// 		alert('2');
	// 	}
	// });
	// handleRegions(loadRegions());
	//handleRegions(getData('regions'));
	var data = new Array();
	db.transaction(function (txn) {
		txn.executeSql('SELECT * FROM regions', [], function (tx,resultSet) {
		for(var x = 0; x < resultSet.rows.length; x++) {
			data.push(resultSet.rows.item(x));
			// console.log(resultSet.rows.item(x));
		}
		handleRegions(data);
		});
	});
}


function setRegion(id, name) {
	localStorage.setItem("region", id);
	localStorage.setItem("region_name", name);
	chosenRegion = id;
}
function getRegion() {
	return localStorage.getItem("region");
}
function getRegionName() {
	return localStorage.getItem("region_name");
}
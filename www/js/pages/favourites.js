function handleHistoryItems(data) {

	var div = createCustomList(contentDiv);

	console.log(data);
	if (data) {
		for (var i = 0; i < data.length; i++) {
			console.log(data[i]);
			createCustomListDiv(data[i]['name' + lang], data[i].image, data[i].id, data[i].type, div, true, data[i].rating, data[i].ratingQuantity);
		}
	}
}
// function renderHistory() {
// 	logOperation('history');
// 	clearContent();
// 	setTitle( string('history_title') );
//
// 	userDB.executeSql('SELECT record_id FROM history ORDER BY id DESC', [], function (resultSet) {
// 		var data = new Array();
// 		var historyItem;
// 		for(var x = 0; x < resultSet.rows.length; x++) {
// 			// data.push(resultSet.rows.item(x));
// 			historyItem = resultSet.rows.item(x);
// 			db.executeSql('SELECT * FROM objects WHERE id = ?', [historyItem['object_id']], function (resultSet) {
// 				data.push(resultSet.rows.item(0));
// 			});
// 			// console.log(resultSet.rows.item(x));
// 		}
// 		handleHistoryItems(data);
// 	});
// }

function renderFavourites() {

	logOperation('favourites');
	clearContent();
	setTitle( string('favourites_title') );

	userDB.transaction(function (txn) {
					txn.executeSql('SELECT record_id, type FROM favourites ORDER BY id DESC', [], function (tx,resultSet) {
		var data = new Array();
		var favouriteItem;
		var maxX = resultSet.rows.length;
		var currentX = 0;
		for(var x = 0; x < maxX; x++) {
			console.log('asdf');
			favouriteItem = resultSet.rows.item(x);
			console.log(favouriteItem['record_id']);
			var tableName = '';
			console.log('table' +  favouriteItem['type']);
			switch (favouriteItem['type']) {
				case 1: tableName = 'tours'; break;
				case 2: tableName = 'objects'; break;
			}
			console.log(tableName);

			db.transaction(function (txn) {
					txn.executeSql('SELECT *, ? as `type` FROM ' + tableName + ' WHERE id = ?', [favouriteItem['type'], favouriteItem['record_id']], function (tx,resultSet) {
				console.log(resultSet.rows.item(0));
				data.push(resultSet.rows.item(0));
				currentX++;
				if (currentX == maxX) {
			 		handleHistoryItems(data);
				}
					});
			});
		}
		});
	});
}

// სერჩზე მისაბმელი

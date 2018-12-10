function addToFavourites(id, type) {
	console.log('Favourites LOG DAIWYO' + id + ' t: ' + type);
	userDB.transaction(function (txn) {
		txn.executeSql('SELECT count(*) as total FROM favourites WHERE type = ? AND record_id = ?', [type, id], function (tx,resultSet) {
		console.log('FAV LLOG GAGRDZELDA');
		var favouriteCount = resultSet.rows.item(0);
		console.log(favouriteCount);
		if (favouriteCount) {
			if (favouriteCount['total'] == 0) {
				console.log('არაა ფავორიტებში');
				userDB.transaction(function (txn) {
					txn.executeSql('INSERT INTO favourites(`record_id`, `type`) VALUES (?, ?)', [id, type], function (tx,resultSet) {
					console.log('ფავორიტებში დაემატა');
					});
				});
			} else {
				console.log('ფავორიტებშია ისედაც');
			}
		} else {
			userDB.transaction(function (txn) {
					txn.executeSql('INSERT INTO favourites(`record_id`, `type`) VALUES (?, ?)', [id, type], function (tx,resultSet) {
				console.log('დაემატა ფავორიტებში');
					});
			});
		}
		});
	});
}

function checkFavourite(id, type, success) {
	userDB.transaction(function (txn) {
					txn.executeSql('SELECT count(*) as total FROM favourites WHERE type = ? AND record_id = ?', [type, id], function (tx,resultSet) {
		var favouriteCount = resultSet.rows.item(0);

		if (favouriteCount) {
			if (favouriteCount['total'] == 0) {
				console.log('არ არის მოწონებული');
			} else {
				console.log('მოწონებულია');
				success();
			}
		} else {
			console.log('მოწონებულია');
		}
					});
	});
}


function removeFromFavourites(id, type) {
	console.log('Favourites LOG DAIWYO' + id + ' t: ' + type);
	userDB.transaction(function (txn) {
					txn.executeSql('DELETE FROM favourites WHERE type = ? AND record_id = ?', [type, id], function (tx,resultSet) {
		console.log('ფავორიტებიდან ამოიშალა');
		console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
					});
	});
}

function handleHeart(id, type, div, addFunction, removeFunction) {
	console.log('1+1');
	if ($('#heart').hasClass('my-icon-blue-heart')) {
		console.log('1+2');
		addToFavourites(id, type);
		addFunction();
	}
	else if ($('#heart').hasClass('my-icon-blue-heart-full')) {
		console.log('1+3');
		removeFromFavourites(id, type);
		removeFunction();
	}
}
var mainDBName = 'data.db';
var db;
var userDBName = 'user.db';
var userDB;

var dbconnected=0;
function deleteDatabase() {
	window.sqlitePlugin.deleteDatabase({name: mainDBName, location: 'default'}, function () {console.log('ბაზა წაიშალა')}, function(error) {console.log('შეცდომა' + error)});
}
function createDB() {

		db.transaction(function (tx) {
			// ...
			tx.executeSql('CREATE TABLE IF NOT EXISTS tours (id INTEGER PRIMARY KEY AUTOINCREMENT, name_ge TEXT, name_en TEXT, description_ge TEXT, description_en TEXT, image TEXT, status INTEGER, owner_id INTEGER, rating REAL,  stars INTEGER, priority INTEGER, is_recommended INTEGER, is_popular INTEGER, tour_driving_map_data TEXT, tour_walking_map_data TEXT)');
			tx.executeSql('CREATE TABLE IF NOT EXISTS tour_regions (id INTEGER PRIMARY KEY AUTOINCREMENT, tour_id INTEGER, region_id INTEGER)');
			tx.executeSql('CREATE TABLE IF NOT EXISTS tour_objects (id INTEGER PRIMARY KEY AUTOINCREMENT, tour_id INTEGER, object_id INTEGER)');
			tx.executeSql('CREATE TABLE IF NOT EXISTS objects (id INTEGER PRIMARY KEY AUTOINCREMENT, name_ge TEXT, name_en TEXT, description_ge TEXT, description_en TEXT, image TEXT, rating REAL, stars INTEGER, latitude TEXT, longitude TEXT, category INTEGER, address TEXT, number TEXT, official_name_ge TEXT, official_name_en TEXT, website TEXT, email TEXT)');
			tx.executeSql('CREATE TABLE IF NOT EXISTS object_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name_ge TEXT, name_en TEXT, image TEXT)');
			tx.executeSql('CREATE TABLE IF NOT EXISTS regions (id INTEGER PRIMARY KEY AUTOINCREMENT, name_ge TEXT, name_en TEXT, image TEXT, priority INTEGER)');

			// tx.executeSql('CREATE TABLE customerAccounts (firstname, lastname, acctNo)');
		}, function (error) {
			console.log('transaction error: ' + error.message);
		}, function () {
			console.log('transaction ok');
		});
}
function connectDB() {
	db = window.sqlitePlugin.openDatabase({ name: mainDBName, location: 'default' }, function (db) {
	console.log("mivertdi "+mainDBName);
	dbconnected=1;
	}, function (error) {
		console.log('Open database ERROR: ' + JSON.stringify(error));
		dbconnected=0;
	});
}

function doManualSync() {
	window.sqlitePlugin.deleteDatabase({name: mainDBName, location: 'default'}, function () {
		db = window.sqlitePlugin.openDatabase({ name: mainDBName, location: 'default' }, function (db) {

			db.transaction(function (tx) {
				// ...
				tx.executeSql('CREATE TABLE IF NOT EXISTS tours (id INTEGER PRIMARY KEY AUTOINCREMENT, name_ge TEXT, name_en TEXT, description_ge TEXT, description_en TEXT, image TEXT, status INTEGER, owner_id INTEGER, rating REAL,  stars INTEGER, priority INTEGER, is_recommended INTEGER, is_popular INTEGER, tour_driving_map_data TEXT, tour_walking_map_data TEXT)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS tour_regions (id INTEGER PRIMARY KEY AUTOINCREMENT, tour_id INTEGER, region_id INTEGER)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS tour_objects (id INTEGER PRIMARY KEY AUTOINCREMENT, tour_id INTEGER, object_id INTEGER)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS objects (id INTEGER PRIMARY KEY AUTOINCREMENT, name_ge TEXT, name_en TEXT, description_ge TEXT, description_en TEXT, image TEXT, rating REAL, stars INTEGER, latitude TEXT, longitude TEXT, category INTEGER, address TEXT, number TEXT, official_name_ge TEXT, official_name_en TEXT, website TEXT, email TEXT)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS object_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name_ge TEXT, name_en TEXT, image TEXT)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS regions (id INTEGER PRIMARY KEY AUTOINCREMENT, name_ge TEXT, name_en TEXT, image TEXT, priority INTEGER)', [], function() {
					synchronize();
				});


			}, function (error) {
				console.log('transaction error: ' + error.message);
			}, function () {
				console.log('transaction ok');
			});



		}, function (error) {
			console.log('Open database ERROR: ' + JSON.stringify(error));
		});
	}, function(error) {console.log('შეცდომა' + error)});
}
function synchronize() {
	$.ajax({
		url: siteURL + "/api/sync.php",
		type: 'GET',
		dataType: 'json',
		data: {
			app_key: '1234',
		},
		aync: false,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			// console.log(data);
			db.transaction(function (tx) {

				var query = "INSERT INTO tours (`id`, `name_ge`, `name_en`, `description_ge`, `description_en`, `image`, `status`, `owner_id`, `rating`, `stars`, `priority`, `is_recommended`, `is_popular`, `tour_driving_map_data`, `tour_walking_map_data`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

				for (var i = 0; i < data.tours.length; i++ ) {
					tx.executeSql(query,
						[
							data.tours[i].id,
							data.tours[i].name_ge,
							data.tours[i].name_en,
							data.tours[i].description_ge,
							data.tours[i].description_en,
							data.tours[i].image,
							data.tours[i].status,
							data.tours[i].owner_id,
							data.tours[i].rating,
							data.tours[i].stars,
							data.tours[i].priority,
							data.tours[i].is_recommended,
							data.tours[i].is_popular,
							data.tours[i].tour_driving_map_data,
							data.tours[i].tour_walking_map_data
						]
						, function (tx, res) {
							console.log("insertId: " + res.insertId + " -- probably 1");
							console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
						},
						function (tx, error) {
							console.log('INSERT error: ' + error.message);
						});
				}



				var query = "INSERT INTO tour_regions (`tour_id`, `region_id`) VALUES (?, ?)";

				for (var i = 0; i < data.tour_regions.length; i++ ) {
					tx.executeSql(query,
						[
							data.tour_regions[i].tour_id,
							data.tour_regions[i].region_id
						]
						, function (tx, res) {
							console.log("insertId: " + res.insertId + " -- probably 1");
							console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
						},
						function (tx, error) {
							console.log('INSERT error: ' + error.message);
						});
				}

				var query = "INSERT INTO tour_objects (`tour_id`, `object_id`) VALUES (?, ?)";

				for (var i = 0; i < data.tour_objects.length; i++ ) {
					tx.executeSql(query,
						[
							data.tour_objects[i].tour_id,
							data.tour_objects[i].object_id
						]
						, function (tx, res) {
							console.log("insertId: " + res.insertId + " -- probably 1");
							console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
						},
						function (tx, error) {
							console.log('INSERT error: ' + error.message);
						});
				}


				var query = "INSERT INTO object_categories (`name_ge`, `name_en`, `image`) VALUES (?, ?, ?)";

				for (var i = 0; i < data.object_categories.length; i++ ) {
					tx.executeSql(query,
						[
							data.object_categories[i].name_ge,
							data.object_categories[i].name_en,
							data.object_categories[i].image
						]
						, function (tx, res) {
							console.log("insertId: " + res.insertId + " -- probably 1");
							console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
						},
						function (tx, error) {
							console.log('INSERT error: ' + error.message);
						});
				}

				var query = "INSERT INTO regions (`id`, `name_ge`, `name_en`, `image`) VALUES (?, ?, ?, ?)";

				for (var i = 0; i < data.regions.length; i++ ) {
					tx.executeSql(query,
						[
							data.regions[i].id,
							data.regions[i].name_ge,
							data.regions[i].name_en,
							data.regions[i].image
						]
						, function (tx, res) {
							console.log("insertId: " + res.insertId + " -- probably 1");
							console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
						},
						function (tx, error) {
							console.log('INSERT error: ' + error.message);
						});
				}


				var query = "INSERT INTO objects (`name_ge`, `name_en`, `description_ge`, `description_en`, `image`, `latitude`, `longitude`, `rating`, `stars`, `category`, `address`, `number`, `official_name_ge`, `official_name_en`, `website`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

				for (var i = 0; i < data.objects.length; i++ ) {
					tx.executeSql(query,
						[
							data.objects[i].name_ge,
							data.objects[i].name_en,
							data.objects[i].description_ge,
							data.objects[i].description_en,
							data.objects[i].image,
							data.objects[i].latitude,
							data.objects[i].longitude,
							data.objects[i].rating,
							data.objects[i].stars,
							data.objects[i].category,
							data.objects[i].address,
							data.objects[i].number,
							data.objects[i].official_name_ge,
							data.objects[i].official_name_en,
							data.objects[i].website,
							data.objects[i].email
						]
						, function (tx, res) {
							console.log("insertId: " + res.insertId + " -- probably 1");
							console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
						},
						function (tx, error) {
							console.log('INSERT error: ' + error.message);
						});
				}











				showHome();
				updateLeftCategories();
				updateNearest();





			}, function(error) {
				console.log('transaction error: ' + error.message);
			}, function() {
				console.log('transaction ok');
			});
		},
		error: function () {
			showAjaxError();
		}
	});
}


function getData(table) {
	// var data = new Array();
	db.executeSql('SELECT * FROM ' + table, [], function (resultSet) {
		for(var x = 0; x < resultSet.rows.length; x++) {
			// data.push(resultSet.rows.item(x));
			console.log(resultSet.rows.item(x));
		}
	});
	// return data;
}


function deleteUserDatabase() {
	window.sqlitePlugin.deleteDatabase({name: userDBName, location: 'default'}, function () {console.log('ბაზა წაიშალა')}, function(error) {console.log('შეცდომა' + error)});
}
function connectUserDB() {
	userDB = window.sqlitePlugin.openDatabase({ name: userDBName, location: 'default' }, function (db) {

	}, function (error) {
		console.log('Open database ERROR: ' + JSON.stringify(error));
	});
}
function createUserDB() {

	userDB.transaction(function (tx) {
		// ...

		// tx.executeSql('CREATE TABLE IF NOT EXISTS favourite_objects (id INTEGER PRIMARY KEY AUTOINCREMENT, object_id INTEGER)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS favourites(id INTEGER PRIMARY KEY AUTOINCREMENT, record_id INTEGER, type INTEGER)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY AUTOINCREMENT, record_id INTEGER, type INTEGER)');

		// tx.executeSql('CREATE TABLE customerAccounts (firstname, lastname, acctNo)');
	}, function (error) {
		console.log('transaction error: ' + error.message);
	}, function () {
		console.log('transaction ok');
	});
}

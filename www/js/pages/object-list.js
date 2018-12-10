function renderObjectList(id) {
	logOperation('object-list', id);
	clearContent('object-list');
	setTitle( string('objects_title') );
	setSearchCategory(id);

	db.transaction(function (txn) {
					txn.executeSql('SELECT * FROM objects WHERE category = ?', [id], function (tx,resultSet) {
		var object;
		var div = createCustomList(contentDiv);
		for(var x = 0; x < resultSet.rows.length; x++) {
			object = resultSet.rows.item(x);
			console.log(object);
			createCustomListDiv(object['name' + lang], object.image, object.id, 2, div, true, object.stars, 0 )
		}
		$('.jarallax').jarallax({
			speed: 0.85
		});
					});
	});
}

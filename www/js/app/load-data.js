function loadRegions() {
	var result = '';
	$.ajax({
		url: siteURL + "/api/regions.php",
		type: 'GET',
		dataType: 'json',
		aync: false,
		contentType: "application/json; charset=utf-8",
		success: function (arr) {
			// console.log('movedi');
			result = arr;
		},
		error: function () {
			alert('2');
		}
	});
	return result;
}

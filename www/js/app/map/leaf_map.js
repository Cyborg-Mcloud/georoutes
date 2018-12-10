var mymap;

function init_map(mlat, mlng, mzoom, div, fullscreen) {

	if (fullscreen) {
		var headerHeight = 0;
		var footerHeight = 44;
		mapHeight = window.screen.height - (headerHeight + footerHeight);
	}
	else {
		mapHeight = 200;
	}
	$('#' + div).css('height', mapHeight);

	mymap = L.map(div, {zoomControl: false}).setView([mlat, mlng], mzoom);


	//L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {

	//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	//	L.tileLayer('https://tileserver.maptiler.com/campus/{z}/{x}/{y}.png', {

	//http://mt1.google.com/vt/lyrs=y&x=1325&y=3143&z=13
	//http://mt3.google.com/mapstt?zoom=13&x=1325&y=3143&client=google
	//http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga
	//    h = roads only
	//  m = standard roadmap
	// p = terrain
	// r = somehow altered roadmap
	// s = satellite only
	// t = terrain only
	// y = hybrid

	L.tileLayer('https://mts1.google.com/vt/hl=en&s=ge&lyrs=m&x={x}&y={y}&z={z}', {
		//attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'your.mapbox.access.token'
	}).addTo(mymap);

	$('#' + div).on('touchmove', function(event) {
		event.preventDefault();
		event.stopPropagation();
	});
	$('#' + div).on('touchstart', function(event) {
		event.preventDefault();
		event.stopPropagation();
	});
}

var mroutes = new Array();

function new_route(mid, mroute) {
console.log('vamateeeb');
	console.log(mroute);
	mroutes[mid] = L.polyline(mroute).addTo(mymap);
}

var markers = new Array();

function add_marker(mlat, mlng, mname, mid, micon) {
	console.log('vamateb markerss' + mlat + ' ' + mlng + ' ' + mname + ' ' + mid + ' ' + micon);
	var cur = markers.length;

	var myIcon = L.icon({
		iconUrl: micon,
		iconSize: [32, 32],
		iconAnchor: [15, 15],
		popupAnchor: [0, 0]
		//shadowUrl: 'my-icon-shadow.png',
		//	shadowSize: [68, 95],
		//	shadowAnchor: [22, 94]
	});

	markers[cur] = L.marker([mlat, mlng], {title: mname, opacity: 0.8, alt: mname, icon: myIcon}).addTo(mymap);


	// markers[cur].bindPopup(mname).openPopup();
}


function removeExistingMap(map) {
	if (map != null) {
		map.remove();
		map = null;
	}
}
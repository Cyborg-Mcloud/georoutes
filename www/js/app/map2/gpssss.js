var MyLat=0;
var MyLong=0;
var old_lat=0;
var old_lng=0;
var nogps=1;
var MyAlt=0;
var MySpeed=0;
var MyHead=0;
var MyAcc=0;
var update_location=0;
var live_loc=1;


function gps_init()
	{

	console.log("device ready 2, getting position");
	navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true,  maximumAge:0});
	var opts = { timeout: 10000, enableHighAccuracy: true, maximumAge:0};
	watchID = navigator.geolocation.watchPosition(onSuccess, onError, opts);
	
	if (MyLat>0)
		{
//		send_data();
		}

	}

function onSuccess(position) 
	{
	nogps=0;
	console.log("on GPS success");
	MyLat=position.coords.latitude ;
	MyLong=position.coords.longitude ;
	MyAlt=position.coords.altitude ;
	MyHead=position.coords.heading ;
	MySpeed=position.coords.speed ;
	MyAcc=position.coords.accuracy;

	if (old_lat!=MyLat || old_lng!=MyLong || live_loc==1)
		{
		console.log("lat change to new ");
		old_lat=MyLat;
		old_lng=MyLong;
		move_marker();	
		}

	console.log(MyLat+ " - "+MyLong);

    }

function move_marker()
	{
	console.log("move marker");
	if (live_loc==1)
		{
		mlng=MyLong;
		mlat=MyLat;
		set_map_center();
		}

	update_location=1;
	}


function onError(error)
	{
	console.log("error getting location ");
	console.log(error);
	nogps++;
	switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("nogps").innerHTML = "გთხოვთ ჩართოთ ლოკაცია"
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("nogps").innerHTML = "ლოკაცია მიუწვდომელია"
            break;
        case error.TIMEOUT:
         //   document.getElementById("nogps").innerHTML = "ლოკაციის მოთხოვნას ვადა გაუვიდა";
			navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true,  maximumAge:0});
            break;
        case error.UNKNOWN_ERROR:
           // document.getElementById("nogps").innerHTML = "უცნობი ლოკაციის მოთხოვნის პრობლემა"
            break;
		}
	}



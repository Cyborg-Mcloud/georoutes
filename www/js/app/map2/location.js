


function onRequestSuccess( success)
	{
    console.log("Successfully requested accuracy "+success.message);
	var k=success.message;
	var b=k.split("agreed");
	if (b.length>1)
		{
		// aplikaciis restarti tu motxovna gaxda sachiro da userma ok utxra
		location.reload();
		}
	
    }

function onRequestFailure(error)
	{
    console.log("Accuracy request failed: error code="+error.code+"; error message="+error.message);
	}

function req_loc_acc()
	{
	var accuracy = 3;
	var accuracyName  = "High Accuracy";
	console.log("requesting acc");
	cordova.plugins.locationAccuracy.request(onRequestSuccess, onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
	}

function req_loc_auth()
	{
	console.log("requesting auth");
	cordova.plugins.diagnostic.isLocationAuthorized(function (authorized) {
		if(!authorized)
			{

			cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
				console.log("Requested location authorization: authorization was " + status);
				 
				}, onError, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);
			}
		else
			{
			onError("App is already authorized to use location");
			}
		}, onError);
	}


function open_loc_settings()
	{
	cordova.plugins.diagnostic.switchToLocationSettings();
	}

function successFunction()
{
    console.info("immersive worked!");
}

function errorFunction(error)
{
    console.error(error);
}

function trace(value)
{
    console.log(value);
}

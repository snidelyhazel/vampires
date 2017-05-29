
var shopsAndGuilds;

if (shouldSetUpNavigator)
{
	var scriptURL = "https://script.google.com/macros/s/AKfycbyd5uaE2qVwAzApw2EN0nEMpXcctVgoSCkSkIMSTzowC9pRkzZi/exec";
	
	
	shopsAndGuilds = JSON.parse(localStorage.getItem("shopsAndGuilds"));
	if (shopsAndGuilds == null)
	{
		shopsAndGuilds = {guilds: [], shops: []};
	}
	
	
	
	function getReadyToParseShopsAndGuilds(http)
	{
		http.onreadystatechange = function() {
			if (http.readyState != 4 || http.status != 200) return; // not done loading yet.
			shopsAndGuilds = JSON.parse(http.responseText);
			localStorage.setItem("shopsAndGuilds", JSON.stringify(shopsAndGuilds));
			localStorage.setItem("lastUpdatedShopsAndGuilds", new Date().getTime());
			updateDisplayOfMovingPlaces();
		};
	}
	
	function syncMovingPlaces()
	{
		var http = new XMLHttpRequest();
		getReadyToParseShopsAndGuilds(http);
		http.open("GET", scriptURL, true);
		http.send();
	}
	
	var currentTime = new Date().getTime();
	var lastUpdatedShopsAndGuilds = parseInt(localStorage.getItem("lastUpdatedShopsAndGuilds"));
	if (isNaN(lastUpdatedShopsAndGuilds)) lastUpdatedShopsAndGuilds = 0;
	
	// If the list of shops and guilds is more than five minutes old, update it.
	if (currentTime - lastUpdatedShopsAndGuilds > 1000 * 60 * 5)
	{
		syncMovingPlaces();
	}
	
	function saveMovingPlace(placeName, placeX, placeY, isShop)
	{
		var placeLocation = "SE of " + streetArray[placeX / 2][1] + " and " + streetArray[placeY / 2][2];
		
		// Don't bother saving if we already have this information.
		var placeList = isShop ? shopsAndGuilds.shops : shopsAndGuilds.guilds;
		for (var i = 0; i < placeList.length; i++)
		{
			if (placeList[i].placeName == placeName && placeList[i].placeLocation == placeLocation)
			{
				return;
			}
		}
		
		var params = JSON.stringify({placeName: placeName, placeX: placeX, placeY: placeY, placeLocation: placeLocation, isShop: isShop});
		var http = new XMLHttpRequest();
		getReadyToParseShopsAndGuilds(http);
		http.open("POST", scriptURL, true);
		http.send(params);
	}

}
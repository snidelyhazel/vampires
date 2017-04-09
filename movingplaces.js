//Welcome to the Ravenblack Navigator!

// + Locations

if (shouldSetUpNavigator)
{
	function displayMovingPlaces(div, places, fromX, fromY)
	{
		var result = "";
		
		for (var i = 0; i < places.length; i++)
		{
			var place = places[i];
			
			if (place.placeX === "" || place.placeY === "")
			{
				continue;
			}
			
			var pointX = place.placeX;
			var pointY = place.placeY;
			
			var streetX = Math.ceil(pointX / 2);
			var streetY = Math.ceil(pointY / 2);
			
			//Determine distances on x and y coordinates.
			var directionX = pointX - fromX;
			var directionY = pointY - fromY;
			
			var streetNameX = streetArray[streetX][1];
			var streetNameY = streetArray[streetY][2];
			if (streetX == 0) streetNameX = "WCL";
			if (streetY == 0) streetNameY = "NCL";
			
			var streetNames = streetNameX + " and " + streetNameY;
			
			result += "<span class = 'box-subtitle'>" + place.placeName + "</span>";
			result += "<br />&nbsp;&nbsp;&nbsp;&nbsp;";
			
			result += streetNames;
			result += ", ";
			result += assignDirection(directionX, directionY);
			result += "<br />";
		}
		
		div.innerHTML = result;
		
		var updateButton = document.createElement("button");
		updateButton.innerHTML = "Sync";
		updateButton.addEventListener("click", syncMovingPlaces);
		div.appendChild(updateButton);
	}
	
	var movingShopsDiv = document.createElement("div");
	movingShopsDiv.style.maxHeight = "85px";
	movingShopsDiv.style.overflowY = "auto";
	movingShopsDiv.id = "movingShops";	

	movingShopsDiv.addEventListener('mousewheel', function(event)
	{
		movingShopsDiv.scrollTop = movingShopsDiv.scrollTop - event.wheelDeltaY;
		event.preventDefault();
		return false;    
	});
	
	var movingGuildsDiv = document.createElement("div");
	movingGuildsDiv.style.maxHeight = "85px";
	movingGuildsDiv.style.overflowY = "auto";
	movingGuildsDiv.id = "movingGuilds";
	
	movingGuildsDiv.addEventListener('mousewheel', function(event)
	{
		movingGuildsDiv.scrollTop = movingGuildsDiv.scrollTop - event.wheelDeltaY;
		event.preventDefault();
		return false;    
	});
	
	
	function updateDisplayOfMovingPlaces()
	{
		displayMovingPlaces(movingShopsDiv, shopsAndGuilds.shops, currentX, currentY);
		displayMovingPlaces(movingGuildsDiv, shopsAndGuilds.guilds, currentX, currentY);
	}
	updateDisplayOfMovingPlaces();
	
	var movingPlacesTabs = makeTabs("movingPlacesTab", [
		{title: "Shops", name: "movingShops", display: function(){}, content: movingShopsDiv},
		{title: "Guilds", name: "movingGuilds", display: function(){}, content: movingGuildsDiv},
	]);

	movingPlacesTabs.div.style.display = displayMovingPlacesOption.checked ? "block" : "none";
	rightSideDiv.appendChild(movingPlacesTabs.div);

	var savedTab = localStorage.getItem("movingPlacesTab");
	if (savedTab == null) savedTab = "movingShops";
	movingPlacesTabs.selectTab(savedTab);
}
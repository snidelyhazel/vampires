//Welcome to the Ravenblack Navigator!

// + Locations

if (shouldSetUpNavigator)
{
	//Create a string indicating cardinal direction based on X and Y coordinate difference. 
	function assignDirection(directionX, directionY)
	{
		var directionString = "";
		
		if (directionX == 0 && directionY == 0)
		{
			directionString = "you are here";
		}
		else
		{
			if (directionY < 0)
			{
				directionString += "N";
			}
			else if (directionY > 0)
			{
				directionString += "S";
			}
			
			if (directionX < 0)
			{
				directionString += "W";
			}
			else if (directionX > 0)
			{
				directionString += "E";
			}
			
			if (directionString == "N")
			{
				directionString += " ↑";
			}
			else if (directionString == "S")
			{
				directionString += " ↓";
			}
			else if (directionString == "W")
			{
				directionString += " ←";
			}
			else if (directionString == "E")
			{
				directionString += " →";
			}
			else if (directionString == "NW")
			{
				directionString += "<span style='font-size: 120%; line-height: 25%;'> ↖</span>";
			}
			else if (directionString == "NE")
			{
				directionString += "<span style='font-size: 120%; line-height: 25%;'> ↗</span>";
			}
			else if (directionString == "SW")
			{
				directionString += "<span style='font-size: 120%; line-height: 25%;'> ↙</span>";
			}
			else if (directionString == "SE")
			{
				directionString += "<span style='font-size: 120%; line-height: 25%;'> ↘</span>";
			}
			
			directionString += ", ";
			
			directionString += Math.max(Math.abs(directionX), Math.abs(directionY));
		}
		
		return directionString;
	}
	
	//Get current position.
	var offsets = 
	[
		[ 1, 1], [ 0, 1], [-1, 1],
		[ 1, 0], [ 0, 0], [-1, 0],
		[ 1,-1], [ 0,-1], [-1,-1],
	];
	
	var currentX;
	var currentY;
	for (var i = 0; i < spaces.length; i++)
	{
		var space = spaces[i];
		if (space.children[0].tagName == "FORM")
		{
			var form = space.children[0];
			
			var spaceX = parseInt(form.x.value);
			var spaceY = parseInt(form.y.value);
			
			var offset = offsets[i];
			
			currentX = spaceX + offset[0];
			currentY = spaceY + offset[1];
			
			var previousX = parseInt(localStorage.getItem("currentX" + userName));
			var previousY = parseInt(localStorage.getItem("currentY" + userName));
			
			//If position is not the same as saved position, we must have moved!
			if (previousX != currentX || previousY != currentY)
			{
				vampsAttacked = [];
				localStorage.setItem("vampsAttacked" + userName, vampsAttacked.join(","));
			}
			
			localStorage.setItem("currentX" + userName, currentX);
			localStorage.setItem("currentY" + userName, currentY);
			
			break;
		}
	}
	
	currentX = parseInt(localStorage.getItem("currentX" + userName));
	currentY = parseInt(localStorage.getItem("currentY" + userName));
	
	//Place info
	//TO-DO: comment this section!
	function findNearestPlaces(coordX, coordY, howManyPlaces, placeType)
	{
		var placeArray;
		if (placeType == "bank")
		{
			placeArray = bankArray;
		}
		else if (placeType == "pub")
		{
			placeArray = pubArray;
		}
		else if (placeType == "station")
		{
			placeArray = stationArray;
		}
		
		var placeDistances = [];
		var nearestPlaceList = [];
		for (var i = 0; i < howManyPlaces; i++)
		{
			placeDistances[i] = 200; //actual width and height of grid
			nearestPlaceList[i] = null;
		}
		//Parse array of places.
		for (var i = 0; i < placeArray.length; i++)
		{
			var placeX = placeArray[i][1]; //x coordinate index 1
			var placeY = placeArray[i][2]; //y coordinate index 2
		
			//Determine distances on x and y coordinates.
			var distanceX = Math.abs(placeX - coordX);
			var distanceY = Math.abs(placeY - coordY);
		
			//Determine number of moves to place.
			var distance = Math.max(distanceX, distanceY);
		
			//Comparison to closest-known place, sorting algorithm.
			for (var j = placeDistances.length - 1; j >= 0; j--)
			{
				if (distance < placeDistances[j])
				{
					if (j > 0 && distance < placeDistances[j - 1])
					{
						placeDistances[j] = placeDistances[j - 1];
						nearestPlaceList[j] = nearestPlaceList[j - 1];
					}
					else
					{
						placeDistances[j] = distance;
						nearestPlaceList[j] = placeArray[i];
						break;
					}
				}
			}
		}
		
		return nearestPlaceList;
	}
	
	var nearestDiv = document.createElement("div");
	rightSideDiv.appendChild(nearestDiv);
	nearestDiv.className = "border-box";
	nearestDiv.style.width = "193px";
	
	var bankContainer = document.createElement("div");
	bankContainer.innerHTML = "<span class='box-title'>Nearest Omnibank branches:</span>";
	nearestDiv.appendChild(bankContainer);
	
	//Display closest bank info.
	var bankInfo = document.createElement("div");
	bankInfo.style.lineHeight = "150%";
	bankContainer.appendChild(bankInfo);
	
	bankContainer.style.display = displayBanks.checked ? "block" : "none";
	
	nearestDiv.appendChild(makeElement("<div class = 'divider-line'>"));
	
	function displayPOIs(points, fromX, fromY)
	{
		var result = "";
		
		for (var i = 0; i < points.length; i++)
		{
			var point = points[i];
			
			var pointX = point[1];
			var pointY = point[2];
			
			var streetX = Math.ceil(pointX / 2);
			var streetY = Math.ceil(pointY / 2);
			
			//Determine distances on x and y coordinates.
			var directionX = pointX - fromX;
			var directionY = pointY - fromY;
			
			var streetNames = streetArray[streetX][1] + " and " + streetArray[streetY][2];
			
			if (point[0] != "")
			{
				result += "<span class = 'box-subtitle'>" + point[0] + "</span>";
				result += "<br />&nbsp;&nbsp;&nbsp;&nbsp;";
			}
			result += streetNames;
			result += ", ";
			result += assignDirection(directionX, directionY);
			result += "<br />";
		}
		
		return result;
	}
	
	var nearestBanks = findNearestPlaces(currentX, currentY, 5, "bank");
	
	bankInfo.innerHTML += displayPOIs(nearestBanks, currentX, currentY);
	
	var stationContainer = document.createElement("div");
	stationContainer.innerHTML = "<span class='box-title'>Nearest transit stations:<br /></span>";
	nearestDiv.appendChild(stationContainer);
	
	//Display closest transit info.
	var stationInfo = document.createElement("div");
	stationInfo.style.lineHeight = "150%";
	stationContainer.appendChild(stationInfo);
	
	stationContainer.style.display = displayTransits.checked ? "block" : "none";
	
	//Station info
	
	var nearestStations = findNearestPlaces(currentX, currentY, 2, "station");
	
	stationInfo.innerHTML += displayPOIs(nearestStations, currentX, currentY);
	
	
	nearestDiv.appendChild(makeElement("<div class='divider-line'>"));
	
	var pubContainer = document.createElement("div");
	pubContainer.innerHTML = "<span class='box-title'>Nearest local pubs:<br /></span>";
	nearestDiv.appendChild(pubContainer);
	
	//Display closest transit info.
	var pubInfo = document.createElement("div");
	pubInfo.style.lineHeight = "150%";
	pubContainer.appendChild(pubInfo);
	
	pubContainer.style.display = displayPubs.checked ? "block" : "none";
	
	//Pub info
	
	var nearestPubs = findNearestPlaces(currentX, currentY, 3, "pub");
	
	pubInfo.innerHTML += displayPOIs(nearestPubs, currentX, currentY);

	function updateLocationsDividers()
	{
		updateDividersInDiv(nearestDiv);
		nearestDiv.style.display = displayBanks.checked || displayTransits.checked || displayPubs.checked ? "block" : "none";
	}
	
	updateLocationsDividers();
}
//Welcome to the Ravenblack Navigator!

// + Vampire locator

if (shouldSetUpNavigator)
{
	searchDiv.appendChild(makeElement("<div class = 'divider-line'>"));

	var vampLocatorDiv = document.createElement("div");

	//Hide vamp locator if unchecked.
	vampLocatorDiv.style.display = displayVampLoc.checked ? "block" : "none";
	searchDiv.appendChild(vampLocatorDiv);
	vampLocatorDiv.innerHTML = "<span class='box-title'>Vampire locator:</span>";

	
	//Set localStorage for start and end intersections.
	function updateFindVampStartStorage(event)
	{
		localStorage.setItem("findVampStartEnd", event.target.checked ? 0 : 1)
	}
	function updateFindVampEndStorage(event)
	{
		localStorage.setItem("findVampStartEnd", event.target.checked ? 1 : 0)
	}
	var findVampStartEndForm = document.createElement("form"); 
	vampLocatorDiv.appendChild(findVampStartEndForm);

	//Create radio selectors for start or end intersection.
	findVampStartEndForm.innerHTML = 'Find near <input type = "radio" name = "findVampStartEnd" value = "start" id = "vampStart" checked tabindex = "-1"/><label for = "vampStart">start</label>\
							      <input type = "radio" name = "findVampStartEnd" value = "end" id = "vampEnd" tabindex = "-1"/><label for = "vampEnd">end</label>';
	var radioVampStart = findVampStartEndForm.children[0];
	var radioVampEnd   = findVampStartEndForm.children[2];
	radioVampStart.checked = localStorage.getItem("findVampStartEnd") == 1 ? false : true;
	radioVampEnd.checked   = localStorage.getItem("findVampStartEnd") == 1 ? true : false;
	radioVampStart.onchange = updateFindStartStorage;
	radioVampEnd.onchange   = updateFindEndStorage;
	
	//Finds exact location at intersection
	function getVampSearchCoords()
	{
		if (radioVampStart.checked)
		{
			return getStartCoords();
		}
		else if (radioVampEnd.checked)
		{
			return getEndCoords();
		}
	}

	function findNearestVamps(coordX, coordY, howManyVamps)
	{
		var vampDistances = [];
		var nearestVampList = [];
		for (var i = 0; i < howManyVamps; i++)
		{
			vampDistances[i] = 200; //actual width and height of grid
			nearestVampList[i] = null;
		}

		for (var i = 0; i < allLogins.length; i++)
		{
			var loginName = allLogins[i].split("#")[0];
			if (loginName == userName)
			{
				continue;
			}

			var loginX = localStorage.getItem("currentX" + loginName);
			var loginY = localStorage.getItem("currentY" + loginName);

			if (loginX == undefined || loginY == undefined)
			{
				continue;
			}

			loginX = parseInt(loginX);
			loginY = parseInt(loginY);

			//Determine distances on x and y coordinates.
			var distanceX = Math.abs(loginX - coordX);
			var distanceY = Math.abs(loginY - coordY);
		
			//Determine number of moves to vampire.
			var distance = Math.max(distanceX, distanceY);
			
			//Comparison to closest-known vampire.
			for (var j = 0; j < vampDistances.length; j++)
			{
				if (distance < vampDistances[j])
				{
					vampDistances.splice(j, 0, distance);
					nearestVampList.splice(j, 0, [loginName, loginX, loginY]);
					vampDistances.length = howManyVamps;
					nearestVampList.length = howManyVamps;
					break;
				}
			}

			/*
			//Backwards sorting algorithm
			for (var j = vampDistances.length - 1; j >= 0; j--)
			{
				if (distance < vampDistances[j])
				{
					if (j > 0 && distance < vampDistances[j - 1])
					{
						vampDistances[j] = vampDistances[j - 1];
						nearestVampList[j] = nearestVampList[j - 1];
					}
					else
					{
						vampDistances[j] = distance;
						nearestVampList[j] = [loginName, loginX, loginY];
						break;
					}
				}
			}
			*/
		}

		return nearestVampList;
	}
	
	//Create a button to find nearest pubs.
	var findVampsButton = document.createElement("button");
	findVampsButton.innerHTML = "Find vamps in vicinity";
	vampLocatorDiv.appendChild(findVampsButton);
	findVampsButton.addEventListener("click", function(event)
	{
		var searchCoords = getVampSearchCoords();
		
		var vampsNearStart = findNearestVamps(searchCoords.x, searchCoords.y, 2);
		
		displayVampsLocatedDiv.innerHTML = displayPOIs(vampsNearStart, searchCoords.x, searchCoords.y);
	});
	
	var displayVampsLocatedDiv = document.createElement("div");
	vampLocatorDiv.appendChild(displayVampsLocatedDiv);
	
	//Allot space for display of nearest vampires.
	displayVampsLocatedDiv.innerHTML = "<br /><br />";



	//For the entire search border box.
	function updateSearchDividers()
	{
		updateDividersInDiv(searchDiv);
		searchDiv.style.display = displayDistCalc.checked || displayLandmark.checked || displayVampLoc.checked ? "block" : "none";
	}
	
	updateSearchDividers();
}
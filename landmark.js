//Welcome to the Ravenblack Navigator!

// + Landmark finder

if (shouldSetUpNavigator)
{
	var findLandmarkDiv = document.createElement("div");

	//Hide landmark calculator if unchecked.
	findLandmarkDiv.style.display = displayLandmark.checked ? "block" : "none";
	rightSideDiv.appendChild(findLandmarkDiv);
	findLandmarkDiv.innerHTML = "<span class='box-title'>Landmark finder:</span>";
	findLandmarkDiv.className = "border-box";
	
	//Set localStorage for start and end intersections.
	function updateFindStartStorage(event)
	{
		localStorage.setItem("findStartEnd", event.target.checked ? 0 : 1)
	}
	function updateFindEndStorage(event)
	{
		localStorage.setItem("findStartEnd", event.target.checked ? 1 : 0)
	}
	var findStartEndForm = document.createElement("form"); 
	findLandmarkDiv.appendChild(findStartEndForm);

	//Create radio selectors for start or end intersection.
	findStartEndForm.innerHTML = 'Find near <input type = "radio" name = "findStartEnd" value = "start" id = "start" checked tabindex = "-1"/><label for = "start">start</label>\
							      <input type = "radio" name = "findStartEnd" value = "end" id = "end" tabindex = "-1"/><label for = "end">end</label>';
	var radioStart = findStartEndForm.children[0];
	var radioEnd   = findStartEndForm.children[2];
	radioStart.checked = localStorage.getItem("findStartEnd") == 1 ? false : true;
	radioEnd.checked   = localStorage.getItem("findStartEnd") == 1 ? true : false;
	radioStart.onchange = updateFindStartStorage;
	radioEnd.onchange   = updateFindEndStorage;
	
	//Finds exact location at intersection
	function getSearchCoords()
	{
		var searchX;
		var searchY;
		if (radioStart.checked)
		{
			//Determine corner of the intersection.
			var xStartExact = xStart.value;
			var yStartExact = yStart.value;
			if (dirStart.value.indexOf("x") != -1) xStartExact++;
			if (dirStart.value.indexOf("y") != -1) yStartExact++;
			searchX = xStartExact;
			searchY = yStartExact;
		}
		else if (radioEnd.checked)
		{
			//Determine corner of the intersection.
			var xEndExact = xEnd.value;
			var yEndExact = yEnd.value;
			if (dirEnd.value.indexOf("x") != -1) xEndExact++;
			if (dirEnd.value.indexOf("y") != -1) yEndExact++;
			searchX = xEndExact;
			searchY = yEndExact;
		}

		//Return an object with x and y coordinates.
		return {searchX: searchX, searchY: searchY};
	}

	//Create a button to find nearest banks.
	var findBanksButton = document.createElement("button");
	findBanksButton.innerHTML = "Find Omnibank branch";
	findLandmarkDiv.appendChild(findBanksButton);
	findBanksButton.addEventListener("click", function(event)
	{
		var searchCoords = getSearchCoords();

		var banksNearStart = findNearestPlaces(searchCoords.searchX, searchCoords.searchY, 2, "bank");
		
		displayLandmarkDiv.innerHTML = displayPlaces(banksNearStart, searchCoords.searchX, searchCoords.searchY);
	});
	
	findLandmarkDiv.appendChild(document.createElement("br"));
	
	//Create a button to find nearest pubs.
	var findPubsButton = document.createElement("button");
	findPubsButton.innerHTML = "Find local pub";
	findLandmarkDiv.appendChild(findPubsButton);
	findPubsButton.addEventListener("click", function(event)
	{
		var searchCoords = getSearchCoords();
		
		var pubsNearStart = findNearestPlaces(searchCoords.searchX, searchCoords.searchY, 2, "pub");
		
		displayLandmarkDiv.innerHTML = displayPlaces(pubsNearStart, searchCoords.searchX, searchCoords.searchY);
	});
	
	var displayLandmarkDiv = document.createElement("div");
	findLandmarkDiv.appendChild(displayLandmarkDiv);
	
	//Allot space for display of nearest landmarks.
	displayLandmarkDiv.innerHTML = "<br /><br />";
}
//Welcome to the Ravenblack Navigator!

//	+ Distance calculator

if (shouldSetUpNavigator)
{
	//TO-DO: comment this section!
	var searchDiv = document.createElement("div");
	searchDiv.className = "border-box";
	searchDiv.style.width = "193px";
	rightSideDiv.appendChild(searchDiv);
	
	var moveCalculatorDiv = document.createElement("div");
	searchDiv.appendChild(moveCalculatorDiv);
	moveCalculatorDiv.style.display = displayDistCalc.checked ? "block" : "none";

	var xStart = document.createElement("select");
	var yStart = document.createElement("select");
	var dirStart = document.createElement("select");
	var xEnd = document.createElement("select");
	var yEnd = document.createElement("select");
	var dirEnd = document.createElement("select");
	xStart.style.width = "92px";
	yStart.style.width = "58px";
	dirStart.style.width = "43px";
	xEnd.style.width = "92px";
	yEnd.style.width = "58px";
	dirEnd.style.width = "43px";
	var moveTitleDiv = makeElement("<span class='box-title'>Distance calculator:<br /></span>");
	var distanceDiv = document.createElement("div");
	distanceDiv.innerHTML = "<br />";
	
	
	function setStartToCurrentLocation()
	{
		var xIsEven = ((currentX % 2) == 0);
		var yIsEven = ((currentY % 2) == 0);
		xStart.value = xIsEven ? currentX - 1 : currentX;
		yStart.value = yIsEven ? currentY - 1 : currentY;
		
		var direction = "";
		if (xIsEven) direction += "x";
		if (yIsEven) direction += "y";
		if (direction == "") direction = "N/A";
		dirStart.value = direction;
		
		computeMoveCalculator();
	}
	
	
	//Set fromCurrent localStorage.
	function updateFromCurrentStorage(event)
	{
		localStorage.setItem("fromCurrent", event.target.checked ? 1 : 0);
		if (fromCurrent.checked)
		{
			setStartToCurrentLocation();
		}
	}
	var fromCurrentDiv = document.createElement("div");
	fromCurrentDiv.innerHTML = '<label for = "currentPersist">Start from current location</label><input type = "checkbox" id = "currentPersist"  tabindex = "-1">';
	fromCurrentDiv.title = "Recalculates distance to destination <br /> \
	                      from current location.";
	//Make reference to fromCurrent checkbox.
	var fromCurrent = fromCurrentDiv.children[1];
	//Get current fromCurrent value.
	fromCurrent.checked = localStorage.getItem("fromCurrent") == 1 ? true : false;
	//When state change, update localStorage.
	fromCurrent.onchange = updateFromCurrentStorage;
	fromCurrentDiv.addEventListener("mouseenter", onHoverOver);
	fromCurrentDiv.addEventListener("mouseleave", onHoverOut);
	
	
	var swapStartEndButton = document.createElement("button");
	swapStartEndButton.innerHTML = "↕";
	swapStartEndButton.addEventListener("click", function(event) {
		
		var xTemp = xStart.value;
		var yTemp = yStart.value;
		var dirTemp = dirStart.value;
		
		xStart.value = xEnd.value;
		yStart.value = yEnd.value;
		dirStart.value = dirEnd.value;
		
		xEnd.value = xTemp;
		yEnd.value = yTemp;
		dirEnd.value = dirTemp;
		
		computeMoveCalculator();
	});
	fromCurrentDiv.appendChild(makeElement("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"));
	fromCurrentDiv.appendChild(swapStartEndButton);
	
	moveCalculatorDiv.appendChild(moveTitleDiv);
	moveCalculatorDiv.appendChild(fromCurrentDiv);
	moveCalculatorDiv.appendChild(document.createElement("br"));
	moveCalculatorDiv.appendChild(xStart);
	moveCalculatorDiv.appendChild(yStart);
	moveCalculatorDiv.appendChild(dirStart);
	moveCalculatorDiv.appendChild(document.createElement("br"));
	moveCalculatorDiv.appendChild(xEnd);
	moveCalculatorDiv.appendChild(yEnd);
	moveCalculatorDiv.appendChild(dirEnd);
	moveCalculatorDiv.appendChild(distanceDiv);
	
	var selectDirs = [xStart, yStart, dirStart, xEnd, yEnd, dirEnd];
	for (var i = 0; i < selectDirs.length; i++)
	{
		var option = document.createElement("option");
		option.value = "N/A";
		option.text = "--";
		selectDirs[i].appendChild(option);
	}
	
	var selectDirOffsets = [dirStart, dirEnd];
	for (var i = 0; i < selectDirOffsets.length; i++)
	{
		var option = document.createElement("option");
		option.value = "x";
		option.text = "E";
		selectDirOffsets[i].appendChild(option);
		
		option = document.createElement("option");
		option.value = "xy";
		option.text = "SE";
		selectDirOffsets[i].appendChild(option);
		
		option = document.createElement("option");
		option.value = "y";
		option.text = "S";
		selectDirOffsets[i].appendChild(option);
	}
	
	for (var i = 0; i < streetArray.length; i++)
	{
		var streetNames = streetArray[i];
		
		var option = document.createElement("option");
		option.value = i * 2 - 1;
		option.text = streetNames[1];
		xStart.appendChild(option);
		
		option = document.createElement("option");
		option.value = i * 2 - 1;
		option.text = streetNames[2];
		yStart.appendChild(option);
		
		option = document.createElement("option");
		option.value = i * 2 - 1;
		option.text = streetNames[1];
		xEnd.appendChild(option);
		
		option = document.createElement("option");
		option.value = i * 2 - 1;
		option.text = streetNames[2];
		yEnd.appendChild(option);
	}
	
	function getStartCoords()
	{
		//Determine corner of the intersection.
		var x = xStart.value;
		var y = yStart.value;
		if (dirStart.value.indexOf("x") != -1) x++;
		if (dirStart.value.indexOf("y") != -1) y++;

		//Return an object with x and y coordinates.
		return {x: x, y: y};
	}

	function getEndCoords()
	{
		//Determine corner of the intersection.
		var x = xEnd.value;
		var y = yEnd.value;
		if (dirEnd.value.indexOf("x") != -1) x++;
		if (dirEnd.value.indexOf("y") != -1) y++;

		//Return an object with x and y coordinates.
		return {x: x, y: y};
	}

	function computeMoveCalculator(event)
	{
		var startCoords = getStartCoords();
		var endCoords = getEndCoords();
		var xDiff = endCoords.x - startCoords.x;
		var yDiff = endCoords.y - startCoords.y;
		if (isNaN(xDiff) || isNaN(yDiff)) 
		{
			distanceDiv.innerHTML = "Finish selecting streets.";
		}
		else if (startCoords.x < 0 || startCoords.x >= 200 || startCoords.y < 0 || startCoords.y >= 200 || endCoords.x < 0 || endCoords.x >= 200 || endCoords.y < 0 || endCoords.y >= 200) 
		{
			distanceDiv.innerHTML = "Out of bounds.";
		}
		else
		{
			distanceDiv.innerHTML = "Distance: " + assignDirection(xDiff, yDiff);
		}
		
		localStorage.setItem("xStart", xStart.value);
		localStorage.setItem("yStart", yStart.value);
		localStorage.setItem("dirStart", dirStart.value);
		localStorage.setItem("xEnd", xEnd.value);
		localStorage.setItem("yEnd", yEnd.value);
		localStorage.setItem("dirEnd", dirEnd.value);
	}
	
	xStart.addEventListener("change", computeMoveCalculator);
	yStart.addEventListener("change", computeMoveCalculator);
	dirStart.addEventListener("change", computeMoveCalculator);
	xEnd.addEventListener("change", computeMoveCalculator);
	yEnd.addEventListener("change", computeMoveCalculator);
	dirEnd.addEventListener("change", computeMoveCalculator);
	
	function setIfNotNull(selection, itemName)
	{
		if (localStorage.getItem(itemName) == null) return;
		selection.value = localStorage.getItem(itemName);
	}
	
	setIfNotNull(xStart, "xStart");
	setIfNotNull(yStart, "yStart");
	setIfNotNull(dirStart, "dirStart");
	setIfNotNull(xEnd, "xEnd");
	setIfNotNull(yEnd, "yEnd");
	setIfNotNull(dirEnd, "dirEnd");
	
	if (fromCurrent.checked)
	{
		setStartToCurrentLocation();
	}
}
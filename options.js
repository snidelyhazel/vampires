//Welcome to the Ravenblack Navigator!

// + Options

if (shouldSetUpNavigator)
{
	//	+ Customizable preferences
	function useStorage(checkbox, storageName, defaultValue, opposite)
	{
		var checkedValue   = opposite ? "0" : "1";
		var uncheckedValue = opposite ? "1" : "0";
		checkbox.checked = defaultValue;
		if (localStorage.getItem(storageName) != null)
		{
			checkbox.checked = (localStorage.getItem(storageName) == checkedValue ? true : false);
		}
		
		checkbox.addEventListener("change", function(event)
		{
			localStorage.setItem(storageName, checkbox.checked ? checkedValue : uncheckedValue);
		});
	}
	
	//Set displayFinancials localStorage.
	function updateDisplayFinancialsStorage(event)
	{
		localStorage.setItem("displayFinancials", event.target.checked ? 1 : 0);
		financialsBox.style.display = displayFinancials.checked ? "block" : "none";
		myVampDiv.style.display     = displayFinancials.checked || displayInventory.checked || displayPowers.checked ? "block" : "none";
	}
	
	//Set displayInventory localStorage.
	function updateDisplayInventoryStorage(event)
	{
		localStorage.setItem("displayInventory", event.target.checked ? 1 : 0);
		inventoryBox.style.display  = displayInventory.checked  ? "block" : "none";
		financialsLine.style.display = (displayInventory.checked || displayPowers.checked) ? "block" : "none";
		myVampDiv.style.display     = displayFinancials.checked || displayInventory.checked || displayPowers.checked ? "block" : "none";
	}
	
	//Set displayPowers localStorage.
	function updateDisplayPowersStorage(event)
	{
		localStorage.setItem("displayPowers", event.target.checked ? 1 : 0);
		powersBox.style.display     = displayPowers.checked     ? "block" : "none";
		financialsLine.style.display = (displayInventory.checked || displayPowers.checked) ? "block" : "none";
		inventoryLine.style.display = displayPowers.checked ? "block" : "none";
		myVampDiv.style.display     = displayFinancials.checked || displayInventory.checked || displayPowers.checked ? "block" : "none";
	}
	
	//Set displayBanks localStorage.
	function updateDisplayBanksStorage(event)
	{
		localStorage.setItem("displayBanks", event.target.checked ? 1 : 0);
		bankContainer.style.display = displayBanks.checked ? "block" : "none";
		updateLocationsDividers();
	}
	
	//Set displayTransits localStorage.
	function updateDisplayTransitsStorage(event)
	{
		localStorage.setItem("displayTransits", event.target.checked ? 1 : 0);
		stationContainer.style.display = displayTransits.checked ? "block" : "none";
		updateLocationsDividers();
	}
	
	//Set displayPubs localStorage.
	function updateDisplayPubsStorage(event)
	{
		localStorage.setItem("displayPubs", event.target.checked ? 1 : 0);
		pubContainer.style.display = displayPubs.checked ? "block" : "none";
		updateLocationsDividers();
	}
	
	//Set displayMovingPlaces localStorage.
	function updateDisplayMovingPlacesStorage(event)
	{
		localStorage.setItem("displayMovingPlaces", event.target.checked ? 1 : 0);
		movingPlacesTabs.div.style.display = displayMovingPlacesOption.checked ? "block" : "none";
	}
	
	//Set displayDistCalc localStorage.
	function updateDisplayDistCalcStorage(event)
	{
		localStorage.setItem("displayDistCalc", event.target.checked ? 1 : 0);
		moveCalculatorDiv.style.display = displayDistCalc.checked ? "block" : "none";
		updateSearchDividers();
	}
	
	//Set displayLandmark localStorage.
	function updateDisplayLandmarkStorage(event)
	{
		localStorage.setItem("displayLandmark", event.target.checked ? 1 : 0);
		findLandmarkDiv.style.display = displayLandmark.checked ? "block" : "none";
		updateSearchDividers();
	}
	
	//Set displayVampLoc localStorage.
	function updateDisplayVampLocStorage(event)
	{
		localStorage.setItem("displayVampLoc", event.target.checked ? 1 : 0);
		vampLocatorDiv.style.display = displayVampLoc.checked ? "block" : "none";
		updateSearchDividers();
	}
	
	//Set displayShopList localStorage.
	function updateDisplayShopListStorage(event)
	{
		localStorage.setItem("displayShopList", event.target.checked ? 1 : 0);
		shoppingAreaTabs.div.style.display = displayShopList.checked ? "block" : "none";
	}
	
	var optionsTriangle = makeElement("<div class='box-title'>► Options</div>");
	leftSideDiv.appendChild(optionsTriangle);
	optionsTriangle.style.cursor = "pointer";
	var optionsAreOpen = false;
	optionsTriangle.addEventListener("click", function() {
		optionsAreOpen = !optionsAreOpen;
		optionsTriangle.innerHTML = (optionsAreOpen ? "▼ Options" : "► Options");
		optionsDiv.style.display = (optionsAreOpen ? "block" : "none");
	});
	
	var optionsDiv = makeElement("<div class='border-box'></div>");
	optionsDiv.style.marginBottom = "0";
	optionsDiv.style.display = "none";
	leftSideDiv.appendChild(optionsDiv);
	
	//Create labels, checkboxes, radiobuttons.
	var bindKeyDiv      = document.createElement("div");
	var radioForm       = document.createElement("form"); 
	var loginBoxDiv     = document.createElement("div");
	var vampInfoDiv     = document.createElement("div");
	var financialsDiv   = document.createElement("div");
	var inventoryDiv    = document.createElement("div");
	var powersDiv       = document.createElement("div");
	var locationsDiv    = document.createElement("div");
	var banksDiv        = document.createElement("div");
	var transitsDiv     = document.createElement("div");
	var pubsDiv         = document.createElement("div");
	var movingPlacesDiv = document.createElement("div");
	var distCalcDiv     = document.createElement("div");
	var landmarkDiv     = document.createElement("div");
	var vampLocDiv      = document.createElement("div");
	var shopListDiv     = document.createElement("div");
	optionsDiv.appendChild(bindKeyDiv);
	optionsDiv.appendChild(radioForm);
	optionsDiv.appendChild(makeElement("<div class='divider-line'>"));
	optionsDiv.appendChild(loginBoxDiv);
	optionsDiv.appendChild(makeElement("<div class='divider-line'>"));
	optionsDiv.appendChild(vampInfoDiv);
	optionsDiv.appendChild(financialsDiv);
	optionsDiv.appendChild(inventoryDiv);
	optionsDiv.appendChild(powersDiv);
	optionsDiv.appendChild(makeElement("<div class='divider-line'>"));
	optionsDiv.appendChild(locationsDiv);
	optionsDiv.appendChild(banksDiv);
	optionsDiv.appendChild(transitsDiv);
	optionsDiv.appendChild(pubsDiv);
	optionsDiv.appendChild(movingPlacesDiv);
	optionsDiv.appendChild(distCalcDiv);
	optionsDiv.appendChild(landmarkDiv);
	optionsDiv.appendChild(vampLocDiv);
	optionsDiv.appendChild(shopListDiv);
	
	
	//tabindex = "-1" excludes tab from scrolling through these options for quick access to "More Commands".
	bindKeyDiv.innerHTML  = '<label for  = "bindKey">Bind Keyboard</label><input type = "checkbox" id = "bindKey"  tabindex = "-1">';
	radioForm.innerHTML   = '<div><input type = "radio" name = "keyConfig" value = "QWEDCXZA" id = "QWEDCXZA" checked tabindex = "-1"/> \
							<label for = "QWEDCXZA">QWEDCXZA</label> </div>\
							<div><input type = "radio" name = "keyConfig" value = "WASD-QEZX" id = "WASD-QEZX" tabindex = "-1"/> \
							<label for = "WASD-QEZX">WASD-QEZX</label> </div>';
	loginBoxDiv.innerHTML = '<label for  = "loginBox">Save Logins</label><input type = "checkbox" id = "loginBox"  tabindex = "-1">';
	vampInfoDiv.innerHTML = '<label>Vampire Vitals</label>';
	financialsDiv.innerHTML = '<label for = "financials">Financials</label><input type = "checkbox" id = "financials" tabindex = "-1">';
	inventoryDiv.innerHTML  = '<label for = "inventory">Inventory</label><input type = "checkbox" id = "inventory" tabindex = "-1">';
	powersDiv.innerHTML     = '<label for = "powers">Powers</label><input type = "checkbox" id = "powers" tabindex = "-1">';
	locationsDiv.innerHTML = '<label>Location List</label>';
	banksDiv.innerHTML    = '<label for = "banks">Banks</label><input type = "checkbox" id = "banks" tabindex = "-1">';
	transitsDiv.innerHTML = '<label for = "transits">Transits</label><input type = "checkbox" id = "transits" tabindex = "-1">';
	pubsDiv.innerHTML     = '<label for = "pubs">Pubs</label><input type = "checkbox" id = "pubs" tabindex = "-1">';
	movingPlacesDiv.innerHTML = '<label for = "movingPlaces">Moving Places</label><input type = "checkbox" id = "movingPlaces" tabindex = "-1">';
	distCalcDiv.innerHTML = '<label for = "distCalc">Distance Calculator</label><input type = "checkbox" id = "distCalc" tabindex = "-1">';
	landmarkDiv.innerHTML = '<label for = "landmark">Landmark Finder</label><input type = "checkbox" id = "landmark" tabindex = "-1">';
	vampLocDiv.innerHTML  = '<label for = "vampLoc">Vampire Locator</label><input type = "checkbox" id = "vampLoc" tabindex = "-1">';
	shopListDiv.innerHTML = '<label for = "shopList">Shopping List</label><input type = "checkbox" id = "shopList" tabindex = "-1">';
	
	bindKeyDiv.title = "Action controls:<br /> \
						B to Bite, R to Rob<br /> \
						P to pick up item<br /> \
						Spacebar for More Commands<br /> \
						/ to Refresh<br /> \
						Up and Down arrow keys to cycle logins";
	
	//Make reference to bindKey checkbox.
	var bindKey = bindKeyDiv.children[1];
	//Synchronize bindKey checkbox with localStorage.
	useStorage(bindKey, "bindKey", true, false);
	
	
	
	//Make reference to movement configuration radiobuttons.
	var radioQWEDiv = radioForm.children[0];
	var radioWASDiv = radioForm.children[1];
	var radioQWE = radioQWEDiv.children[0];
	var radioWAS = radioWASDiv.children[0];
	//Synchronize radioQWE and radioWAS buttons with localStorage.
	useStorage(radioQWE, "keyConfig", true, true);
	useStorage(radioWAS, "keyConfig", false, false);
	
	bindKeyDiv.style.backgroundColor = "black";
	bindKeyDiv.style.fontSize = "100%";
	radioQWEDiv.style.backgroundColor = "black";
	radioQWEDiv.style.fontSize = "100%";
	radioWASDiv.style.backgroundColor = "black";
	radioWASDiv.style.fontSize = "100%";
	
	radioQWEDiv.title = "Movement controls (relative to S):<br /> \
						Q: northwest<br /> \
						W: north<br /> \
						E: northeast<br /> \
						D: east<br /> \
						C: southeast<br /> \
						X: south<br /> \
						Z: southwest<br /> \
						A: west<br />";
	
	radioWASDiv.title = "Movement controls (based on WASD):<br /> \
						W: north<br /> \
						A: west<br /> \
						S: south<br /> \
						D: east<br /> \
						Q: northwest<br /> \
						E: northeast<br /> \
						Z: southwest<br /> \
						X: southeast<br />";
	
	financialsDiv.title = "Tracks pocket change and bank account info. <br />Loaded from Omnibank or My Vampire page <br />if you have a Scroll of Accounting.";
	inventoryDiv.title  = "Tracks current inventory. Loaded from My Vampire page.";
	powersDiv.title     = "Tracks powers, and current quest info if applicable. <br />Loaded from My Vampire page.";
	banksDiv.title      = "Displays 5 nearest Omnibank branches.";
	transitsDiv.title   = "Displays 2 nearest transit stations.";
	pubsDiv.title       = "Displays 3 nearest local pubs.";
	movingPlacesDiv.title = "Displays the current location of guilds and shops.";
	distCalcDiv.title   = "Calculates distance between two intersections.";
	landmarkDiv.title   = "Finds landmarks near any intersection.";
	vampLocDiv.title    = "Lists your vampires close to a given intersection. <br />Based on last-known location.";
	shopListDiv.title   = "Calculates cost of item shopping list.";
	
	//Make reference to loginBox checkbox.
	var loginBox = loginBoxDiv.children[1];
	//Synchronize loginBox checkbox with localStorage.
	useStorage(loginBox, "loginBox", true, false);
	
	//Make reference to financials checkbox.
	var displayFinancials = financialsDiv.children[1];
	//Get current financials value.
	displayFinancials.checked = localStorage.getItem("displayFinancials") != 0 ? true : false;
	//When state change, update localStorage.
	displayFinancials.onchange = updateDisplayFinancialsStorage;
	
	//Make reference to inventory checkbox.
	var displayInventory = inventoryDiv.children[1];
	//Get current inventory value.
	displayInventory.checked = localStorage.getItem("displayInventory") != 0 ? true : false;
	//When state change, update localStorage.
	displayInventory.onchange = updateDisplayInventoryStorage;
	
	//Make reference to powers checkbox.
	var displayPowers = powersDiv.children[1];
	//Get current powers value.
	displayPowers.checked = localStorage.getItem("displayPowers") == 1 ? true : false;
	//When state change, update localStorage.
	displayPowers.onchange = updateDisplayPowersStorage;
	
	//Make reference to banks checkbox.
	var displayBanks = banksDiv.children[1];
	//Get current banks value.
	displayBanks.checked = localStorage.getItem("displayBanks") != 0 ? true : false;
	//When state change, update localStorage.
	displayBanks.onchange = updateDisplayBanksStorage;
	
	//Make reference to transits checkbox.
	var displayTransits = transitsDiv.children[1];
	//Get current transits value.
	displayTransits.checked = localStorage.getItem("displayTransits") != 0 ? true : false;
	//When state change, update localStorage.
	displayTransits.onchange = updateDisplayTransitsStorage;
	
	//Make reference to pubs checkbox.
	var displayPubs = pubsDiv.children[1];
	//Get current pubs value.
	displayPubs.checked = localStorage.getItem("displayPubs") == 1 ? true : false;
	//When state change, update localStorage.
	displayPubs.onchange = updateDisplayPubsStorage;
	
	//Make reference to movingPlaces checkbox.
	var displayMovingPlacesOption = movingPlacesDiv.children[1];
	//Get current movingPlaces value.
	displayMovingPlacesOption.checked = localStorage.getItem("displayMovingPlaces") != 0 ? true : false;
	//When state change, update localStorage.
	displayMovingPlacesOption.onchange = updateDisplayMovingPlacesStorage;
	
	//Make reference to distCalc checkbox.
	var displayDistCalc = distCalcDiv.children[1];
	//Get current distCalc value.
	displayDistCalc.checked = localStorage.getItem("displayDistCalc") != 0 ? true : false;
	//When state change, update localStorage.
	displayDistCalc.onchange = updateDisplayDistCalcStorage;
	
	//Make reference to landmark checkbox.
	var displayLandmark = landmarkDiv.children[1];
	//Get current landmark value.
	displayLandmark.checked = localStorage.getItem("displayLandmark") != 0 ? true : false;
	//When state change, update localStorage.
	displayLandmark.onchange = updateDisplayLandmarkStorage;
	
	//Make reference to vampLoc checkbox.
	var displayVampLoc = vampLocDiv.children[1];
	//Get current landmark value.
	displayVampLoc.checked = localStorage.getItem("displayVampLoc") != 0 ? true : false;
	//When state change, update localStorage.
	displayVampLoc.onchange = updateDisplayVampLocStorage;
	
	//Make reference to shopList checkbox.
	var displayShopList = shopListDiv.children[1];
	//Get current shopList value.
	displayShopList.checked = localStorage.getItem("displayShopList") != 0 ? true : false;
	//When state change, update localStorage.
	displayShopList.onchange = updateDisplayShopListStorage;
	
	//Separate elements.
	leftSideDiv.appendChild(document.createElement("br"));

	//Hovertext settings.
	var moCustom = document.createElement("div");
	moCustom.style.bottom = document.body.scrollBottom;
	moCustom.style.display = "none";
	moCustom.style.top = "initial";
	moCustom.style.bottom = "0px";
	moCustom.style.backgroundColor = "black";
	moCustom.style.color = "red";
	moCustom.style.position = "fixed"; 
	moCustom.style.left = "0px"; 
	moCustom.style.width = "300px"; 
	moCustom.style.padding = "2px"; 
	moCustom.style.font = "x-small Verdana,Sans-serif"; 
	
	//Use new hovertext style throughout.
	document.body.appendChild(moCustom);
	
	//Display hovertext.
	function onHoverOver(event)
	{
		//Get element that mouse is hovering over.
		var element = event.target;
		if (element && element.title.length)
		{
			//Move "title" text into hovertext element.
			moCustom.innerHTML = element.title;
			element.title = "";
			//Display hovertext.
			moCustom.style.display = "inline";
		}
	}
	
	//Hide hovertext.
	function onHoverOut(event)
	{
		//Get element that mouse was hovering over.
		var element = event.target;
		if (element)
		{
			//Hide hovertext.
			moCustom.style.display = "none";
			//Move "title" text back into the original element.
			element.title = moCustom.innerHTML;
		}
	}
	
	//Apply hovertext to the checkboxes and radio buttons.
	bindKeyDiv.addEventListener("mouseenter", onHoverOver);
	bindKeyDiv.addEventListener("mouseleave", onHoverOut);
	radioQWEDiv.addEventListener("mouseenter", onHoverOver);
	radioQWEDiv.addEventListener("mouseleave", onHoverOut);
	radioWASDiv.addEventListener("mouseenter", onHoverOver);
	radioWASDiv.addEventListener("mouseleave", onHoverOut);
	financialsDiv.addEventListener("mouseenter", onHoverOver);
	financialsDiv.addEventListener("mouseleave", onHoverOut);
	inventoryDiv.addEventListener("mouseenter", onHoverOver);
	inventoryDiv.addEventListener("mouseleave", onHoverOut);
	powersDiv.addEventListener("mouseenter", onHoverOver);
	powersDiv.addEventListener("mouseleave", onHoverOut);
	banksDiv.addEventListener("mouseenter", onHoverOver);
	banksDiv.addEventListener("mouseleave", onHoverOut);
	transitsDiv.addEventListener("mouseenter", onHoverOver);
	transitsDiv.addEventListener("mouseleave", onHoverOut);
	pubsDiv.addEventListener("mouseenter", onHoverOver);
	pubsDiv.addEventListener("mouseleave", onHoverOut);
	movingPlacesDiv.addEventListener("mouseenter", onHoverOver);
	movingPlacesDiv.addEventListener("mouseleave", onHoverOut);
	distCalcDiv.addEventListener("mouseenter", onHoverOver);
	distCalcDiv.addEventListener("mouseleave", onHoverOut);
	landmarkDiv.addEventListener("mouseenter", onHoverOver);
	landmarkDiv.addEventListener("mouseleave", onHoverOut);
	vampLocDiv.addEventListener("mouseenter", onHoverOver);
	vampLocDiv.addEventListener("mouseleave", onHoverOut);
	shopListDiv.addEventListener("mouseenter", onHoverOver);
	shopListDiv.addEventListener("mouseleave", onHoverOut);
	
	//Replace all existing ? icons to call new hover functions.
	var imgs = document.getElementsByTagName("img");
	for (var i = 0; i < imgs.length; i++)
	{
		var img = imgs[i];
		if (img.getAttribute("onmouseover") && img.getAttribute("onmouseout"))
		{
			//Create new ? icon styled like original, but with calls to new hover functions.
			var newImg = document.createElement("img");
			newImg.src = "bloodimages/q.png";
			newImg.style.width = "12px";
			newImg.style.height = "12px";
			newImg.title = img.title;
			newImg.addEventListener("mouseenter", onHoverOver);
			newImg.addEventListener("mouseleave", onHoverOut);
			//Insert new ?.
			img.parentElement.insertBefore(newImg, img);
			//Remove original ?.
			img.parentElement.removeChild(img)
		}
	}

	
	//Controls display of dividers based on whether content is set to display.
	function updateDividersInDiv(parentElement)
	{
		var children = parentElement.children;
		for (var i = 0; i < children.length; i++)
		{
			if (children[i].className == "divider-line")
			{
				var followedByVisibleDiv = false;
				for (var j = i + 1; j < children.length; j++)
				{
					if (children[j].className != "divider-line" && children[j].style.display == "block") 
					{
						followedByVisibleDiv = true;
					}
				}
				
				if (children[i-1].style.display == "block" && followedByVisibleDiv)
				{
					children[i].style.display = "block";
				}
				else
				{
					children[i].style.display = "none";
				}
			}
		}
	}
}

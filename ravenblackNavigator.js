//Welcome to the Ravenblack Navigator.

//Feature list:
//	+ Clean interface
//		- Consolidated banner, header and footer
//		- Rearranged links
//		- Options and features contained in sidebars
//			= Left sidebar lists options
//			= Right sidebar shows features
//		- Hover over options for explanation
//	+ Customizable preferences
//		- Toggleable options saved automatically
//	+ Keybinding
//		- Spacebar to load "More Commands" in all modes
//		- Grid movement controlled by keyboard
//			= Two convenient movement configurations
//		- Item use controlled by keyboard with minimal mouse requirement
//		- One-touch biting and robbing
//			= Humans preferenced above vampires
//	+ Vamp info
//		- Display stats from My Vampire page without going off the grid
//			= Select to show powers and quests, bank balance and pocket change, inventory
//	+ Landmarks
//		- Lists five nearest banks and nearest station
//			= Includes direction and number of moves
//	+ Distance calculator
//		- Displays AP needed and relative direction between any two points on the grid
//			= Includes ability to set starting point to current location
//	+ War mode
//		- Autoloading "More Commands"
//		- Eliminates unnecessary speaking (say and shout), telepathy and giving commands
//			= Declutters screen
//		- Disables biting and robbing so no accidental attacks
//	+ Hit-tracking
//		- Tracking of hits by and against
//			= Includes biting and robbing
//
//	+ Coming soon: Instant updating of pocket change and inventory, multiple login support!


//Use page load time to guess if the page was freshly downloaded, or loaded from a cache.
var pageLoadTime = window.performance.timing.responseStart - window.performance.timing.requestStart;
//If the page was loaded in under ten milliseconds, assume it's cached.
var isNewPage = pageLoadTime > 10;

//Get list of 3x3 grid spaces.
var spaces = document.querySelectorAll("td.street, td.city, td.intersect, td.cityblock");

//Access container of game interface.
var firstSpacey = document.getElementsByClassName("spacey")[0];

//Access container of current user.
var secondSpacey = document.getElementsByClassName("spacey")[1];

var mainDiv = document.getElementById("main");

var borderDiv;
for (var i = 0; i < firstSpacey.children.length; i++)
{
	var child = firstSpacey.children[i];
	if (child.tagName == "DIV")
	{
		borderDiv = child;
		break;
	}
}

var isCityView = (spaces.length == 9);
var isMyVampView = (borderDiv.childNodes[0].nodeName == "#text" && borderDiv.childNodes[0].data.indexOf("You have drunk") != -1);
var isSSView = (borderDiv.childNodes[0].nodeName == "#text" && borderDiv.childNodes[0].data.indexOf("The vampire") != -1);
var isLoginView = (document.querySelectorAll("form.head").length != 0);
var isWelcomeView = (location.href.indexOf("action=welcome") != -1);

var userString = secondSpacey.childNodes[0].data;
var userName = userString.substring(userString.indexOf("You are the vampire ") + 20, userString.indexOf(" (if this is not you"));




//	+ Clean interface

//Remove page title to conserve screen real estate.
var title = mainDiv.getElementsByTagName("H1")[0];
title.style.display="none";
//Remove FAQ reminder.
title.nextElementSibling.style.display="none";

//myvamp, city, chat, logout
//howto, faq, donate, news, 

if (isLoginView == false)
{
	//Remove unnecessary header info.
	var header = document.getElementsByClassName("head")[0];
	header.insertBefore(document.createElement("br"), header.firstChild)
	var putOnNextLine = [];
	for (var i = 0; i < header.childNodes.length; i++)
	{
		var child = header.childNodes[i];
		if (child.innerHTML == "How To Play" || child.innerHTML == "FAQ" || child.innerHTML == "Donate" || child.innerHTML == "News")
		{
			putOnNextLine.push(child);
			putOnNextLine.push(child.nextSibling);
			
			//Remove | after link.
			header.removeChild(child.nextSibling);
			
			//Remove the link itself.
			header.removeChild(child);
			
			//Check same index in case another undesired element shifted to that position.
			i--;
		}
	}
	header.removeChild(header.children[header.children.length - 1]);
	for (var i = 0; i < putOnNextLine.length - 1; i++)
	{
		var child = putOnNextLine[i];
		header.appendChild(child);
	}
	
	var useageAgreement = mainDiv.children[mainDiv.children.length-1];
	header.appendChild(document.createElement("br"));
	header.appendChild(useageAgreement.children[0]);
	
	//Remove footer with biterlink.
	var textInfo = document.getElementsByClassName("spacey");
	var footer = textInfo[textInfo.length-1];
	for ( ; ; ) //infinite loooop!
	{
		var child = footer.lastChild;
		footer.removeChild(child);
		if (child.innerHTML == "Click here for more detail") break;		
	}
	
	//Move header info below grid.
	footer.parentElement.appendChild(header);
	
	//Normalize size of grid.
	firstSpacey.style.width = "500px";
	
	
	
	
	//	+ Customizable preferences
	
	//Set bindKey localStorage.
	function updateBindKeyStorage(event)
	{
		localStorage.setItem("bindKey", event.target.checked ? 1 : 0);
	}
	
	//Set radioQWE localStorage.
	function updateRadioQWEStorage(event)
	{
		localStorage.setItem("keyConfig", event.target.checked ? 0 : 1)
	}
	
	//Set radioWAS localStorage.
	function updateRadioWASStorage(event)
	{
		localStorage.setItem("keyConfig", event.target.checked ? 1 : 0)
	}
	
	//Set warMode localStorage.
	function updateWarModeStorage(event)
	{
		localStorage.setItem("warMode", event.target.checked ? 1 : 0);
	}
	
	//Set displayFinancials localStorage.
	function updateDisplayFinancialsStorage(event)
	{
		localStorage.setItem("displayFinancials", event.target.checked ? 1 : 0);
		financialsBox.style.display = displayFinancials.checked ? "block" : "none";
	}
	
	//Set displayInventory localStorage.
	function updateDisplayInventoryStorage(event)
	{
		localStorage.setItem("displayInventory", event.target.checked ? 1 : 0);
		inventoryBox.style.display  = displayInventory.checked  ? "block" : "none";
		financialsHR.style.display = (displayInventory.checked || displayPowers.checked) ? "block" : "none";
	}
	
	//Set displayPowers localStorage.
	function updateDisplayPowersStorage(event)
	{
		localStorage.setItem("displayPowers", event.target.checked ? 1 : 0);
		powersBox.style.display     = displayPowers.checked     ? "block" : "none";
		financialsHR.style.display = (displayInventory.checked || displayPowers.checked) ? "block" : "none";
		inventoryHR.style.display = displayPowers.checked ? "block" : "none";
	}
	
	
	
	
	//	+ Left sidebar
	
	//Create div container for checkbox.
	var leftSideDiv = document.createElement("div");
	//Put div above grid.
	document.body.insertBefore(leftSideDiv, document.body.firstChild);
	//Put div on left side.
	leftSideDiv.style.float = "left";
	leftSideDiv.style.width = "150px";
	
	//Create labels, checkboxes, radiobuttons.
	var bindKeyDiv    = document.createElement("div");
	var radioForm     = document.createElement("form"); 
	var warModeDiv    = document.createElement("div");
	var vampInfoDiv   = document.createElement("div");
	var financialsDiv = document.createElement("div");
	var inventoryDiv  = document.createElement("div");
	var powersDiv     = document.createElement("div");
	leftSideDiv.appendChild(bindKeyDiv);
	leftSideDiv.appendChild(radioForm);
	leftSideDiv.appendChild(warModeDiv);
	leftSideDiv.appendChild(document.createElement("hr"));
	leftSideDiv.appendChild(vampInfoDiv);
	leftSideDiv.appendChild(financialsDiv);
	leftSideDiv.appendChild(inventoryDiv);
	leftSideDiv.appendChild(powersDiv);
	//tabindex = "-1" excludes tab from scrolling through these options for quick access to "More Commands".
	bindKeyDiv.innerHTML  = '<label for  = "bindKey">Bind Keyboard</label><input type = "checkbox" id = "bindKey"  tabindex = "-1">';
	radioForm.innerHTML   = '<div><input type = "radio" name = "keyConfig" value = "QWEDCXZA" id = "QWEDCXZA" checked tabindex = "-1"/> \
							<label for = "QWEDCXZA">QWEDCXZA</label> </div>\
							<div><input type = "radio" name = "keyConfig" value = "WASD-QEZX" id = "WASD-QEZX" tabindex = "-1"/> \
							<label for = "WASD-QEZX">WASD-QEZX</label> </div>';
	warModeDiv.innerHTML  = '<label for  = "warMode">War Mode</label><input type      = "checkbox" id = "warMode"  tabindex = "-1">';
	vampInfoDiv.innerHTML = '<label>Vamp Info:</label>';
	financialsDiv.innerHTML = '<label for = "financials">Financials</label><input type = "checkbox" id = "financials" tabindex = "-1">';
	inventoryDiv.innerHTML  = '<label for = "inventory">Inventory</label><input type = "checkbox" id = "inventory" tabindex = "-1">';
	powersDiv.innerHTML     = '<label for = "powers">Powers</label><input type = "checkbox" id = "powers" tabindex = "-1">';
	
	bindKeyDiv.title = "Action controls:<br /> \
						B to Bite, R to Rob<br /> \
						H for Holy Water<br /> \
						G for Garlic Spray<br /> \
						Y for Wooden Stake<br /> \
						U for UV Grenade (coming soon)<br /> \
						T for SoTurn<br /> \
						M for SoTel<br /> \
						N for SoDisp<br /> \
						Spacebar for More Commands";
	
	//Make reference to bindKey checkbox.
	var bindKey = bindKeyDiv.children[1];
	//Get current bindKey value.
	bindKey.checked = localStorage.getItem("bindKey") != 0 ? true : false;
	//When state change, update localStorage.
	bindKey.onchange = updateBindKeyStorage;
	
	//Make reference to movement configuration radiobuttons.
	var radioQWEDiv = radioForm.children[0];
	var radioWASDiv = radioForm.children[1];
	var radioQWE = radioQWEDiv.children[0];
	var radioWAS = radioWASDiv.children[0];
	radioQWE.checked = localStorage.getItem("keyConfig") == 1 ? false : true;
	radioWAS.checked = localStorage.getItem("keyConfig") == 1 ? true : false;
	radioQWE.onchange = updateRadioQWEStorage;
	radioWAS.onchange = updateRadioWASStorage;
	
	bindKeyDiv.style.backgroundColor = "black";
	radioQWEDiv.style.backgroundColor = "black";
	radioWASDiv.style.backgroundColor = "black";
	
	
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
	
	
	financialsDiv.title = "Tracks pocket change and bank account info. Loaded from Omnibank or My Vampire page if you have a Scroll of Accounting.";
	inventoryDiv.title  = "Tracks current inventory. Loaded from My Vampire page.";
	powersDiv.title     = "Tracks powers, and current quest info if applicable. Loaded from My Vampire page.";
	
	//Make reference to warMode checkbox.
	var warMode = warModeDiv.children[1];
	//Get current warMode value.
	warMode.checked = localStorage.getItem("warMode") == 1 ? true : false;
	//When state change, update localStorage.
	warMode.onchange = updateWarModeStorage;
	
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
	
	
	
	
	for (var i = 0; i < 10; i++) leftSideDiv.appendChild(document.createElement("br"));
	
	
	
	
	// Need to: make the div, make the options for the power stuff, bank stuff, inventory
	var myVampDiv = document.createElement("div");
	myVampDiv.style.border = "solid white 1px";
	myVampDiv.style.padding = "7px";
	leftSideDiv.appendChild(myVampDiv);
	myVampDiv.style.maxWidth = "150px";
	
	
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
	
	
	
	
	//	+ Right sidebar
	
	//Create div container for checkbox.
	var rightSideDiv = document.createElement("div");
	//Put div above grid.
	document.body.insertBefore(rightSideDiv, document.body.firstChild);
	//Put div on right side.
	rightSideDiv.style.float = "right";
	//Define position of div container.
	rightSideDiv.style.position = "relative";
	//Create separate div for hit-tracking.
	var scrollingDiv = document.createElement("div");
	rightSideDiv.appendChild(scrollingDiv);
	//Constrain dimensions of div container.
	scrollingDiv.style.width = "200px";
	scrollingDiv.style.height = "250px";
	//Control overflow by scrolling.
	scrollingDiv.style.overflow = "scroll";
	scrollingDiv.style.fontSize = "75%";
	rightSideDiv.appendChild(document.createElement("br"));
	
	
	
	
	//	+ Hit-tracking
	
	//Initialize hit-tracking.
	if (localStorage.getItem("hittracker") == null)
	{
		localStorage.setItem("hittracker", ""); 
	}
	
	//Store hit-tracking.
	function recordHit(element, dealtIt)
	{
		var message;
		
		//Pull text of hits made and received.
		if (element.nodeName == "#text")
		{
			message = element.data;
		}
		else if (element.tagName == "B")
		{
			message = element.innerHTML;
		}
		else
		{
			message = element.outerHTML;
		}
		
		if (message.indexOf(" coin") != -1)
		{
			var robString = message.substring(0, message.indexOf(" coin"));
			robString = robString.substring(robString.lastIndexOf(" ")+1);
			var robAmount = (robString == "one") ? 1 : parseInt(robString);
			var currentCoinsOn = localStorage.getItem("coinsOn" + userName);
			currentCoinsOn = parseInt(currentCoinsOn);
			var newCoinsOn;
			if (dealtIt)
			{
				newCoinsOn = currentCoinsOn + robAmount;
			}
			else
			{
				newCoinsOn = currentCoinsOn - robAmount;
			}
			localStorage.setItem("coinsOn" + userName, newCoinsOn);
		}
		
		localStorage.setItem("hittracker", localStorage.getItem("hittracker") + message);
	}
	
	if (isCityView && isNewPage)
	{
		//Hits dealth are in the firstSpacey before the borderDiv.
		for (var i = 0; i < firstSpacey.childNodes.length; i++)
		{
			var child = firstSpacey.childNodes[i];
			if (child.nodeName == "#text" && child.data.trim() == "") continue; //if no text except whitespace, skip
			if (child.nodeName == "FORM") continue; //if form found, skip
			if (child.nodeName == "HR") continue; //if horizontal rule found, skip
			if (child.nodeName == "DIV") break; //stop at borderDiv
			recordHit(child, true);
		}
		//Hits received are in the borderDiv before Action Points.
		for (var i = 0; i < borderDiv.childNodes.length; i++)
		{
			var child = borderDiv.childNodes[i];
			if (child.nodeName == "#text" && child.data.trim() == "") continue; //if no text except whitespace, skip
			if (child.nodeName == "FORM" && child.name == "countdn") break; //if countdown found, nothing to see here
			if (child.nodeName == "FORM") continue; //if form found, skip
			if (child.nodeName == "HR") continue; //if horizontal rule found, skip
			if (child.nodeName == "#text" && child.data.indexOf("Action Points: ") != -1) break; //if "Action Points: ", skip
			recordHit(child, false);
		}
		//Look for any building information.
		var underGridYet = false;
		for (var i = 0; i < borderDiv.childNodes.length; i++)
		{
			var child = borderDiv.childNodes[i];
			if (child.nodeName == "CENTER")
			{
				underGridYet = true;
				continue;
			}
			if (underGridYet == false) continue;
			if (child.nodeName == "#text" && child.data.indexOf("Welcome to Omnibank") != -1)
			{
				var accountString = child.data;
				var coinsIn = accountString.substring(accountString.indexOf("Your account has ") + 17, accountString.indexOf(" coin"));
				var bankForm = borderDiv.childNodes[i + 1];
				var pocketString = bankForm.childNodes[bankForm.childNodes.length - 1].data;
				var coinsOn = pocketString.substring(pocketString.indexOf("You have ") + 9, pocketString.indexOf(" coin"));
				localStorage.setItem("coinsIn" + userName, coinsIn);
				localStorage.setItem("coinsOn" + userName, coinsOn);
			}
		}
	}
	
	//Insert contents of localStorage into div.
	scrollingDiv.innerHTML = localStorage.getItem("hittracker");
	scrollingDiv.scrollTop = scrollingDiv.scrollHeight;
	
	//Clear hit-tracking button.
	var clearHitsButton = document.createElement("button");
	rightSideDiv.appendChild(clearHitsButton);
	clearHitsButton.innerHTML = "Clear Hits";
	//clearHitsButton.style.bottom = "0px";
	clearHitsButton.addEventListener("click", function(event)
	{
		localStorage.setItem("hittracker", "");
		scrollingDiv.innerHTML = "";
	});
	
	//Select all hit-tracking button.
	var selectHitsButton = document.createElement("button");
	rightSideDiv.appendChild(selectHitsButton);
	selectHitsButton.innerHTML = "Select All Hits";
	selectHitsButton.addEventListener("click", function(event)
	{
		var range;
		if (document.body.createTextRange) //IE
		{
			range = document.body.createTextRange();
			range.moveToElementText(scrollingDiv);
			range.select();
		}
		else if (window.getSelection) //Chrome, Firefox, Safari, even Opera
		{
			var selection = window.getSelection();
			range = document.createRange();
			range.selectNodeContents(scrollingDiv);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	});
	
	//Add space between sections.
	rightSideDiv.appendChild(document.createElement("br"));
	rightSideDiv.appendChild(document.createElement("br"));
	
	
	
	
	
	//	+ Vamp info
	
	//Pull from My Vampire page.
	if (isMyVampView)
	{
		var foundQuest = false;
		
		for (var i = 0; i < borderDiv.childNodes.length; i++)
		{
			var child = borderDiv.childNodes[i];
			//Pull money string.
			if (child.nodeName == "#text" && child.data.indexOf("Money: ") != -1)
			{
				var moneyString = child.data;
				var coinsOn = moneyString.substring(moneyString.indexOf("Money: ") + 7, moneyString.indexOf(" coin"));
				
				localStorage.setItem("coinsOn" + userName, coinsOn);
			}
			if (child.nodeName == "#text" && child.data.indexOf("Possessions:") != -1)
			{
				var inventory = "";
				
				var list = borderDiv.childNodes[i+1];
				for (var j = 0; j < list.children.length; j++)
				{
					var bulletPoint = list.children[j];
					
					inventory += "<br />" + bulletPoint.childNodes[0].data;
					
					if (bulletPoint.childNodes[0].data.indexOf("Scroll of Accounting") != -1)
					{
						var bankString = bulletPoint.childNodes[2].data;
						var coinsIn = bankString.substring(bankString.indexOf("(") + 1, bankString.indexOf(" coin"));
						localStorage.setItem("coinsIn" + userName, coinsIn);
					}
				}
				
				localStorage.setItem("inventory" + userName, inventory);
			}
			if (child.nodeName == "#text" && child.data.indexOf("Powers: ") != -1)
			{
				var powerString = child.data;
				var powers = powerString.substring(powerString.indexOf("Powers: ") + 8);
				powers = powers.split(" ").join("<br />");
				localStorage.setItem("powers" + userName, powers);
			}
			if (child.nodeName == "#text" && child.data.indexOf("Quest: ") != -1)
			{
				var questString = child.data;
				var quest = questString.substring(questString.indexOf("Quest: ") + 7);
				//Remove . after deadline.
				quest = quest.substring(0, quest.lastIndexOf("."));
				//Remove deadline info.
				quest = quest.substring(0, quest.lastIndexOf(".")+1);
				localStorage.setItem("quest" + userName, quest);
				
				foundQuest = true;
			}
		}
		
		if (foundQuest == false)
		{
			localStorage.removeItem("quest");
		}
	}
	
	/*
	TO DO:
	figure out how to add and subtract money when someone robs from you or you rob someone
	pull the inventory, and if you have a scroll of accounting you can pull it from there
		update when you get to a bank
		handle paying money at a pub, a guild, or a shop; pub and shop shows money?
	*/
	
	
	var financialsBox = document.createElement("div");
	var inventoryBox = document.createElement("div");
	var powersBox = document.createElement("div");
	myVampDiv.appendChild(financialsBox);
	myVampDiv.appendChild(inventoryBox);
	myVampDiv.appendChild(powersBox);
	financialsBox.style.display = displayFinancials.checked ? "block" : "none";
	inventoryBox.style.display  = displayInventory.checked  ? "block" : "none";
	powersBox.style.display     = displayPowers.checked     ? "block" : "none";
	financialsBox.style.fontSize = "75%";
	inventoryBox.style.fontSize = "75%";
	powersBox.style.fontSize = "75%";
	var financialsHR = document.createElement("hr");
	var inventoryHR = document.createElement("hr");
	
	
	financialsBox.innerHTML = "Pocket change: " + localStorage.getItem("coinsOn" + userName) + "<br />";
	financialsBox.innerHTML += "Bank account: " + localStorage.getItem("coinsIn" + userName);
	financialsBox.appendChild(financialsHR);
	inventoryBox.innerHTML += "Inventory: " + localStorage.getItem("inventory" + userName);
	inventoryBox.appendChild(inventoryHR);
	powersBox.innerHTML += "Powers: <br />" + localStorage.getItem("powers" + userName);
	if (localStorage.getItem("quest" + userName) != null)
	{
		powersBox.innerHTML += "<br />Quest: <br />" + localStorage.getItem("quest" + userName);
	}
	
	financialsHR.style.display = (displayInventory.checked || displayPowers.checked) ? "block" : "none";
	inventoryHR.style.display = displayPowers.checked ? "block" : "none";
	
	
	
	
	
	
	// + Landmarks
	
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
			
			localStorage.setItem("currentX" + userName, currentX);
			localStorage.setItem("currentY" + userName, currentY);
			
			break;
		}
	}
	
	currentX = parseInt(localStorage.getItem("currentX" + userName));
	currentY = parseInt(localStorage.getItem("currentY" + userName));
	
	
	//Bank info
	var bankDistances = [200, 200, 200, 200, 200]; //actual width and height of grid
	var nearestBanks = [null, null, null, null, null];
	//Parse array of banks.
	for (var i = 0; i < bankArray.length; i++)
	{
		var bankX = bankArray[i][1]; //x coordinate index 1
		var bankY = bankArray[i][2]; //y coordinate index 2
		
		//Determine distances on x and y coordinates.
		var distanceX = Math.abs(bankX - currentX);
		var distanceY = Math.abs(bankY - currentY);
		
		//Determine number of moves to bank.
		var distance = Math.max(distanceX, distanceY);
		
		//Comparison to closest-known bank, sorting algorithm.
		for (var j = bankDistances.length - 1; j >= 0; j--)
		{
			if (distance < bankDistances[j])
			{
				if (j > 0 && distance < bankDistances[j - 1])
				{
					bankDistances[j] = bankDistances[j - 1];
					nearestBanks[j] = nearestBanks[j - 1];
				}
				else
				{
					bankDistances[j] = distance;
					nearestBanks[j] = bankArray[i];
					break;
				}
			}
		}
	}
	
	var rightBorderDiv = document.createElement("div");
	rightSideDiv.appendChild(rightBorderDiv);
	rightBorderDiv.style.border = "solid white 1px";
	rightBorderDiv.style.padding = "7px";
	
	//Display closest bank info.
	var bankInfo = document.createElement("div");
	bankInfo.innerHTML = "Nearest Omnibank branches:<br />";
	bankInfo.style.fontSize = "75%";
	rightBorderDiv.appendChild(bankInfo);
	
	rightBorderDiv.appendChild(document.createElement("hr"));
	
	//Display closest transit info
	var stationInfo = document.createElement("div");
	stationInfo.innerHTML = "Nearest transit station:<br />";
	stationInfo.style.fontSize = "75%";
	rightBorderDiv.appendChild(stationInfo);
	
	for (var i = 0; i < nearestBanks.length; i++)
	{
		var bank = nearestBanks[i];
		
		var bankX = bank[1];
		var bankY = bank[2];

		var streetX = bankX / 2;
		var streetY = bankY / 2;

		//Determine distances on x and y coordinates.
		var directionX = bankX - currentX;
		var directionY = bankY - currentY;
		
		var streetNames = streetArray[streetX][1] + " and " + streetArray[streetY][2];
		
		bankInfo.innerHTML += streetNames;
		bankInfo.innerHTML += ", ";
		bankInfo.innerHTML += assignDirection(directionX, directionY);
		bankInfo.innerHTML += "<br />";
	}
	
	//Station info
	var stationDistance = 200; //actual width and height of grid
	var nearestStation;
	//Parse array of stations.
	for (var i = 0; i < stationArray.length; i++)
	{
		var stationX = stationArray[i][1];
		var stationY = stationArray[i][2];
		
		//Determine distances on x and y coordinates.
		var distanceX = Math.abs(stationX - currentX);
		var distanceY = Math.abs(stationY - currentY);
		
		//Determine number of moves to station.
		var distance = Math.max(distanceX, distanceY);
		
		if (distance < stationDistance)
		{
			stationDistance = distance;
			nearestStation = stationArray[i];
		}
	}
	
	//Display station info.
	
	var stationX = nearestStation[1];
	var stationY = nearestStation[2];
	
	var streetX = stationX / 2;
	var streetY = stationY / 2;
	
	var directionX = stationX - currentX;
	var directionY = stationY - currentY;
	
	var streetNames = streetArray[streetX][1] + " and " + streetArray[streetY][2];
	
	stationInfo.innerHTML += nearestStation[0];
	stationInfo.innerHTML += ", ";
	stationInfo.innerHTML += streetNames;
	stationInfo.innerHTML += ", ";
	stationInfo.innerHTML += assignDirection(directionX, directionY);
	stationInfo.innerHTML += "<br />";
	
	
	
	
	
	//	+ Move calculator
	
	var moveCalculatorDiv = document.createElement("div");
	rightSideDiv.appendChild(document.createElement("br"));
	rightSideDiv.appendChild(moveCalculatorDiv);
	
	var xStart = document.createElement("select");
	var yStart = document.createElement("select");
	var dirStart = document.createElement("select");
	var xEnd = document.createElement("select");
	var yEnd = document.createElement("select");
	var dirEnd = document.createElement("select");
	xStart.style.width = "95px";
	yStart.style.width = "60px";
	dirStart.style.width = "50px";
	xEnd.style.width = "95px";
	yEnd.style.width = "60px";
	dirEnd.style.width = "50px";
	var moveTitleDiv = document.createElement("div");
	var distanceDiv = document.createElement("div");
	moveTitleDiv.innerHTML = "Distance calculator:";
	moveTitleDiv.style.fontSize = "75%";
	distanceDiv.style.fontSize = "75%";
	
	var setStartCurrentButton = document.createElement("button");
	setStartCurrentButton.innerHTML = "Set start to current location";
	setStartCurrentButton.addEventListener("click", function(event)
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
	});
	
	moveCalculatorDiv.appendChild(moveTitleDiv);
	moveCalculatorDiv.appendChild(setStartCurrentButton);
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
	
	function computeMoveCalculator(event)
	{
		var xStartExact = xStart.value;
		var yStartExact = yStart.value;
		var xEndExact = xEnd.value;
		var yEndExact = yEnd.value;
		if (dirStart.value.indexOf("x") != -1) xStartExact++;
		if (dirStart.value.indexOf("y") != -1) yStartExact++;
		if (dirEnd.value.indexOf("x") != -1) xEndExact++;
		if (dirEnd.value.indexOf("y") != -1) yEndExact++;
		var xDiff = xEndExact - xStartExact;
		var yDiff = yEndExact - yStartExact;
		if (isNaN(xDiff) || isNaN(yDiff)) 
		{
			distanceDiv.innerHTML = "Finish selecting streets.";
		}
		else if (xStartExact < 0 || xStartExact >= 200 || yStartExact < 0 || yStartExact >= 200 || xEndExact < 0 || xEndExact >= 200 || yEndExact < 0 || yEndExact >= 200) 
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
	
	
	
	
	// + Form access
	
	//List forms.
	var forms = document.getElementsByTagName("form");
	
	
	
	
	//	+ War mode
	
	//If warMode selected.
	if (warMode.checked)
	{
		//Autoload More commands.
		for (var i = 0; i < forms.length; i++)
		{
			var child = forms[i];
			if (child.firstChild.value == "move")
			{
				child.setAttribute("action", "/blood.pl?target=extra-commands");
			}
			
			if (child.children[0].value == "say"
			 || child.children[0].value == "telepathy"
			 || child.children[0].value == "give"
			 || child.firstChild.data == "Give ")
			{
				child.parentElement.removeChild(child);
				i--; //Check same index in case another undesired element shifted to that position.
			}
		}
	//	if (window.location.href.indexOf("extra-commands") == -1)
	//	{
	//		window.location.href="/blood.pl?target=extra-commands";
	//	}
	}
	
	//Auto-enable double garlic spray.
	for (var i = 0; i < forms.length; i++)
	{
		var form = forms[i];
		
		//Find garlic spray form, provided a checkbox to use two.
		if (form.action.value == "use" && form.target.value == "33" && form.x)
		{
			form.x.checked = true;
		}
	}
	
	
	
	
	
	
	//	+ Keybinding
	
	document.body.addEventListener("keydown", function(event)
	{
		//If keybinding is off, don't assign actions to keys.
		if (bindKey.checked == false) return;
		
		//If CTRL key is pressed, temporarily disable keybinding, i.e. CTRL+C to copy hits.
		if (event.ctrlKey) return;
		
		//If a text form is active, temporarily disable keybinding, i.e. selecting Teleport location.
		if (document.activeElement.type && document.activeElement.type.toLowerCase() == "text") return;
		//if (document.activeElement == document.body) return;
		
		//If a select form, i.e. dropdown, is active, temporarily disable actions linked to keybinding. 
		if (document.activeElement.tagName.toLowerCase() == "select") return;
		
		//console.log("key pressed: ", event.keyCode);
		
		function doMove(moveIndex)
		{
			var space = spaces[moveIndex];
			for (var i = 0; i < space.children.length; i++)
			{
				var child = space.children[i];
				if (child.tagName == "FORM" && child.action.value == "move")
				{
					child.submit();
					return;
				}
			}
			/*
			var forms = document.getElementsByTagName("form");
			var movesCounted = 0;
			for (var i = 0; i < forms.length; i++)
			{
				var form = forms[i];
				if (form.action.value == "move") 
				{
					if (movesCounted == moveIndex)
					{
						form.submit();
						return;
					}
					movesCounted++;
				}
			}
			*/
		}
		
		function doCommand(action, target)
		{
			var forms = document.getElementsByTagName("form");
			for (var i = 0; i < forms.length; i++)
			{
				var form = forms[i];
				if (form.action.value == action && form.target.value == target)
				{
					form.submit();
					return;
				}
			}
		}

		function doHuman()
		{
			var forms = document.getElementsByTagName("form");
			for (var i = 0; i < forms.length; i++)
			{
				var form = forms[i];
				if (form.action.value == "drink" && form.t.value == "0")
				{
					form.submit();
					return true;
				}
			}
			return false;
		}
		
		function doVamp(action)
		{
			//a for anchor tag.
			var links = document.getElementsByTagName("a");
			for (var i = 0; i <links.length; i++)
			{
				var link = links[i];
				if (link.innerHTML == action) //"drink" or "rob"
				{
					window.location.href = link.href;
					return;
				}
			}
		}
		
		//var forms = document.getElementsByTagName("form");
		
		switch(event.keyCode)
		{
			case 66: //b: biter
				if (!warMode.checked) //No Human found!
				{
					if (!doHuman())
					{
						doVamp("drink");
					}
				}
				break;
			case 82: //r: rob
				if (!warMode.checked)
				{
					doVamp("rob");
				}
				break;
			case 81: //q: move up-left
				doMove(0);
				break;
			case 87: //w: move up
				doMove(1);
				break;
			case 69: //e: move up-right
				doMove(2);
				break;
			case 68: //d: move right
				doMove(5);
				break;
			case 67: //c: move down-right or no move
				if (radioQWE.checked)
				{
					doMove(8);
				}
				else
				{
					return;
				}
				break;
			case 88: //x: move down or down-right
				doMove(radioQWE.checked ? 7 : 8);
				break;
			case 90: //z: move down-left
				doMove(6);
				break;
			case 65: //a: move left
				doMove(3);
				break;
			case 83: //s: no move or move down
				if (!radioQWE.checked)
				{
					doMove(7);
				}
				else
				{
					return;
				}
				break;
			case 71: //g: garlic spray
				{
					//code to implement double garlic spray here
				}
				doCommand("use", "33");
				break;
			case 72: //h: holy water
				doCommand("use", "32");
				break;
			case 84: //t: scroll of turning
				doCommand("use", "0");
				break;
			case 89: //y: wooden stake
				doCommand("use", "64");
				break;
			//case 85: //u: uv grenade
				//doCommand("use", "x");
				//break;
			case 77: //m: scroll of teleportation
				doCommand("use", "1");
				break;
			case 78: //n: scroll of displacement
				doCommand("use", "2");
				break;
			case 32: //spacebar: 
				window.location.href = "/blood.pl?target=extra-commands";
				break;
			//case xx: //xxxxxxx: refresh 
				//document.location.reload(true);
				//break;
			//If no keybinding matches found, don't prevent default behavior, i.e. let tab key work to move between forms.
			default: return;
		}
		
		//console.log("prevent default behavior");
		event.preventDefault();
	});
}

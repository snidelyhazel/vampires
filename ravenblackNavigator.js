//Welcome to the Ravenblack Navigator.

//Feature list:
//	+ Multiple login support
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
//			= Updates info at shops--including pawn shops-- and pubs, and guilds to come.
//	+ Landmarks
//		- Lists five nearest banks and nearest station
//			= Includes direction and number of moves
//	+ Distance calculator
//		- Displays AP needed and relative direction between any two points on the grid
//			= Includes ability to set starting point to current location
//	+ Landmark finder
//		- Find banks (pubs coming soon!) near given intersection
//	+ Shopping calculator
//		- Check item price from all moving and stationary shops as well as extended lairs
//		- Shopping list creator
//	+ War mode
//		- Autoloading "More Commands"
//		- Eliminates unnecessary speaking (say and shout), telepathy and giving commands
//			= Declutters screen
//		- Disables biting and robbing so no accidental attacks
//	+ Hit-tracking
//		- Tracking of hits by and against
//			= Includes biting and robbing
//
//	+ Coming soon: Instant updating of pocket change and inventory!



document.body.style.display = "block";


//	+ Setup
//	Data initialization.

//Use page load time to guess if the page was freshly downloaded, or loaded from a cache.
var pageLoadTime = window.performance.timing.responseStart - window.performance.timing.requestStart;
//If the page was loaded in under ten milliseconds, assume it's cached.
var isNewPage = pageLoadTime > 10;

//Get list of 3x3 grid spaces.
var spaces = document.querySelectorAll("td.street, td.city, td.intersect, td.cityblock");

//List forms.
var forms = document.getElementsByTagName("form");

//Access container of game interface.
var firstSpacey = document.getElementsByClassName("spacey")[0];

//Access container of current user.
var secondSpacey = document.getElementsByClassName("spacey")[1];

var mainDiv = document.getElementById("main");

var borderDiv;
if (firstSpacey)
{
	for (var i = 0; i < firstSpacey.children.length; i++)
	{
		var child = firstSpacey.children[i];
		if (child.tagName == "DIV")
		{
			borderDiv = child;
			break;
		}
	}
}

//Differentiate between screens.
var isCityView = (spaces.length == 9);
var isMyVampView = (borderDiv && borderDiv.childNodes[0].nodeName == "#text" && borderDiv.childNodes[0].data.indexOf("You have drunk") != -1);
var isSSView = (borderDiv && borderDiv.childNodes[0].nodeName == "#text" && borderDiv.childNodes[0].data.indexOf("The vampire") != -1);
var isLoginView = (document.querySelectorAll("form.head").length != 0);
var isLogoutView = (window.location.href.indexOf("action=logout") != -1);
var isWelcomeView = (window.location.href.indexOf("action=welcome") != -1);
var isSetPasswordView = false; // set to true if form with action=="setpass" is found...
for (var i = 0; i < forms.length; i++)
{
	if (forms[i].action.value == "setpass") isSetPasswordView = true;
}


var userString = secondSpacey.childNodes[0].data;
var userName = userString.substring(userString.indexOf("You are the vampire ") + 20, userString.indexOf(" (if this is not you"));




//	+ Multiple login support

//Call to create or update a cookie with a value.
//Be careful: this information gets sent to the server!
function setCookie(name, value)
{
	var d = new Date();
	d.setTime(d.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
	document.cookie = name + "=" + value + "; expires=" + d.toUTCString() + "; path=/";
}

//Call to retrieve cookie value.
function getCookie(name)
{
	name = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++)
	{
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

//Call to delete cookie.
function deleteCookie(name)
{
	//Expiration date does not get sent to server.
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//Helper function for making HTML elements.	
var makeElementDiv = document.createElement("div");
function makeElement(elementAsString)
{
	makeElementDiv.innerHTML = elementAsString;
	return makeElementDiv.firstChild;
}

//Helper function for reading data in local storage. 
function readArrayFromLocalStorage(name, separator)
{
	var arrayAsString = localStorage.getItem(name);
	if (arrayAsString == null || arrayAsString == "")
	{
		return [];
	}
	else
	{
		return arrayAsString.split(separator);
	}
}

//Get logins from local storage and store in an array.
var allLogins = readArrayFromLocalStorage("logins", ",");

//If login is successful, save login.
if (isWelcomeView && !isLoginView && localStorage.getItem("loginBox") == 1)
{
	//Get value in ip cookie.
	var currentLogin = getCookie("ip");
	//Deal only with the username.
	var currentUsername = currentLogin.split("#")[0];
	
	//Compare to list of logins.
	var foundMatch = false;
	for (var i = 0; i < allLogins.length; i++)
	{
		var existingLogin = allLogins[i];
		var existingUsername = existingLogin.split("#")[0];
		//If the current username matches an existing username, end search, update entry.
		if (currentUsername == existingUsername)
		{
			allLogins[i] = currentLogin;
			localStorage.setItem("logins", allLogins.join(","));
			foundMatch = true;
			break;
		}
	}
	
	//If no match found, save new entry.
	if (foundMatch == false)
	{
		allLogins.push(currentLogin);
		localStorage.setItem("logins", allLogins.join(","));
	}
}

//Get vampires attacked recently.
var vampsAttacked = readArrayFromLocalStorage("vampsAttacked" + userName, ",");

//Create localStorage for contents of shopping cart. 
var shoppingCart = readArrayFromLocalStorage("shoppingCart" + userName, ";");





//	+ Clean interface

//Remove page title to conserve screen real estate.
var title = mainDiv.getElementsByTagName("H1")[0];
title.style.display="none";
//Remove FAQ reminder.
title.nextElementSibling.style.display="none";

//myvamp, city, chat, logout
//howto, faq, donate, news, 

if (isLoginView == false && (isSetPasswordView == false || isMyVampView == true))
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
		
		if (child.tagName == "FORM" && child.action.value == "setpass") 
		{
			isSetPasswordView = true;
			break;
		}
		
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
	
	//Set doubleGS localStorage.
	function updateDoubleGSStorage(event)
	{
		localStorage.setItem("doubleGS", event.target.checked ? 1 : 0);
	}
	
	//Set loginBox localStorage.
	function updateLoginBoxStorage(event)
	{
		localStorage.setItem("loginBox", event.target.checked ? 1 : 0);
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
		financialsLine.style.display = (displayInventory.checked || displayPowers.checked) ? "block" : "none";
	}
	
	//Set displayPowers localStorage.
	function updateDisplayPowersStorage(event)
	{
		localStorage.setItem("displayPowers", event.target.checked ? 1 : 0);
		powersBox.style.display     = displayPowers.checked     ? "block" : "none";
		financialsLine.style.display = (displayInventory.checked || displayPowers.checked) ? "block" : "none";
		inventoryLine.style.display = displayPowers.checked ? "block" : "none";
	}
	
	//Set displayBanks localStorage.
	function updateDisplayBanksStorage(event)
	{
		localStorage.setItem("displayBanks", event.target.checked ? 1 : 0);
		bankContainer.style.display = displayBanks.checked ? "block" : "none";
		updateLocationsHRs();
	}
	
	//Set displayTransits localStorage.
	function updateDisplayTransitsStorage(event)
	{
		localStorage.setItem("displayTransits", event.target.checked ? 1 : 0);
		stationContainer.style.display = displayTransits.checked ? "block" : "none";
		updateLocationsHRs();
	}
	
	//Set displayPubs localStorage.
	function updateDisplayPubsStorage(event)
	{
		localStorage.setItem("displayPubs", event.target.checked ? 1 : 0);
		pubContainer.style.display = displayPubs.checked ? "block" : "none";
		updateLocationsHRs();
	}
	
	
	
	
	//	+ Left sidebar
	
	//Create div container for checkbox.
	var leftSideDiv = document.createElement("div");
	//Put div above grid.
	document.body.insertBefore(leftSideDiv, document.body.firstChild);
	//Put div on left side.
	leftSideDiv.style.float = "left";
	leftSideDiv.style.width = "150px";
	
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
	optionsDiv.style.display = "none";
	leftSideDiv.appendChild(optionsDiv);
	
	//Create labels, checkboxes, radiobuttons.
	var bindKeyDiv      = document.createElement("div");
	var radioForm       = document.createElement("form"); 
	var warModeDiv      = document.createElement("div");
	var doubleGSDiv     = document.createElement("div");
	var loginBoxDiv     = document.createElement("div");
	var vampInfoDiv     = document.createElement("div");
	var financialsDiv   = document.createElement("div");
	var inventoryDiv    = document.createElement("div");
	var powersDiv       = document.createElement("div");
	var locationsDiv    = document.createElement("div");
	var banksDiv    = document.createElement("div");
	var transitsDiv = document.createElement("div");
	var pubsDiv     = document.createElement("div");
	optionsDiv.appendChild(bindKeyDiv);
	optionsDiv.appendChild(radioForm);
	optionsDiv.appendChild(makeElement("<div class='divider-line'>"));
	optionsDiv.appendChild(warModeDiv);
	optionsDiv.appendChild(doubleGSDiv);
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
	
	
	//tabindex = "-1" excludes tab from scrolling through these options for quick access to "More Commands".
	bindKeyDiv.innerHTML  = '<label for  = "bindKey">Bind Keyboard</label><input type = "checkbox" id = "bindKey"  tabindex = "-1">';
	radioForm.innerHTML   = '<div><input type = "radio" name = "keyConfig" value = "QWEDCXZA" id = "QWEDCXZA" checked tabindex = "-1"/> \
							<label for = "QWEDCXZA">QWEDCXZA</label> </div>\
							<div><input type = "radio" name = "keyConfig" value = "WASD-QEZX" id = "WASD-QEZX" tabindex = "-1"/> \
							<label for = "WASD-QEZX">WASD-QEZX</label> </div>';
	warModeDiv.innerHTML  = '<label for  = "warMode">War Mode</label><input type      = "checkbox" id = "warMode"  tabindex = "-1">';
	doubleGSDiv.innerHTML = '<label for  = "doubleGS">Double GS</label><input type      = "checkbox" id = "doubleGS"  tabindex = "-1">';
	loginBoxDiv.innerHTML = '<label for  = "loginBox">Save Logins</label><input type = "checkbox" id = "loginBox"  tabindex = "-1">';
	vampInfoDiv.innerHTML = '<label>Vampire Vitals</label>';
	financialsDiv.innerHTML = '<label for = "financials">Financials</label><input type = "checkbox" id = "financials" tabindex = "-1">';
	inventoryDiv.innerHTML  = '<label for = "inventory">Inventory</label><input type = "checkbox" id = "inventory" tabindex = "-1">';
	powersDiv.innerHTML     = '<label for = "powers">Powers</label><input type = "checkbox" id = "powers" tabindex = "-1">';
	locationsDiv.innerHTML = '<label>Location List</label>';
	banksDiv.innerHTML    = '<label for = "banks">Banks</label><input type = "checkbox" id = "banks" tabindex = "-1">';
	transitsDiv.innerHTML = '<label for = "transits">Transits</label><input type = "checkbox" id = "transits" tabindex = "-1">';
	pubsDiv.innerHTML     = '<label for = "pubs">Pubs</label><input type = "checkbox" id = "pubs" tabindex = "-1">';
	
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
	
	warModeDiv.title = "Autoloads more commands after moving.<br /> \
						Hides say, shout, telepathy and give commands.<br /> \
						Disables B and R keybinding.";
	
	financialsDiv.title = "Tracks pocket change and bank account info. Loaded from Omnibank or My Vampire page if you have a Scroll of Accounting.";
	inventoryDiv.title  = "Tracks current inventory. Loaded from My Vampire page.";
	powersDiv.title     = "Tracks powers, and current quest info if applicable. Loaded from My Vampire page.";
	banksDiv.title     = "Displays 5 nearest Omnibank branches.";
	transitsDiv.title     = "Displays 2 nearest transit stations.";
	pubsDiv.title     = "Displays 3 nearest local pubs.";
	
	//Make reference to warMode checkbox.
	var warMode = warModeDiv.children[1];
	//Get current warMode value.
	warMode.checked = localStorage.getItem("warMode") == 1 ? true : false;
	//When state change, update localStorage.
	warMode.onchange = updateWarModeStorage;
	
	//Make reference to doubleGS checkbox.
	var doubleGS = doubleGSDiv.children[1];
	//Get current doubleGS value.
	doubleGS.checked = localStorage.getItem("doubleGS") == 1 ? true : false;
	//When state change, update localStorage.
	doubleGS.onchange = updateDoubleGSStorage;
	
	//Make reference to loginBox checkbox.
	var loginBox = loginBoxDiv.children[1];
	//Get current loginBox value.
	loginBox.checked = localStorage.getItem("loginBox") == 1 ? true : false;
	//When state change, update localStorage.
	loginBox.onchange = updateLoginBoxStorage;
	
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
	
	//Make reference to powers checkbox.
	var displayBanks = banksDiv.children[1];
	//Get current banks value.
	displayBanks.checked = localStorage.getItem("displayBanks") != 0 ? true : false;
	//When state change, update localStorage.
	displayBanks.onchange = updateDisplayBanksStorage;
	
	//Make reference to powers checkbox.
	var displayTransits = transitsDiv.children[1];
	//Get current transits value.
	displayTransits.checked = localStorage.getItem("displayTransits") != 0 ? true : false;
	//When state change, update localStorage.
	displayTransits.onchange = updateDisplayTransitsStorage;
	
	//Make reference to powers checkbox.
	var displayPubs = pubsDiv.children[1];
	//Get current pubs value.
	displayPubs.checked = localStorage.getItem("displayPubs") == 1 ? true : false;
	//When state change, update localStorage.
	displayPubs.onchange = updateDisplayPubsStorage;
	
	//Separate elements.
	for (var i = 0; i < 2; i++) leftSideDiv.appendChild(document.createElement("br"));
	
	//Create a menu to select a vampire.
	var loginMenu = document.createElement("select");
	for (var i = 0; i < allLogins.length; i++)
	{
		var option = document.createElement("option");
		option.value = allLogins[i];
		option.text = allLogins[i].split("#")[0];
		if (option.text == userName) option.selected = "selected";
		loginMenu.appendChild(option);
	}
	leftSideDiv.appendChild(loginMenu);
	loginMenu.addEventListener("change", function()
	{
		//loginMenu.value corresponds to the currently selected option's .value, which should be "username#password"
		setCookie("ip", loginMenu.value);
		deleteCookie("stamp");
		window.location.href = "/blood.pl";
	});
	
	var loginsTriangle = makeElement("<div class='box-title'>► Manage Logins</div>");
	loginsTriangle.style.margin = "5px 0px";
	leftSideDiv.appendChild(loginsTriangle);
	loginsTriangle.style.cursor = "pointer";
	var loginsAreOpen = false;
	loginsTriangle.addEventListener("click", function() {
		loginsAreOpen = !loginsAreOpen;
		loginsTriangle.innerHTML = (loginsAreOpen ? "▼ Manage Logins" : "► Manage Logins");
		manageLoginsDiv.style.display = (loginsAreOpen ? "block" : "none");
	});
	
	var manageLoginsDiv = document.createElement("div");
	manageLoginsDiv.style.display = "none";
	manageLoginsDiv.className = "border-box";
	leftSideDiv.appendChild(manageLoginsDiv);
	
	
	var loginsDiv = document.createElement("div");
	manageLoginsDiv.appendChild(loginsDiv);
	
	for (var i = 0; i < allLogins.length; i++)
	{
		var div = document.createElement("div");
		loginsDiv.appendChild(div);
		
		var draggableDiv = document.createElement("div");
		div.appendChild(draggableDiv);
		
		var vampName = allLogins[i].split("#")[0];
		
		draggableDiv.innerHTML = vampName;
		draggableDiv.style.display = "inline-block";
		draggableDiv.style.width = "100px";
		//draggableDiv.style.border = "solid white 1px";
		//draggableDiv.style.background = "blue";
		draggableDiv.style.cursor = "move";
		
		draggableDiv.style.WebkitUserSelect = "none"; //disable text selection in Safari+Chrome
		draggableDiv.style.MozUserSelect = "none"; //disable text selection in Firefox
		draggableDiv.style.MsUserSelect = "none"; //disable text selection in Internet Explorer
		draggableDiv.style.userSelect = "none"; //disable text selection in general?
		
		var upDiv = document.createElement("div");
		div.appendChild(upDiv);
		upDiv.innerHTML = "∧";
		upDiv.style.display = "inline-block";
		upDiv.style.cursor = "pointer";
		upDiv.addEventListener("click", function(event)
		{
			var loginRow = event.target.parentElement;
			var loginName = loginRow.children[0].innerHTML;
			
			var oldRow;
			for (var i = 0; i < allLogins.length; i++)
			{
				if (allLogins[i].indexOf(loginName + "#") != -1)
				{
					oldRow = i;
					break;
				}
			}
			
			newRow = oldRow - 1;
			if (newRow < 0) newRow = 0;
			
			loginsDiv.removeChild(loginRow);
			loginsDiv.insertBefore(loginRow, loginsDiv.children[newRow]);
			
			var login = allLogins[oldRow];
			allLogins.splice(oldRow, 1); //remove from list
			allLogins.splice(newRow, 0, login)
			localStorage.setItem("logins", allLogins.join(","));
		});
		
		div.appendChild(makeElement("&nbsp;&nbsp;"));
		
		var downDiv = document.createElement("div");
		div.appendChild(downDiv);
		downDiv.innerHTML = "∨";
		downDiv.style.display = "inline-block";
		downDiv.style.cursor = "pointer";
		downDiv.addEventListener("click", function(event)
		{
			var loginRow = event.target.parentElement;
			var loginName = loginRow.children[0].innerHTML;
			
			var oldRow;
			for (var i = 0; i < allLogins.length; i++)
			{
				if (allLogins[i].indexOf(loginName + "#") != -1)
				{
					oldRow = i;
					break;
				}
			}
			
			newRow = oldRow + 1;
			if (newRow >= allLogins.length) newRow = allLogins - 1;
			
			loginsDiv.removeChild(loginRow);
			loginsDiv.insertBefore(loginRow, loginsDiv.children[newRow]);
			
			var login = allLogins[oldRow];
			allLogins.splice(oldRow, 1); //remove from list
			allLogins.splice(newRow, 0, login)
			localStorage.setItem("logins", allLogins.join(","));
		});
		
		div.appendChild(makeElement("&nbsp;&nbsp;&nbsp;&nbsp;"));
		
		var deleteDiv = document.createElement("div");
		div.appendChild(deleteDiv);
		deleteDiv.innerHTML = "x";
		deleteDiv.style.display = "inline-block";
		deleteDiv.style.cursor = "pointer";
		deleteDiv.addEventListener("click", function(event)
		{
			var loginRow = event.target.parentElement;
			var loginName = loginRow.children[0].innerHTML;
			
			var oldRow;
			for (var i = 0; i < allLogins.length; i++)
			{
				if (allLogins[i].indexOf(loginName + "#") != -1)
				{
					oldRow = i;
					break;
				}
			}
			
			loginsDiv.removeChild(loginRow);
			
			forgetVampire(loginName);
		});
	}
	
	var selectedLogin;
	loginsDiv.addEventListener("mousedown", function(event)
	{
		if (event.target.style.cursor == "move")
		{
			selectedLogin = event.target.parentElement;
			event.preventDefault();
		}
	});
	document.addEventListener("mouseup", function(event)
	{
		selectedLogin = null;
	});
	document.addEventListener("mousemove", function(event)
	{
		if (selectedLogin)
		{
			var boundingRect = loginsDiv.getBoundingClientRect();
			//mouseX = (event.clientX || event.pageX) - boundingRect.left;
			mouseY = (event.clientY || event.pageY) - boundingRect.top;
			//mouseY -= 5; //padding
			
			var rowHeight = selectedLogin.getBoundingClientRect().height;
			
			var newRow = Math.floor(mouseY / rowHeight);
			if (newRow < 0) newRow = 0;
			
			loginsDiv.removeChild(selectedLogin);
			loginsDiv.insertBefore(selectedLogin, loginsDiv.children[newRow]);
			
			var loginName = selectedLogin.children[0].innerHTML;
			
			var oldRow;
			for (var i = 0; i < allLogins.length; i++)
			{
				if (allLogins[i].indexOf(loginName + "#") != -1)
				{
					oldRow = i;
					break;
				}
			}
			
			var login = allLogins[oldRow];
			allLogins.splice(oldRow, 1); //remove from list
			allLogins.splice(newRow, 0, login)
			localStorage.setItem("logins", allLogins.join(","));
		}
	});
	
	
	manageLoginsDiv.appendChild(document.createElement("br"));
	
	function forgetVampire(vampName)
	{
		//Search for the current username amongst saved ones.
		for (var i = 0; i < allLogins.length; i++)
		{
			if (allLogins[i].indexOf(vampName + "#") != -1)
			{
				//Remove the login and update the list.
				allLogins.splice(i, 1);
				localStorage.setItem("logins", allLogins.join(","));
				break;
			}
		}
		
		//Remove associated records.
		localStorage.removeItem("coinsIn" + vampName);
		localStorage.removeItem("coinsOn" + vampName);
		localStorage.removeItem("currentX" + vampName);
		localStorage.removeItem("currentY" + vampName);
		localStorage.removeItem("hittracker" + vampName);
		localStorage.removeItem("inventory" + vampName);
		localStorage.removeItem("powers" + vampName);
	}
	
	//Create button to remove login from list.
	var forgetButton = document.createElement("button");
	manageLoginsDiv.appendChild(forgetButton);
	forgetButton.innerHTML = "Forget vampire";
	forgetButton.addEventListener("click", function(event)
	{
		forgetVampire(userName);
	});
	
	//Separate elements.
	for (var i = 0; i < 2; i++) leftSideDiv.appendChild(document.createElement("br"));
	
	//Create div container for vampInfo.
	var myVampDiv = document.createElement("div");
	myVampDiv.className = "border-box";
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
	warModeDiv.addEventListener("mouseenter", onHoverOver);
	warModeDiv.addEventListener("mouseleave", onHoverOut);
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
	
	
	
	//	+ Hit-tracker
	leftSideDiv.appendChild(document.createElement("br"));
	leftSideDiv.appendChild(document.createElement("br"));
	
	
	var hitTrackerBox = document.createElement("div");
	leftSideDiv.appendChild(hitTrackerBox);
	hitTrackerBox.className = "border-box";
	//hitTrackerBox.style.fontSize = "1%";
	
	var hitTrackerTitle = document.createElement("div");
	hitTrackerTitle.innerHTML = "<span class='box-title'>Hit tracker: </span><br />";
	hitTrackerBox.appendChild(hitTrackerTitle);	
	
	//Select all hit-tracking button.
	var selectHitsButton = document.createElement("button");
	hitTrackerBox.appendChild(selectHitsButton);
	selectHitsButton.innerHTML = "Select All";
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
	
	//Clear hit-tracking button.
	var clearHitsButton = document.createElement("button");
	hitTrackerBox.appendChild(clearHitsButton);
	clearHitsButton.innerHTML = "Clear All";
	//clearHitsButton.style.bottom = "0px";
	clearHitsButton.addEventListener("click", function(event)
	{
		localStorage.setItem("hittracker" + userName, "");
		scrollingDiv.innerHTML = "";
	});
	
	//Insert contents of localStorage into div.
	var scrollingDiv = document.createElement("div");
	hitTrackerBox.appendChild(scrollingDiv);
	//Constrain dimensions of div container.
	scrollingDiv.style.width = "136px";
	scrollingDiv.style.height = "130px";
	//Control overflow by scrolling.
	scrollingDiv.style.overflowY = "auto";
	leftSideDiv.appendChild(document.createElement("br"));
	
	//Initialize hit-tracking.
	if (localStorage.getItem("hittracker" + userName) == null)
	{
		localStorage.setItem("hittracker" + userName, ""); 
	}
	
	//Store hit-tracking.
	//TO-DO: comment more!
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
		
		localStorage.setItem("hittracker" + userName, localStorage.getItem("hittracker" + userName) + message);
	}
	
	if (isCityView && isNewPage)
	{
		//Hits dealt are in the firstSpacey before the borderDiv.
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
				if (coinsOn == "no") coinsOn = "0";
				if (coinsOn == "one") coinsOn = "1";
				localStorage.setItem("coinsIn" + userName, coinsIn);
				localStorage.setItem("coinsOn" + userName, coinsOn);
			}
		}
	}
	
	scrollingDiv.innerHTML = localStorage.getItem("hittracker" + userName);
	scrollingDiv.scrollTop = scrollingDiv.scrollHeight;
	
	//Add space between sections.
	leftSideDiv.appendChild(document.createElement("br"));
	leftSideDiv.appendChild(document.createElement("br"));
	
	
	
	//Learning Powers.
	for (var i = 0; i < forms.length; i++)
	{
		var form = forms[i];
		if (form.action.value == "learn")
		{
			var powerName = form.target.value;
			
			console.log("found power: " + powerName);
		}
	}
	
	
	
	
	
	
	//	+ Vamp info
	
	//Pull from My Vampire page.
	//TO-DO: comment more!
	if (isMyVampView)
	{
		var foundQuest = false;
		var foundPossessions = false;
		
		for (var i = 0; i < borderDiv.childNodes.length; i++)
		{
			var child = borderDiv.childNodes[i];
			//Pull money string.
			if (child.nodeName == "#text" && child.data.indexOf("Money: ") != -1)
			{
				var moneyString = child.data;
				var coinsOn = moneyString.substring(moneyString.indexOf("Money: ") + 7, moneyString.indexOf(" coin"));
				if (coinsOn == "no") coinsOn = "0";
				if (coinsOn == "one") coinsOn = "1";
				
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
				
				foundPossessions = true;
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
		
		if (foundPossessions == false)
		{
			localStorage.setItem("inventory" + userName, "<br />None");
		}
		
		if (foundQuest == false)
		{
			localStorage.removeItem("quest" + userName);
		}
	}
	
	/*
	TO DO:
		handle paying money at a pub, a guild, or a shop; pub and shop shows money?
	*/
	
	//Handler for pocket change after purchasing powers.
	for (var i = 0; i < forms.length; i++)
	{
		var form = forms[i];
		
		//If form is in a guild, track purchases by subtracting price from pocket change.
		if (form.action.value == "learn")
		{
			//Purchase button is form's last child.
			var button = form.children[form.children.length-1];
			//When button is clicked.
			button.addEventListener("click", function(event)
			{
				//Get form again as parent of button clicked; function is called after previous var form is no longer valid.
				var form = event.target.parentElement;
				//Price of power is contained in its label.
				message = form.childNodes[2].data;
				var priceString = message.substring(message.indexOf("For ") + 4, message.indexOf(" coin"));
				var price = parseInt(priceString);
				//Get current pocket change amount.
				var coinsOn = parseInt(localStorage.getItem("coinsOn" + userName));
				//If vampire can afford power, subtract price and save pocket change.
				if (coinsOn >= price)
				{
					coinsOn -= price;
					localStorage.setItem("coinsOn" + userName, coinsOn);
				}
			});
		}
	}
	
	//Handler for pocket change and inventory after purchasing items from shops.
	//TO-DO: comment more!
	for (var i = 0; i < forms.length; i++)
	{
		var form = forms[i];
		
		if (form.action.value == "shop" && form.t.value != "heal")
		{
			var shopDiv = form.children[1];
			
			var shopBalance = shopDiv.childNodes[shopDiv.childNodes.length-1];
			var pocketString = shopBalance.data;
			if (pocketString)
			{
				var coinsOn = pocketString.substring(pocketString.indexOf("You have ") + 9, pocketString.indexOf(" coin"));
				if (coinsOn == "no") coinsOn = "0";
				if (coinsOn == "one") coinsOn = "1";
				localStorage.setItem("coinsOn" + userName, coinsOn);
			}
			
			//Purchase button is shopDiv's third-last child, and second-last child element.
			var button = shopDiv.children[shopDiv.children.length-2];
			
			//When button is clicked.
			button.addEventListener("click", function(event)
			{
				console.log("shop button was pressed!");
				//Get form again as parent of button clicked; function is called after previous var form is no longer valid.
				var form = event.target.parentElement.parentElement;
				
				//Iterate over radio buttons.
				for (var j = 0; j < form.t.length; j++)
				{
					var radio = form.t[j];
					if (form.t.value == radio.value) 
					{
						console.log("radio button selected: " + radio.value);
						var itemPrice = parseInt(radio.previousSibling.data.slice(2,-1));
						var itemName = radio.previousSibling.previousSibling.previousSibling.data.slice(0,-1);
						var itemQuantity = parseInt(form.target.value);
						console.log(itemPrice);
						console.log(itemName);
						console.log(itemQuantity);
						
						var coinsOn = parseInt(localStorage.getItem("coinsOn" + userName));
						var inventory = localStorage.getItem("inventory" + userName);
						var inventoryArray = (inventory == null) ? [] : inventory.split("<br />");
						console.log(coinsOn);
						
						//If able to afford.
						if ((itemPrice * itemQuantity) <= coinsOn)
						{
							//Subtract from pocket change.
							coinsOn -= itemPrice * itemQuantity;
							localStorage.setItem("coinsOn" + userName, coinsOn);
							
							var foundItem = false;
							
							//Iterate over items in inventory.
							for (var k = 0; k < inventoryArray.length; k++)
							{
								var oldItemString = inventoryArray[k];
								
								//If item being purchased.
								if (oldItemString.indexOf(itemName) != -1)
								{
									foundItem = true;
									
									//Add to quantity.
									var oldQuantityString = oldItemString.substring(oldItemString.indexOf("(")+1, oldItemString.indexOf(")"));
									var oldQuantity = parseInt(oldQuantityString);
									itemQuantity += oldQuantity;
									//var newQuantity = oldQuantity + itemQuantity;
									console.log("found old item");
									console.log(inventoryArray[k]);
									console.log(oldQuantity);
									inventoryArray[k] = itemName + " (" + itemQuantity + ")";
									console.log(inventoryArray[k]);
								}
							}
							if (foundItem == false)
							{
								//Add new item to inventory.
								console.log("adding new item");
								inventoryArray.push(itemName + " (" + itemQuantity + ")");
							}
							
							//Save inventory.
							localStorage.setItem("inventory" + userName, inventoryArray.join("<br />"));
						}
					}
				}
			});
		}
		else if (form.action.value == "pawn")
		{
			var pawnDiv = form.children[1];
			
			var pawnBalance = pawnDiv.childNodes[pawnDiv.childNodes.length-1];
			var pocketString = pawnBalance.data;
			if (pocketString)
			{
				var coinsOn = pocketString.substring(pocketString.indexOf("You have ") + 9, pocketString.indexOf(" coin"));
				if (coinsOn == "no") coinsOn = "0";
				if (coinsOn == "one") coinsOn = "1";
				localStorage.setItem("coinsOn" + userName, coinsOn);
			}
			
			//Sell button is pawnDiv's third-last child, and second-last child element.
			var button = pawnDiv.children[pawnDiv.children.length-2];
			
			//When button is clicked.
			button.addEventListener("click", function(event)
			{
				console.log("I've got $20 in my pocket.");
				//Get form again as parent of button clicked; function is called after previous var form is no longer valid.
				var form = event.target.parentElement.parentElement;
				
				//Iterate over radio buttons.
				for (var j = 0; j < form.t.length; j++)
				{
					var radio = form.t[j];
					
					//if (form.t.value == radio.value) 
					if (radio.checked)
					{
						console.log("radio button selected: " + radio.value);
						
						//Get name and price.
						var itemNameAndPrice = radio.previousSibling.data;
						var leftParenIndex = itemNameAndPrice.indexOf("(");
						var itemName = itemNameAndPrice.slice(0, leftParenIndex - 1);
						var itemPrice = parseInt(itemNameAndPrice.slice(leftParenIndex + 1, -1));
						var sellQuantity = parseInt(form.target.value);
						var inventoryQuantity = parseInt(radio.nextSibling.data.slice(11, -1));
						
						console.log(itemName);
						console.log(itemPrice);
						console.log(sellQuantity);
						console.log(inventoryQuantity);
						
						var coinsOn = parseInt(localStorage.getItem("coinsOn" + userName));
						var inventory = localStorage.getItem("inventory" + userName);
						var inventoryArray = (inventory == null) ? [] : inventory.split("<br />");
						console.log(coinsOn);
						
						//If enough to sell.
						if (sellQuantity <= inventoryQuantity)
						{
							coinsOn += itemPrice * sellQuantity;
							localStorage.setItem("coinsOn" + userName, coinsOn);
							
							//Figure if selling all or some of item in inventory.
							var itemsLeft = inventoryQuantity - sellQuantity;
							
							var foundItem = false;
							
							//Iterate over items in inventory.
							for (var k = 0; k < inventoryArray.length; k++)
							{
								var oldItemString = inventoryArray[k];
								//If item being sold.
								if (oldItemString.indexOf(itemName) != -1)
								{
									foundItem = true;
									
									//If any are left.
									if (itemsLeft > 0)
									{
										//Update quantity in inventory.
										inventoryArray[k] = itemName + " (" + itemsLeft + ")";
										console.log(inventoryArray[k]);
									}
									else
									{
										//Otherwise remove item from inventory.
										inventoryArray.splice(k, 1);
										console.log("removed " + itemName);
									}
								}
							}
							
							//If item was not found in inventory but we have some left.
							if (foundItem == false && itemsLeft > 0)
							{
								//Add to inventory.
								console.log("adding new item");
								inventoryArray.push(itemName + " (" + itemsLeft + ")");
							}
							
							//Save inventory. 
							localStorage.setItem("inventory" + userName, inventoryArray.join("<br />"));
						}
					}
				}
			});
		}
	}
	
	//Handler for pub
	for (var i = 0; i < forms.length; i++)
	{
		var form = forms[i];
		
		if (form.action.value == "pub")
		{
			console.log("found a pub");
			
			var pubBalance = form.childNodes[form.childNodes.length-1];
			var pocketString = pubBalance.data;
			if (pocketString)
			{
				var coinsOn = pocketString.substring(pocketString.indexOf("You have ") + 9, pocketString.indexOf(" coin"));
				if (coinsOn == "no") coinsOn = "0";
				if (coinsOn == "one") coinsOn = "1";
				localStorage.setItem("coinsOn" + userName, coinsOn);
			}
		}
	}
	
	
	var myVampTitle = document.createElement("div");
	myVampTitle.innerHTML = "<span class = 'box-title'>Vampire vitals:</span>";
	myVampDiv.appendChild(myVampTitle);
	
	//myVampDiv.appendChild(makeElement("<div class='divider-line'>"));
	
	var financialsBox = document.createElement("div");
	var inventoryBox = document.createElement("div");
	var powersBox = document.createElement("div");
	myVampDiv.appendChild(financialsBox);
	myVampDiv.appendChild(inventoryBox);
	myVampDiv.appendChild(powersBox);
	financialsBox.style.display = displayFinancials.checked ? "block" : "none";
	inventoryBox.style.display  = displayInventory.checked  ? "block" : "none";
	powersBox.style.display     = displayPowers.checked     ? "block" : "none";
	var financialsLine = makeElement("<div class = 'divider-line'>");
	var inventoryLine = makeElement("<div class = 'divider-line'>");
	
	financialsBox.innerHTML = "<span class = 'box-subtitle'>Financials:</span> <br />";
	
	var coinsOn = localStorage.getItem("coinsOn" + userName);
	if (isNaN(parseInt(coinsOn)))
	{
		financialsBox.innerHTML += "Pocket change: View your My Vampire page<br />";
	}
	else
	{
		financialsBox.innerHTML += "Pocket change: " + coinsOn + "<br />";
	}
	var coinsIn = localStorage.getItem("coinsIn" + userName);
	if (isNaN(parseInt(coinsIn)))
	{
		financialsBox.innerHTML += "Bank account: Visit your local Omnibank branch";
	}
	else
	{
		financialsBox.innerHTML += "Bank account: " + coinsIn;
	}
	
	financialsBox.appendChild(financialsLine);
	
	var inventory = localStorage.getItem("inventory" + userName)
	if (inventory == null || inventory == "")
	{
		inventoryBox.innerHTML += "<span class = 'box-subtitle'>Inventory:</span> View your My Vampire page";
	}
	else
	{
		inventoryBox.innerHTML += "<span class = 'box-subtitle'>Inventory:</span> " + inventory;
	}
	
	inventoryBox.appendChild(inventoryLine);
	var powers = localStorage.getItem("powers" + userName);
	if (powers == null || powers == "")
	{
		powersBox.innerHTML += "<span class = 'box-subtitle'>Powers:</span> View your My Vampire page";
	}
	else
	{
		powersBox.innerHTML += "<span class = 'box-subtitle'>Powers:</span> <br />" + powers;
	}
	if (localStorage.getItem("quest" + userName) != null)
	{
		powersBox.innerHTML += "<br />Quest: <br />" + localStorage.getItem("quest" + userName);
	}
	
	financialsLine.style.display = (displayInventory.checked || displayPowers.checked) ? "block" : "none";
	inventoryLine.style.display = displayPowers.checked ? "block" : "none";
	
	
	
	
	//	+ Right sidebar
	
	//Create div container for checkbox.
	var rightSideDiv = document.createElement("div");
	//Put div above grid.
	document.body.insertBefore(rightSideDiv, document.body.firstChild);
	//Put div on right side.
	rightSideDiv.style.float = "right";
	//Define position of div container.
	rightSideDiv.style.position = "relative";
	
	
	
	
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
	
	var rightBorderDiv = document.createElement("div");
	rightSideDiv.appendChild(rightBorderDiv);
	rightBorderDiv.className = "border-box";
	
	var bankContainer = document.createElement("div");
	bankContainer.innerHTML = "<span class='box-title'>Nearest Omnibank branches:</span>";
	rightBorderDiv.appendChild(bankContainer);
	
	//Display closest bank info.
	var bankInfo = document.createElement("div");
	bankInfo.style.lineHeight = "150%";
	bankContainer.appendChild(bankInfo);
	
	bankContainer.style.display = displayBanks.checked ? "block" : "none";
	
	rightBorderDiv.appendChild(makeElement("<div class = 'divider-line'>"));
	
	function displayPlaces(places, fromX, fromY)
	{
		var placeString = "";
		
		for (var i = 0; i < places.length; i++)
		{
			var place = places[i];
			
			var placeX = place[1];
			var placeY = place[2];
			
			var streetX = placeX / 2;
			var streetY = placeY / 2;
			
			//Determine distances on x and y coordinates.
			var directionX = placeX - fromX;
			var directionY = placeY - fromY;
			
			var streetNames = streetArray[streetX][1] + " and " + streetArray[streetY][2];
			
			if (place[0] != "")
			{
				placeString += "<span class = 'box-subtitle'>" + place[0] + "</span>";
				placeString += "<br />&nbsp;&nbsp;&nbsp;&nbsp;";
			}
			placeString += streetNames;
			placeString += ", ";
			placeString += assignDirection(directionX, directionY);
			placeString += "<br />";
		}
		
		return placeString;
	}
	
	var nearestBanks = findNearestPlaces(currentX, currentY, 5, "bank");
	
	bankInfo.innerHTML += displayPlaces(nearestBanks, currentX, currentY);
	
	var stationContainer = document.createElement("div");
	stationContainer.innerHTML = "<span class='box-title'>Nearest transit stations:<br /></span>";
	rightBorderDiv.appendChild(stationContainer);
	
	//Display closest transit info
	var stationInfo = document.createElement("div");
	stationInfo.style.lineHeight = "150%";
	stationContainer.appendChild(stationInfo);
	
	stationContainer.style.display = displayTransits.checked ? "block" : "none";
	
	//Station info
	
	var nearestStations = findNearestPlaces(currentX, currentY, 2, "station");
	
	stationInfo.innerHTML += displayPlaces(nearestStations, currentX, currentY);
	
	
	rightBorderDiv.appendChild(makeElement("<div class='divider-line'>"));
	
	var pubContainer = document.createElement("div");
	pubContainer.innerHTML = "<span class='box-title'>Nearest local pubs:<br /></span>";
	rightBorderDiv.appendChild(pubContainer);
	
	//Display closest transit info
	var pubInfo = document.createElement("div");
	pubInfo.style.lineHeight = "150%";
	pubContainer.appendChild(pubInfo);
	
	pubContainer.style.display = displayPubs.checked ? "block" : "none";
	
	//Pub info
	
	var nearestPubs = findNearestPlaces(currentX, currentY, 3, "pub");
	
	pubInfo.innerHTML += displayPlaces(nearestPubs, currentX, currentY);
	
	
	function updateLocationsHRs()
	{
		var locationElements = rightBorderDiv.children;
		for (var i = 0; i < locationElements.length; i++)
		{
			if (locationElements[i].className == "divider-line")
			{
				var followedByVisibleDiv = false;
				for (var j = i + 1; j < locationElements.length; j++)
				{
					if (locationElements[j].className != "divider-line" && locationElements[j].style.display == "block") 
					{
						followedByVisibleDiv = true;
					}
				}
				
				if (locationElements[i-1].style.display == "block" && followedByVisibleDiv)
				{
					locationElements[i].style.display = "block";
				}
				else
				{
					locationElements[i].style.display = "none";
				}
			}
		}
	}
	
	updateLocationsHRs();
	
	
	
	//	+ Distance calculator
	//TO-DO: comment this section!
	var moveCalculatorDiv = document.createElement("div");
	moveCalculatorDiv.className = "border-box";
	rightSideDiv.appendChild(document.createElement("br"));
	rightSideDiv.appendChild(moveCalculatorDiv);
	rightSideDiv.appendChild(document.createElement("br"));
	
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
	moveCalculatorDiv.appendChild(document.createElement("br"));
	
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
	
	var findLandmarkDiv = document.createElement("div");
	rightSideDiv.appendChild(findLandmarkDiv);
	findLandmarkDiv.innerHTML = "<span class='box-title'>Landmark finder:</span>";
	findLandmarkDiv.className = "border-box";
	
	//Set findStartEnd localStorage.
	function updateFindStartStorage(event)
	{
		localStorage.setItem("findStartEnd", event.target.checked ? 0 : 1)
	}
	function updateFindEndStorage(event)
	{
		localStorage.setItem("findStartEnd", event.target.checked ? 1 : 0)
	}
	var findStartEndForm     = document.createElement("form"); 
	findLandmarkDiv.appendChild(findStartEndForm);
	findStartEndForm.innerHTML = 'Find near <input type = "radio" name = "findStartEnd" value = "start" id = "start" checked tabindex = "-1"/><label for = "start">start</label>\
							      <input type = "radio" name = "findStartEnd" value = "end" id = "end" tabindex = "-1"/><label for = "end">end</label>';
	var radioStart = findStartEndForm.children[0];
	var radioEnd   = findStartEndForm.children[2];
	radioStart.checked = localStorage.getItem("findStartEnd") == 1 ? false : true;
	radioEnd.checked   = localStorage.getItem("findStartEnd") == 1 ? true : false;
	radioStart.onchange = updateFindStartStorage;
	radioEnd.onchange   = updateFindEndStorage;
	
	var findBanksButton = document.createElement("button");
	findBanksButton.innerHTML = "Find Omnibank branch";
	findLandmarkDiv.appendChild(findBanksButton);
	findBanksButton.addEventListener("click", function(event)
	{
		var searchX;
		var searchY;
		if (radioStart.checked)
		{
			var xStartExact = xStart.value;
			var yStartExact = yStart.value;
			if (dirStart.value.indexOf("x") != -1) xStartExact++;
			if (dirStart.value.indexOf("y") != -1) yStartExact++;
			searchX = xStartExact;
			searchY = yStartExact;
		}
		else if (radioEnd.checked)
		{
			var xEndExact = xEnd.value;
			var yEndExact = yEnd.value;
			if (dirEnd.value.indexOf("x") != -1) xEndExact++;
			if (dirEnd.value.indexOf("y") != -1) yEndExact++;
			searchX = xEndExact;
			searchY = yEndExact;
		}
		
		var banksNearStart = findNearestPlaces(searchX, searchY, 2, "bank");
		
		displayLandmarkDiv.innerHTML = displayPlaces(banksNearStart, searchX, searchY);
	});
	
	findLandmarkDiv.appendChild(document.createElement("br"));
	
	var findPubsButton = document.createElement("button");
	findPubsButton.innerHTML = "Find local pub";
	findLandmarkDiv.appendChild(findPubsButton);
	findPubsButton.addEventListener("click", function(event)
	{
		var searchX;
		var searchY;
		if (radioStart.checked)
		{
			var xStartExact = xStart.value;
			var yStartExact = yStart.value;
			if (dirStart.value.indexOf("x") != -1) xStartExact++;
			if (dirStart.value.indexOf("y") != -1) yStartExact++;
			searchX = xStartExact;
			searchY = yStartExact;
		}
		else if (radioEnd.checked)
		{
			var xEndExact = xEnd.value;
			var yEndExact = yEnd.value;
			if (dirEnd.value.indexOf("x") != -1) xEndExact++;
			if (dirEnd.value.indexOf("y") != -1) yEndExact++;
			searchX = xEndExact;
			searchY = yEndExact;
		}
		
		var pubsNearStart = findNearestPlaces(searchX, searchY, 2, "pub");
		
		displayLandmarkDiv.innerHTML = displayPlaces(pubsNearStart, searchX, searchY);
	});
	
	var displayLandmarkDiv = document.createElement("div");
	findLandmarkDiv.appendChild(displayLandmarkDiv);
	displayLandmarkDiv.innerHTML = "<br /><br />";
	
	
	rightSideDiv.appendChild(document.createElement("br"));
	
	
	
	//	+ Shopping calculator
	//TO-DO: comment section!
	var tabulation = document.createElement("ul");
	rightSideDiv.appendChild(tabulation);
	tabulation.style.listStyle = "none";
	tabulation.style.padding = "0";
	tabulation.style.margin = "0";
	tabulation.style.position = "relative";
	tabulation.style.fontSize = "90%";
	
	var line = document.createElement("div");
	tabulation.appendChild(line);
	line.innerHTML = "&nbsp;";
	line.style.position = "absolute";
	line.style.width = "100%";
	line.style.border = "0px solid";
	line.style.borderColor = "white";
	line.style.borderBottomWidth = "1px";
	line.style.marginTop = "-1px";
	line.style.padding = "0";
	line.style.padding = "5px 0 3px 0";
	
	function applyTabStyles(tab)
	{
		tab.style.float = "left";
		tab.style.border = "1px solid";
		tab.style.borderColor = "white";
		tab.style.borderBottomWidth = "0";
		tab.style.margin = "0 5px 0 0";
		tab.style.padding = "5px 5px 3px 5px";
		tab.style.position = "relative";
		tab.style.background = "black";
	}
	
	function getHash(url)
	{
		var hashPos = url.lastIndexOf ("#");
		return url.substring(hashPos + 1);
	}
	
	var currentTab = "shoppingCalc";
	
	function clickedTab(event)
	{
		var link = event.target;
		currentTab = getHash(link.getAttribute('href'));
		for (var i = 0; i < tabulation.children.length; i++)
		{
			var tab = tabulation.children[i];
			if (tab.children[0] == link)
			{
				tab.style.borderBottomWidth = "0px";
				tab.style.paddingBottom = "4px";
			}
			else
			{
				tab.style.borderBottomWidth = "1px";
				tab.style.paddingBottom = "3px";
			}
		}
		
		for (var i = 0; i < tabPages.children.length; i++)
		{
			var content = tabPages.children[i];
			content.style.display = (content.id == currentTab) ? "block" : "none";
		}
		
		if (currentTab == "shoppingList")
		{
			displayShoppingList();
		}
		else if (currentTab == "shoppingCalc")
		{
			redisplayShoppingCalc();
		}
	}
	
	var shoppingCalc = document.createElement("li");
	tabulation.appendChild(shoppingCalc);
	var shoppingCalcAnchor = document.createElement("a");
	shoppingCalc.appendChild(shoppingCalcAnchor);
	shoppingCalcAnchor.href = "#shoppingCalc";
	shoppingCalcAnchor.innerHTML = "Item calculator";
	//shoppingCalcAnchor.style.fontSize = "150%";
	shoppingCalcAnchor.style.textDecoration = "none";
	shoppingCalcAnchor.addEventListener("click", clickedTab);
	applyTabStyles(shoppingCalc);
	shoppingCalc.style.paddingBottom = "4px";
	
	var shoppingList = document.createElement("li");
	tabulation.appendChild(shoppingList);
	var shoppingListAnchor = document.createElement("a");
	shoppingList.appendChild(shoppingListAnchor);
	shoppingListAnchor.href = "#shoppingList";
	shoppingListAnchor.innerHTML = "Shopping list";
	shoppingListAnchor.style.textDecoration = "none";
	shoppingListAnchor.addEventListener("click", clickedTab);
	applyTabStyles(shoppingList);
	shoppingList.style.float = "right";
	shoppingList.style.marginRight = "0px";
	
	var tabPages = document.createElement("div");
	rightSideDiv.appendChild(tabPages);
	tabPages.style.border = "1px solid";
	tabPages.style.borderTopWidth = "0px";
	tabPages.style.clear = "both";
	tabPages.className = "border-box";
	//tabPages.style.width = "250px";
	
	var shopCalcDiv = document.createElement("div");
	tabPages.appendChild(shopCalcDiv);
	shopCalcDiv.id = "shoppingCalc";
	
	function addAlignedMenu(label, element)
	{
		var td = document.createElement("td");
		td.style.display = "block";
		td.style.width = "190px";
		td.style.fontSize = "inherit";
		td.style.verticalAlign = "middle";
		shopCalcDiv.appendChild(td);
		
		var tdSpan = document.createElement("span");
		td.appendChild(tdSpan);
		tdSpan.appendChild(document.createTextNode(label));
		
		td.appendChild(element);
		element.style.float = "right";
		
		var br = document.createElement("div");
		br.style.clear = "both";
		shopCalcDiv.appendChild(br);
		
		return td;
	}
	
	var shopSelect = document.createElement("select");
	var shopAlignedMenu = addAlignedMenu("Shop: ", shopSelect);
	shopSelect.style.width = "135px";
	
	var option = document.createElement("option");
	shopSelect.appendChild(option);
	option.text = "Select a shop";
	
	for (var i = 0; i < shopList.length; i++)
	{
		var category = shopList[i];
		
		var optgroup = document.createElement("optgroup");
		shopSelect.appendChild(optgroup);
		optgroup.label = category.name;
		
		for (var j = 0; j < category.shops.length; j++)
		{
			var option = document.createElement("option");
			optgroup.appendChild(option);
			option.text = category.shops[j];
			option.value = category.shops[j];
		}
	}
	
	var itemSelect = document.createElement("select");
	addAlignedMenu("Item: ", itemSelect);
	itemSelect.style.width = "135px";
	
	function setupItemMenu()
	{
		while (itemSelect.lastChild)
		{
			itemSelect.removeChild(itemSelect.lastChild);
		}
		
		var option = document.createElement("option");
		option.text = "Select an item";
		itemSelect.appendChild(option);
		
		
		for (var i = 0; i < itemList.length; i++)
		{
			var shop = itemList[i];
			var shopName = shop.name;
			if (shopName == shopSelect.value)
			{
				for (var j = 0; j < shop.items.length; j++)
				{
					var option = document.createElement("option");
					option.text = shop.items[j].name;
					option.value = shop.items[j].name;
					itemSelect.appendChild(option);
					if (localStorage.getItem("itemSelect" + userName) == option.value)
					{
						itemSelect.value = option.value;
					}
				}
			}
		}
	}
	
	//Reset item menu when shop changes:
	shopSelect.addEventListener("change", setupItemMenu);
	
	var quantityBlock = document.createElement("div");
	shopCalcDiv.appendChild(quantityBlock);
	quantityBlock.style.clear = "both";
	//addAlignedMenu("Quantity: ", quantityBlock);
	//quantityBlock.style.display = "inline-block";
	
	var charismaDiv = document.createElement("div");
	charismaDiv.style.display = "inline-block";
	quantityBlock.appendChild(charismaDiv);
	
	var charismaLabel = document.createElement("div");
	charismaLabel.style.display = "inline-block";
	charismaLabel.style.width = "55px";
	charismaLabel.innerHTML = "Charisma: ";
	charismaDiv.appendChild(charismaLabel);
	
	var charismaSelect = document.createElement("select");
	//addAlignedMenu("Charisma: ", charismaSelect);
	charismaDiv.appendChild(charismaSelect);
	charismaSelect.innerHTML = "<option value='0'>--</option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option>";
	charismaSelect.style.width = "45px";
	var charismaSelectParent = charismaSelect.parentElement;
	
	var unitLabel = document.createElement("div");
	unitLabel.style.display = "inline-block";
	unitLabel.style.width = "33px";
	unitLabel.style.textAlign = "right";
	unitLabel.innerHTML = "Unit: ";
	quantityBlock.appendChild(unitLabel);
	
	var unitPriceDiv = document.createElement("div");
	quantityBlock.appendChild(unitPriceDiv);
	unitPriceDiv.style.width = "55px";
	unitPriceDiv.style.textAlign = "right";
	unitPriceDiv.style.display = "inline-block";
	
	
	var itemPriceDiv = document.createElement("div");
	shopCalcDiv.appendChild(itemPriceDiv);
	
	var quantityLabel = document.createElement("div");
	quantityLabel.style.display = "inline-block";
	quantityLabel.style.width = "56px";
	quantityLabel.innerHTML = "Quantity: ";
	itemPriceDiv.appendChild(quantityLabel);
	
	var itemQuantityEntry = document.createElement("input");
	itemPriceDiv.appendChild(itemQuantityEntry);
	itemQuantityEntry.type = "number";
	itemQuantityEntry.value = "1";
	itemQuantityEntry.style.width = "40px";
	itemQuantityEntry.min = "1";
	itemQuantityEntry.max = "999";
	
	var totalLabel = document.createElement("div");
	totalLabel.style.display = "inline-block";
	totalLabel.style.width = "37px";
	totalLabel.style.textAlign = "right";
	totalLabel.innerHTML = "Total: ";
	itemPriceDiv.appendChild(totalLabel);
	
	var totalPriceDiv = document.createElement("div");
	itemPriceDiv.appendChild(totalPriceDiv);
	totalPriceDiv.style.width = "55px";
	totalPriceDiv.style.textAlign = "right";
	totalPriceDiv.style.display = "inline-block";
	
	function calculateItemUnitPrice(itemName)
	{
		for (var i = 0; i < itemList.length; i++)
		{
			var shop = itemList[i];
			var shopName = shop.name;
			if (shopName == shopSelect.value)
			{
				for (var j = 0; j < shop.items.length; j++)
				{
					var item = shop.items[j];
					if (item.name == itemName)
					{
						var charismaLevel = parseInt(charismaSelect.value);
						if (item.prices.length == 1)
						{
							return item.prices[0];
						}
						else
						{
							return item.prices[charismaLevel];
						}
					}
				}
			}
		}
	}
	
	function updateItemPrice()
	{
		var itemPrice = calculateItemUnitPrice(itemSelect.value);
		
		if (isNaN(itemPrice))
		{
			unitPriceDiv.innerHTML = "";
		}
		else
		{
			unitPriceDiv.innerHTML = itemPrice;
		}
		
		var quantity = parseInt(itemQuantityEntry.value);
		if (quantity > 999) 
		{
			itemQuantityEntry.value = 999;
			quantity = 999;
		}
		
		var newPrice = itemPrice * quantity;
		
		if (isNaN(newPrice))
		{
			totalPriceDiv.innerHTML = "";
		}
		else
		{
			totalPriceDiv.innerHTML = newPrice;
		}
		
		if (currentTab == "shoppingList")
		{
			displayShoppingList();
		}
	}
	
	shopSelect.addEventListener("change", updateItemPrice);
	charismaSelect.addEventListener("change", updateItemPrice);
	itemSelect.addEventListener("change", updateItemPrice);
	itemQuantityEntry.addEventListener("input", updateItemPrice);
	
	
	setIfNotNull(shopSelect, "shopSelect" + userName);
	shopSelect.addEventListener("change", function()
	{
		localStorage.setItem("shopSelect" + userName, shopSelect.value);
	});
	
	//Set up the item menu on page load, but AFTER the shop is selected from localStorage:
	setupItemMenu();
	
	setIfNotNull(charismaSelect, "charismaSelect" + userName);
	charismaSelect.addEventListener("change", function()
	{
		localStorage.setItem("charismaSelect" + userName, charismaSelect.value);
	});
	
	setIfNotNull(itemSelect, "itemSelect" + userName);
	itemSelect.addEventListener("change", function()
	{
		localStorage.setItem("itemSelect" + userName, itemSelect.value);
	});
	
	setIfNotNull(itemQuantityEntry, "itemQuantityEntry" + userName);
	itemQuantityEntry.addEventListener("change", function()
	{
		localStorage.setItem("itemQuantityEntry" + userName, itemQuantityEntry.value);
	});
	
	
	
	
	
	var addItemButton = document.createElement("button");
	addItemButton.innerHTML = "Add to cart";
	shopCalcDiv.appendChild(addItemButton);
	addItemButton.addEventListener("click", function(event)
	{
		var isInCart = false;
		
		for (var i = 0; i < shoppingCart.length; i++)
		{
			//Separate individual items by name and quantity.
			var inCart = shoppingCart[i].split(",");
			//If duplicate item.
			if (inCart[0] == itemSelect.value)
			{
				//Indicate that item already exists in shoppingCart.
				isInCart = true;
				//Add new quantity to existing quantity.
				inCart[1] = parseInt(inCart[1]) + parseInt(itemQuantityEntry.value);
				//Rejoin item name and quantity into a string.
				shoppingCart[i] = inCart.join(",");
			}
		}
		
		//If not duplicate.
		if (!isInCart)
		{
			//Add item to end of array.
			shoppingCart.push(itemSelect.value + "," + itemQuantityEntry.value);
		}
		
		//Set locaLStorage for shoppingCart.
		localStorage.setItem("shoppingCart" + userName, shoppingCart.join(";"));
	});
	
	var clearCartButton = document.createElement("button");
	clearCartButton.innerHTML = "Clear cart";
	shopCalcDiv.appendChild(clearCartButton);
	clearCartButton.addEventListener("click", function(event)
	{
		localStorage.removeItem("shoppingCart" + userName);
		shoppingCart = [];
	});
	
	
	var shopListTab = document.createElement("div");
	tabPages.appendChild(shopListTab);
	shopListTab.id = "shoppingList";
	shopListTab.style.display = "none";
	
	var shopListDiv = document.createElement("div");
	
	var shopButtonsDiv = document.createElement("div");
	
	function redisplayShoppingCalc()
	{
		shopCalcDiv.insertBefore(shopAlignedMenu, shopCalcDiv.firstChild);
		quantityBlock.insertBefore(charismaDiv, quantityBlock.firstChild);
	}
	
	function editButtonClicked(button)
	{
		var itemDiv = button.parentElement;
		var itemName = itemDiv.childNodes[1].data;
		
		for (var i = 0; i < shoppingCart.length; i++)
		{
			var itemInfo = shoppingCart[i].split(",");
			if (itemInfo[0] == itemName)
			{
				var newQuantity = prompt("Enter " + itemName + " quantity desired:", itemInfo[1]);
				newQuantity = parseInt(newQuantity);
				if (isNaN(newQuantity) || newQuantity < 0)
				{
					//alert("Not a valid quantity. Enter a positive number.")
				}
				else if (newQuantity == 0)
				{
					shoppingCart.splice(i, 1);
				}
				else
				{
					if (newQuantity > 999) newQuantity = 999;
					itemInfo[1] = newQuantity;
					shoppingCart[i] = itemInfo.join(",");
				}
				
				break;
			}
		}
		
		localStorage.setItem("shoppingCart" + userName, shoppingCart.join(";"));
		
		displayShoppingList();
	}
	
	function deleteButtonClicked(button)
	{
		var itemDiv = button.parentElement;
		var itemName = itemDiv.childNodes[1].data;
		
		for (var i = 0; i < shoppingCart.length; i++)
		{
			var itemInfo = shoppingCart[i].split(",");
			if (itemInfo[0] == itemName)
			{
				shoppingCart.splice(i, 1);
				break;
			}
		}
		
		localStorage.setItem("shoppingCart" + userName, shoppingCart.join(";"));
		
		displayShoppingList();
	}
	
	function createEditButton()
	{
		var button = document.createElement("button");
		button.innerHTML = "Edit";
		button.addEventListener("click", function()
		{
			editButtonClicked(button);
		});
		return button;
	}
	
	function createDeleteButton()
	{
		var button = document.createElement("button");
		button.innerHTML = "Delete";
		button.addEventListener("click", function()
		{
			deleteButtonClicked(button);
		});
		return button;
	}
	
	function displayShoppingList()
	{
		shopListTab.appendChild(shopAlignedMenu);
		shopListTab.appendChild(charismaDiv);
		
		shopListTab.appendChild(shopListDiv);
		shopListTab.appendChild(shopButtonsDiv);
		
		shopListDiv.innerHTML = "";
		while (shopButtonsDiv.lastChild)
		{
			shopButtonsDiv.removeChild(shopButtonsDiv.lastChild);
		}
		
		if (shoppingCart.length == 0)
		{
			shopListDiv.innerHTML += "Your cart is as empty<br />as Ravenblack's soul.";
			return;
		}
		
		var totalInCart = 0;
		
		var shoppingContentsDisplay = "";
		
		for (var i = 0; i < shoppingCart.length; i++)
		{
			//Separate individual items by name and quantity.
			var inCart = shoppingCart[i].split(",");
			
			var itemName = inCart[0];
			var itemQuantity = parseInt(inCart[1]);
			
			var itemPrice = calculateItemUnitPrice(itemName);
			
			var itemDiv = document.createElement("div");
			shopButtonsDiv.appendChild(itemDiv);
			
			var itemSpan = document.createElement("span");
			itemDiv.appendChild(itemSpan);
			
			if (itemPrice)
			{
				totalInCart += itemPrice * itemQuantity;
			}
			else
			{
				itemSpan.style.color = "#666666";
			}
			
			itemSpan.appendChild(makeElement("<div class='divider-line'>"));
			itemSpan.appendChild(document.createTextNode(itemName));
			itemSpan.appendChild(document.createElement("br"));
			
			if (itemPrice)
			{
				itemSpan.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0" + itemPrice + " coins x " + itemQuantity + " = " + (itemPrice * itemQuantity) + " coins"));
				itemSpan.appendChild(document.createElement("br"));
			}
			
			var editButton = createEditButton();
			itemSpan.appendChild(editButton);
			
			var deleteButton = createDeleteButton();
			itemSpan.appendChild(deleteButton);
		}
		
		if (shopSelect.value == "Eternal Aubade of Mystical Treasures")
		{
			shopListDiv.innerHTML += "Eternal Aubade<br />of Mystical Treasures";
		}
		else
		{
			shopListDiv.innerHTML += shopSelect.value;
		}
		shopListDiv.innerHTML += " | ";
		if (charismaSelect.value == "0")
		{
			shopListDiv.innerHTML += "No Charisma" + "<br />";
		}
		else
		{
			shopListDiv.innerHTML += "Charisma " + charismaSelect.value + "<br />";
		}
		
		shopListDiv.innerHTML += "Total: " + totalInCart + " coins<br />";
		
		shopListDiv.innerHTML += shoppingContentsDisplay;
	}
	
	
	
	
	
	
	
	
	
	
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
	if (doubleGS.checked)
	{
		for (var i = 0; i < forms.length; i++)
		{
			var form = forms[i];
		
			//Find garlic spray form, provided a checkbox to use two.
			if (form.action.value == "use" && form.target.value == "33" && form.x)
			{
				form.x.checked = true;
			}
		}
	}
	
	
	
	
	
	//	+ Keybinding
	
	document.body.addEventListener("keydown", function(event)
	{
		//If keybinding is off, don't assign actions to keys.
		if (bindKey.checked == false) return;
		
		//If CTRL key is pressed, temporarily disable keybinding, i.e. CTRL+C to copy hits.
		if (event.ctrlKey) return;
		//If CMD key is pressed, temporarily disable keybinding, i.e. CMD+C to copy hits.
		if (event.metaKey) return;
		
		//If a text form is active, temporarily disable keybinding, i.e. selecting Teleport location.
		if (document.activeElement.type && document.activeElement.type.toLowerCase() == "text") return;
		//If a password form is active, temporarily disable keybinding, i.e. changing your password in MyVamp.
		if (document.activeElement.type && document.activeElement.type.toLowerCase() == "password") return;
		//if (document.activeElement == document.body) return;
		
		//If a select form, i.e. dropdown, is active, temporarily disable actions linked to keybinding. 
		if (document.activeElement.tagName.toLowerCase() == "select") return;
		
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
				if (form.action.value == "drink" && form.t.value == "1")
				{
					form.submit();
					return true;
				}
			}
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
					//save vamp, find vamp name in href target
					
					var url = link.href;
					url = url.substring(url.indexOf("target=") + 7);
					var vampName = url.substring(0, url.indexOf("&"));
					console.log("attacked " + vampName);
					
					//Compare to list of vampsAttacked.
					var foundMatch = false;
					for (var j = 0; j < vampsAttacked.length; j++)
					{
						var vampAttacked = vampsAttacked[j];
						//If the current vampire under attack matches a previously attacked vampire, end search, update entry.
						if (vampName == vampAttacked)
						{
							foundMatch = true;
							break;
						}
					}
					
					//If no match found, save new entry.
					if (foundMatch == false)
					{
						vampsAttacked.push(vampName);
						localStorage.setItem("vampsAttacked" + userName, vampsAttacked.join(","));
						window.location.href = link.href;
						return;
					}
				}
			}
		}
		
		switch(event.keyCode)
		{
			case 66: //b: bite
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
			case 97: //numpad 1: move down-left
				doMove(6);
				break;
			case 98: //numpad 2: move down
				doMove(7);
				break;
			case 99: //numpad 3: move down-right
				doMove(8);
				break;
			case 100: //numpad 4: move left
				doMove(3);
				break;
			case 102: //numpad 6: move right
				doMove(5);
				break;
			case 103: //numpad 7: move up-left
				doMove(0);
				break;
			case 104: //numpad 8: move up
				doMove(1);
				break;
			case 105: //numpad 9: move up-right
				doMove(2);
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
		
		event.preventDefault();
	});
}

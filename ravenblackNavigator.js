//Welcome to the Ravenblack Navigator!




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

var shouldSetUpNavigator = (isLoginView == false && (isSetPasswordView == false || isMyVampView == true));

if (shouldSetUpNavigator)
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
	
	
	//	+ Left sidebar
	
	//Create div container for checkbox.
	var leftSideDiv = document.createElement("div");
	//Put div above grid.
	document.body.insertBefore(leftSideDiv, document.body.firstChild);
	//Put div on left side.
	leftSideDiv.style.float = "left";
	leftSideDiv.style.width = "150px";
	
	
	//	+ Right sidebar
	
	//Create div container for checkbox.
	var rightSideDiv = document.createElement("div");
	//Put div above grid.
	document.body.insertBefore(rightSideDiv, document.body.firstChild);
	//Put div on right side.
	rightSideDiv.style.float = "right";
	//Define position of div container.
	rightSideDiv.style.position = "relative";
}

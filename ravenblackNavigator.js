
//Remove page title to conserve screen real estate.
var title = document.getElementById("main").getElementsByTagName("H1")[0];

title.style.display="none";
title.nextElementSibling.style.display="none";


//Remove footer with biterlink.
var textInfo = document.getElementsByClassName("spacey");
var footer = textInfo[textInfo.length-1];

for ( ; ; ) //infinite loooop!
{
	var child = footer.lastChild;
	footer.removeChild(child);
	
	if (child.innerHTML == "Click here for more detail") break;	
}


//Remove unnecessary header info.
var header = document.getElementsByClassName("head")[0];

for (var i = 0; i < header.childNodes.length; i++)
{
	var child = header.childNodes[i];
	if (child.innerHTML == "How To Play" || child.innerHTML == "FAQ")
	{
		//Remove | after link.
		header.removeChild(child.nextSibling);
		
		//Remove the link itself.
		header.removeChild(child);
		
		//Check same index in case another undesired element shifted to that position.
		i--;
	}
}

//Move header info below grid.
footer.parentElement.appendChild(header);




//Record warMode selection with cookies.

//Call to create or update a cookie with a value.
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
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

//Set warMode cookie.
function updateWarModeCookie(event)
{
	setCookie("warMode", event.target.checked ? 1 : 0);
}

//Set vampInfo cookie.
function updateVampInfoCookie(event)
{
	setCookie("vampInfo", event.target.checked ? 1 : 0);
}

//Set bindKey cookie.
function updateBindKeyCookie(event)
{
	setCookie("bindKey", event.target.checked ? 1 : 0);
}


//Set radioQWE cookie.
function updateRadioQWECookie(event)
{
	setCookie("keyConfig", event.target.checked ? 0 : 1)
}

//Set radioWAS cookie.
function updateRadioWASCookie(event)
{
	setCookie("keyConfig", event.target.checked ? 1 : 0)
}



//Create div container for checkbox.
var div = document.createElement("div");
//Put div above grid.
document.body.insertBefore(div, document.body.firstChild);
//Put div on left side.
div.style.float = "left";


//Create labels, checkboxes, radiobuttons.
var warModeDiv  = document.createElement("div");
var vampInfoDiv = document.createElement("div");
var bindKeyDiv  = document.createElement("div");
var radioForm   = document.createElement("form"); 
div.appendChild(warModeDiv);
div.appendChild(vampInfoDiv);
div.appendChild(bindKeyDiv);
div.appendChild(radioForm);
warModeDiv.innerHTML  = '<label for  = "warMode">War Mode</label><input type      = "checkbox" id="warMode">';
vampInfoDiv.innerHTML = '<label for  = "vampInfo">Vamp Info</label><input type    = "checkbox" id="vampInfo">';
bindKeyDiv.innerHTML  = '<label for  = "bindKey">Bind Keyboard</label><input type = "checkbox" id="bindKey">';
radioForm.innerHTML   = '<input type = "radio" name = "keyConfig" value = "QWEDCXZA" id = "QWEDCXZA" checked/><label for = "QWEDCXZA">QWEDCXZA</label> <input type = "radio" name = "keyConfig" value = "WASD-QEZX" id = "WASD-QEZX"/><label for = "WASD-QEZX">WASD-QEZX</label>';

//Make reference to checkbox.
var warMode = warModeDiv.children[1];
//Get current warMode value.
warMode.checked = getCookie("warMode")==1? true : false;
//When state change, update cookie.
warMode.onchange = updateWarModeCookie;

//Make reference to checkbox.
var vampInfo = vampInfoDiv.children[1];
//Get current warMode value.
vampInfo.checked = getCookie("vampInfo")==1? true : false;
//When state change, update cookie.
vampInfo.onchange = updateVampInfoCookie;

//Make reference to checkbox.
var bindKey = bindKeyDiv.children[1];
//Get current bindKey value.
bindKey.checked = getCookie("bindKey")==1? true : false;
//When state change, update cookie.
bindKey.onchange = updateBindKeyCookie;

//Make reference to radio.
var radioQWE = radioForm.children[0];
var radioWAS = radioForm.children[2];
radioQWE.checked = getCookie("keyConfig")==1? false : true;
radioWAS.checked = getCookie("keyConfig")==1? true : false;
radioQWE.onchange = updateRadioQWECookie;
radioWAS.onchange = updateRadioWASCookie;




//If warMode selected.
if (warMode.checked)
{
	//Autoload More commands.
	var forms = document.getElementsByTagName("form");
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
			i--;
		}
	}
//	if (window.location.href.indexOf("extra-commands") == -1)
//	{
//		window.location.href="/blood.pl?target=extra-commands";
//	}
}

var firstSpacey = document.getElementsByClassName("spacey")[0];
firstSpacey.style.width = "500px";

//Get info from My Vampire page.
//If vampInfo selected.
if (vampInfo.checked)
{
	var iframe = document.createElement("iframe");
	
	iframe.setAttribute("src", "http://quiz.ravenblack.net/blood.pl?action=viewvamp");
	iframe.width="500px"; iframe.height="300px";
	footer.parentElement.appendChild(iframe);
	
	iframe.onload = function() {
		var table = iframe.contentWindow.document.getElementsByTagName("table")[0];
		
		while (iframe.contentWindow.document.body.childNodes.length > 0)
		{
			iframe.contentWindow.document.body.removeChild(iframe.contentWindow.document.body.firstChild);
		}
		
		iframe.contentWindow.document.body.appendChild(table);
		//document.body.appendChild(table);
		
		var secondSpacey = table.getElementsByClassName("spacey")[1];
		secondSpacey.parentElement.removeChild(secondSpacey);
	}
}


document.body.addEventListener("keydown", function(event)
{
	if (bindKey.checked == false) return;
	
	if (event.ctrlKey) return;
	
	if (document.activeElement && document.activeElement.type && document.activeElement.type.toLowerCase() == "text") return;
	
	function doMove(moveIndex)
	{
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
	
	//var forms = document.getElementsByTagName("form");
	
	
	if(radioQWE.checked)
	{
		switch(event.keyCode)
		{
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
				doMove(4);
				break;
			case 67: //c: move down-right
				doMove(7);
				break;
			case 88: //x: move down
				doMove(6);
				break;
			case 90: //z: move down-left
				doMove(5);
				break;
			case 65: //a: move left
				doMove(3);
				break;
		}
	}
	else
	{
		switch(event.keyCode)
		{
			case 87: //w: move up
				doMove(1);
				break;
			case 65: //a: move left
				doMove(3);
				break;
			case 83: //s: move down
				doMove(6);
				break;
			case 68: //d: move right
				doMove(4);
				break;
			case 81: //q: move up-left
				doMove(0);
				break;
			case 69: //e: move up-right
				doMove(2);
				break;
			case 90: //z: move down-left
				doMove(5);
				break;
			case 88: //x: move down-right
				doMove(7);
				break;
		}
	}
	
	
	
	switch(event.keyCode)
	{
		case 71: //g: garlic spray
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
		//default: return;
	}
	event.preventDefault();
});

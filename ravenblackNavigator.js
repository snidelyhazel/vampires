//Welcome to the Ravenblack Navigator.

//Feature list:
//	+ Clean interface
//		- Consolidated banner, header and footer
//		- Rearranged links
//		- Hover over options for explanation
//	+ Keybinding
//		- Spacebar to load "More Commands" in all modes
//		- Grid movement controlled by keyboard
//			= Two convenient movement configurations
//		- Item use controlled by keyboard with minimal mouse requirement
//		- One-touch biting and robbing
//			= Humans preferenced above vampires
//	+ War mode
//		- Autoloading "More Commands"
//		- Eliminates unnecessary speaking (say and shout), telepathy and giving commands
//			= Declutters screen
//		- Disables biting and robbing so no accidental attacks
//	+ Hit-tracking
//		- Tracking of hits by and against
//			= Includes biting and robbing
//			= 
//	+ Coming soon: Always visible inventory




//	+ Clean interface

//Remove page title to conserve screen real estate.
var title = document.getElementById("main").getElementsByTagName("H1")[0];
title.style.display="none";
title.nextElementSibling.style.display="none";

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

//Access container of game interface.
var firstSpacey = document.getElementsByClassName("spacey")[0];
//Normalize size of grid.
firstSpacey.style.width = "500px";




//	+ Set up storage

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

//Set vampInfo localStorage.
function updateVampInfoStorage(event)
{
	localStorage.setItem("vampInfo", event.target.checked ? 1 : 0);
}




//	+ Left sidebar

//Create div container for checkbox.
var leftSideDiv = document.createElement("div");
//Put div above grid.
document.body.insertBefore(leftSideDiv, document.body.firstChild);
//Put div on left side.
leftSideDiv.style.float = "left";

//Create labels, checkboxes, radiobuttons.
var bindKeyDiv  = document.createElement("div");
var radioForm   = document.createElement("form"); 
var warModeDiv  = document.createElement("div");
var vampInfoDiv = document.createElement("div");
leftSideDiv.appendChild(bindKeyDiv);
leftSideDiv.appendChild(radioForm);
leftSideDiv.appendChild(warModeDiv);
leftSideDiv.appendChild(vampInfoDiv);
//tabindex = "-1" excludes tab from scrolling through these options for quick access to "More Commands".
bindKeyDiv.innerHTML  = '<label for  = "bindKey">Bind Keyboard</label><input type = "checkbox" id = "bindKey"  tabindex = "-1">';
radioForm.innerHTML   = '<div><input type = "radio" name = "keyConfig" value = "QWEDCXZA" id = "QWEDCXZA" checked tabindex = "-1"/> \
						<label for = "QWEDCXZA">QWEDCXZA</label> </div>\
						<div><input type = "radio" name = "keyConfig" value = "WASD-QEZX" id = "WASD-QEZX" tabindex = "-1"/> \
						<label for = "WASD-QEZX">WASD-QEZX</label> </div>';
warModeDiv.innerHTML  = '<label for  = "warMode">War Mode</label><input type      = "checkbox" id = "warMode"  tabindex = "-1">';
vampInfoDiv.innerHTML = '<label for  = "vampInfo">Vamp Info</label><input type    = "checkbox" id = "vampInfo" tabindex = "-1">';

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
bindKey.checked = localStorage.getItem("bindKey") == 1 ? true : false;
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

//Make reference to warMode checkbox.
var warMode = warModeDiv.children[1];
//Get current warMode value.
warMode.checked = localStorage.getItem("warMode") == 1 ? true : false;
//When state change, update localStorage.
warMode.onchange = updateWarModeStorage;

//Make reference to vampInfo checkbox.
var vampInfo = vampInfoDiv.children[1];
//Get current warMode value.
vampInfo.checked = localStorage.getItem("vampInfo") == 1 ? true : false;
//When state change, update localStorage.
vampInfo.onchange = updateVampInfoStorage;



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

document.body.appendChild(moCustom);

/*var mo = document.getElementById("mo");
mo.style.display = "none";
mo.style.top = "initial";
mo.style.bottom = "0px";
mo.style.backgroundColor = "black";
mo.style.color = "red";
mo.style.position = "fixed"; 
mo.style.left = "0px"; 
mo.style.width = "300px"; 
mo.style.padding = "2px"; 
mo.style.font = "x-small Verdana,Sans-serif"; 
*/

function onHoverOver(event)
{
	console.log("onHoverOver");
	var element = event.target;
	if (element && element.title.length)
	{
		console.log("onHoverOver inside if");
		moCustom.innerHTML = element.title;
		moCustom.style.display = "inline";
		element.title = "";
	}
}

function onHoverOut(event)
{
	console.log("onHoverOut");
	var element = event.target;
	if (element)
	{
		console.log("onHoverOut inside if");
		moCustom.style.display = "none";
		element.title = moCustom.innerHTML;
	}
}

bindKeyDiv.addEventListener("mouseenter", onHoverOver);
bindKeyDiv.addEventListener("mouseleave", onHoverOut);
radioQWEDiv.addEventListener("mouseenter", onHoverOver);
radioQWEDiv.addEventListener("mouseleave", onHoverOut);
radioWASDiv.addEventListener("mouseenter", onHoverOver);
radioWASDiv.addEventListener("mouseleave", onHoverOut);

var imgs = document.getElementsByTagName("img");
for (var i = 0; i < imgs.length; i++)
{
	var img = imgs[i];
	console.log("found img");
	if (img.getAttribute("onmouseover") && img.getAttribute("onmouseout"))
	{
		var newImg = document.createElement("img");
		newImg.src = "bloodimages/q.png";
		newImg.style.width = "12px";
		newImg.style.height = "12px";
		newImg.title = img.title;
		newImg.addEventListener("mouseenter", onHoverOver);
		newImg.addEventListener("mouseleave", onHoverOut);
		img.parentElement.insertBefore(newImg, img);
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

//Initialize hit-tracking.
if (localStorage.getItem("hittracker") == null)
{
	localStorage.setItem("hittracker", ""); 
}

//Store hit-tracking.
function recordHit(element)
{
	if (document.getElementsByClassName("street").length > 0)
	{
		var message;
		
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
		
		localStorage.setItem("hittracker", localStorage.getItem("hittracker") + message);
	}
}

var borderDiv; //reusable in both conditions
for (var i = 0; i < firstSpacey.childNodes.length; i++)
{
	var child = firstSpacey.childNodes[i];
	if (child.nodeName == "#text" && child.data.trim() == "") continue; //if no text except whitespace, skip
	if (child.nodeName == "FORM") continue; //if form found, skip
	if (child.nodeName == "HR") continue; //if horizontal rule found, skip
	if (child.nodeName == "DIV")
	{
		borderDiv = child;
		break;
	}
	recordHit(child);
}
for (var i = 0; i < borderDiv.childNodes.length; i++)
{
	var child = borderDiv.childNodes[i];
	if (child.nodeName == "#text" && child.data.trim() == "") continue; //if no text except whitespace, skip
	if (child.nodeName == "FORM" && child.name == "countdn") break; //if countdown found, nothing to see here
	if (child.nodeName == "FORM") continue; //if form found, skip
	if (child.nodeName == "HR") continue; //if horizontal rule found, skip
	if (child.nodeName == "#text" && child.data.indexOf("Action Points: ") != -1) break; //if "Action Points: ", skip
	recordHit(child);
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

var spaces = document.querySelectorAll("td.street, td.city, td.intersect, td.cityblock");

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
		
		break;
	}
}

var shortestKnownDistance = 200; //actual width and height of grid
var nearestBank;
for (var i = 0; i < bankArray.length; i++)
{
	var bankX = bankArray[i][1];
	var bankY = bankArray[i][2];
	
	var distanceX = Math.abs(bankX - currentX);
	var distanceY = Math.abs(bankY - currentY);
	
	var distance = Math.max(distanceX, distanceY);
	
	if (distance < shortestKnownDistance)
	{
		shortestKnownDistance = distance;
		nearestBank = bankArray[i];
	}
}

var bankX = nearestBank[1];
var bankY = nearestBank[2];

var streetX = bankX / 2;
var streetY = bankY / 2;

var directionX = bankX - currentX;
var directionY = bankY - currentY;

var directionString = "";

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

rightSideDiv.appendChild(document.createElement("br"));
rightSideDiv.appendChild(document.createElement("br"));

var bankInfo = document.createElement("p");
bankInfo.innerHTML = "Nearest Omnibank branch:<br />";
bankInfo.innerHTML += streetArray[streetX][1] + " and " + streetArray[streetY][2];
bankInfo.innerHTML += ", ";
bankInfo.innerHTML += directionString;

rightSideDiv.appendChild(bankInfo);



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




// + Vamp Info

//Get info from My Vampire page.
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
	//If keybinding is off, don't assign actions to keys.
	if (bindKey.checked == false) return;
	
	//If CTRL key is pressed, temporarily disable keybinding, i.e. CTRL+C to copy hits.
	if (event.ctrlKey) return;
	
	//If a text form is active, temporarily disable keybinding, i.e. selecting Teleport location.
	if (document.activeElement.type && document.activeElement.type.toLowerCase() == "text") return;
	//if (document.activeElement == document.body) return;
	
	//If a select form, i.e. dropdown, is active, temporarily disable actions linked to keybinding. 
	if (document.activeElement.tagName.toLowerCase() == "select") return;
	
//	console.log("key pressed: ", event.keyCode);
	
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
			doMove(4);
			break;
		case 67: //c: move down-right or no move
			if (radioQWE.checked)
			{
				doMove(7);
			}
			else
			{
				return;
			}
			break;
		case 88: //x: move down or down-right
			doMove(radioQWE.checked ? 6 : 7);
			break;
		case 90: //z: move down-left
			doMove(5);
			break;
		case 65: //a: move left
			doMove(3);
			break;
		case 83: //s: no move or move down
			if (!radioQWE.checked)
			{
				doMove(6);
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
	
//	console.log("prevent default behavior");
	event.preventDefault();
});

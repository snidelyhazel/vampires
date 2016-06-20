//Welcome to the Ravenblack Navigator!

// + Logins

if (shouldSetUpNavigator)
{
	function setLogin(usernameAndPassword)
	{
		//Set the username and password for the current session in a cookie.
		setCookie("ip", usernameAndPassword);
		//Reset stamp cookie so that number of moves are not restricted for vampires without Second-Sight.
		deleteCookie("stamp");
		//Refresh page.
		window.location.href = "/blood.pl";
	}

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
		setLogin(loginMenu.value);
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
				if (allLogins[i].indexOf(loginName + "#") == 0)
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
				if (allLogins[i].indexOf(loginName + "#") == 0)
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
				if (allLogins[i].indexOf(loginName + "#") == 0)
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
				if (allLogins[i].indexOf(loginName + "#") == 0)
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
		var loginIndex = getLoginIndex(vampName);
		if (loginIndex != -1)
		{
			//Remove the login and update the list.
			allLogins.splice(loginIndex, 1);
			localStorage.setItem("logins", allLogins.join(","));
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
	
	//Create button to save all information.
	var saveButton = document.createElement("button");
	manageLoginsDiv.appendChild(saveButton);
	saveButton.innerHTML = "Save all information";
	saveButton.addEventListener("click", function(event)
	{
		//Create array of vampires.
		var vampInfo = [];

		for (var i = 0; i < allLogins.length; i++)
		{
			//Split each login on hash to separate name and password.
			var login = allLogins[i];
			var name = login.split("#")[0];
			var password = login.split("#")[1];

			//Store name, password and localStorage attributes in vampire object.
			var vampCharacter = 
			{
				name: name,
				password: password,
				coinsIn: localStorage.getItem("coinsIn" + name),
				inventory: localStorage.getItem("inventory" + name),
				powers: localStorage.getItem("powers" + name),
				//add: partner bound, sire and childer if applicable, safety deposit box, current blood and necro cap.
			};

			//Add to end of array.
			vampInfo.push(vampCharacter);
		}		

		//Store as string in JSON file.
		var textFileContents = JSON.stringify(vampInfo, null, "\t");
		//Create link to handle JSON file as webpage.
		var link = document.createElement("a");
		//Convert JSON file to URL for webpage.
		link.href = "data:application/json;charset=utf-8," + escape(textFileContents);
		//Allow local download as JSON file.
		link.download = "vampInfo.json";
		//Save automatically as if following link to downloaded webpage.
		link.click();
	});
	
	saveButton.title = "Saves all vampire information including password and<br/>inventory to \"vampInfo.json\" in your downloads folder.";
	saveButton.addEventListener("mouseenter", onHoverOver);
	saveButton.addEventListener("mouseleave", onHoverOut);

	//Create button to load all information.
	var loadButton = document.createElement("button");
	manageLoginsDiv.appendChild(loadButton);
	loadButton.innerHTML = "Load all information";
	loadButton.addEventListener("click", function(event)
	{
		//Create file dialog.
		var fileSelector = document.createElement('input');
		fileSelector.type = "file";
		fileSelector.addEventListener('change', function(event)
		{
			var reader = new FileReader();
			reader.onload = function(event)
			{
				var vampInfo = JSON.parse(reader.result);
				
				for (var i = 0; i < vampInfo.length; i++)
				{
					var vampCharacter = vampInfo[i];
					
					var foundVampire = false;
					//Search for the loaded username amongst saved ones.
					for (var i = 0; i < allLogins.length; i++)
					{
						//If login found, replace login information in list.
						if (allLogins[i].indexOf(vampCharacter.name + "#") == 0)
						{
							foundVampire = true;
							allLogins[i] = vampCharacter.name + "#" + vampCharacter.password;
							break;
						}
					}
					
					//If login not found, add login information to list.
					if (!foundVampire)
					{
						allLogins.push(vampCharacter.name + "#" + vampCharacter.password);
					}
					
					//Either way, add vampire information to localStorage.
					localStorage.setItem("coinsIn" + vampCharacter.name, vampCharacter.coinsIn);
					localStorage.setItem("inventory" + vampCharacter.name, vampCharacter.inventory);
					localStorage.setItem("powers" + vampCharacter.name, vampCharacter.powers);
				}
				
				localStorage.setItem("logins", allLogins.join(","));
			}
			reader.readAsText(fileSelector.files[0]);
		});
		fileSelector.click();
		
		//window.alert("Load successful. Please refresh the page.");
	});
	
	loadButton.title = "Loads all vampire information from \"vampInfo.json\",<br/>likely in your downloads folder.";
	loadButton.addEventListener("mouseenter", onHoverOver);
	loadButton.addEventListener("mouseleave", onHoverOut);
	
	//Create button to remove login from list.
	var forgetButton = document.createElement("button");
	manageLoginsDiv.appendChild(forgetButton);
	forgetButton.innerHTML = "Forget vampire";
	forgetButton.addEventListener("click", function(event)
	{
		forgetVampire(userName);
	});
	
	forgetButton.title = "Forgets vampire information associated with<br/>logged-in vampire only.";
	forgetButton.addEventListener("mouseenter", onHoverOver);
	forgetButton.addEventListener("mouseleave", onHoverOut);
	
	manageLoginsDiv.style.marginBottom = "0";

	//Separate elements.
	leftSideDiv.appendChild(document.createElement("br"));
}
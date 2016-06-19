//Welcome to the Ravenblack Navigator!

// + Vampire Vitals

if (shouldSetUpNavigator)
{
	//Create div container for vampInfo.
	var myVampDiv = document.createElement("div");
	myVampDiv.className = "border-box";
	leftSideDiv.appendChild(myVampDiv);
	myVampDiv.style.maxWidth = "150px";
	
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
				var questFullDescription = questString.substring(questString.indexOf("Quest: ") + 7);
				//Remove . after deadline.
				questFullDescription = questFullDescription.substring(0, questFullDescription.lastIndexOf("."));
				//Remove deadline info.
				var questDescription = questFullDescription.substring(0, questFullDescription.lastIndexOf(".")+1);

				var deadlineString = questString.substring(questString.indexOf(".") + 2, questString.length - 1);
				var deadlineDuration = parseDuration(deadlineString);

				var quest;
				for (var j = 0; j < quests.length; j++)
				{
					if (questDescription.includes(quests[j].descriptionCue))
					{
						quest = quests[j];
						break;
					}
				}

				//Determine quest level from current powers.
				var questLevel = getQuestLevel(quest.name);

				var legsLeft = localStorage.getItem("questLegsLeft" + userName);
				var oldQuestName = localStorage.getItem("quest" + userName);
				var oldQuestDescription = localStorage.getItem("questDescription" + userName);

				switch (quest.name)
				{
					case "Celerity":
						var intersectionNameX = extractInBetween(questDescription, "from the pub at ", " and ");
						var intersectionNameY = extractInBetween(questDescription, " and ", ".");
						var intersectionX = 0;
						var intersectionY = 0;

						for (var j = 0; j < streetArray.length; j++)
						{
							if (streetArray[j][1] == intersectionNameX)
							{
								intersectionX = streetArray[j][0];
							}
							if (streetArray[j][2] == intersectionNameY)
							{
								intersectionY = streetArray[j][0];
							}
						}

						var pubName = "";
						for (var j = 0; j < pubArray.length; j++)
						{
							if (pubArray[j][1] == intersectionX && pubArray[j][2] == intersectionY)
							{
								pubName = pubArray[j][0];
							}
						}

						if (oldQuestDescription == null || quest.name != oldQuestName)
						{
							legsLeft = quest.legs[questLevel];
						}
						else if (!oldQuestDescription.includes(pubName))
						{
							legsLeft--;
						}

						questDescription = "collect " + quest.legs[questLevel] + " items, travel--no transits--to " + pubName + " at " + intersectionNameX + " and " + intersectionNameY + " and buy a drink.";
						break;
					case "Charisma":
						//questDescription = "persuade " + extractInBetween(questDescription, "Persuade ", " prestigious vampires") + " vampires with 500+ blood to visit " + extractInBetween(questDescription, "to visit ", " there and") + " and say \"" + extractInBetween(questDescription, "tell the bartender '", "'. You have ") + "\", without visiting the pub yourself.";
						break;
					case "Locate":
						//questDescription = "go to the NW corner of " + extractInBetween(questDescription, "the corner of ", " and say '") + " and say \"Check-Point\", ensuring you have 10 blood to spare.";
						break;
					case "Stamina":
						questDescription = "go to the NW corner of " + extractInBetween(questDescription, "the corner of ", ".") + " and say \"" + extractInBetween(questDescription, "say '", "' at the corner of") + "\", ensuring you have " + [500, 1000, 1500][questLevel] + " blood.";
						break;
					case "Perception":
						questDescription = "find and kill a vampire hunter.";
						break;
					case "Suction":
						legsLeft = extractInBetween(questDescription, "drink from another ", " powerful vampires");
						questDescription = "drink from " + legsLeft + " vampires whose blood is higher than yours.";
						break;
				}

				recordQuest(quest.name, questDescription, Date.now() + deadlineDuration, legsLeft);
				
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
			localStorage.removeItem("questDescription" + userName);
			localStorage.removeItem("questDeadline" + userName);
			localStorage.removeItem("questLegsLeft" + userName);
		}
	}
	
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
			if (pocketString && pocketString.includes("coin"))
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
				//Get form again as parent of button clicked; function is called after previous var form is no longer valid.
				var form = event.target.parentElement.parentElement;
				
				//Iterate over radio buttons.
				for (var j = 0; j < form.t.length; j++)
				{
					var radio = form.t[j];
					if (form.t.value == radio.value) 
					{
						var itemPrice = parseInt(radio.previousSibling.data.slice(2,-1));
						var itemName = radio.previousSibling.previousSibling.previousSibling.data.slice(0,-1);
						var itemQuantity = parseInt(form.target.value);
						
						var coinsOn = parseInt(localStorage.getItem("coinsOn" + userName));
						var inventory = localStorage.getItem("inventory" + userName);
						var inventoryArray = (inventory == null) ? [] : inventory.split("<br />");
						
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
									inventoryArray[k] = itemName + " (" + itemQuantity + ")";
								}
							}
							if (foundItem == false)
							{
								for (var k = 0; k < inventoryArray.length; k++)
								{
									if (inventoryArray[k] == "None")
									{
										inventoryArray.splice(k, 1);
										k--;
									}
								}
								//Add new item to inventory.
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
			if (pocketString && pocketString.includes("coin"))
			{
				var coinsOn = pocketString.substring(pocketString.indexOf("You have ") + 9, pocketString.indexOf(" coin"));
				if (coinsOn == "no") coinsOn = "0";
				if (coinsOn == "one") coinsOn = "1";
				localStorage.setItem("coinsOn" + userName, coinsOn);
			}
			
			//Sell button is pawnDiv's third-last child, and second-last child element.
			var button = pawnDiv.children[pawnDiv.children.length - 2];
			
			if (button != null)
			{
				//When button is clicked.
				button.addEventListener("click", function(event)
				{
					//Get form again as parent of button clicked; function is called after previous var form is no longer valid.
					var form = event.target.parentElement.parentElement;
				
					//Iterate over radio buttons.
					for (var j = 0; j < form.t.length; j++)
					{
						var radio = form.t[j];
					
						//if (form.t.value == radio.value) 
						if (radio.checked)
						{
							//Get name and price.
							var itemNameAndPrice = radio.previousSibling.data;
							var leftParenIndex = itemNameAndPrice.indexOf("(");
							var itemName = itemNameAndPrice.slice(0, leftParenIndex - 1);
							var itemPrice = parseInt(itemNameAndPrice.slice(leftParenIndex + 1, -1));
							var sellQuantity = parseInt(form.target.value);
							var inventoryQuantity = parseInt(radio.nextSibling.data.slice(11, -1));
						
							var coinsOn = parseInt(localStorage.getItem("coinsOn" + userName));
							var inventory = localStorage.getItem("inventory" + userName);
							var inventoryArray = (inventory == null) ? [] : inventory.split("<br />");
						
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
										}
										else
										{
											//Otherwise remove item from inventory.
											inventoryArray.splice(k, 1);
										}
									}
								}
							
								//If item was not found in inventory but we have some left.
								if (foundItem == false && itemsLeft > 0)
								{
									//Add to inventory.
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
	if (localStorage.getItem("questDeadline" + userName) != null)
	{
		powersBox.innerHTML += "<br />Quest: <br />";
		powersBox.innerHTML += localStorage.getItem("quest" + userName) + ": ";
		powersBox.innerHTML += localStorage.getItem("questDescription" + userName) + "<br />";


		var deadlineDate = new Date(parseInt(localStorage.getItem("questDeadline" + userName)));
		
		//Current hour, in 24-hour time.
		var hours = deadlineDate.getHours();
		//Current minutes, if <10 one digit.
		var minutes = deadlineDate.getMinutes();
		if (minutes < 10)
		{
			minutes = "0" + minutes;
		}
		
		//Current month, where January is 1 (instead of 0, the default).
		var month = deadlineDate.getMonth() + 1;
		//Current day of the month.
		var day = deadlineDate.getDate();

		powersBox.innerHTML += "Deadline: " + month + "/" + day + " " + hours + ":" + minutes;
	}
	
	financialsLine.style.display = (displayInventory.checked || displayPowers.checked) ? "block" : "none";
	inventoryLine.style.display = displayPowers.checked ? "block" : "none";
}
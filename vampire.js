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
			
			if (button != null)
			{
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
}
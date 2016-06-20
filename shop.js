//Welcome to the Ravenblack Navigator!

//	+ Shopping calculator

if (shouldSetUpNavigator)
{
	//Create div to handle display of shop tabs.
	var shoppingAreaDiv = document.createElement("div");
	shoppingAreaDiv.style.display = displayShopList.checked ? "block" : "none";
	rightSideDiv.appendChild(shoppingAreaDiv);
	
	//Create unordered list to contain shop tabs.
	var tabulation = makeElement("<ul style='list-style: none; padding: 0; margin: 0; position: 0; font-size: 90%;'></ul>");
	shoppingAreaDiv.appendChild(tabulation);
	
	//Create line to assist with display of active shop tab.
	var line = makeElement("<div style='position: absolute; width: 100%; border: 0px solid; border-color: white; border-bottom-width: 1px; margin-top: -1px; padding: 5px 0 3px 0;'>&nbsp;</div>");
	tabulation.appendChild(line);
	
	//Set default style for shop tabs.
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
	
	//Tracks active shop tab.
	function getHash(url)
	{
		var hashPos = url.lastIndexOf ("#");
		return url.substring(hashPos + 1);
	}
	
	//Sets active tab to shoppingCalc by default.
	var currentTab = "shoppingCalc";
	
	//Displays active tab, setting to localStorage.
	function selectTab(selectedTab)
	{
		currentTab = selectedTab;

		//Removes bottom border from active tab.
		for (var i = 0; i < tabulation.children.length; i++)
		{
			var tab = tabulation.children[i];
			if (tab.firstChild.id == (currentTab + "Anchor"))
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
		
		//Displays contents of active tab.
		for (var i = 0; i < tabPages.children.length; i++)
		{
			var content = tabPages.children[i];
			content.style.display = (content.id == currentTab) ? "block" : "none";
		}
		
		//Set up contents of active tab.
		if (currentTab == "shoppingList")
		{
			displayShoppingList();
		}
		else if (currentTab == "shoppingCalc")
		{
			displayShoppingCalc();
		}
		
		//Store active tab in localStorage.
		localStorage.setItem("shopTab", currentTab);
	}
	
	//Adds shoppingCalc tab as a list item.
	var shoppingCalc = document.createElement("li");
	tabulation.appendChild(shoppingCalc);
	//Create anchor to link to shoppingCalc contents.
	var shoppingCalcAnchor = makeElement("<a id='shoppingCalcAnchor' style='cursor: pointer; text-decoration: none;'>Item calculator</a>");
	shoppingCalc.appendChild(shoppingCalcAnchor);
	shoppingCalcAnchor.addEventListener("click", function(event)
	{
		selectTab("shoppingCalc");
	});
	applyTabStyles(shoppingCalc);
	shoppingCalc.style.paddingBottom = "4px";
	
	//Adds shoppingList tab as a list item.
	var shoppingList = document.createElement("li");
	tabulation.appendChild(shoppingList);
	//Create anchor to link to shoppingList contents.
	var shoppingListAnchor = makeElement("<a id='shoppingListAnchor' style='cursor: pointer; text-decoration: none;'>Shopping list</a>");
	shoppingList.appendChild(shoppingListAnchor);
	shoppingListAnchor.addEventListener("click", function(event)
	{
		selectTab("shoppingList");
	});
	applyTabStyles(shoppingList);
	shoppingList.style.float = "right";
	shoppingList.style.marginRight = "0px";
	
	//Create border box to hold shop tab contents.
	var tabPages = makeElement("<div class='border-box' style='border: 1px solid; border-top-width: 0px; clear: both;'></div>");
	shoppingAreaDiv.appendChild(tabPages);
	
	//Create contents of shopCalc.
	var shopCalcDiv = document.createElement("div");
	tabPages.appendChild(shopCalcDiv);
	shopCalcDiv.id = "shoppingCalc";
	
	//Create shopCalc options layout.
	function addAlignedMenu(labelText, element)
	{
		//Create div for each option pulldown.
		var div = makeElement("<div style='display: block; width: 190px; font-size: inherit; verticalAlign: middle;'></div>");
		shopCalcDiv.appendChild(div);
		
		//Create label for each option pulldown.
		var label = document.createElement("label");
		div.appendChild(label);
		label.appendChild(document.createTextNode(labelText));
		
		//Attach element.
		div.appendChild(element);
		element.style.float = "right";
		
		//Fix float layout.
		shopCalcDiv.appendChild(makeElement("<div style='clear: both;'></div>"));
		
		return div;
	}
	
	//Create pulldown for shop.
	var shopSelect = document.createElement("select");
	var shopAlignedMenu = addAlignedMenu("Shop: ", shopSelect);
	shopSelect.style.width = "135px";
	
	//Set default text.
	var option = document.createElement("option");
	shopSelect.appendChild(option);
	option.text = "Select a shop";
	
	//Get list of shops from shopList.js.
	for (var i = 0; i < shopList.length; i++)
	{
		var category = shopList[i];
		
		//Group shops by category.
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
	
	//Create pulldown for item.
	var itemSelect = document.createElement("select");
	addAlignedMenu("Item: ", itemSelect);
	itemSelect.style.width = "135px";
	
	//Repopulate pulldown of items.
	function setupItemMenu()
	{
		//Remove children to switch between shops.
		while (itemSelect.lastChild)
		{
			itemSelect.removeChild(itemSelect.lastChild);
		}
		
		//Set default text.
		var option = document.createElement("option");
		option.text = "Select an item";
		itemSelect.appendChild(option);
		
		//Get list of items from shopList.js.
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
					//Retain item on shop change if sold there.
					if (localStorage.getItem("itemSelect" + userName) == option.value)
					{
						itemSelect.value = option.value;
					}
				}
			}
		}
	}
	
	//Reset item menu when shop changes.
	shopSelect.addEventListener("change", setupItemMenu);
	
	//Create div to hold Charisma level pulldown and unit price display.
	var rowCharismaUnit = document.createElement("div");
	shopCalcDiv.appendChild(rowCharismaUnit);
	rowCharismaUnit.style.clear = "both";
	
	//Create Charisma div.
	var charismaDiv = document.createElement("div");
	charismaDiv.style.display = "inline-block";
	rowCharismaUnit.appendChild(charismaDiv);
	
	//Create Charisma level label.
	var charismaLabel = makeElement("<label style='display: inline-block; width: 55px;'>Charisma: </label>");
	charismaDiv.appendChild(charismaLabel);
	
	//Create Charisma level pulldown.
	var charismaSelect = document.createElement("select");
	charismaDiv.appendChild(charismaSelect);
	charismaSelect.innerHTML = "<option value='0'>--</option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option>";
	charismaSelect.style.width = "45px";
	var charismaSelectParent = charismaSelect.parentElement;
	
	var unitLabel = makeElement("<label style='display: inline-block; width: 33px; text-align: right;'>Unit: </label>");
	rowCharismaUnit.appendChild(unitLabel);
	
	var unitPriceDiv = makeElement("<div style='display: inline-block; width: 55px; text-align: right;'></div>");
	rowCharismaUnit.appendChild(unitPriceDiv);
	
	var itemPriceDiv = document.createElement("div");
	shopCalcDiv.appendChild(itemPriceDiv);
	
	var quantityLabel = makeElement("<label style='display: inline-block; width: 55px;'>Quantity: </label>");
	itemPriceDiv.appendChild(quantityLabel);
	
	var itemQuantityEntry = makeElement("<input type='number' value='1' style='width: 40px;' min='1' max='999'/>");
	itemPriceDiv.appendChild(itemQuantityEntry);
	
	var totalLabel = makeElement("<div style='display: inline-block; width: 37px; text-align: right;'>Total: </div>");
	itemPriceDiv.appendChild(totalLabel);
	
	var totalPriceDiv = makeElement("<div style='display: inline-block; width: 55px; text-align: right;'></div>");
	itemPriceDiv.appendChild(totalPriceDiv);
	
	//Parses shopList.js for unit price based on shop and Charisma level.
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
	
	//Uses unit price and quantity desired to calculate total price and updates display.
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
	
	//Adds event listeners for changes to pulldowns.
	shopSelect.addEventListener("change", updateItemPrice);
	charismaSelect.addEventListener("change", updateItemPrice);
	itemSelect.addEventListener("change", updateItemPrice);
	itemQuantityEntry.addEventListener("input", updateItemPrice);
	
	//Retrieves shopSelect value from localStorage, if applicable, and adds event listener for changes.
	setIfNotNull(shopSelect, "shopSelect" + userName);
	shopSelect.addEventListener("change", function()
	{
		localStorage.setItem("shopSelect" + userName, shopSelect.value);
	});
	
	//Set up the item menu on page load, but after the shop is selected from localStorage:
	setupItemMenu();
	
	//Retrieves charismaSelect value from localStorage, if applicable, and adds event listener for changes.
	setIfNotNull(charismaSelect, "charismaSelect" + userName);
	charismaSelect.addEventListener("change", function()
	{
		localStorage.setItem("charismaSelect" + userName, charismaSelect.value);
	});
	
	//Retrieves itemSelect value from localStorage, if applicable, and adds event listener for changes.
	setIfNotNull(itemSelect, "itemSelect" + userName);
	itemSelect.addEventListener("change", function()
	{
		localStorage.setItem("itemSelect" + userName, itemSelect.value);
	});
	
	//Retrieves itemQuantityEntry value from localStorage, if applicable, and adds event listener for changes.
	setIfNotNull(itemQuantityEntry, "itemQuantityEntry" + userName);
	itemQuantityEntry.addEventListener("change", function()
	{
		localStorage.setItem("itemQuantityEntry" + userName, itemQuantityEntry.value);
	});
	
	//Creates a button for adding selected item to shopping cart.
	var addItemButton = document.createElement("button");
	addItemButton.innerHTML = "Add to cart";
	shopCalcDiv.appendChild(addItemButton);
	//Adds selected item to cart on click.
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
		
		window.alert("Added " + itemSelect.value + " x " + itemQuantityEntry.value + " to your shopping cart.");
		
		//Set locaLStorage for shoppingCart.
		localStorage.setItem("shoppingCart" + userName, shoppingCart.join(";"));
	});
	
	//Create contents of shopList.
	var shopListTab = document.createElement("div");
	tabPages.appendChild(shopListTab);
	shopListTab.id = "shoppingList";
	shopListTab.style.display = "none";
	
	var shopListDiv = document.createElement("div");
	
	var shopButtonsDiv = document.createElement("div");
	
	function displayShoppingCalc()
	{
		shopCalcDiv.insertBefore(shopAlignedMenu, shopCalcDiv.firstChild);
		rowCharismaUnit.insertBefore(charismaDiv, rowCharismaUnit.firstChild);
	}

	//Create button to clear contents of shopping cart.
	var clearCartButton = document.createElement("button");
	clearCartButton.innerHTML = "Clear cart";
	shopListDiv.appendChild(clearCartButton);
	clearCartButton.addEventListener("click", function(event)
	{
		localStorage.removeItem("shoppingCart" + userName);
		shoppingCart = [];

		displayShoppingList();

		window.alert("Deleted contents of your shopping cart.");
	});
	
	//Edit item in shopping cart.
	function editButtonClicked(button)
	{
		var itemDiv = button.parentElement;
		var itemName = itemDiv.childNodes[1].data;
		
		//Find selected item.
		for (var i = 0; i < shoppingCart.length; i++)
		{
			var itemInfo = shoppingCart[i].split(",");
			if (itemInfo[0] == itemName)
			{
				//Prompt for entry of new quantity.
				var newQuantity = prompt("Enter " + itemName + " quantity desired:", itemInfo[1]);
				newQuantity = parseInt(newQuantity);
				if (isNaN(newQuantity) || newQuantity < 0)
				{
					window.alert("Not a valid quantity. Please enter a positive number.")
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
		
		//Update localStorage.
		localStorage.setItem("shoppingCart" + userName, shoppingCart.join(";"));
		
		displayShoppingList();
	}
	
	//Delete item in shopping cart.
	function deleteButtonClicked(button)
	{
		var itemDiv = button.parentElement;
		var itemName = itemDiv.childNodes[1].data;
		
		//Find selected item.
		for (var i = 0; i < shoppingCart.length; i++)
		{
			var itemInfo = shoppingCart[i].split(",");
			if (itemInfo[0] == itemName)
			{
				shoppingCart.splice(i, 1);
				break;
			}
		}
		
		//Update localStorage.
		localStorage.setItem("shoppingCart" + userName, shoppingCart.join(";"));
		
		window.alert("Deleted " + itemName + " from your shopping cart.");

		displayShoppingList();
	}
	
	//Create button to edit item in shopping cart.
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
	
	//Create button to delete item in shopping cart.
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
	
	//Updates and displays shoppingList tab. TODO: refactor!
	function displayShoppingList()
	{
		shopListTab.appendChild(shopAlignedMenu);
		shopListTab.appendChild(charismaDiv);
		
		shopListTab.appendChild(shopListDiv);
		shopListTab.appendChild(clearCartButton);
		shopListTab.appendChild(shopButtonsDiv);
		
		shopListDiv.innerHTML = "";
		while (shopButtonsDiv.lastChild)
		{
			shopButtonsDiv.removeChild(shopButtonsDiv.lastChild);
		}
		
		if (shoppingCart.length == 0)
		{
			shopListDiv.innerHTML += "Your cart is as empty<br />as Ravenblack's soul.";
			clearCartButton.style.display = "none";
			return;
		}
		
		clearCartButton.style.display = "inline-block";

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
		
		shopListDiv.innerHTML += "<span class='box-subtitle'>Total: " + totalInCart + " coins</span><br />";
		
		shopListDiv.innerHTML += shoppingContentsDisplay;
	}
	
	var savedTab = localStorage.getItem("shopTab");
	if (savedTab == null) savedTab = "shoppingCalc";
	selectTab(savedTab);
}

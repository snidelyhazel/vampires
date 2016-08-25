//Welcome to the Ravenblack Navigator!

//	+ Keybinding

if (shouldSetUpNavigator)
{
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
		//If a number form is active, temporarily disable keybinding, i.e. changing quantity in shopping calc.
		if (document.activeElement.type && document.activeElement.type.toLowerCase() == "number") return;

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
		
		function pickUpItem()
		{
			var forms = document.getElementsByClassName("bq");
			for (var i = 0; i < forms.length; i++)
			{
				var form = forms[i];
				if (form.lastChild.value == "take")
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
			//Find anchor tag.
			var links = document.getElementsByTagName("a");
			for (var i = 0; i <links.length; i++)
			{
				var link = links[i];
				//For "drink" or "rob" actions.
				if (link.innerHTML == action) 
				{
					//Find vampire name in href target.
					var url = link.href;
					url = url.substring(url.indexOf("target=") + 7);
					var vampName = url.substring(0, url.indexOf("&"));
					
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
		
		function cycleLogins(direction)
		{
			var loginIndex = getLoginIndex(userName);
			loginIndex += direction;
			if (loginIndex < 0)
			{
				loginIndex = allLogins.length - 1;
			}
			else if (loginIndex >= allLogins.length)
			{
				loginIndex = 0;
			}
			setLogin(allLogins[loginIndex]);
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
			case 80: //p: pick up item
				pickUpItem(0);
				break;
			case 84: //t: scroll of turning
				doCommand("use", "0");
				break;
			case 89: //y: wooden stake
				doCommand("use", "64");
				break;
			case 85: //u: uv grenade
				doCommand("use", "66");
				break;
			case 77: //m: scroll of teleportation
				doCommand("use", "1");
				break;
			case 78: //n: scroll of displacement
				doCommand("use", "2");
				break;
			case 32: //spacebar: 
				window.location.href = "/blood.pl?target=extra-commands";
				break;
			case 38: //up arrow: 
				cycleLogins(-1);
				break;
			case 40: //down arrow: 
				cycleLogins(1);
				break;
			case 191: //slash: 
				if (window.location.href.indexOf("viewvamp") != -1)
				{
					window.location.href = window.location.href;
				}
				else
				{
					window.location.href = "/blood.pl";
				}
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


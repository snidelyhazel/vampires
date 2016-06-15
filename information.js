//Welcome to the Ravenblack Navigator!

// + Information

if (shouldSetUpNavigator)
{
	//Initialize hit-tracking.
	if (localStorage.getItem("hittracker" + userName) == null)
	{
		localStorage.setItem("hittracker" + userName, ""); 
	}

	function recordQuest(questName, questDescription, questDeadline)
	{
		localStorage.setItem("quest" + userName, questName);
		localStorage.setItem("questDescription" + userName, questDescription);
		localStorage.setItem("questDeadline" + userName, questDeadline);
	}
	
	function extractInBetween(fullText, beforeText, afterText)
	{
		return fullText.substring(fullText.indexOf(beforeText) + beforeText.length, fullText.indexOf(afterText));
	}

	function parseNumbers(numberString)
	{
		if (isNaN(numberString))
		{
			switch (numberString)
			{
				case "one": return 1;
				case "two": return 2;
				case "three": return 3;
				case "four": return 4;
				case "five": return 5;
				case "six": return 6;
				case "seven": return 7;
				case "eight": return 8;
				case "nine": return 9;
				case "ten": return 10;
			}
		}
		else
		{
			return parseInt(numberString);
		}
	}

	function parseDuration(durationString)
	{
		var secondLength = 1000;
		var minuteLength = secondLength * 60;
		var hourLength = minuteLength * 60;
		var dayLength = hourLength * 24;

		//Get units of time within duration.
		var durationParts = durationString.split(", ");
		var duration = 0;
		
		for (var j = 0; j < durationParts.length; j++)
		{
			var part = durationParts[j];

			//Get numeric values associated with units of time.
			var tokens = part.split(" ");

			//Convert units of time to milliseconds and sum.
			if (part.includes("minute"))
			{
				duration += parseNumbers(tokens[0]) * minuteLength;
			}
			else if (part.includes("hour"))
			{
				duration += parseNumbers(tokens[0]) * hourLength;
			}
			else if (part.includes("day"))
			{
				duration += parseNumbers(tokens[0]) * dayLength;
			}
		}

		return duration;
	}

	
	//Store hit-tracking.
	//TO-DO: comment more!
	function parseMessage(element, dealtIt)
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
		
		if (dealtIt)
		{
			for (var i = 0; i < quests.length; i++)
			{
				var quest = quests[i];
				var startCues = quest.startCue;
				for (var j = 0; j < startCues.length; j++)
				{
					var startCue = startCues[j];
					if (message.includes(startCue))
					{
						// TODO: Start quest!
						console.log("Started quest! ");

						var description = "";
						switch (quest.name)
						{
							case "Celerity":
								description = "collect " + extractInBetween(message, "a series of ", " objects from") + " items, travel--no transits--to " + extractInBetween(message, "<i>Run</i> to ", ", and buy a drink") + " and buy a drink.";
								break;
							case "Charisma":
								description = "persuade " + extractInBetween(message, "Persuade ", " prestigious vampires") + " vampires with 500+ blood to visit " + extractInBetween(message, "to visit ", " there and") + " and say \"" + extractInBetween(message, "tell the bartender '", "'. You have ") + "\", without visiting the pub yourself.";
								break;
							case "Locate":
								description = "go to the NW corner of " + extractInBetween(message, "the corner of ", " and say '") + " and say \"Check-Point\", ensuring you have 10 blood to spare.";
								break;
							case "Stamina":
								description = "go to the NW corner of " + extractInBetween(message, "the corner of ", " and say '") + " and say \"" + extractInBetween(message, "and say '", "'. Be sure to") + "\", ensuring you have " + extractInBetween(message, "cost you ", ". You have") + " blood.";
								break;
							case "Perception":
								description = "find and kill a vampire hunter.";
								break;
							case "Suction":
								description = "drink from 20 vampires whose blood is higher than yours.";
								break;
						}

						recordQuest(quest.name, description, Date.now() + quest.days * 24 * 60 * 60 * 1000);
					}
				}
			}
		}
		
		if (message.indexOf(" coin") != -1)
		{
			var robString = message.substring(0, message.indexOf(" coin"));
			robString = robString.substring(robString.lastIndexOf(" ")+1);
			var robAmount = (robString == "one") ? 1 : parseNumbers(robString);
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
			parseMessage(child, true);
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
			parseMessage(child, false);
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
	
	
	
	//Find powers.
	for (var i = 0; i < forms.length; i++)
	{
		var form = forms[i];
		if (form.action.value == "learn")
		{
			var powerName = form.target.value;
			
			//console.log("found power: " + powerName);
		}
	}
}
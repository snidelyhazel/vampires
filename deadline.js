if (shouldSetUpNavigator)
{

	//Pull from My Vampire page.
	//TO-DO: comment more!
	if (isMyVampView)
	{
		var secondLength = 1000;
		var minuteLength = secondLength * 60;
		var hourLength = minuteLength * 60;
		var dayLength = hourLength * 24;
		
		//TODO: Convert "one day", "two days" etc to durations.
		//Isolate days/hours/minutes
		//Make sure it doesn't break if we don't have days
		
		
		var foundQuest = false;
		
		
		for (var i = 0; i < borderDiv.childNodes.length; i++)
		{			
			var child = borderDiv.childNodes[i];

			if (child.nodeName == "#text" && child.data.indexOf("Quest: ") != -1)
			{
				var questString = child.data;
				var quest = questString.substring(questString.indexOf("Quest: ") + 7);
				//Remove . after deadline.
				quest = quest.substring(0, quest.lastIndexOf("."));
				//Remove deadline info.
				quest = quest.substring(0, quest.lastIndexOf(".") + 1);
				var deadline = questString.substring(questString.indexOf(".") + 2, questString.length - 1);
				console.log(deadline);
				
				
				var deadlineParts = deadline.split(", ");
				var questLength = 0;
				for (var j = 0; j < deadlineParts.length; j++)
				{
					var part = deadlineParts[j];
					var tokens = part.split(" ");
					if (part.includes("minute"))
					{
						questLength += parseInt(tokens[0]) * minuteLength;
					}
					else if (part.includes("hour"))
					{
						questLength += parseInt(tokens[0]) * hourLength;
					}
					else if (part.includes("day"))
					{
						var days = 0;
						switch (tokens[0])
						{
							case "one": days = 1; break;
							case "two": days = 2; break;
							case "three": days = 3; break;
							case "four": days = 4; break;
							case "five": days = 5; break;
							case "six": days = 6; break;
							case "seven": days = 7; break;
							case "eight": days = 8; break;
							case "nine": days = 9; break;
							case "ten": days = 10; break;
						}
						questLength += days * dayLength;
					}
				}
				
				localStorage.setItem("quest" + userName, quest);
				localStorage.setItem("deadline" + userName, Date.now() + questLength);
				
				foundQuest = true;

			}
		}

		if (foundQuest)
		{
			var currentDate = new Date();
			
			
			var deadlineDate = new Date(parseInt(localStorage.getItem("deadline" + userName)));
			
			//Current hour, in 24-hour time.
			var hours = currentDate.getHours();
			//Current minutes, if <10 one digit.
			var minutes = currentDate.getMinutes();
			if (minutes < 10)
			{
				minutes = "0" + minutes;
			}
			
			console.log(hours + ":" + minutes);
			

			//Current month, where January is 1 (instead of 0, the default).
			var month = deadlineDate.getMonth() + 1;
			//Current day of the month.
			var day = deadlineDate.getDate();
			console.log("Deadline: " + month + "/" + day);

			
			//
		}
			
	}
}
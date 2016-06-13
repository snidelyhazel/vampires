//Welcome to the Ravenblack Navigator!

// + Hit-tracker

if (shouldSetUpNavigator)
{
	var hitTrackerBox = document.createElement("div");
	leftSideDiv.appendChild(hitTrackerBox);
	hitTrackerBox.className = "border-box";
	//hitTrackerBox.style.fontSize = "1%";
	
	var hitTrackerTitle = document.createElement("div");
	hitTrackerTitle.innerHTML = "<span class='box-title'>Hit tracker: </span><br />";
	hitTrackerBox.appendChild(hitTrackerTitle);	
	
	//Select all hit-tracking button.
	var selectHitsButton = document.createElement("button");
	hitTrackerBox.appendChild(selectHitsButton);
	selectHitsButton.innerHTML = "Select All";
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
	
	//Clear hit-tracking button.
	var clearHitsButton = document.createElement("button");
	hitTrackerBox.appendChild(clearHitsButton);
	clearHitsButton.innerHTML = "Clear All";
	//clearHitsButton.style.bottom = "0px";
	clearHitsButton.addEventListener("click", function(event)
	{
		localStorage.setItem("hittracker" + userName, "");
		scrollingDiv.innerHTML = "";
	});
	
	//Insert contents of localStorage into div.
	var scrollingDiv = document.createElement("div");
	hitTrackerBox.appendChild(scrollingDiv);
	//Constrain dimensions of div container.
	scrollingDiv.style.width = "136px";
	scrollingDiv.style.height = "130px";
	//Control overflow by scrolling.
	scrollingDiv.style.overflowY = "auto";
	leftSideDiv.appendChild(document.createElement("br"));
	
	scrollingDiv.innerHTML = localStorage.getItem("hittracker" + userName);
	scrollingDiv.scrollTop = scrollingDiv.scrollHeight;
}

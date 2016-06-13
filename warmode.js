//Welcome to the Ravenblack Navigator!

//	+ War mode

//TODO: Consider creating the corresponding options checkboxes in this file.

if (shouldSetUpNavigator)
{
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
}

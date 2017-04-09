
var powers =
[
	{name: "Celerity",   hasQuest:  true, hasLevels:  true, prices: [4000, 8000, 17500], gainCue: null},
	{name: "Charisma",   hasQuest:  true, hasLevels:  true, prices: [1000, 3000, 5000],  gainCue: null},
	{name: "Locate",     hasQuest:  true, hasLevels:  true, prices: [1500, 4000, 15000], gainCue: null},
	{name: "Perception", hasQuest:  true, hasLevels: false, prices: [7500],              gainCue: null},
	{name: "Shadows",    hasQuest: false, hasLevels:  true, prices: [1000, 2000, 4000],  gainCue: "You acquire a level of power SHADOWS."},
	{name: "Stamina",    hasQuest:  true, hasLevels:  true, prices: [1000, 2500, 5000],  gainCue: null},
	{name: "Suction",    hasQuest:  true, hasLevels: false, prices: [7500],              gainCue: null},
	{name: "Surprise",   hasQuest: false, hasLevels: false, prices: [20000],             gainCue: "You acquire a level of power SURPRISE."},
	{name: "Telepathy",  hasQuest: false, hasLevels:  true, prices: [2500, 5000, 10000], gainCue: "Intensive training, lasting several hours, leaves you feeling very tired."},
	{name: "Thievery",   hasQuest: false, hasLevels:  true, prices: [2000, 5000, 10000], gainCue: "You acquire a level of power THIEVERY."},
];

var quests =
[
	{name: "Celerity",   levels: 3, legs: [3, 6, 12], days:  3, 
		startCue: ["To gain a level of CELERITY"], 
		stepCue: "He tells you now must run to", 
		endCue: "You feel something brush past your pocket.", 
		descriptionCue: "order blood from"},
	{name: "Charisma",   levels: 3, legs: [1, 1, 1], days: 10, 
		startCue: ["The Allurists Guild informs you that business near"], 
		stepCue: null, 
		endCue: "You feel a rush of confidence course through your body.", 
		descriptionCue: "persuade"},
	{name: "Locate",     levels: 3, legs: [4, 4, 4], days:  5, 
		startCue: ["To gain a level of LOCATE", "To gain another level of LOCATE", "To complete your LOCATE ability"], 
		stepCue: "Next you must say 'Check-Point'", 
		endCue: "looks enlightened", 
		descriptionCue: "say 'Check-Point'"},
	{name: "Perception", levels: 1, legs: [1],       days: 10, 
		startCue: ["To gain PERCEPTION"], 
		stepCue: null, 
		endCue: "You feel as if a veil has been lifted", 
		descriptionCue: "Find and kill"},
	{name: "Stamina",    levels: 3, legs: [1, 1, 1], days: 10, 
		startCue: ["To gain a level of STAMINA"], 
		stepCue: null, 
		endCue: "Shadowy figures burst from the darkness all around.", 
		descriptionCue: "say '"},
	{name: "Suction",    levels: 1, legs: [20],      days:  3, 
		startCue: ["To gain a level of SUCTION"], 
		stepCue: "You drain much more blood than you usually could", 
		endCue: "The bag is finally full.", 
		descriptionCue: ""},
];

var locateLocations =
[
	["Aardvark and 1st", "Aardvark and 100th", "Zestless and 100th", "Zestless and 1st"],
	["Aardvark and 50th", "Zestless and 50th", "Zelkova and 1st", "Zelkova and 100th"],
	["Sycamore and 38th", "Sycamore and 63rd", "Gypsum and 63rd", "Gypsum and 38th"],
]
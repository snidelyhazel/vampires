
var shopList = [
	{name: "Discount",   shops: ["Discount Magic", "Discount Potions", "Discount Scrolls"]},
	{name: "Magic",      shops: ["Dark Desires", "Interesting Times", "Sparks", "The Magic Box", "White Light"]},
	{name: "Potion",     shops: ["McPotions", "Potable Potions", "Potion Distillery", "Potionworks", "Silver Apothecary", "The Potion Shoppe"]},
	{name: "Scroll",     shops: ["Herman's Scrolls", "Paper and Scrolls", "Scrollmania", "Scrolls 'n' Stuff", "Scrolls R Us", "Scrollworks", "Ye Olde Scrolles"]},
	{name: "Stationary", shops: ["Eternal Aubade of Mystical Treasures", "The Cloister of Secrets"]},
	{name: "Lair",       shops: ["Grotto of Deceptions", "NightWatch Headquarters", "The Ixora Estate", "The White House"]},
];

var itemList = [
	{name: "Discount Magic", items: [
		{name: "Perfect Dandelion",       prices: [35, 33, 32, 31]},
		{name: "Sprint Potion",           prices: [105, 101, 97, 94]},
		{name: "Perfect Red Rose",        prices: [350, 339, 325, 315]},
		{name: "Scroll of Turning",       prices: [350, 339, 325, 315]},
		{name: "Scroll of Succour",       prices: [525, 509, 488, 472]},
		{name: "Scroll of Bondage",       prices: [637, 617, 592, 573]},
		{name: "Garlic Spray",            prices: [700, 678, 651, 630]},
		{name: "Scroll of Displacement",  prices: [700, 678, 651, 630]},
		{name: "Perfect Black Orchid",    prices: [795, 772, 740, 716]},
		{name: "Scroll of Summoning",     prices: [1050, 1018, 976, 945]},
		{name: "Vial of Holy Water",      prices: [1400, 1357, 1302, 1260]},
		{name: "Wooden Stake",            prices: [2800, 2715, 2604, 2520]},
		{name: "Scroll of Accounting",    prices: [3500, 3394, 3255, 3150]},
		{name: "Scroll of Teleportation", prices: [3500, 3394, 3255, 3150]},
		{name: "UV Grenade",              prices: [3500, 3394, 3255, 3150]},
		{name: "Ring of Resistance",      prices: [14000, 13579, 13020, 12600]},
		{name: "Diamond Ring",            prices: [70000, 67900, 65100, 63000]},
	]},
	{name: "Discount Potions", items: [
		{name: "Sprint Potion",           prices: [105, 101, 97, 94]},
		{name: "Garlic Spray",            prices: [700, 678, 651, 630]},
		{name: "Vial of Holy Water",      prices: [1400, 1357, 1302, 1260]},
		{name: "Blood Potion",            prices: [30000]},
		{name: "Necromancer",             prices: [25]},
	]},
	{name: "Discount Scrolls", items: [
		{name: "Scroll of Turning",       prices: [350, 339, 325, 315]},
		{name: "Scroll of Succour",       prices: [525, 509, 488, 472]},
		{name: "Scroll of Displacement",  prices: [700, 678, 651, 630]},
		{name: "Scroll of Summoning",     prices: [1050, 1018, 976, 945]},
		{name: "Scroll of Accounting",    prices: [3500, 3394, 3255, 3150]},
		{name: "Scroll of Teleportation", prices: [3500, 3394, 3255, 3150]},
	]},
	{name: "Dark Desires", items: [
		{name: "Perfect Dandelion",       prices: [50, 48, 46, 45]},
		{name: "Sprint Potion",           prices: [150, 145, 139, 135]},
		{name: "Perfect Red Rose",        prices: [500, 485, 465, 450]},
		{name: "Scroll of Turning",       prices: [500, 485, 465, 450]},
		{name: "Scroll of Succour",       prices: [750, 727, 697, 675]},
		{name: "Scroll of Bondage",       prices: [910, 882, 846, 819]},
		{name: "Garlic Spray",            prices: [1000, 970, 930, 900]},
		{name: "Scroll of Displacement",  prices: [1000, 970, 930, 900]},
		{name: "Perfect Black Orchid",    prices: [1137, 1102, 1057, 1023]},
		{name: "Scroll of Summoning",     prices: [1500, 1455, 1395, 1350]},
		{name: "Vial of Holy Water",      prices: [2000, 1940, 1860, 1800]},
		{name: "Wooden Stake",            prices: [4000, 3880, 3720, 3600]},
		{name: "Scroll of Accounting",    prices: [5000, 4850, 4650, 4500]},
		{name: "Scroll of Teleportation", prices: [5000, 4850, 4650, 4500]},
		{name: "UV Grenade",              prices: [5000, 4850, 4650, 4500]},
		{name: "Ring of Resistance",      prices: [20000, 19400, 18600, 18000]},
		{name: "Diamond Ring",            prices: [100000, 97000, 93000, 90000]},
	]},
	{name: "Interesting Times", items: [
		{name: "Perfect Dandelion",       prices: [50, 48, 46, 45]},
		{name: "Sprint Potion",           prices: [150, 145, 139, 135]},
		{name: "Perfect Red Rose",        prices: [500, 485, 465, 450]},
		{name: "Scroll of Turning",       prices: [500, 485, 465, 450]},
		{name: "Scroll of Succour",       prices: [750, 727, 697, 675]},
		{name: "Scroll of Bondage",       prices: [910, 882, 846, 819]},
		{name: "Garlic Spray",            prices: [1000, 970, 930, 900]},
		{name: "Scroll of Displacement",  prices: [1000, 970, 930, 900]},
		{name: "Perfect Black Orchid",    prices: [1137, 1102, 1057, 1023]},
		{name: "Scroll of Summoning",     prices: [1500, 1455, 1395, 1350]},
		{name: "Vial of Holy Water",      prices: [2000, 1940, 1860, 1800]},
		{name: "Wooden Stake",            prices: [4000, 3880, 3720, 3600]},
		{name: "Scroll of Accounting",    prices: [5000, 4850, 4650, 4500]},
		{name: "Scroll of Teleportation", prices: [5000, 4850, 4650, 4500]},
		{name: "UV Grenade",              prices: [5000, 4850, 4650, 4500]},
		{name: "Ring of Resistance",      prices: [20000, 19400, 18600, 18000]},
		{name: "Diamond Ring",            prices: [100000, 97000, 93000, 90000]},
	]},
	{name: "Sparks", items: [
		{name: "Perfect Dandelion",       prices: [50, 48, 46, 45]},
		{name: "Sprint Potion",           prices: [150, 145, 139, 135]},
		{name: "Perfect Red Rose",        prices: [500, 485, 465, 450]},
		{name: "Scroll of Turning",       prices: [500, 485, 465, 450]},
		{name: "Scroll of Succour",       prices: [750, 727, 697, 675]},
		{name: "Scroll of Bondage",       prices: [910, 882, 846, 819]},
		{name: "Garlic Spray",            prices: [1000, 970, 930, 900]},
		{name: "Scroll of Displacement",  prices: [1000, 970, 930, 900]},
		{name: "Perfect Black Orchid",    prices: [1137, 1102, 1057, 1023]},
		{name: "Scroll of Summoning",     prices: [1500, 1455, 1395, 1350]},
		{name: "Vial of Holy Water",      prices: [2000, 1940, 1860, 1800]},
		{name: "Wooden Stake",            prices: [4000, 3880, 3720, 3600]},
		{name: "Scroll of Accounting",    prices: [5000, 4850, 4650, 4500]},
		{name: "Scroll of Teleportation", prices: [5000, 4850, 4650, 4500]},
		{name: "UV Grenade",              prices: [5000, 4850, 4650, 4500]},
		{name: "Ring of Resistance",      prices: [20000, 19400, 18600, 18000]},
		{name: "Diamond Ring",            prices: [100000, 97000, 93000, 90000]},
	]},
	{name: "The Magic Box", items: [
		{name: "Perfect Dandelion",       prices: [50, 48, 46, 45]},
		{name: "Sprint Potion",           prices: [150, 145, 139, 135]},
		{name: "Perfect Red Rose",        prices: [500, 485, 465, 450]},
		{name: "Scroll of Turning",       prices: [500, 485, 465, 450]},
		{name: "Scroll of Succour",       prices: [750, 727, 697, 675]},
		{name: "Scroll of Bondage",       prices: [910, 882, 846, 819]},
		{name: "Garlic Spray",            prices: [1000, 970, 930, 900]},
		{name: "Scroll of Displacement",  prices: [1000, 970, 930, 900]},
		{name: "Perfect Black Orchid",    prices: [1137, 1102, 1057, 1023]},
		{name: "Scroll of Summoning",     prices: [1500, 1455, 1395, 1350]},
		{name: "Vial of Holy Water",      prices: [2000, 1940, 1860, 1800]},
		{name: "Wooden Stake",            prices: [4000, 3880, 3720, 3600]},
		{name: "Scroll of Accounting",    prices: [5000, 4850, 4650, 4500]},
		{name: "Scroll of Teleportation", prices: [5000, 4850, 4650, 4500]},
		{name: "UV Grenade",              prices: [5000, 4850, 4650, 4500]},
		{name: "Ring of Resistance",      prices: [20000, 19400, 18600, 18000]},
		{name: "Diamond Ring",            prices: [100000, 97000, 93000, 90000]},
	]},
	{name: "White Light", items: [
		{name: "Perfect Dandelion",       prices: [50, 48, 46, 45]},
		{name: "Sprint Potion",           prices: [150, 145, 139, 135]},
		{name: "Perfect Red Rose",        prices: [500, 485, 465, 450]},
		{name: "Scroll of Turning",       prices: [500, 485, 465, 450]},
		{name: "Scroll of Succour",       prices: [750, 727, 697, 675]},
		{name: "Scroll of Bondage",       prices: [910, 882, 846, 819]},
		{name: "Garlic Spray",            prices: [1000, 970, 930, 900]},
		{name: "Scroll of Displacement",  prices: [1000, 970, 930, 900]},
		{name: "Perfect Black Orchid",    prices: [1137, 1102, 1057, 1023]},
		{name: "Scroll of Summoning",     prices: [1500, 1455, 1395, 1350]},
		{name: "Vial of Holy Water",      prices: [2000, 1940, 1860, 1800]},
		{name: "Wooden Stake",            prices: [4000, 3880, 3720, 3600]},
		{name: "Scroll of Accounting",    prices: [5000, 4850, 4650, 4500]},
		{name: "Scroll of Teleportation", prices: [5000, 4850, 4650, 4500]},
		{name: "UV Grenade",              prices: [5000, 4850, 4650, 4500]},
		{name: "Ring of Resistance",      prices: [20000, 19400, 18600, 18000]},
		{name: "Diamond Ring",            prices: [100000, 97000, 93000, 90000]},
	]},
	{name: "McPotions", items: [
		{name: "Sprint Potion",           prices: [150, 145, 139, 135]},
		{name: "Garlic Spray",            prices: [1000, 970, 930, 900]},
		{name: "Vial of Holy Water",      prices: [2000, 1940, 1860, 1800]},
		{name: "Blood Potion",           prices: [30000]},
		{name: "Necromancer",             prices: [25]},
	]},
	{name: "Potable Potions", items: [
		{name: "Sprint Potion",           prices: [150, 145, 139, 135]},
		{name: "Garlic Spray",            prices: [1000, 970, 930, 900]},
		{name: "Vial of Holy Water",      prices: [2000, 1940, 1860, 1800]},
		{name: "Blood Potion",           prices: [30000]},
		{name: "Necromancer",             prices: [25]},
	]},
	{name: "Potion Distillery", items: [
		{name: "Sprint Potion",           prices: [150, 145, 139, 135]},
		{name: "Garlic Spray",            prices: [1000, 970, 930, 900]},
		{name: "Vial of Holy Water",      prices: [2000, 1940, 1860, 1800]},
		{name: "Blood Potion",           prices: [30000]},
		{name: "Necromancer",             prices: [25]},
	]},
	{name: "Potionworks", items: [
		{name: "Sprint Potion",           prices: [150, 145, 139, 135]},
		{name: "Garlic Spray",            prices: [1000, 970, 930, 900]},
		{name: "Vial of Holy Water",      prices: [2000, 1940, 1860, 1800]},
		{name: "Blood Potion",           prices: [30000]},
		{name: "Necromancer",             prices: [25]},
	]},
	{name: "Silver Apothecary", items: [
		{name: "Sprint Potion",           prices: [150, 145, 139, 135]},
		{name: "Garlic Spray",            prices: [1000, 970, 930, 900]},
		{name: "Vial of Holy Water",      prices: [2000, 1940, 1860, 1800]},
		{name: "Blood Potion",            prices: [30000]},
		{name: "Perfect Dandelion",       prices: [50, 48, 46, 45]},
		{name: "Perfect Red Rose",        prices: [500, 485, 465, 450]},
		{name: "Perfect Black Orchid",    prices: [1137, 1102, 1057, 1023]},
		{name: "Diamond Ring",            prices: [100000, 97000, 93000, 90000]},
		{name: "Necromancer",             prices: [25]},
	]},
	{name: "The Potion Shoppe", items: [
		{name: "Sprint Potion",           prices: [150, 145, 139, 135]},
		{name: "Garlic Spray",            prices: [1000, 970, 930, 900]},
		{name: "Vial of Holy Water",      prices: [2000, 1940, 1860, 1800]},
		{name: "Blood Potion",           prices: [30000]},
		{name: "Necromancer",             prices: [25]},
	]},
	{name: "Herman's Scrolls", items: [
		{name: "Scroll of Turning",       prices: [500, 485, 465, 450]},
		{name: "Scroll of Succour",       prices: [750, 727, 697, 675]},
		{name: "Scroll of Displacement",  prices: [1000, 970, 930, 900]},
		{name: "Scroll of Summoning",     prices: [1500, 1455, 1395, 1350]},
		{name: "Scroll of Accounting",    prices: [5000, 4850, 4650, 4500]},
		{name: "Scroll of Teleportation", prices: [5000, 4850, 4650, 4500]},
	]},
	{name: "Paper and Scrolls", items: [
		{name: "Scroll of Turning",       prices: [500, 485, 465, 450]},
		{name: "Scroll of Succour",       prices: [750, 727, 697, 675]},
		{name: "Scroll of Displacement",  prices: [1000, 970, 930, 900]},
		{name: "Scroll of Summoning",     prices: [1500, 1455, 1395, 1350]},
		{name: "Scroll of Accounting",    prices: [5000, 4850, 4650, 4500]},
		{name: "Scroll of Teleportation", prices: [5000, 4850, 4650, 4500]},
	]},
	{name: "Scrollmania", items: [
		{name: "Scroll of Turning",       prices: [500, 485, 465, 450]},
		{name: "Scroll of Succour",       prices: [750, 727, 697, 675]},
		{name: "Scroll of Displacement",  prices: [1000, 970, 930, 900]},
		{name: "Scroll of Summoning",     prices: [1500, 1455, 1395, 1350]},
		{name: "Scroll of Accounting",    prices: [5000, 4850, 4650, 4500]},
		{name: "Scroll of Teleportation", prices: [5000, 4850, 4650, 4500]},
	]},
	{name: "Scrolls 'n' Stuff", items: [
		{name: "Scroll of Turning",       prices: [500, 485, 465, 450]},
		{name: "Scroll of Succour",       prices: [750, 727, 697, 675]},
		{name: "Scroll of Displacement",  prices: [1000, 970, 930, 900]},
		{name: "Scroll of Summoning",     prices: [1500, 1455, 1395, 1350]},
		{name: "Scroll of Accounting",    prices: [5000, 4850, 4650, 4500]},
		{name: "Scroll of Teleportation", prices: [5000, 4850, 4650, 4500]},
	]},
	{name: "Scrolls R Us", items: [
		{name: "Scroll of Turning",       prices: [500, 485, 465, 450]},
		{name: "Scroll of Succour",       prices: [750, 727, 697, 675]},
		{name: "Scroll of Displacement",  prices: [1000, 970, 930, 900]},
		{name: "Scroll of Summoning",     prices: [1500, 1455, 1395, 1350]},
		{name: "Scroll of Accounting",    prices: [5000, 4850, 4650, 4500]},
		{name: "Scroll of Teleportation", prices: [5000, 4850, 4650, 4500]},
	]},
	{name: "Scrollworks", items: [
		{name: "Scroll of Turning",       prices: [500, 485, 465, 450]},
		{name: "Scroll of Succour",       prices: [750, 727, 697, 675]},
		{name: "Scroll of Displacement",  prices: [1000, 970, 930, 900]},
		{name: "Scroll of Summoning",     prices: [1500, 1455, 1395, 1350]},
		{name: "Scroll of Accounting",    prices: [5000, 4850, 4650, 4500]},
		{name: "Scroll of Teleportation", prices: [5000, 4850, 4650, 4500]},
	]},
	{name: "Ye Olde Scrolles", items: [
		{name: "Scroll of Turning",       prices: [500, 485, 465, 450]},
		{name: "Scroll of Succour",       prices: [750, 727, 697, 675]},
		{name: "Scroll of Displacement",  prices: [1000, 970, 930, 900]},
		{name: "Scroll of Summoning",     prices: [1500, 1455, 1395, 1350]},
		{name: "Scroll of Accounting",    prices: [5000, 4850, 4650, 4500]},
		{name: "Scroll of Teleportation", prices: [5000, 4850, 4650, 4500]},
	]},
	{name: "Eternal Aubade of Mystical Treasures", items: [
		{name: "Perfect Dandelion",         prices: [55]},
		{name: "Sprint Potion",             prices: [165]},
		{name: "Perfect Red Rose",          prices: [550]},
		{name: "Scroll of Succour",         prices: [825]},
		{name: "Scroll of Bondage",         prices: [1001]},
		{name: "Perfect Black Orchid",      prices: [1250]},
		{name: "Gold Dawn to Dusk Tulip",   prices: [1500]},
		{name: "Wooden Stake",              prices: [4400]},
		{name: "Kitten",                    prices: [10000]},
		{name: "Wolf Pup",                  prices: [12500]},
		{name: "Dragon's Egg",              prices: [17499]},
		{name: "Silver Pocket Watch",       prices: [20000]},
		{name: "Crystal Music Box",         prices: [25000]},
		{name: "Blood Potion",              prices: [33000]},
		{name: "Hand Mirror of Truth",      prices: [35000]},
		{name: "Book of Spells",            prices: [44999]},
		{name: "Ritual Gown",               prices: [55000]},
		{name: "Silver Ruby Dagger",        prices: [65000]},
		{name: "Onyx Coffin",               prices: [75000]},
		{name: "Platinum Puzzle Rings",     prices: [115000]},
		{name: "Diamond Succubus Earrings", prices: [125000]},
	]},
	{name: "The Cloister of Secrets", items: [
		{name: "Perfect Dandelion",             prices: [55]},
		{name: "Perfect Red Rose",              prices: [550]},
		{name: "Perfect Black Orchid",          prices: [1250]},
		{name: "Safety Deposit Box Key",        prices: [11000]},
		{name: "Necklace with Locket",          prices: [55000]},
		{name: "Flask of Heinous Deceptions",   prices: [77000]},
		{name: "Amulet of Insidious Illusions", prices: [88000]},
		{name: "Golden Ring",                   prices: [99000]},
		{name: "Diamond Ring",                  prices: [110000]},
		{name: "Titanium-Platinum Ring",        prices: [110000]},
	]},
	{name: "Grotto of Deceptions", items: [
		{name: "Scroll of Turning",       prices: [550]},
		{name: "Scroll of Teleportation", prices: [5500]},
		{name: "Scroll of Displacement",  prices: [1100]},
		{name: "Scroll of Succour",       prices: [825]},
		{name: "Vial of Holy Water",      prices: [2200]},
		{name: "Garlic Spray",            prices: [1100]},
		{name: "Sprint Potion",           prices: [165]},
		{name: "Perfect Dandelion",       prices: [55]},
		{name: "Perfect Red Rose",        prices: [550]},
		{name: "Perfect Black Orchid",    prices: [1100]},
	]},
	{name: "NightWatch Headquarters", items: [
		{name: "Memorial Candle",  prices: [200]},
		{name: "Perfect Red Rose", prices: [550]},
	]},
	{name: "The Ixora Estate", items: [
		{name: "Perfect Ixora Cluster", prices: [550]},
		{name: "Perfect Dandelion",     prices: [55]},
		{name: "Perfect Black Orchid",  prices: [1100]},
		{name: "Perfect Red Rose",      prices: [550]},
	]},
	{name: "The White House", items: [
		{name: "Perfect Red Rose",     prices: [550]},
		{name: "Perfect Black Orchid", prices: [1250]},
		{name: "Pewter Celtic Cross",  prices: [10000]},
		{name: "Compass",              prices: [11999]},
		{name: "Pewter Tankard",       prices: [15000]},
	]},
];


/*
Discount
-Discount Magic 
-Discount Potions
-Discount Scrolls
Magic
-Dark Desires
-Interesting Times
-Sparks
-The Magic Box
-White Light
Potion
-McPotions
-Potable Potions
-Potion Distillery
-Potionworks
-Silver Apothecary
-The Potion Shoppe
Scroll
-Herman's Scrolls
-Paper and Scrolls
-Scrollmania
-Scrolls 'n' Stuff
-Scrolls R Us
-Scrollworks
-Ye Olde Scrolles
Stationary
-Eternal Aubade of Mystical Treasures
-The Cloister of Secrets
Lair
-Grotto of Deceptions
-NightWatch Headquarters
-The Ixora Estate
-The White House


*/

var itemsByNumber = [];

itemsByNumber[0] = "Scroll of Turning";
itemsByNumber[1] = "Scroll of Teleportation";
itemsByNumber[2] = "Scroll of Displacement";
itemsByNumber[3] = "Scroll of Succour";
itemsByNumber[4] = "Scroll of Accounting";
itemsByNumber[5] = "Scroll of Summoning";
itemsByNumber[6] = "Scroll of Bondage";

itemsByNumber[32] = "Vial of Holy Water";
itemsByNumber[33] = "Garlic Spray";
itemsByNumber[34] = "Sprint Potion";
itemsByNumber[35] = "Blood Potion" ;

itemsByNumber[64] = "Wooden Stake";
itemsByNumber[66] = "UV Grenade";

itemsByNumber[92] = "Diamond Ring";
itemsByNumber[93] = "Perfect Dandelion";
itemsByNumber[94] = "Perfect Black Orchid";
itemsByNumber[95] = "Perfect Red Rose";

itemsByNumber[98] = "Perfect Ixora Cluster";
itemsByNumber[99] = "Gold Dawn to Dusk Tulip";

itemsByNumber[93] = "Perfect Dandelion";

itemsByNumber[103] = "Dandelion";

itemsByNumber[113] = "Wilted Dandelion";

itemsByNumber[200] = "Necklace With Locket";
itemsByNumber[201] = "Golden Ring";
itemsByNumber[202] = "Amulet of Insidious Illusions";
itemsByNumber[203] = "Titanium-platinum ring";
itemsByNumber[204] = "Flask of Heinous Deceptions";
itemsByNumber[205] = "Safety deposit box key";

itemsByNumber[210] = "Kitten";
itemsByNumber[211] = "Crystal Music Box";
itemsByNumber[212] = "Silver Ruby Dagger";
itemsByNumber[213] = "Onyx Coffin";
itemsByNumber[214] = "Diamond Succubus Earrings";
itemsByNumber[215] = "Book of Spells";
itemsByNumber[216] = "Platinum Puzzle Rings";

itemsByNumber[220] = "Candy cane";
itemsByNumber[221] = "Chocolate Ghost";

itemsByNumber[225] = "Memorial Candle";

itemsByNumber[231] = "Wolf Pup";
itemsByNumber[232] = "Dragon's Egg";
itemsByNumber[233] = "Silver Pocket Watch";
itemsByNumber[234] = "Hand Mirror of Truth";
itemsByNumber[235] = "Ritual Gown";

itemsByNumber[237] = "Pewter Celtic Cross";
itemsByNumber[238] = "Compass";
itemsByNumber[239] = "Pewter Tankard";



/*
Drink numbers:
0 Human
1 Human (Vampire Hunter)
11 Scroll of Teleportation
12 Scroll of Displacement
42 Holy Water
43 Garlic Spray
100 bag of coins
103 Perfect Dandelion

add 10?
itemsByNumber[0] = "Scroll of Turning";
itemsByNumber[32] = "Vial of Holy Water";
*/


config_json = {
	"config": {
		"joinLongClasses": true,   //
		"joinBreakPeriod": true,   //
		"joinFreeSlots":   true,   //
	},

	"schedule": [
		{
			"day": "sat",
			"period": 2,

			// Content Style A
			// "course": "CSE 2103",
			// "lecturer": "BA",
			// "room": "201",
			// Content Style B
			"content": ["CSE 2103", "BA", "201"],

			"subtext": "",
			"type": "class",
			"length": 1,    // 1 for class, 3 for lab
			"classes": [],
			"id": null,
			// "style": "",
			// "substyle": "i",
		},
		{
			"day": "sat",
			"period": 3,
			"content": ["CSE 2101", "AYS", "201"],
		},
		{
			"day": "sat",
			"period": 4,
			"content": ["HUM 2113", "TK", "201"],
		},
		{
			"day": "sun",
			"period": 2,
			"length": 2,
			"content": ["CSE 2103", "BA", "203"],
		},
		{
			"day": "wed",
			"period": 1,
			"content": ["Math 2113", "MAH", "201"],
		},
		// {
		// 	"day": "wed",
		// 	"period": 7,
		// 	"content": ["Math 2113", "SODA", "666"],
		// 	"subtext": "good luck",
		// 	"substyle": "bi"
		// }
	]
}


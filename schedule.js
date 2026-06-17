config_json = {
	"config": {
		"joinLongClasses": true,   //
		"joinBreakPeriod": true,   //
		"joinFreeSlots":   true,   //
	},
	
	"times": [
		{ "id": 1    ,   "label":  "8:00" },
		{ "id": 2    ,   "label":  "8:50" },
		{ "id": 3    ,   "label":  "9:40" },
		{ "id": "TB" ,   "label": "10:30",   "break": "Tiffin<br>Break" },
		{ "id": 4    ,   "label": "10:50" },
		{ "id": 5    ,   "label": "11:40" },
		{ "id": 6    ,   "label": "12:30" },
		{ "id": "LB" ,   "label":  "1:20",   "break": "Lunch<br>Break" },
		{ "id": 7    ,   "label":  "2:30" },
		{ "id": 8    ,   "label":  "3:20" },
		{ "id": 9    ,   "label":  "4:10" },
		{ "id": "END",   "label":  "5:00",   "break": "End" }
	],

	"days": [
		{"id": 1, "label": "SAT"},
		{"id": 2, "label": "SUN"},
		{"id": 3, "label": "MON"},
		{"id": 4, "label": "TUE"},
		{"id": 5, "label": "WED"}
	],

	"schedule": [
		{
			"day": "SAT",
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
			"day": "SAT",
			"period": 3,
			"content": ["CSE 2101", "AYS", "201"],
		},
		{
			"day": "SAT",
			"period": 4,
			"content": ["HUM 2113", "TK", "201"],
		},
		{
			"day": "SUN",
			"period": 2,
			"length": 2,
			"content": ["CSE 2103", "BA", "203"],
		},
		{
			"day": "WED",
			"period": 1,
			"content": ["Math 2113", "MAH", "201"],
		},
		// {
		// 	"day": "WED",
		// 	"period": 7,
		// 	"content": ["Math 2113", "SODA", "666"],
		// 	"subtext": "good luck",
		// 	"substyle": "bi"
		// }
	]
}


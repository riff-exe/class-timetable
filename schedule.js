config_json = {
	"config": {
		"joinLongClasses": true,
		"joinBreaks": true,
        "joinFreePeriods": true,
	},
	"schedule": [
		{
			"period": 2,
			"day": "SAT",

			// Content Style A
			"course": "CSE 2103",
			"lecturer": "BA",
			"room": "201",
			// Content Style B
			// "content": ["CSE 2103", "BA", "201"],

			"subtext": "",
			"type": "class",
			"length": 1,    // 1 for class, 3 for lab
			"classes": [],
			"id": null,
			"style": "r",
			"substyle": "i",
		},
		{
			"period": 3,
			"day": "SAT",
			"content": ["CSE 2101", "AYS", "201"],
		},
		{
			"period": 4,
			"day": "SAT",
			"content": ["HUM 2113", "TK", "201"],
		},
		{
			"period": 2,
			"day": "SUN",
			"length": 2,
			"content": ["CSE 2103", "BA", "203"],
		}
	]
}


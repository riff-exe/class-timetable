config_json = {
	"config": {
		"joinLongClasses": true,   //
		"joinBreaks": true,        //
        "joinFreePeriods": true,   //
	},

	"times": [
		[ 1    ,  "8:00"],
		[ 2    ,  "8:50"],
		[ 3    ,  "9:40"],
		[ "TB" , "10:30"],
		[ 4    , "10:50"],
		[ 5    , "11:40"],
		[ 6    , "12:30"],
		[ "LB" ,  "1:20"],
		[ 7    ,  "2:30"],
		[ 8    ,  "3:20"],
		[ 9    ,  "4:10"],
		[ "END",  "5:00"]
	],

	"days": [
		[0, "SAT"],
		[1, "SUN"],
		[2, "MON"],
		[3, "TUE"],
		[4, "WED"]
	],

	"schedule": [
		{
			"day": "SAT",
			"period": 2,

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
			"style": "",
			"substyle": "i",
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


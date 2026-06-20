const config_json = {
	"periods": [
		{ "key": 1    ,   "label":  "8:00-8:50" },
		{ "key": 2    ,   "label":  "8:50-9:40" },
		{ "key": 3    ,   "label":  "9:40-10:30" },
		{ "key": "TB" ,   "label": "10:30-10:50",   "spanAll": "Tiffin<br>Break" },
		{ "key": 4    ,   "label": "10:50-11:40" },
		{ "key": 5    ,   "label": "11:40-12:30" },
		{ "key": 6    ,   "label": "12:30-1:20" },
		{ "key": "LB" ,   "label":  "1:20-2:30",   "spanAll": "Lunch<br>Break" },
		{ "key": 7    ,   "label":  "2:30-3:20" },
		{ "key": 8    ,   "label":  "3:20-4:10" },
		{ "key": 9    ,   "label":  "4:10-5:00" },
	],
	"days": [
		{"key": "sat", "label": "SAT"},
		{"key": "sun", "label": "SUN"},
		{"key": "mon", "label": "MON"},
		{"key": "tue", "label": "TUE"},
		{"key": "wed", "label": "WED"}
	],
	"schedule": [
		// ----------- SAT ----------- //
		{
			"day"    : "SAT",
			"period" : 2,
			"content": ["EEE 1251", "AK", "103"],
		},
		{
			"day"    : "SAT",
			"period" : 3,
			"content": ["Phy 1213", "MMZ", "103"],
		},
		{
			"day"    : "SAT",
			"period" : 4,
			"content": ["Phy 1214", "AKZ+AAM", "Physics Lab", "Odd Week"],
			"type"   : "lab",
			"length" : 3,
		},
		{
			"day"    : "SAT",
			"period" : 7,
			"content": ["CSE 1202", "NIM", "OS Lab"],
			"type"   : "lab",
			"length" : 3,
		},

		// ----------- SUN ----------- //
		{
			"day"    : "SUN",
			"period" : 1,
			"content": ["CSE 1204", "SUZ/SA", "PG Lab"],
			"type"   : "lab",
			"length" : 3,
		},
		{
			"day"    : "SUN",
			"period" : 4,
			"content": ["Phy 1213", "AAM", "103"],
		},
		{
			"day"    : "SUN",
			"period" : 5,
			"content": ["Math 1213", "MSA", "103"],
		},

		// ----------- MON ----------- //
		{
			"day"    : "MON",
			"period" : 2,
			"content": ["Math 1213", "NEW", "203"],
		},
		{
			"day"    : "MON",
			"period" : 3,
			"content": ["Phy 1213", "AAM", "203"],
		},
		{
			"day"    : "MON",
			"period" : 4,
			"content": ["EEE 1251", "AK", "203"],
		},
		{
			"day"    : "MON",
			"period" : 5,
			"content": ["CSE 1201", "NIM", "203"],
			"length" : 2,
		},
		{
			"day"    : "MON",
			"period" : 7,
			"content": ["EEE 1252", "AK", "Electronics Lab East"],
			"type"   : "lab",
			"length" : 3,
		},

		// ----------- TUE ----------- //
		{
			"day"    : "TUE",
			"period" : 1,
			"content": ["CSE 1200", "MIT", "SW Lab", "Even Week"],
			"type"   : "lab",
			"length" : 3,
		},
		{
			"day"    : "TUE",
			"period" : 4,
			"content": ["CSE 1203", "SUZ/SA", "102"],
			"length" : 2,
		},
		{
			"day"    : "TUE",
			"period" : 6,
			"content": ["CSE 1201", "NIM", "102"],
		},

		// ----------- WED ----------- //
		{
			"day"    : "WED",
			"period" : 4,
			"content": ["EEE 1251", "AK", "101"],
		},
		{
			"day"    : "WED",
			"period" : 5,
			"content": ["CSE 1203", "SUZ/SA", "101"],
		},
		{
			"day"    : "WED",
			"period" : 6,
			"content": ["Math 1213", "MSA", "101"],
		},
	]
}


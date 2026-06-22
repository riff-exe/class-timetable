const config_json = {
	// ====== Defining the overall layout of the timetable ====== //
	/*
	 * "periods" defines all the columns in the timetable
	 * Breaks are defined and labeled by "spanAll"
	 */
	"periods": [
		{ "key": 1    ,   "label":  "8:00" },
		{ "key": 2    ,   "label":  "8:50" },
		{ "key": 3    ,   "label":  "9:40" },
		{ "key": "TB" ,   "label": "10:30",   "spanAll": "Tiffin<br>Break" },
		{ "key": 4    ,   "label": "10:50" },
		{ "key": 5    ,   "label": "11:40" },
		{ "key": 6    ,   "label": "12:30" },
		{ "key": "LB" ,   "label":  "1:20",   "spanAll": "Lunch<br>Break" },
		{ "key": 7    ,   "label":  "2:30" },
		{ "key": 8    ,   "label":  "3:20" },
		{ "key": "END",   "label":  "4:00",   "spanAll": "End" }
	],

	/*
	 * "days" defines all the rows in the timetable
	 */
	"days": [
		{"key": "sat", "label": "SAT"},
		{"key": "sun", "label": "SUN"},
		{"key": "mon", "label": "MON"},
		{"key": "tue", "label": "TUE"},
		{"key": "wed", "label": "WED"}
	],
	"schedule": [
		// ====== How to write your own schedule entries ====== //
		/* [REQUIRED PROPERTIES]
		 * "day"     : Must be a key from "days" (case insensitive)
		 * "period"  : Must be a key from "periods" (case insensitive)
		 *
		 * [OPTIONAL PROPERTIES]
		 * "content" : A list of strings or a string with newlines. Auto-creates classes 'card-label-<string>'
		 * "desc"    : A list of strings or a string with newlines. Doesn't auto-create any classes
		 * "length"  : Number of periods the entry/event occupies (default is 1)
		 * "type"    : Specify the type of event. Mostly useful for styling (default is "class")
		 * "classes" : List of custom CSS classes for better customization
		 * "id"      : CSS ID for customization
		 */

		// ----------- SAT ----------- //
		{
			"day"    : "SAT",
			"period" : 4,
			"content": ["CSE 2205", "SZM", "Seminar"],
		},
		{
			"day"    : "SAT",
			"period" : 5,
			"content": ["CSE 2203", "SA", "Seminar"],
			"length" : 2,
		},
		{
			"day"    : "SAT",
			"period" : 7,
			"content": ["CSE 2204", "SA", "OS Lab"],
			"type"   : "lab",
			"length" : 2,
		},

		// ----------- SUN ----------- //
		{
			"day"    : "SUN",
			"period" : 3,
			"content": ["CSE 2205", "SZM", "202"],
		},
		{
			"day"    : "SUN",
			"period" : 4,
			"content": ["Math 2213", "MBH", "202"],
		},
		{
			"day"    : "SUN",
			"period" : 5,
			"content": ["Hum 2213", "ABS", "202"],
		},
		{
			"day"    : "SUN",
			"period" : 6,
			"content": ["CSE 2201", "MIT/KZN", "202"],
		},
		{
			"day"    : "SUN",
			"period" : 7,
			"content": ["CSE 2206", "SZM", "ACL Lab"],
			"type"   : "lab",
			"length" : 2,
		},

		// ----------- MON ----------- //
		{
			"day"    : "MON",
			"period" : 4,
			"content": ["CSE 2202", "KZN", "OS Lab"],
			"type"   : "lab",
			"length" : 3,
		},
		{
			"day"    : "MON",
			"period" : 7,
			"content": ["CSE 2200", "NIM", "101"],
			"type"   : "lab",
			"length" : 2,
		},

		// ----------- TUE ----------- //
		{
			"day"    : "TUE",
			"period" : 4,
			"content": ["Hum 2213", "ABS", "103"],
		},
		{
			"day"    : "TUE",
			"period" : 5,
			"content": ["Math 2213", "MRK", "103"],
		},
		{
			"day"    : "TUE",
			"period" : 6,
			"content": ["CSE 2201", "KZN", "103"],
		},
		{
			"day"    : "TUE",
			"period" : 7,
			"content": ["CSE 2206 / CSE 2202", "SZM / MIT", "ACL Lab / NW Lab"],
			"type"   : "lab",
			"length" : 2,
		},

		// ----------- WED ----------- //
		{
			"day"    : "WED",
			"period" : 2,
			"content": ["Math 2213", "MRK", "102"],
		},
		{
			"day"    : "WED",
			"period" : 3,
			"content": ["Hum 2213", "SI", "102"],
		},
		{
			"day"    : "WED",
			"period" : 4,
			"content": ["CSE 2201", "KZN", "102"],
		},
		{
			"day"    : "WED",
			"period" : 5,
			"content": ["CSE 2205", "SZM", "102"],
		},
		{
			"day"    : "WED",
			"period" : 6,
			"content": ["CSE 2203", "SA", "102"],
		},

	]
}


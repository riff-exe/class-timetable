// #######################################
// YOUR CUSTOMIZATIONS
// #######################################

const tableConfig = {
	"joinLongClasses": true,   //
	"joinBreakPeriod": true,   //
	"joinFreeSlots":   true,   //
};

const periodArray = [
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
	{ "key": 9    ,   "label":  "4:10" },
	{ "key": "END",   "label":  "5:00",   "spanAll": "End" }
];
const dayArray = [
	{"key": "sat", "label": "SAT"},
	{"key": "sun", "label": "SUN"},
	{"key": "mon", "label": "MON"},
	{"key": "tue", "label": "TUE"},
	{"key": "wed", "label": "WED"}
];





//! Remove soon
const breakPeriodArray = ["Tiffin<br>Break", "Lunch<br>Break", "End"];


// #######################################
// END OF CUSTOMIZATIONS
// #######################################


// TODO: 
// - Making the string inputs secure. Convert to "digestable" strings
// - 1st/2nd half indicator fast
// - Customizable Time and Date Labels and their table header with classes
// - 

const ERRMESSAGES = [];
function showError(msg) {
	// Saving the errors in the variables to display later after DOM loads
	ERRMESSAGES.push(msg);
	console.error(msg);
}


// ###################
// SOME PROCESSING
// ###################

const timeLabels = periodArray.map(period => period.label)
// const breakPeriodArray = periodArray
//     .filter(period => "spanAll" in period)
//     .map(period => period.spanAll);


// ###################
// ENTRIES & CONFIG
// ###################

class ScheduleEntry {
	constructor(entry) {
		// For better error messages
		this.primitive   = JSON.stringify(entry, null, 2);

		function wrapToList(property) {
			if (!property)                    return [];
			else if (Array.isArray(property)) return property;
			else                              return property.toString().split("\n");
		}


		/// ESSENTIAL PROPERTIES
		// Checking the period parameter
		if (!entry.period)        showError(`Missing property 'period':\n` + this.primitive);

		this.period = periodArray.findIndex(time => time.key === entry.period);
		if (this.period === -1)   showError(`Invalid property 'period':\n` + this.primitive);
		this.period = this.period - Math.floor(this.period/4); //! Safety net; remove


		// Checking the day parameter
		if (!entry.day)           showError(`Missing property 'day':\n`    + this.primitive);

		this.day = dayArray.findIndex(day => day.key === entry.day);
		if (this.day === -1)      showError(`Invalid property 'day':\n`    + this.primitive);

		this.content = wrapToList(entry.content)
		this.desc = wrapToList(entry.desc)


		/// OPTIONAL PROPERTIES
		// Default values are being set for each
		this.subtext     = entry.subtext     ?? "";
		this.type        = entry.type        ?? "class";
		this.type.toLowerCase();
		this.length      = entry.length      ?? ((this.type === "lab")? 3: 1);
		this.classes     = entry.classes     ?? [];
		this.id          = entry.id          ?? null;

		// showError(this.primitive);
	}
}

class TableData {
	/**
	 * If 'entry = null`, the object will represent a "free slot". 
	 * Then length will be required.
	 * @param {ScheduleEntry} entry
	 * @param {number} length
	 */
	constructor(entry, length = 1) {
		if (entry) {
			this.content    = curator(entry);
			this.type       = entry.type;
			this.length     = entry.length;
			this.classes    = [
				...entry.classes,
				// `course-${entry.course}`,
				// "lect-"+entry.lecturer,
				// `${entry.room}`,
			]; //! ugly
			this.id         = entry.id;
			this.primitive  = entry.primitive;
		} else {
			this.content    = "";
			this.type       = "free";
			this.length     = length;
			this.classes    = [];
			this.id         = null;
			this.primitive  = "";
		}
	}
}



// ###################
// CURATOR
// ###################

function convertToClassName(text) {
	// Example input: Math 2113
	// Output       : math-2113
	return text
		.trim()                         // Remove leading/trailing whitespace
		.toLowerCase()                  // Convert to lowercase
		.replace(/[^a-z0-9\s-]/g, '')   // Remove special characters
		.replace(/\s+/g, '-');          // Replace spaces with hyphen
}

//! Very faulty
function setStyle(text, style) {
	switch(style) {
		case "":                return text
		case "i":               return `<i>${text}</i>`;
		case "b":               return `<b>${text}</b>`;
		case "bi":case "ib":    return `<i><b>${text}</b></i>`;
		default:    throw new Error(`Invalid style ${style}`);
	}
}
/**
 * 
 * @param {ScheduleEntry} entry 
 * @returns string
 */
function curator(entry) {
	text = entry.content.join('<br>');
	subtext = "";
	if (entry.subtext) {
		txt = entry.subtext;
		txt = `<span class="subtext">${txt}</span>`;
		subtext = "<br>" + txt;
		// console.log(setStyle(text, entry.style) + subtext)
	}
	return text + subtext;
}



// ###################
// LOGGER
// ###################

/**
 * @param {TableData[][]} grid 
 * @param {ScheduleEntry} entry 
 */
function addToGrid(grid, entry) {
	let d = entry.day;
	let p = entry.period;
	let l = entry.length;

	function errPeriodOverlap(event_type) {
		if (event_type === "break") {
			showError(`An entry is overlapping with a break period:\n` + entry.primitive);
		} else {
			showError(`An entry is overlapping with another at 'day = ${entry.day}' and 'period = ${entry.period}':\n` + entry.primitive);
		}
	}


	// Checking for any tail from a previous event
	let i = 0;
	let t = 0;
	while (i < p) {
		if (grid[d][i]) t = grid[d][i].length;
		if (t > 0)      t--;
		i++;
	}
	if (t > 0) {
		// Entry is overlapping the tail from a previous event
		errPeriodOverlap("class");
	}

	// Overlapping a taken slot
	if (grid[d][p]) errPeriodOverlap(grid[d][i].type);
	t = l-1; i++;

	// Checking for the entry's tail to overlapping a pre-existing event
	while (t > 0) {
		if (grid[d][i]) errPeriodOverlap(grid[d][i].type);
		t--; i++;
	}

	// All good. Entry never overlapped
	grid[d][p] = new TableData(entry);
}



// ###################
// JOINER
// ###################

/**
 * @param {TableData[][]} grid
 */
function joiner(grid) {
	grid.forEach(row => {
		for (let i = 0; i < 3; i++) {
			let j = 0;
			while (j < 3) {
				while (row[3*i+j] && j < 3) {
					j += row[3*i+j].length;
				}
				if (j >= 3) break;
				
				let beg = 3*i+j; j++;
				while (!row[3*i+j] && j < 3) j++;
				
				row[beg] = new TableData(null, 3*i+j - beg);
			}
		}
	});
	return grid;
}



// ###################
// TABLER
// ###################

/**
 * @param {TableData} data 
 * @param {string} type Either "h" or "v". Must be lowercase
 */
function createTD(data, type) {
	const td = document.createElement("td");

	td.innerHTML = data.content;
	if (type === "h")   td.colSpan = data.length;
	else                td.rowSpan = data.length;

	["sche-"+data.type, ...data.classes].forEach(c => {
		td.classList.add(c);
	})
	if (data.id) td.id = data.id;
	return td;
}

/**
 * @param {TableData[][]} grid
 * @param {HTMLTableElement} tableElem 
 */
function tablerH(grid, tableElem) {
	tableElem.innerHTML = "";

	// Header Row
	const timeRow = document.createElement("tr");
	["Time", ...timeLabels].forEach(h => {
		const th = document.createElement("th");
		th.textContent = h;
		timeRow.appendChild(th);
	});
	tableElem.appendChild(timeRow);

	// First Row
	const firstRow = document.createElement("tr");
	let dayth = document.createElement("th");

	// let dayArray = dayArray.map(day => day.label);
	dayth.textContent = dayArray[0].label;
	firstRow.appendChild(dayth);

	let i = 0;
	while (i < 3) {
		let j = 0;
		while (j < 3) {
			let data = grid[0][3*i+j];
			firstRow.appendChild(createTD(data, "h"));
			j += data.length;
		}
		const breaktd = document.createElement("td")
		breaktd.innerHTML   = breakPeriodArray[i];
		breaktd.rowSpan     = grid.length;
		breaktd.classList.add("sche-break");
		
		firstRow.appendChild(breaktd);
		i++;
	}
	tableElem.appendChild(firstRow);

	// Rest of the rows
	let d = 1;
	while (d < grid.length) {
		const tr = document.createElement("tr");
		dayth = document.createElement("th");
		dayth.textContent = dayArray[d].label;
		tr.appendChild(dayth);

		let i = 0;
		while (i < 9) {
			let data = grid[d][i];
			tr.appendChild(createTD(data, "h"));
			i += data.length;
		}
		tableElem.appendChild(tr);
		d++;
	}
}
/**
 * @param {TableData[][]} grid
 * @param {HTMLTableElement} tableElem 
 */
function tablerV(grid, tableElem) {
	tableElem.innerHTML = "";

	// Header Row
	const dayRow = document.createElement("tr");
	["Time", ...dayArray.map(day => day.label)].forEach(h => {
		const th = document.createElement("th");
		th.textContent = h;
		dayRow.appendChild(th);
	});
	tableElem.appendChild(dayRow);

	// Rest of the rows
	let i = 0;
	while (i < 3) {
		let j = 0;
		while (j < 3) {
			// Time Header
			const tr = document.createElement("tr");
			const timeth = document.createElement("th");
			timeth.textContent = timeLabels[4*i+j];
			tr.appendChild(timeth);

			// Class Periods
			let d = 0;
			while (d < grid.length) {
				let data = grid[d][3*i+j];
				if (data != null) {
					tr.appendChild(createTD(data, "v"));
				}
				d++;
			}
			tableElem.appendChild(tr);
			j++;
		}
		// Time Header
		const breaktr = document.createElement("tr");
		const breaktimeth = document.createElement("th");
		breaktimeth.textContent = timeLabels[4*i+3];
		breaktr.appendChild(breaktimeth);

		// Break Periods
		const breaktd = document.createElement("td")
		breaktd.innerHTML   = breakPeriodArray[i];
		breaktd.colSpan     = grid.length;
		breaktd.classList.add("sche-break");
		
		breaktr.appendChild(breaktd);
		tableElem.appendChild(breaktr);
		i++;
	}
}




// ###################
// MAIN EVENT
// ###################

function createEmptyTable() {
	return Array(5).fill().map(() => Array(9).fill(null));
}

// Initialize
let mainGrid = createEmptyTable();

// Input entries from the .json file and add to the grid
config_json.schedule.forEach(entry => {
	addToGrid(mainGrid, new ScheduleEntry(entry));
});

console.log(JSON.stringify(mainGrid, null, 2));
// console.log(joiner(mainGrid));      // Create "free periods"

document.addEventListener("DOMContentLoaded", () => {
	// Display error messages
	if (ERRMESSAGES.length > 0) {
		const container = document.getElementById("error-container");
		if (container) {
			let err_header = `Your schedule.js has ${ERRMESSAGES.length} error(s)`
			let err_msgs   = ERRMESSAGES.join("\n" + "-".repeat(40) + "\n")
			container.innerHTML = `<span id="error-header">${err_header}</span>\n${err_msgs}`;
		}
	}

	// tablerH(mainGrid, document.getElementById("time-table-h"));
	// tablerV(mainGrid, document.getElementById("time-table-v"));
});


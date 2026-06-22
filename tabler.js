// #######################################
// YOUR CUSTOMIZATIONS
// #######################################

const tableConfig = {
	"joinLongClasses": true,   //
	"joinBreakPeriod": true,   //
	"joinFreeSlots":   true,   //
};

// const overridePeriods = [
// 	{ "key": 1    ,   "label":  "8:00" },
// 	{ "key": 2    ,   "label":  "8:50" },
// 	{ "key": 3    ,   "label":  "9:40" },
// 	{ "key": "TB" ,   "label": "10:30",   "spanAll": "Tiffin<br>Break" },
// 	{ "key": 4    ,   "label": "10:50" },
// 	{ "key": 5    ,   "label": "11:40" },
// 	{ "key": 6    ,   "label": "12:30" },
// 	{ "key": "LB" ,   "label":  "1:20",   "spanAll": "Lunch<br>Break" },
// 	{ "key": 7    ,   "label":  "2:30" },
// 	{ "key": 8    ,   "label":  "3:20" },
// 	{ "key": "END",   "label":  "4:00",   "spanAll": "End" }
// ];

// const overrideDays = [
// 	{"key": "sat", "label": "SAT"},
// 	{"key": "sun", "label": "SUN"},
// 	{"key": "mon", "label": "MON"},
// 	{"key": "tue", "label": "TUE"},
// 	{"key": "wed", "label": "WED"}
// ];



// #######################################
// END OF CUSTOMIZATIONS
// #######################################



// ###################
// SOME PROCESSING
// ###################

const dayArray    = (typeof overrideDays    !== "undefined")? overrideDays   : config_json.days;
const periodArray = (typeof overridePeriods !== "undefined")? overridePeriods: config_json.periods;

const TIMELABELS  = periodArray.map(period => period.label);
const DAYLABELS   = dayArray   .map(day    => day.label);
const CORNERHEAD  = "Time";


// ###################
// ENTRIES & CONFIG
// ###################

let ERRCOUNT = 0;
function showError(msg) {
	const container = document.getElementById("error-container");
	if (!container) console.error("'#error-container' is needed to display error messages");

	ERRCOUNT++;

	const header      = document.getElementById("error-header");
	const header_text = `Your schedule.js has ${ERRCOUNT} error(s)`;
	const spacer      = "\n" + "-".repeat(40) + "\n";
	if (!header) {
		// First error
		container.innerHTML = `<span id="error-header">${header_text}</span>\n`;
		container.innerHTML += msg;
	} else {
		// Later errors
		header.innerHTML = header_text;
		container.innerHTML += spacer + msg;
	}

	console.error(msg);
}



class ScheduleEntry {
	constructor(entry) {
		// For better error messages
		this.primitive   = JSON.stringify(entry, null, 2);
		this.valid       = false;

		function wrapToList(property) {
			if (!property)                    return [];
			else if (Array.isArray(property)) return property;
			else /*Split by '\n' or <br>*/    return String(property).split(/\n|<br\s*\/?>/i);
		}


		/// ESSENTIAL PROPERTIES
		// Checking the period parameter
		if (!entry.period)        return showError(`Missing property 'period':\n` + this.primitive);

		this.period = periodArray.findIndex(time => time.key === entry.period);
		if (this.period === -1)   return showError(`Invalid property 'period':\n` + this.primitive);


		// Checking the day parameter
		if (!entry.day)           return showError(`Missing property 'day':\n`    + this.primitive);

		this.day = dayArray.findIndex(day => day.key === entry.day.toLowerCase());
		if (this.day === -1)      return showError(`Invalid property 'day':\n`    + this.primitive);

		/// OPTIONAL PROPERTIES
		// Default values are being set for each

		/** @type {Array<string>} */
		this.content     = wrapToList(entry.content)
		/** @type {Array<string>} */
		this.desc        = wrapToList(entry.desc)

		this.type        = entry.type            ?? "class";
		this.type        = convertToClassName(this.type);

		this.length      = entry.length          ?? 1;
		if (!Number.isInteger(this.length) || this.length <= 0) {
			return showError(`Invalid property 'length'. ${this.length} is not a positive integer:\n` + this.primitive);
		}

		this.classes     = entry.classes         ?? [];
		if (!Array.isArray(this.classes) || !this.classes.every(item => typeof item === 'string')) {
			return showError(`Invalid property 'classes'. It must be a list of strings:\n` + this.primitive);
		}
		this.id          = entry.id              ?? null;
		this.valid       = true;

		// showError(this.primitive);
	}
}

class TableData {
	/**
	 * If 'entry = null`, the object will represent a "free slot". 
	 * Then length will be required.
	 * @param {ScheduleEntry | null} entry
	 * @param {number} length
	 */
	constructor(entry, length = 1) {
		if (entry) {
			this.content    = curator(entry);
			this.type       = entry.type;
			this.length     = entry.length;
			this.classes    = entry.classes;
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
	static createBreak(label) {
		const ins = new TableData(null, 1);
		ins.content         = label;
		ins.type            = "break";
		return ins
	}
}



// ###################
// CURATOR
// ###################

function convertToClassName(text) {
	// Example input: Math 2113
	// Output       : math-2113
	const res = text
		.trim()                          // Remove leading/trailing whitespace
		.toLowerCase()                   // Convert to lowercase
		.replace(/[^a-z0-9\s-]/g, '')    // Remove special characters
		.replace(/\s+/g, '-');           // Replace spaces with hyphen
	
	return /^-*$/.test(res) ? '' : res;  // Words with only spaces or special characters are returns as ""
}


/**
 * 
 * @param {ScheduleEntry} entry 
 * @returns string
 */
function curator(entry) {
	let res = "";
	const [title, ...contents] = entry.content;

	if (title) {
		let cls_name = convertToClassName(title);
		if (cls_name !== '') cls_name = 'card-label-' + cls_name;
		res += `<div class="card-title ${cls_name}">${title}</div>`;
	}
	
	contents.forEach(line => {
		let cls_name = convertToClassName(line);
		if (cls_name !== '') cls_name = 'card-label-' + cls_name;
		res += `<div class="card-content ${cls_name}">${line}</div>`;
	})

	entry.desc.forEach(line => {
		let cls_name = convertToClassName(line);
		cls_name = (cls_name === '') ? '' : ('card-label-' + cls_name);
		res += `<div class="card-desc ${cls_name}">${line}</div>`;
	})
	return res;
}



// ###################
// LOGGER
// ###################

/**
 * @param {TableData[][]} grid 
 * @param {ScheduleEntry} entry 
 */
function addToGrid(grid, entry) {
	if (!entry.valid) return;  // Ignore invalid entries

	let d   = entry.day;
	let p   = entry.period;
	let l   = entry.length;
	let day = grid[d];

	function errPeriodOverlap(event_type) {
		if (event_type === "break") {
			return showError(`An entry is overlapping with a break period:\n` + entry.primitive);
		} else {
			return showError(`An entry is overlapping with another at 'day = ${DAYLABELS[entry.day]}' and 'period = ${entry.period}':\n` + entry.primitive);
		}
	}


	// Checking for any tail from a previous event
	let i = 0;
	let k = 0;
	while (i < p) {
		if (day[i]) k = i + day[i].length;
		i++;
	}
	if (k > i) {
		// Entry is overlapping the tail from a previous event
		errPeriodOverlap("class");
	}

	// Overlapping a taken slot
	if (day[p]) errPeriodOverlap(day[i].type);
	k = i + l; i++;

	// Checking for the entry's tail to overlapping a pre-existing event
	while (k > i) {
		if (day[i]) errPeriodOverlap(day[i].type);
		i++;
	}

	// All good. Entry never overlapped
	day[p] = new TableData(entry);
}



// ###################
// JOINER
// ###################

/**
 * @param {TableData[][]} grid
 */
function joiner(grid) {
	const N = periodArray.length;
	grid.forEach(day => {
		let i = 0;
		while (i < N) {
			const beg = i;

			// Checking whether current slot is empty or filled?
			if (day[i]) {
				// Not a free slot!
				// Is the current event too long?
				if (i + day[i].length > N) return showError(`An event exceeded the timeframe for being too long:\n` + day[beg].primitive);

				if (!tableConfig.joinLongClasses && day[i].type === "class") {
					// Split long classes!
					const end = i + day[i].length;
					day[beg].length = 1;
					
					// Fill the length of the class with its units
					i++;
					while (i < end) {
						day[i] = day[beg];
						i++;
					}
				} else {
					// Don't split long classes!
					i += day[i].length;
				}
			} else {
				// Free slot!
				if (tableConfig.joinFreeSlots) {
					// Keep going until a filled slot is found!
					do { i++; }
					while (!day[i] && i < N); 

					day[beg] = new TableData(null, i - beg);
				} else {
					day[i] = new TableData(null, 1); i++;
				}
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

	data.classes.forEach(name => {
		td.classList.add(name);
	})
	td.classList.add("card-type-"+data.type);
	if (data.type !== "free" && data.type !== "break") {
		td.classList.add("card-type-active");
	}
	if (data.id) td.id = data.id;
	return td;
}



/**
 * @param {TableData[][]} grid
 * @param {HTMLTableElement} tableElem 
 */
function tablerH(grid, tableElem) {
	tableElem.innerHTML = "";

	// HEADER ROW
	const thead = document.createElement("thead");
	thead.innerHTML = `
		<tr>
			<th>${CORNERHEAD}</th>
			${TIMELABELS.map(h => `<th class="period-header">${h}</th>`).join('')}
		</tr>
	`;
	tableElem.appendChild(thead);


	// REST OF THE ROWS
	const tbody     = document.createElement("tbody");
	const breakSpan = (tableConfig.joinBreakPeriod? dayArray.length: 1);

	for (let d = 0; d < dayArray.length; d++) {
		const tr = document.createElement("tr");

		// Day Header
		const dhead = document.createElement("th");
		dhead.textContent = DAYLABELS[d];
		dhead.classList.add("day-header");
		tr.appendChild(dhead);

		// Table Datas
		for (let p = 0; p < periodArray.length;) {
			let data = grid[d][p];

			if (data.type === "break")
			{
				if (d == 0 || !(tableConfig.joinBreakPeriod))
				{
					// Create break periods
					const breaktd       = document.createElement("td");
					breaktd.innerHTML   = data.content;
					breaktd.rowSpan     = breakSpan;
					breaktd.classList.add("card-type-break");
					
					tr.appendChild(breaktd);
				}
				p++;
			}
			else
			{
				tr.appendChild(createTD(data, "h"));
				p += data.length;
			}
		}
		tbody.appendChild(tr);
	}

	tableElem.appendChild(tbody);
}
/**
 * @param {TableData[][]} grid
 * @param {HTMLTableElement} tableElem 
 */
function tablerV(grid, tableElem) {
	tableElem.innerHTML = "";

	// HEADER ROW
	const thead = document.createElement("thead");
	thead.innerHTML = `
		<tr>
			<th>${CORNERHEAD}</th>
			${DAYLABELS.map(h => `<th class="day-header">${h}</th>`).join('')}
		</tr>
	`;
	tableElem.appendChild(thead);


	// REST OF THE ROWS
	const tbody = document.createElement("tbody");
	const breakSpan = (tableConfig.joinBreakPeriod? periodArray.length: 1);

	for (let p = 0; p < periodArray.length; p++) {
		const tr = document.createElement("tr");

		// Period Header
		const phead = document.createElement("th");
		phead.textContent = TIMELABELS[p];
		phead.classList.add("period-header");
		tr.appendChild(phead);
		
		// Table Datas
		for (let d = 0; d < dayArray.length;) {
			let data = grid[d][p];

			if (data == null)
			{
				d++;    // If the slot is null, skip to next column/period
			}
			else if (data.type === "break")
			{
				// If it is a break, fill the row/day
				const rep = (tableConfig.joinBreakPeriod? 1: periodArray.length);
				while (d < dayArray.length) {
					const breaktd       = document.createElement("td");
					breaktd.innerHTML   = data.content;
					breaktd.colSpan     = breakSpan;
					breaktd.classList.add("card-type-break");
					
					tr.appendChild(breaktd);
					d += breakSpan;
				}
			}
			else
			{
				// Otherwise, it is a regular class/event
				tr.appendChild(createTD(data, "v"));
				d++;
			}
		}
		tbody.appendChild(tr);
	}
	tableElem.appendChild(tbody);
}




// ###################
// MAIN EVENT
// ###################

function createTableWithBreaks() {
	let grid = Array(dayArray.length).fill(null).map(() => Array(periodArray.length).fill(null));

	periodArray.forEach((period, idx) => {
		if ("spanAll" in period) {
			let breakDummy = TableData.createBreak(period.spanAll)
			grid.forEach(day => {
				day[idx] = breakDummy;
			})
		}
	})

	return grid
}



document.addEventListener("DOMContentLoaded", () => {
	// Initialize
	let mainGrid = createTableWithBreaks();
	
	// Input entries from the .json file and add to the grid
	config_json.schedule.forEach(entry => {
		addToGrid(mainGrid, new ScheduleEntry(entry));
	});
	
	console.log(joiner(mainGrid));      // Create "free periods"

	// Display error messages
	tablerH(mainGrid, document.getElementById("time-table-h"));
	tablerV(mainGrid, document.getElementById("time-table-v"));
});


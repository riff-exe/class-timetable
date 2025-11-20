class TableConfig {
	constructor(config) {
		this.joinLongClasses 		= config.joinLongClasses 		?? true;
		this.joinBreaks 			= config.joinBreaks 			?? true;
	}
}
TABLE = null;

class ScheduleEntry {
	constructor(entry) {
		function errorPropertyMissing(prop) {
			throw new Error(`Missing property '${prop}'.`);
		}
		// Checking if required properties are missing
		if (!entry.period)	errorPropertyMissing("period");
		if (!entry.day) 	errorPropertyMissing("day");
		if (!entry.text) 	errorPropertyMissing("text");
		
		// Getting and setting data from json file
		// Non-required properties have default value
		this.period 	= entry.period;
		this.day 		= entry.day;
		this.text 		= entry.text;
		this.subtext 	= entry.subtext 	?? "";
		this.type 		= entry.type 		?? "class";
		this.type.toLowerCase();
		this.length 	= entry.length 		?? ((this.type === "lab")? 3: 1);
		this.classes 	= entry.classes 	?? [];
		this.id 		= entry.id 			?? null;
		this.style 		= entry.style 		?? "r";
		this.substyle 	= entry.substyle	?? "i";
		this.style.toLowerCase();
		this.substyle.toLowerCase();

		// Validating all inputs
		// if (typeof(this.text) !== "string") throw new Error(`'text' must be of type 'string'`);
	}
}

class TableData {
	/**
	 * If 'entry = null`, the object will represent a "break time". 
	 * Then length will be required.
	 * @param {ScheduleEntry} entry 
	 * @param {number} length 
	 */
	constructor(entry, length = 1) {
		if (entry) {
			this.content	= curator(entry);
			this.type		= entry.type;
			this.length		= entry.length;
			this.classes	= entry.classes;
			this.id			= entry.id;
		} else {
			this.content	= "";
			this.type		= "break";
			this.length		= length;
			this.classes	= [];
			this.id			= null;
		}
	}
}



// ###################
// CURATOR
// ###################

function setStyle(text, style) {
	switch(style) {
		case "r":				return text
		case "i":				return `<i>${text}</i>`;
		case "b":				return `<b>${text}</b>`;
		case "bi":case "ib":	return `<i><b>${text}</b></i>`;
		default:    throw new Error(`Invalid style ${style}`);
	}
}
function curator(entry) {
	subtext = "";
	if (entry.subtext) {
		// subtext = "<span class=\"subtext\">" + setStyle(entry.subtext, entry.substyle) + "</span>";
		txt = setStyle(entry.subtext, entry.substyle);
		txt = `<span class="subtext">${subtext}</span>`;
		subtext = "\n" + txt;
	}
	return setStyle(entry.text, entry.style) + subtext;
}



// ###################
// LOGGER
// ###################

let mainGrid = Array(5).fill().map(() => Array(9).fill(null));

let dayMap = new Map([
	['SAT', 1],
	['SUN', 2],
	['MON', 3],
	['TUE', 4],
	['WED', 5],
])
/**
 * @param {TableData[][]} grid 
 * @param {ScheduleEntry} entry 
 */
function addToGrid(grid, entry) {
	// Validating day property
	if (!dayMap.has(entry.day)) {
		throw new Error(`Invalid property 'day = ${entry.day}' in entry of type '${entry.type}' on period ${entry.period}.`);
	}
	let d = dayMap.get(entry.day)-1;

	// Validating period property
	if (!Number.isInteger(entry.period)|| entry.period <= 0 || entry.period > 9) {
		throw new Error(`Invalid property 'period = ${entry.period}' in entry of type '${entry.type}' on day ${entry.day}.`);
	}
	let p = entry.period-1;
	let l = entry.length;

	// Overlapping breaks
	if (Math.floor(p/3) !== Math.floor((p+l-1)/3)) {
		throw new Error(`Entry too long. Entry of type '${entry.type}' on day ${entry.day} and period ${entry.period} is overlapping with a break period.`)
	}

	// Overlapping other periods
	function errPeriodOverlap(entry) {
		throw new Error(`Two entries share the same day '${entry.day}' and the same period ${entry.period}.`);
	}
	if (grid[d][p]) errPeriodOverlap();
	let i = Math.floor(p/3)*3, j = i+3;
	let t = 0;
	while (i < p) {
		if (grid[d][i]) t = grid[d][i].length;
		if (t > 0) t--;
		i++;
	}
	if (t > 0) errPeriodOverlap();
	t = l-1; i++;
	while (i < j && t > 0) {
		if (grid[d][i]) errPeriodOverlap();
		t--; i++;
	}

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
		let i = 0;
		while (i < 3) {
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
			i++;
		}
	});
	return grid;
}



// ###################
// TABLER
// ###################

//



// ###################
// MAIN EVENT
// ###################

// console.log("heck yeah");
// console.log(config_json.config);
// console.log(config_json.schedule);
TABLE = new TableConfig(config_json.config)
config_json.schedule.forEach(entry => {
	addToGrid(mainGrid, new ScheduleEntry(entry));
});

console.log(joiner(mainGrid));
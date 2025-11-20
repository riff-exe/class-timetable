```json
"period": 2,						# Logger
"day": "SAT",						# Logger
"text": "CSE 2103\nBA\n201",		# Curator
"subtext": "",						# Curator
"type": "class",					# Tabler
"length": 1,		# or 3			# Joiner
"classes": [],						# Tabler
"id": null,							# Tabler
"style": "r",						# Curator
"substyle": "i"						# Curator
```

```json
"content": ""
"type": "class",
"length": 1,
"classes": [],
"id": null,
```

**Logger**: Puts all entries onto a main grid and checks for invalid entry positions
- Breaks & Non-Headers = null
- Error Handling
	- Through Break Period Error
	- Overlap Error

**Joiner**: Creates Break periods and joins/breaks long sessions
- Non-Headers = null

**Curator**: Decides on the innerHTML content
- 

**Tabler**: Iterates through the main grid and creates H/V table
- 
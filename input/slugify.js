/*jshint
	browser:true,
	strict: false
*/

var charMap = {
	'а': 'a',
	'б': 'b',
	'в': 'v',
	'г': 'g',
	'д': 'd',
	'е': 'e',
	'ё': 'yo',
	'ж': 'zh',
	'з': 'z',
	'и': 'i',
	'й': 'y',
	'к': 'k',
	'л': 'l',
	'м': 'm',
	'н': 'n',
	'о': 'o',
	'п': 'p',
	'р': 'r',
	'с': 's',
	'т': 't',
	'у': 'u',
	'ф': 'f',
	'х': 'h',
	'ц': 'ts',
	'ч': 'ch',
	'ш': 'sh',
	'щ': 'sch',
	'ъ': '',
	'ы': 'y',
	'ь': '',
	'э': 'e',
	'ю': 'yu',
	'я': 'ya'
},

slugify = function(text) {
	return text.toLowerCase().split("").map(function (char) {
		return charMap[char] || char;
	}).join("")
		.replace(" ", "-")
		.replace(/[^-a-z0-9]{1,60}/, "");
};

exports("ui/input/slugify", slugify);

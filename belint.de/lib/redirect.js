var redirect = function(lang) {
	switch(lang){
		case "ru":
		case "ru-mo":
		case "be":
		case "uk":
		case "kk":
			window.location="http://www.belint.de/RU/index.html";
			break;
		case "de":
		case "de-at":
		case "de-de":
		case "de-li":
		case "de-lu":
		case "de-ch":
			window.location="http://www.belint.de/DE/index.html";
			break;
		default:
			window.location="http://www.belint.de/EN/index.html";
			break;
	}
}

redirect(navigator.language);
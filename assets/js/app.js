let question = document.querySelectorAll(".question");
let drop = document.querySelectorAll(".drop-box");
question.forEach((e) => {
	question.forEach((i) => {
		e.addEventListener("click", () => {
			if (i.nextElementSibling.classList.contains("active")) {
				i.nextElementSibling.classList.remove("active");
			} else {
				if (e.nextElementSibling.classList.contains("active")) {
					e.nextElementSibling.classList.remove("active");
				} else {
					e.nextElementSibling.classList.add("active");
				}
			}
		});
	});
});

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}


drop.forEach((e) => {
	e.addEventListener("click", () => {
		let el;
		e.childNodes[5].classList.toggle("active");
		let searchIc = e.childNodes[3].childNodes[1];
		el = e.nextElementSibling;
		if (el !== null && el.children[0].textContent === "To") {
			el.childNodes[5].classList.remove("active");
		} else {
			el = e.previousElementSibling;
			el.childNodes[5].classList.remove("active");
		}
		// console.log(el);
		if (e.childNodes[5].classList.contains("active")) {
			searchIc.style.display = "block";
		} else {
			searchIc.style.display = "none";
		}
	});

	let searchItem = e.childNodes[5].childNodes[1];
	searchItem.addEventListener("click", () => {
		e.childNodes[4].classList.toggle("active");
	});
});

let fromLocation, toLocation, fromValue, toValue;
fromLocation = document.querySelectorAll(".item.from-locations a");
toLocation = document.querySelectorAll(".item.to-locations a");
toValue = document.querySelector(".to-value");
fromValue = document.querySelector(".from-value");

fromLocation.forEach((e) => {
	e.addEventListener("click", () => {
		fromValue.setAttribute("value", e.textContent);
		fromValue.value = e.textContent;
	});
});
toLocation.forEach((e) => {
	e.addEventListener("click", () => {
		toValue.setAttribute("value", e.textContent);
		toValue.value = e.textContent;
	});
});

let r = document.querySelector(".return");
let links = document.querySelector(".links");
let men = document.querySelector(".menu i");
function menu() {
	links.classList.toggle("active");
	men.classList.toggle("uil-times");
}


function includeHTML() {
	var z, i, elmnt, file, xhttp;
	/* Loop through a collection of all HTML elements: */
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
	  elmnt = z[i];
	  /*search for elements with a certain atrribute:*/
	  file = elmnt.getAttribute("w3-include-html");
	  if (file) {
		/* Make an HTTP request using the attribute value as the file name: */
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		  if (this.readyState == 4) {
			if (this.status == 200) {elmnt.innerHTML = this.responseText;}
			if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
			/* Remove the attribute, and call this function once more: */
			elmnt.removeAttribute("w3-include-html");
			includeHTML();
		  }
		}
		xhttp.open("GET", file, true);
		xhttp.send();
		/* Exit the function: */
		return;
	  }
	}
  }

  $(document).ready(() => {
	includeHTML();
});

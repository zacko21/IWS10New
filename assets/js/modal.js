const terms = document.getElementById("terms");
const policy = document.getElementById("policy");
const trigger = document.querySelector(".trigger");
const trigger1 = document.querySelector(".trigger1");
const closeButton = document.getElementById("tClose");
const closeButton1 = document.getElementById("pClose");

function toggleModal(modal) {
	console.log(modal);
	if (modal === "terms") {
		terms.classList.toggle("show-modal");
	}
	if (modal === "policy") {
		policy.classList.toggle("show-modal");
	}
}

function windowOnClick(event) {
	console.log(event.target);
	if (event.target === trigger) toggleModal("terms");
	if (event.target === closeButton) toggleModal("terms");
	if (event.target === trigger1) toggleModal("policy");
	if (event.target === closeButton1) toggleModal("policy");
}

trigger.addEventListener("click", toggleModal("terms"));
trigger1.addEventListener("click", toggleModal("policy"));
closeButton.addEventListener("click", toggleModal("terms"));
closeButton1.addEventListener("click", toggleModal("policy"));
window.addEventListener("click", windowOnClick);

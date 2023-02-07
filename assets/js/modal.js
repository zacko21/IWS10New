const terms = document.getElementById("terms");
const policy = document.getElementById("policy");
const reset = document.getElementById("resetModal");
const trigger = document.querySelector(".trigger");
const trigger1 = document.querySelector(".trigger1");
const closeButton = document.getElementById("tClose");
const closeButton1 = document.getElementById("pClose");
const closeButton2 = document.getElementById("rClose");

function toggleModal(modal) {
	if (modal === "terms") {
		terms.classList.toggle("show-modal");
	}
	if (modal === "policy") {
		policy.classList.toggle("show-modal");
	}
	if (modal === "reset") {
		reset.classList.toggle("show-modal");
	}
}

function windowOnClick(event) {
	if (event.target === terms) toggleModal("terms");
	if (event.target === trigger) toggleModal("terms");
	if (event.target === closeButton) toggleModal("terms");
	if (event.target === policy) toggleModal("policy");
	if (event.target === trigger1) toggleModal("policy");
	if (event.target === closeButton1) toggleModal("policy");
	if (event.target === closeButton2) toggleModal("reset");
}

trigger.addEventListener("click", toggleModal("terms"));
trigger1.addEventListener("click", toggleModal("policy"));
closeButton.addEventListener("click", toggleModal("terms"));
closeButton1.addEventListener("click", toggleModal("policy"));
window.addEventListener("click", windowOnClick);

let editProfile = document.querySelector(".edit-profile-modal");
let dataTable = document.querySelector(".booking-history");
let dataBtn = document.querySelector(".data-table-btn");
function edit() {
  editProfile.classList.toggle("active");
}
function data() {
  dataTable.classList.toggle("active");
  if (dataBtn.textContent.includes("View Booking History")) {
    dataBtn.innerHTML = "Hide Booking Results";
    dataBtn.style = "background:var(--green)";
  } else {
    dataBtn.innerHTML = "View Booking History";
    dataBtn.style = "background:var(--secoundary)";
  }
}

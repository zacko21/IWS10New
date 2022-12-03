let editProfile = document.querySelector(".edit-profile-modal");
let dataTable = document.querySelector(".booking-history");
let dataBtn = document.querySelector(".data-table-btn");

function edit() {
    if (editProfile.classList.contains('active') === false) {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        $('#lastname').val(userInfo.USERNAME.split(',')[0]);
        $('#firstname').val(userInfo.USERNAME.split(',')[1]);
        $('#contact').val(userInfo.CONTACT_NO);
        $('#birthday').val(formatDate1(userInfo.BIRTHDATE));
        $('#password').val(loginInfo.pwd);
    }
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

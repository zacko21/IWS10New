let bookBtn = document.querySelectorAll(".btn.book");
let cancelBtn = document.querySelector(".btn.cancel-btn");
let continueBtn = document.querySelector(".btn.continue");
let seatSelect = document.querySelector(".bus-seat-select");
let editBookedInfo = document.querySelector(".edit-booked-user-info-modal");
let passengersInfo = document.querySelector(".block.passenger-s");
let bookingContinue = document.querySelector(".booking-payment");
let searchRes = document.querySelector(".search-res");
let payCon = document.querySelector(".pay-con");
let paymentTabs = document.querySelectorAll(".payment-tabs .tab");
let paymentModule = document.querySelectorAll(".payment-module");
let proofBtn = document.querySelector(".proof-btn");
let bookingDetails = document.querySelector(".booking-details");
let body = document.querySelector("body");
let searchBarMain = document.querySelector(".search-bar-main");
let floatingSearched = document.querySelector(".search-ag i");
let floatingSearch = document.querySelector(".search-ag");
bookBtn.forEach((e) => {
    e.addEventListener("click", () => {
        //body.classList.toggle("modal-open");
        cancelBtn.classList.add("active");
        //continueBtn.classList.add("active");
        seatSelect.classList.add("active");
    });
});

function closeModal() {
    $.LoadingOverlay('show');
    cancelBookings().then(() => {
        let action = GetURLParameter('action');
        console.log(action);
        if (action && action === 'getreservation') {
            window.location.href='user-admin.html';
        }else{
            window.location.reload();

        }
    
    });


    //body.classList.toggle("modal-open");
    cancelBtn.classList.remove("active");
    continueBtn.classList.remove("active");
    seatSelect.classList.remove("active");
    passengersInfo.classList.remove("active");
    bookingDetails.style = "position:;transform:";
    body.classList.remove("modal-open");
    bookingContinue.classList.remove("step-active");
    searchRes.classList.add("step-active");
    floatingSearch.style.display = "block";
    document.getElementById('terms_policy').checked = false;
    document.getElementById('consent').style.display = 'none';
    bookingDetails.style = "position:relative;transform:unset";

}

let seats = document.querySelectorAll(".seat.available");
let bookingModal = document.querySelector(".booking-modal");
seats.forEach((e) => {
    e.addEventListener("click", () => {
        bookingModal.classList.toggle("active");
        //floatingSearch.style.display = "none";
    });
});

function cancelBooking() {
    bookingModal.classList.toggle("active");
    //payCon.setAttribute("disabled", true);
    //closeModal();
}


function jumpTo(anchor_id) {
    self.location.href = "#" + anchor_id;                 //Navigate to the target element.
}
function continuePayment() {
    if (continueBtn.classList.contains('active') == false) return;
    window.scrollTo(0, 0);
    let rlist = JSON.parse(localStorage.getItem('reservation'));
    let ok = true;
    rlist.forEach(row => {
        if (row.LastName === 'Lastname' || row.FirstName === 'Firstname') {
            Swal.fire({
                html: '<p style="font-size: medium">Please change the Passenger Name before proceeding. Thank you</p>',
                confirmButtonText: 'OK',
                allowOutsideClick: false,

            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                }
            })
            ok = false;
        }
        if (row.SeatNo === 'UNASSIGNED') {
            Swal.fire('Before proceeding, please assign a Passenger Seat. Thank you.');
            ok = false;
        }
    })
    if (ok) {
        bookingContinue.classList.add("step-active");
        seatSelect.classList.remove('active')
        searchRes.classList.remove("step-active");
        bookingDetails.style = "position:relative;transform:unset";
        body.classList.remove("modal-open");
    }
}

function confirmBooking(e) {
    console.log('hasclass?', continueBtn.classList.contains('active'));
    $('.booking-modal.active>.wraper-item').LoadingOverlay('show');
    fetchPassengerSeat(document.getElementById('passenger_assign').value, e.dataset.seat).then(res => {
        if (res.result === 'OK') {
            getReserve(true);
            bookingModal.classList.toggle("active");
            //seatSelect.classList.remove("active");
            cancelBtn.classList.add("active");
            //continueBtn.classList.add("active");
            passengersInfo.classList.add("active");
            payCon.removeAttribute("disabled", false);
            bookingDetails.scrollTop = 0;
        }
    });
    $('.booking-modal.active>.wraper-item').LoadingOverlay('hide');


}

function editBookingUser(e) {
    getPassengerInfo(e.dataset.id);
    editBookedInfo.classList.toggle("active");
}

paymentTabs.forEach((e) => {
    paymentTabs.forEach((f) => {
        e.addEventListener("click", () => {
            f.classList.remove("active");
        });
    });
    e.addEventListener("click", () => {
        e.classList.add("active");
    });

    e.addEventListener("click", () => {
        paymentModule.forEach((p) => {
            let tab = e.getAttribute("data-target");
            let tabContent = p.getAttribute("data-content");
            paymentModule.forEach((g) => {
                if (tab === tabContent) {
                    g.classList.remove("active");
                }
            });
            if (tab === tabContent) {
                p.classList.add("active");
            }
        });
    });
    proofBtn.addEventListener("click", () => {
        paymentModule.forEach((p) => {
            let tab = proofBtn.getAttribute("data-target");
            let tabContent = p.getAttribute("data-content");
            paymentModule.forEach((g) => {
                if (tab === tabContent) {
                    g.classList.remove("active");
                }
            });
            if (tab === tabContent) {
                p.classList.add("active");
            }
        });
    });
});
let copyItem = document.querySelectorAll(".payment-block .item span i");

copyItem.forEach((e) => {
    e.addEventListener("click", () => {
        let text = e.parentNode.childNodes[0];
        alert("Copied:" + text.textContent);
        navigator.clipboard.writeText(text.textContent);
    });
});

function openSearchbar() {
    window.scrollTo(0, 0);
    document.querySelector('.to-input').nextElementSibling.classList.remove('active')
    document.querySelector('.from-input').nextElementSibling.classList.remove('active')
    $('#from').val(localStorage.getItem('originName'));
    $('#to').val(localStorage.getItem('destinationName'));
    $('#from').attr('data-clientid', localStorage.getItem('clientId'));
    getLocation();
    getDestination();
    $('#date_of_departure').val(localStorage.getItem('departure'));
    searchBarMain.classList.toggle("active");
    floatingSearched.classList.toggle("uil-multiply");
}

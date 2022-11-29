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
    body.classList.toggle("modal-open");
    cancelBtn.classList.add("active");
    continueBtn.classList.add("active");
    seatSelect.classList.add("active");
  });
});
function closeModal() {
  cancelBookings();
  body.classList.toggle("modal-open");
  cancelBtn.classList.remove("active");
  continueBtn.classList.remove("active");
  seatSelect.classList.remove("active");
  passengersInfo.classList.remove("active");
  bookingDetails.style = "position:;transform:";
  body.classList.remove("modal-open");
  bookingContinue.classList.remove("step-active");
  searchRes.classList.add("step-active");
  floatingSearch.style.display = "block";
}
let seats = document.querySelectorAll(".seat.available");
let bookingModal = document.querySelector(".booking-modal");
seats.forEach((e) => {
  e.addEventListener("click", () => {
    bookingModal.classList.toggle("active");
    floatingSearch.style.display = "none";
  });
});
function cancelBooking() {
  bookingModal.classList.toggle("active");
  payCon.setAttribute("disabled", true);
  closeModal();
}

function continuePayment() {
  bookingContinue.classList.add("step-active");
  searchRes.classList.remove("step-active");
  bookingDetails.style = "position:relative;transform:unset";
  body.classList.remove("modal-open");
}
function confirmBooking(e) {
  fetchPassengerSeat(document.getElementById('passenger_assign').value, e.dataset.seat).then(res => {
    if (res.result === 'OK') {
      getReserve();
      bookingModal.classList.toggle("active");
      seatSelect.classList.remove("active");
      cancelBtn.classList.add("active");
      continueBtn.classList.add("active");
      passengersInfo.classList.add("active");
      payCon.removeAttribute("disabled", false);
    }
  });

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
  searchBarMain.classList.toggle("active");
  floatingSearched.classList.toggle("uil-multiply");
}

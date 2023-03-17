var action = '';

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
};

$.LoadingOverlaySetup({
  imageColor: "#4a6c2f"
});


let confirmModal = document.querySelector(".booking-confirm");

function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}


Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
let dtDepart = document.getElementById("date_of_departure");
if (dtDepart) {
  dtDepart.setAttribute("min", new Date().addDays(1).toISOString().split("T")[0]);
  dtDepart.setAttribute(
    "max",
    new Date().addDays(30).toISOString().split("T")[0]
  );
  //     setTimeout(() => {
  //       dtDepart.value = moment().add(1,'days').format('YYYY-MM-DD');
  //       console.log('here');      
  //     }, 3000);
}

async function fetchBookingHistory() {
  $.LoadingOverlay('show');
  let token = localStorage.getItem("TOKEN");
  let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/bookinghistorytest/${token}`;
  if (token) {
    //console.log(input);
    let data = {
      token: token,
    };
    ////console.log(input)
    let response = await fetch(input, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "post",
      body: JSON.stringify(data),
    });
    //console.log(JSON.stringify(data));
    $.LoadingOverlay('hide');
    return response.json();
  } else {
    window.location.href =
      document.URL.substring(0, document.URL.lastIndexOf("/")) + "/login.html";
  }
}

async function fetchResults(show = false, options = {}, target = "body") {
  let clientId, date, origin, destination, paxCount;
  ////console.log(target);
  // if (show) $(target).LoadingOverlay("show", options);
  origin = sessionStorage.getItem("originName");
  destination = sessionStorage.getItem("destinationName");
  date = sessionStorage.getItem("departure");
  // clientId = sessionStorage.getItem("clientId");
  paxCount = sessionStorage.getItem("passenger_count");
  let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/getschedules2test/2/1/${date}/${origin.trim()}/${destination.trim()}/${paxCount}`;
  //console.log(input);
  let response = await fetch(input);
  // $(target).LoadingOverlay("hide");
  // console.log('schedules', response.json);
  return await response.json();
}

async function fetchReservationInfo(data) {
  let token = localStorage.getItem("TOKEN");
  if (token != null && token != "") {
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/getreservationinfotest/${token}`;
    //console.log(input);
    let response = await fetch(input, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "post",
      body: JSON.stringify(data),
    });
    //console.log(JSON.stringify(data));

    return await response.json();
  } else {
    window.location.href =
      document.URL.substring(0, document.URL.lastIndexOf("/")) + "/login.html";
  }
}

async function fetchUpdatePassenger(data) {
  let token = localStorage.getItem("TOKEN");
  if (token != null && token != "") {
    let refNo = sessionStorage.getItem("refNo");
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/passenger/${token}/${refNo}`;
    //console.log(input);
    let response = await fetch(input, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "post",
      body: JSON.stringify(data),
    });
    //console.log(JSON.stringify(data));

    return await response.json();
  } else {
    window.location.href =
      document.URL.substring(0, document.URL.lastIndexOf("/")) + "/login.html";
  }
}

async function fetchCancelBooking(data) {
  let token = localStorage.getItem("TOKEN");
  if (token != null && token != "") {
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/cancelbooking/${token}`;
    //console.log(input);
    try {
      let response = await axios.post(input, data, axiosConfig);
      console.log('CANCEL BOOKING STATUS: ', response.status);
      console.log("CANCEL DATA: ", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  } else {
    window.location.href =
      document.URL.substring(0, document.URL.lastIndexOf("/")) + "/login.html";
  }
}

async function fetchPassengerSeat(refNo, seatNo) {
  // $('.bus-seat-select').LoadingOverlay('show');
  let token = localStorage.getItem("TOKEN");
  if (token != null && token != "") {
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/updatepassengerseattest/${token}`;
    let data = {
      ClientID: sessionStorage.getItem("clientId"),
      TripDate: sessionStorage.getItem("departure"),
      RouteID: sessionStorage.getItem("RouteId"),
      BusType: sessionStorage.getItem("BusType"),
      ReferenceNo: refNo,
      SeatNo: seatNo,
    };
    //console.log(input);
    let response = await fetch(input, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "post",
      body: JSON.stringify(data),
    });
    //console.log(JSON.stringify(data));
    // $('.bus-seat-select').LoadingOverlay('hide');
    return await response.json();
  } else {
    window.location.href =
      document.URL.substring(0, document.URL.lastIndexOf("/")) + "/login.html";
  }
}

async function fetchManifest() {
  $(".bus-seat-select").LoadingOverlay("show");
  let token = localStorage.getItem("TOKEN");
  //console.log(token);
  if (token != null && token != "") {
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/manifesttest/${token}`;
    //console.log(input);
    let data = {
      clientid: sessionStorage.getItem("clientId"),
      tripdate: sessionStorage.getItem("departure"),
      routeid: sessionStorage.getItem("RouteId"),
      BusType: sessionStorage.getItem("BusType"),
    };
    //console.log(JSON.stringify(data));
    try {
      let response = await axios.post(input, data, axiosConfig);
      //console.log(response.status);
      $(".bus-seat-select").LoadingOverlay("hide");
      //console.log("manifest", response.data);
      if (response.data == "") {
        //console.log("empty data");
        return fetchManifest();
      }
      return response.data;
    } catch (err) {
      console.error(err);
    }
  } else {
    window.location.href =
      document.URL.substring(0, document.URL.lastIndexOf("/")) + "/login.html";
  }
}

async function fetchReserve() {
  $(".booking-details").LoadingOverlay("show");
  let token = localStorage.getItem("TOKEN");
  //console.log(token);

  if (token != null && token != "") {
    let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    let email = loginInfo.email;

    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/reservetest/${token}`;
    //console.log(input);
    let data = {
      clientId: sessionStorage.getItem("clientId"),
      token: token,
      tripDate: sessionStorage.getItem("departure"),
      noOfPax: sessionStorage.getItem("passenger_count"),
      routeId: sessionStorage.getItem("RouteId"),
      reservationStatus: "0",
      firstName: "a",
      middleName: "a",
      lastName: "a",
      seatNo: "UNASSIGNED",
      paxDiscountId: "",
      discountType: "",
      bookingAgent: "IWS",
      userId: "1",
      bookedBy: "",
      paidBy: "",
      modeOfPayment: "",
      paymentRemarks: "",
      pickUp: sessionStorage.getItem("RouteId").split(".")[1],
      dropOff: sessionStorage.getItem("RouteId").split(".")[2],
      email: email
    };
    console.log("RESERVE POST DATA", JSON.stringify(data));
    try {
      let response = await axios.post(input, data, axiosConfig);
      //console.log(response.status);

      $(".booking-details").LoadingOverlay("hide");
      if (response.data == "") {
        console.log("RESERVE DATA: --empty data---");
        return fetchReserve();
      }
      console.log("RESERVE DATA: ", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  } else {
    window.location.href =
      document.URL.substring(0, document.URL.lastIndexOf("/")) + "/login.html";
  }
}

async function fetchLocation() {
  // $('.from-value').LoadingOverlay('show');
  let input = "https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/getorigindestinations2/1/-1/1000";
  let response = await fetch(input);
  return await response.json();
}

async function fetchLocationF() {
  let input =
    "https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/getfeaturedroutesiws";
  let response = await fetch(input);
  return await response.json();
}


async function fetchToLocation() {
  let name = sessionStorage.getItem("originName");
  // $('.to-value').LoadingOverlay('show');
  let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/getorigindestinations2/2/${name}/1000`;
  //console.log(input);
  let response = await fetch(input);
  // $('.to-value').LoadingOverlay('hide');
  return await response.json();
}

const groupBy = (list, keyGetter) => {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

function getPassengerInfo(id) {
  let reservation = sessionStorage.getItem("reservation");
  let cinfo = JSON.parse(reservation)[id];
  // let pBooker = parseInt(id) === 0 ? 1 : 0;
  sessionStorage.setItem("refNo", cinfo.ReferenceNo);
  // sessionStorage.setItem("pBooker", pBooker);
  document.querySelector("#email").value = cinfo.Email;
  document.querySelector("#first_name").value = cinfo.FirstName;
  document.querySelector("#last_name").value = cinfo.LastName;
  if (cinfo.Gender === 'M') {
    document.querySelector('#male').checked = true;
  } else {
    document.querySelector('#female').checked = true;
  }
  document.querySelector("#birthday").value = cinfo.BirthDate;
  document.querySelector("#contact_number").value = cinfo.ContactNo;
}

async function cancelBookings(getR = false) {
  let reservation = sessionStorage.getItem("reservation");
  let info = JSON.parse(reservation)[0];
  let data = {
    ClientID: info.clientID,
    TripDate: info.TripDate,
    RouteID: info.RouteId,
    BusType: info.BusType,
    ReservationNo: info.ReservationNo,
    CancelStatus: "1",
    CancelRemarks: "CANCEL",
  };
  await fetchCancelBooking(data)
    .then((res) => {
      if (res.result === "OK") {
        //console.log("CANCEL RESULT", res.result);
        //sessionStorage.removeItem('reservation');
        // modal.classList.remove('active');
        // Swal.fire('Success', 'Your bookings is successfully cancelled.', 'success');
      } else {
        //console.log("CANCEL RESULT", res.result);
      }
    })
    .then((ex) => {
      if (getR) {
        getReserve();
      }
    });
}

async function EditInfo(e) {
  $('.edit-booked-user-info').LoadingOverlay('show');
  e.preventDefault();
  let data = {
    clientid: sessionStorage.getItem("clientId"),
    loyaltyId: "",
    birthDate: moment(document.querySelector("#birthday").value).format('YYYY-MM-DD'),
    contactNo: document.querySelector("#contact_number").value,
    email: document.querySelector("#email").value,
    firstName: document.querySelector("#first_name").value,
    gender: document.querySelector("input[name='gender']:checked").value,
    lastName: document.querySelector("#last_name").value,
    middleName: "",
    referenceNo: sessionStorage.getItem("refNo"),
    // replaceprimarybooker: parseInt(sessionStorage.getItem("pBooker")),
    replaceprimarybooker: 0,
    tripID:
      sessionStorage.getItem("departure") + "." + sessionStorage.getItem("RouteId"),
  };
  await fetchUpdatePassenger(data)
    .then((res) => {
      //console.log(res);
      if (res.result === "OK") {
        editBookedInfo.classList.remove("active");
        getReserve(false);
        $('.edit-booked-user-info').LoadingOverlay('hide');
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// searchAreas = (search) => {
//     fetchLocation().then((data) => {
//         var results = _.filter(data, function (row) {
//             return row.originName.indexOf(search.toUpperCase()) > -1;
//         });
//         if (results.length > 0) {
//             let gd = _.groupBy(JSON.parse(JSON.stringify(results)), 'area');
//             let html = '';
//             let placeholder = document.querySelector(".item.from-locations");
//             _.forEach(gd, function (item, area) {
//                 // //console.log(area);
//                 html += `<div><h5 style="margin-left: 10px;font-size: small">${area}</h5>`;
//                 item.forEach(loc => {
//                     // //console.log(loc);
//                     html += `<a data-clientid="${loc.clientID}" data-id="${loc.destinationid}"><i class="fas fa-crosshairs"></i>${loc.originName} </a>`;
//                 })
//                 html += '</div>'
//             })
//             placeholder.innerHTML = html;
//
//             let fromLocation, fromValue;
//             fromLocation = document.querySelectorAll(".item.from-locations a");
//             fromValue = document.querySelector(".from-value");
//             fromLocation.forEach((e) => {
//                 e.addEventListener("click", () => {
//                     fromValue.setAttribute("value", e.textContent);
//                     fromValue.setAttribute("data-id", e.dataset.id);
//                     fromValue.setAttribute("data-clientid", e.dataset.clientid);
//                     fromValue.value = e.textContent;
//                     getDestination(e.textContent);
//                 });
//             });
//
//         }
//     })
// }


function gotoView(el, checkSeat = false, checkContact = false) {
  document.querySelector(el).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  if (checkContact) {
    let hContact = document.querySelectorAll('.has-contact');
    console.log('has-contact', hContact.length);
    if (hContact.length == 0) {
      let block = document.querySelectorAll(el + '>.block');
      for (i = 0; i <= block.length; i++) {
        block[i].style.border = '2px solid #ff285c';
      }

    }
  }

  if (checkSeat) {
    let nSeat = document.querySelectorAll('.no-seat');
    console.log('no-seat', nSeat.length);
    if (nSeat.length > 0) {
      let block = document.querySelectorAll('.no-seat');
      for (i = 0; i <= block.length; i++) {
        block[i].style.border = '2px solid #ff285c';
      }

    }
  }


}

async function getReserve(gManifest = true) {
  let seatOK = true;
  await fetchReserve()
    .then((data) => {
      if (data.length > 0) {
        sessionStorage.setItem("refNo", data[0].ReferenceNo);
        sessionStorage.setItem("reservation", JSON.stringify(data));
        if (data[0].isCancelled === 'YES') {
          return cancelBookings(true);
        }

        let passList = document.getElementById("passenger_assign");
        let passLists = document.getElementById("passenger-list");
        let resBox = document.querySelector(".reserveBox");
        resBox.style.display = "block";
        document.getElementById("reservationNo").innerHTML =
          data[0].ReservationNo;

        // header.innerHTML = `<p><span>${data[0].Origin}</span> TO <span>${data[0].Destination}</span></p>`
        let html = "",
          htmList = "";

        SetTrip(data[0].ReservationNo, `${data[0].TripDate}.${data[0].RouteId}`, data[0].clientID, false);
        if (data.length !== parseInt(sessionStorage.getItem("passenger_count"))) {
          //console.log("bookings cancelled");
          return cancelBookings(true);
        }

        let fare = 0;
        let paxCount = data.length;
        let sub_total = 0;
        let resvFee = 0;
        data.forEach((res, index) => {
          fare = res.AccommodationFee - res.ConvenienceFee;
          sub_total += fare;
          resvFee += res.ConvenienceFee;
          let name = `${res.LastName}, ${res.FirstName}`;
          if (res.SeatNo === "UNASSIGNED") {
            seatOK = false;
          }
          html += `<option value="${res.ReferenceNo}">${name}</option>`;
          htmList += `<div class="block ${res.SeatNo == 'UNASSIGNED' ? 'no-seat' : ''} ${res.ContactNo != '' ? 'has-contact' : ''}">
                                <div class="item">
                                    <div>
                                        <p>Seat no:</p>
                                        <p>${res.SeatNo}</p>
                                    </div>
                                </div>
                                <div class="item">
                                    <div>
                                        <p>Name:</p>
                                        <p>${name}</p>
                                    </div>
                                    <i class="fas fa-pencil-alt" data-id ="${index}" onclick="editBookingUser(this)"></i>
                                </div>
                      </div>`;
        });
        let dest = JSON.parse(JSON.stringify(data[0]));

        document.getElementById("side_departure").textContent = `${formatDate(dest.TripDate)} - ${formatTime(dest.Departure)}`;
        document.getElementById("s_fare").textContent = "₱ " + fare.toFixed(2);
        document.getElementById("sub_total").innerHTML = `<p>Departure <span>(${paxCount} pax)</span></p>
                    <div class="item">
                    <p>Sub Total <span>(${paxCount} pax)</span></p>
                    <h3><span>₱ ${sub_total.toFixed(2)}</span></h3>
                </div>`;
        document.getElementById("gran_total").textContent =
          "₱ " + (sub_total + resvFee).toFixed(2);
        document.getElementById("res_fee").textContent =
          "₱ " + resvFee.toFixed(2);

        passengersInfo.classList.add("active");
        payCon.removeAttribute("disabled", false);
        passList.innerHTML = html;
        passLists.innerHTML = htmList;
        if (seatOK) {
          seatSelect.classList.remove("active");
          document.querySelector('.pay-con').scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        } else {
          seatSelect.classList.add("active");
        }
        //modal.classList.add("active");
      }
    })
    .then(() => {
      if (gManifest) getManifest();
    })
    .catch((error) => {
      //console.log("error", error);
    });
}


$('#terms_policy').on('change', function () {
  if (checkReservation()) {
    if (this.checked) {
      continueBtn.classList.add("active");
    }
    else {
      continueBtn.classList.remove("active");
    };
  } else {
    $(this).prop('checked', !$(this).prop('checked'));
    return false;
  }
});

function checkReservation() {
  let ok = true;
  let noCNo = true;
  let rlist = JSON.parse(sessionStorage.getItem('reservation'));
  rlist.forEach((row, index) => {
    if (row.LastName === 'Lastname' || row.FirstName === 'Firstname') {

      swal.fire("Please update passenger(s) Name").then(function () {
        setTimeout(function(){
          gotoView('#passenger-list');  
        })
      });

      ok = false;
    }
    if (row.SeatNo === 'UNASSIGNED') {
      Swal.fire('Before proceeding, please assign a Passenger Seat. Thank you.').then(()=>{
        setTimeout(function(){  
          gotoView('#passenger-list',true);
        })
      });
      ok = false;
    }
    if (row.ContactNo != '') {
      noCNo = false;
    }
  })
  if (noCNo) {
    ok = false;
    Swal.fire('Please update the passenger Contact No.').then(() => {
      setTimeout(function(){
        gotoView('#passenger-list',false,true);
      })
    });
  }
  return ok;
}


function assignSeat() {
  getManifest();
  seatSelect.classList.add("active");
  bookingDetails.scrollTop = 0;
}

function closeModalInfo() {
  editBookedInfo.classList.remove("active");
}

function confirmBookTrip() {
  confirmModal.classList.remove("active");
  getReserve();
}

function cancelBookTrip() {
  confirmModal.classList.remove("active");
}

function continueBooking() {
  confirmModal.classList.toggle("active");
}

const getManifest = () => {
  fetchManifest()
    .then((data) => {
      // //console.log(data);
      bookingDetails.scrollTop = 0;
      if (data.RESULT === "SEATPLAN NOT FOUND") {
        Swal.fire(data.RESULT);
      } else {
        let gp = _.groupBy(JSON.parse(JSON.stringify(data)), "row");
        let placeholder = document.querySelector(".bus-body");
        let html = `<table class="table table-sm table-borderless"><tbody>`;

        _.forEach(gp, (list, row) => {
          html += "<tr>";
          list.forEach((row1) => {
            if (row1.row === 0) {
              if (row1.label === "DRIVER") {
                html += `<td><div class="unavailable">
                                <img alt="" src="assets/images/driver.svg"/>
                                   </div></td>`;
              } else if (row1.label === "CONDUCTOR") {
                html += `<td><div class="unavailable">
                                <img alt="" style="width: 65%" src="assets/images/conducter.svg"/>
                                   </div></td>`;
              } else {
                html += `<td></td>`;
              }
            } else {
              html += `<td>`;
              switch (row1.type) {
                case "0":
                  html += `<div class="">
                                <img alt="" src="assets/images/blank.svg"/>
                                   </div>`;
                  break;
                case "1":
                  html += `<div data-id="${row1.value}" data-type="${row1.type
                    }" class="seat ${row1.value === "" || row1.label2 === "OFL"
                      ? "unavailable booked"
                      : row1.label2 === "SP"
                        ? "available senior"
                        : "available"
                    }">
                                <img alt="" src="assets/images/chair.svg"/>
                                <span>${row1.label}</span>
                                   </div>`;
                  break;
                case "2":
                  if (
                    row1.value === "" ||
                    row1.value === "COMFORT ROOM" ||
                    row1.value === "CR" ||
                    row1.label === "CR" ||
                    row1.label === "COMFORT ROOM" ||
                    row1.label === "RESTROOM"
                  ) {
                    html += `<div class="seat">
                                <img alt="" src="assets/images/cr.svg"/>
                                <span>CR</span>
                                   </div>`;
                  } else {
                    html += `<div class="seat unavailable booked">
                                <img alt="" src="assets/images/chair.svg"/>
                                
                                   </div>`;
                  }

                  break;
                case "3":
                  html += `<div class="seat unavailable booked">
                                <img alt="" src="assets/images/chair.svg"/>
                                <span>${row1.label}</span>
                                   </div>`;
                  break;
                default:
                  // html +=`<div class="seat">
                  // <img alt="" src="assets/images/blank.svg"/>
                  //    </div>`;
                  break;
              }

              html += `</td>`;
            }
          });
          html += `</tr>`;
        });
        html += `</tbody></table>`;
        placeholder.innerHTML = html;

        let seats = document.querySelectorAll(".seat.available");
        // let bookingModal = document.querySelector(".booking-modal");
        seats.forEach((e) => {
          e.addEventListener("click", () => {
            let seat = document.querySelector(
              ".booking-modal>.wraper-item>table>tbody"
            ).children[1];
            let btn = document.getElementById("btn_reserve_passenger");

            seat.innerHTML = `<td>${e.dataset.id}</td>
                                        <td>Seat ${e.dataset.id}</td>
                                        <td>${e.dataset.type}</td>`;
            btn.setAttribute("data-seat", e.dataset.id);
            bookingModal.classList.toggle("active");
            // floatingSearch.style.display = "none";
          });
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

async function getSchedules() {
  let placeholder = document.querySelector(".search-result-main");
  let header = document.getElementById("header_travel");
  let header1 = document.getElementById("side_header");
  let results = 0;
  // $('.search-result-main').LoadingOverlay('show');
  await fetchResults()
    .then((data) => {
      results = data.length;
      if (data.length > 0) {
        sessionStorage.setItem("schedules", JSON.stringify(data));
        let html = "";
        ////console.log(data);

        header.innerHTML = `<p class="mb-0"><span>${data[0].originname}</span> TO <span>${data[0].destinationname}</span></p>
        <span class="fs-3 fw-lighter">Travel Date: <span class="fw-bold">${moment(data[0].tripdate).format("MMMM DD, YYYY - ddd ")}</span></span>`;
        header1.innerHTML = `<p><span>${data[0].originname}</span> - <span>${data[0].destinationname}</span></p>`;
        data.forEach((results, index) => {
          let now = moment(`${data[0].tripdate} ${results["etd"]}`);
          let end = moment(`${data[0].tripdate} ${results["eta"]}`);
          let duration = moment.duration(end.diff(now));
          let tDuration = duration.asHours();
          if (tDuration < 0) {
            tDuration = 24 + tDuration;
          }
          html += `<div class="search-result">
            <div class="highlight">
                <p id="fare">₱ <span>${results["fare"]}</span></p>
                <p id="etd">Departure: <span>${formatTime(results["etd"])}</span></p>
            </div>
            <div class="details">
                <h3 id="bus_type">${results["busoperator"]} | ${results["bustype"]
            }</h3>
                <div class="travel-info">
                  <div class="item">
                    <i class="fas fa-user"></i>
                    <p id="seat_available">Seats available: <span>${results["seatcount"] - results["seatstaken"]
            }</span></p>
                  </div>
                  <div class="item">
                    <i class="fas fa-clock"></i>
                    <p>Time: <span>${tDuration}</span> hours</p>
                  </div>
                  <div class="item">
                  <i class="fas fa-user-clock"></i>
                    <p id="eta">Arrival: <span>${formatTime(
              results["eta"]
            )}</span></p>
                  </div>
               </div>
            </div>
            <button data-id="${index}" class="btn book btn-primary fs-4">Book seats</button></div>`;
        });
        placeholder.innerHTML = html;
      } else {
        header.innerHTML = `<p>We can't find available trips for this date. Please try another search</p>`;

      }

      let bookBtn = document.querySelectorAll(".btn.book");
      let schedules = JSON.parse(sessionStorage.getItem("schedules"));
      bookBtn.forEach((e) => {
        e.addEventListener("click", (attr) => {
          let userInfo = JSON.parse(localStorage.getItem('userInfo'));
          if (userInfo) {
            if (userInfo.CONTACT_NO === '') {
              changeContactNo()
              return;
            }
          }


          let ok = true;
          let current_sched = JSON.parse(
            sessionStorage.getItem("selected-sched")
          );
          let sel_sched = schedules[e.dataset.id];
          if (
            _.isEqual(current_sched, sel_sched) === false &&
            current_sched !== null
          ) {
            let text =
              "Choosing another trip will cancel your seat selection for this trip. Continue?";
            if (confirm(text) == true) {
              cancelBookings();
            } else {
              ok = false;
            }
          }
          if (ok) {
            bookBtn.forEach((e) => {
              e.classList.remove("active");
              e.removeAttribute("disabled");
            });
            e.classList.add("active");
            // e.setAttribute("disabled", true);

            let dest = schedules[e.dataset.id];
            sessionStorage.setItem("sched-etd", dest.etd);
            sessionStorage.setItem("selected-sched", JSON.stringify(dest));

            //console.log(dest);
            sessionStorage.setItem("RouteId", dest.tkey);
            sessionStorage.setItem("BusType", dest.bustype);
            sessionStorage.setItem("clientId", dest.clientid);
            let body = document.querySelector("body");
            //  body.classList.toggle("modal-open");
            let bookingDetails = document.querySelector(".booking-details");
            bookingDetails.style = "position:relative;transform:unset";
            cancelBtn.classList.add("active");
            //continueBtn.classList.add("active");
            getReserve();
            document.querySelector('#consent').style.display = 'block';
            jump('.booking-details')
          }

          // body.classList.toggle("modal-open");
          // cancelBtn.classList.add("active");
          // continueBtn.classList.add("active");
          // seatSelect.classList.add("active");
        });
      });
    })
    .catch((error) => {
      console.log(error);
      //swal.fire({ title: 'Oops.. Error occurred', text: 'Cannot get Trip Schedules' });
    });
  // $('.loaderImg').classList.add('d-none');
  //$('.search-result-main').LoadingOverlay('hide');

  if (results == 0) header.innerHTML = `<span style="font-size: medium;">We can't find available trips for
  this date. Please try another search</span>`;
}

function getLocationF() {
  fetchLocationF()
    .then((data) => {
      if (data.length > 0) {
        let html = '';
        let placeholder = document.querySelector(".item.from-locationsF");
        data.forEach(route => {
          html += '<div><h5></h5>';
          // console.log('route', route);
          html += `<a data-clientid="${route.clientid}" data-origin="${route.originname}" data-dest="${route.destinationname}"><i class="fas fa-crosshairs"></i>${route.originname} to ${route.destinationname}</a>`;
        })
        html += "</div>";
        placeholder.innerHTML = html;

        let fromLocationF, fromValueF;
        fromLocationF = document.querySelectorAll(".item.from-locationsF a");
        fromValueF = document.querySelector("#routeF");
        fromLocationF.forEach((e) => {
          e.addEventListener("click", () => {
            fromValueF.setAttribute("value", e.textContent);
            fromValueF.setAttribute("data-clientid", e.dataset.clientid);
            fromValueF.setAttribute("data-origin", e.dataset.origin);
            fromValueF.setAttribute("data-destination", e.dataset.dest);
            fromValueF.value = e.textContent;
            sessionStorage.setItem("originName", e.dataset.origin);
            sessionStorage.setItem("destinationName", e.dataset.dest);
          });
        });

      }
    })
}


function getLocation(search = "") {
  fetchLocation()
    .then((data) => {
      // //console.log(data);
      if (data.length > 0) {
        let html = "";
        let placeholder = document.querySelector(".item.from-locations");

        var results = _.filter(data, function (row) {
          return row.originName.indexOf(search.toUpperCase()) > -1;
        });

        let gd = _.groupBy(JSON.parse(JSON.stringify(results)), "area");
        _.forEach(gd, function (item, area) {
          html += `<div><h5 style="margin-left: 10px;font-size: small">${area}</h5>`;
          item.forEach((loc) => {
            html += `<a data-clientid="${loc.clientID}" data-id="${loc.destinationid}"><i class="fas fa-crosshairs"></i>${loc.originName} </a>`;
          });
          html += "</div>";
        });
        placeholder.innerHTML = html;
      }

      let fromLocation, fromValue;
      fromLocation = document.querySelectorAll(".item.from-locations a");
      fromValue = document.querySelector(".from-value");
      fromLocation.forEach((e) => {
        e.addEventListener("click", () => {
          fromValue.setAttribute("value", e.textContent);
          fromValue.setAttribute("data-id", e.dataset.id);
          fromValue.setAttribute("data-clientid", e.dataset.clientid);
          fromValue.value = e.textContent;
          sessionStorage.setItem("originName", e.textContent);
          document.querySelector(".to-value").value = "";
          getDestination();
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function Logout() {
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = "./";
}

function getDestination(search = "") {
  // alert(origin);
  let toLocation;
  let toValue;
  toLocation = document.querySelectorAll(".item.to-locations a");
  fetchToLocation()
    .then((data) => {
      if (data.length > 0) {
        let destination = sessionStorage.getItem("destinationName");
        let html = "";
        let placeholder = document.querySelector(".item.to-locations");
        var results = _.filter(data, function (row) {
          return row.destinationname.indexOf(search.toUpperCase()) > -1;
        });

        let gd = _.groupBy(JSON.parse(JSON.stringify(results)), "area");

        // toValue = document.querySelector(".to-value");
        // toValue.value = '';
        ////console.log(dg);
        _.forEach(gd, (item, area) => {
          html += `<div><h5 style="margin-left: 10px;font-size: small">${area}</h5>`;
          // toValue.value = item[0].destinationname;
          // toValue.setAttribute("data-id", item[0].destinationid);
          item.forEach((loc) => {
            // if (destination === loc.destinationname) {
            //   //console.log(destination);
            //   toValue.value = loc.destinationname;
            //   toValue.setAttribute("data-id", loc.destinationid);
            // }
            html += `<a data-id="${loc.destinationid}"><i class="fas fa-crosshairs"></i>${loc.destinationname} </a>`;
          });
          html += "</div>";
        });
        placeholder.innerHTML = html;
      }
      toValue = document.querySelector(".to-value");
      toLocation = document.querySelectorAll(".item.to-locations a");
      toLocation.forEach((e) => {
        e.addEventListener("click", () => {
          ////console.log(e);
          toValue.setAttribute("value", e.textContent);
          toValue.value = e.textContent;
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function formatDate(date) {
  return moment(date).format("ddd, MMM DD");
  // let tDate = new Date(date)
  // return tDate.toLocaleString('en', {
  //     weekday: "short",
  //     month: "short",
  //     day: "numeric",
  // })
}
function formatDate1(date) {
  return moment(date).format("YYYY-MM-DD");
  // let tDate = new Date(date);
  // let y = tDate.getFullYear();
  // let m = tDate.getMonth() < 10 ? '0' + tDate.getMonth() : tDate.getMonth();
  // let d = tDate.getDay() < 10 ? '0' + tDate.getDay() : tDate.getDay();
  // return (y + '-' + m + '-' + d);
}

function formatDateL(date) {
  let tDate = new Date(date);
  return tDate.toLocaleString("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(time) {
  return moment("2022-01-01 " + time).format("hh:mm A");
}

function SearchForm(e) {
  e.preventDefault();
  let from = document.getElementById("from");

  let to = document.getElementById("to");
  let paxcount = document.getElementById("passenger").value;
  // alert(paxcount);
  let departure = document.getElementById("date_of_departure").value;
  let origin = from.value;
  let destination = to.value;
  let clientId = from.dataset.clientid;
  let result;
  if (from && to) {
    sessionStorage.setItem("originName", origin);
    sessionStorage.setItem("destinationName", destination);
    sessionStorage.setItem("passenger_count", paxcount);
    sessionStorage.setItem("departure", departure);
    // sessionStorage.setItem("clientId", clientId);
    // fetchResults(true, {background: 'rgba(255, 255, 255, 0.3)', image: '', text: 'searching'}).then(res => {
    fetchResults(true)
      .then((res) => {
        if (res.length === 0) {
          Swal.fire("We can't find available trips for this date. Please try another search");
        } else {
          window.location.href =
            document.URL.substring(0, document.URL.lastIndexOf("/")) +
            "/booking.html";
        }
      })
      .catch((error) => {
        console.log(error);
        swal.fire({ title: 'Oops.. Error occurred', text: 'Cannot get Trip Schedules' });
      });
  }
}

function SearchFormF(e) {
  e.preventDefault();
  let route = document.getElementById("routeF");
  let paxcount = document.getElementById("passengerF").value;
  let departure = document.getElementById("date_of_departureF").value;
  // let clientId = from.dataset.clientid;
  // let result;
  if (route.dataset.origin && route.dataset.destination) {
    sessionStorage.setItem("originName", route.dataset.origin);
    sessionStorage.setItem("destinationName", route.dataset.destination);
    sessionStorage.setItem("passenger_count", paxcount);
    sessionStorage.setItem("departure", departure);
    // sessionStorage.setItem("clientId", clientId);
    // fetchResults(true, {background: 'rgba(255, 255, 255, 0.3)', image: '', text: 'searching'}).then(res => {
    fetchResults(true)
      .then((res) => {
        if (res.length === 0) {
          Swal.fire("We can't find available trips for this date. Please try another search");
        } else {
          window.location.href =
            document.URL.substring(0, document.URL.lastIndexOf("/")) +
            "/booking.html";
        }
      })
      .catch((error) => {
        console.log(error);
        swal.fire({ title: 'Oops.. Error occurred', text: 'Cannot get Trip Schedules' });
      });
  }
}

$(".gcashi").click(async function () {
  let okay = false;
  let fee = 0;
  let refNo = "";
  let pax_data = JSON.parse(sessionStorage.getItem('tripInfo'));
  await fetchReservationInfo(pax_data).then(data => {
    let status = data[0].ReservationStatus;
    if (status === 'ACTIVE') {
      okay = true;
    } else {
      okay = false;
      return;
    }
    data.forEach(row => {
      fee += row.AccommodationFee + row.ConvenienceFee;
      refNo = row.ReservationNo;
    });
  })
  if (okay) {
    fee = fee * 1.029;
    paygcash(fee, refNo);
  }
  else {
    return false;
  }
});

function paygcash(amount, refNo) {
  var pax_data = {
    module: "IWANTSEATS",
    amount: parseFloat(amount).toFixed(2),
    email: "",
    refno: refNo,
    mobile: "",
    token: localStorage.getItem("TOKEN"),
  };
  //console.log(pax_data);
  try {
    $.ajax({
      url: "https://iwsenterprise.com/iwsticketing_v3/enterprise/paymongocreatesource_augmata.aspx",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      beforeSend: function () {
        $.LoadingOverlay("show");
      },
      complete: function () {
        $.LoadingOverlay("hide");
      },
      data: JSON.stringify(pax_data),
      success: function (data) {
        var data1 = JSON.stringify(data);
        var data11 = JSON.parse(data1);
        if (data11.RESULT === "SAVED") {
          // window.open(data11.URL, '_blank');
          top.window.location.href = data11.URL;
          //           let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
          // width=0,height=0,left=-1000,top=-1000`;
          //           open(data11.URL, "GCASH", params);
        } else {
          swal.fire("Oops. It appears we cannot process your GCash payment for now.", '', 'error');
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("a:" + textStatus);
      }, //End for ajax error
    }); //End for ajax /api/reservations/passenger/
  } catch (ex) {
    alert(ex.message);
  }
}

var loadFile = function (event) {
  var output = document.getElementById("iproof");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
};

function UploadFile(evt) {
  evt.preventDefault();
  var token = localStorage.getItem("TOKEN");
  //alert(newpaxlist[0].ReservationNo);
  // Before the request starts, show the 'Loading message...'
  // $('.result').text('File is being uploaded...');
  //event.preventDefault();
  // On the click even,
  var formData = new FormData($("#payForm")[0]);
  let apiURL = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine`;
  let reslist = JSON.parse(sessionStorage.getItem("reservation"));
  $.ajax({
    type: "POST",
    url:
      apiURL +
      "/savefile/" +
      token +
      "/" +
      reslist[0].ReservationNo +
      "/PAYMENT",
    processData: false,
    contentType: false,
    data: formData,
    success: function (data) {
      swal.fire({
        title: "Thank you for booking!",
        text: "Please check your confirmed itinerary in your email once payment is confirmed. For booking concerns, please email us at payments@iwantseats.com.ph",
        type: "success"
      }).then(function () {
        window.location.href = document.URL.substring(0, document.URL.lastIndexOf("/")) +
          "/user-admin.html";
      });
    },
    error: function (data) {
      swal.fire("Oops.. Error occurred", '', 'error');
      // there was an error.
      // $('#alert_message span').text('Whoops! There was an error in the request.');
    },
  });
}

function getHistory() {
  fetchBookingHistory()
    .then((result) => {
      let options = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };
      let placeholder = document.querySelector(
        ".booking-history>div>table>tbody"
      );
      let placeholder1 = document.querySelector(
        ".active-booking>div>table>tbody"
      );
      let html = "";
      let html1 = "";
      //console.log(result);
      result.forEach((row) => {
        if (row.reservationstatus === "ACTIVE") {
          html1 += `<tr class="s-ac">
                      <td>${row.bus_operator}</td>
                      <td>${row.origin} - ${row.destination}</td>
                      <td>
                        <p>
                          <i class="fas fa-calendar-alt"></i> <span>${row.etd.split(" ")[0]}</span>
                        </p>
                        <p><i class="fas fa-clock"></i><span>${formatTime(row.etd.split(" ")[1])}</span></p>
                      </td>
                      <td><a style="font-size:1.6rem" class="btn btn-success" href="javascript:;" onclick="SetTrip('${row.reference_no}','${row.trip_id}',${row.clientid})"><i class="fas fa-info-circle"></i> ${row.reference_no}</a></td>
                      <td>${row.total_amount_due.toLocaleString("en", options)}</td>
                      <td>${row.paidstatus}</td>
                      <td>${row.reservationstatus}</td>
                      <td>
                        <p>
                          <i class="fas fa-calendar-alt"></i> <span>${row.expiration.split(" ")[0]
            }</span>
                        </p>
                        <p><i class="fas fa-clock"></i><span>${formatTime(
              row.expiration.split(" ")[1])}</span></p>
                      </td>
                    </tr>`;
        } else {
          html += `<tr>
                      <td>${row.bus_operator}</td>
                      <td>${row.origin} - ${row.destination}</td>
                      <td>
                        <p>
                          <i class="fas fa-calendar-alt"></i> <span>${row.etd.split(" ")[0]
            }</span>
                        </p>
                        <p><i class="fas fa-clock"></i><span>${formatTime(
              row.etd.split(" ")[1]
            )}</span></p>
                      </td>
                      <td>${row.reference_no}</td>
                      <td>${row.total_amount_due.toLocaleString("en", options)}</td>
                      <td>${row.paidstatus}</td>
                      <td>${row.reservationstatus}</td>
                      <td>
                        <p>
                          <i class="fas fa-calendar-alt"></i> <span>${row.expiration.split(" ")[0]}</span>
                        </p>
                        <p><i class="fas fa-clock"></i><span>${formatTime(row.expiration.split(" ")[1])}</span></p>
                      </td>
                    </tr>`;
        }
      });

      placeholder.innerHTML = html;
      placeholder1.innerHTML = html1;
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
};

$(document).ready(() => {
  //$.LoadingOverlay("show");
  let div = document.querySelector(".status");
  if (localStorage.getItem("TOKEN")) {
    div.innerHTML = `
                        <a href="user-admin.html" onclick="menu()">My Account</a>
                    <a href="#" onclick="Logout()">
                    <button style="margin-left: 5px" class="btn-primary">Logout</button>
                </a>`;
  } else {
    div.innerHTML = `<a href="login.html" onclick="menu()">
                <button class="btn-primary">Login</button>
            </a> `;
  }

  let path = window.location.pathname;
  let page = path.split("/").pop();

  if (page.includes("index") || page === "" || page.includes("joybus")) {
    action = GetURLParameter('action');
    let token = GetURLParameter('token');
    let stoken = localStorage.getItem("TOKEN");
    getLocation();
    getLocationF();
    document.getElementById('date_of_departure').value = moment().add(1, 'days').format('YYYY-MM-DD');
    if (action == 'resetpass') {
      if (stoken) {
        sessionStorage.clear();
        localStorage.clear();
        location.reload();
        // window.location.href = `./?action=resetpwd&token=${token}`;  
      } else {
        $('#fToken').val(token);
        $('#modal-resetpass').modal('show');
      }
    }

  }

  if (page.includes("booking")) {
    action = GetURLParameter('action');
    //console.log(action);
    if (action && action === 'getreservation') {
      let bookingDetails = document.querySelector(".booking-details");
      bookingDetails.style = "position:relative;transform:unset";
      // body.classList.toggle("modal-open");
      loadTrip();
    } else {
      getSchedules();
    }
    $('.loaderImg').addClass('d-none');

    sessionStorage.removeItem("selected-sched");

  }
  // $('.loaderImg').addClass('d-none');
  // $.LoadingOverlay("hide");
});

$("#contactForm").submit(async function (e) {
  e.preventDefault();
  let formData = new FormData(this);
  let name = formData.get("name");
  let email = formData.get("email");
  let message = formData.get("message");
  let body = `<p>Dear iWantSeats,</p><p><strong>${name}</strong> has sent you a message.</p><p><em><strong>${message}</strong></em></p>`;
  Swal.fire({
    title: "Please Wait..",
    allowOutsideClick: false,
    showCancelButton: false,
    showConfirmButton: false,
    allowEscapeKey: false,
    willOpen: async function (e) {
      Swal.showLoading();
      let data = {
        groupname: "IWANTSEATS CONTACT",
        recipients: `${email}:notifications@iwantseats.com`,
        message: body,
      };
      //console.log("send-data", data);
      let input = `https://iwsenterprise.com/squareone/api_pasabuy_sendemail.aspx`;
      let res = await axios.post(input, data, axiosConfig);
      //console.log(res.data);
      if (res.data === "SAVED") {
        Swal.fire(
          "Thank you for contacting us.",
          "We appreciate that you've taken the time to write us, We'll get back to you very soon.",
          "success"
        );
        $("#contactForm").trigger("reset");
      } else {
        Swal.fire("Failed..", "", "error");
        //console.log("response", res);
      }
    },
  });
});


function loadTrip() {
  $.LoadingOverlay('show');
  let pax_data = JSON.parse(sessionStorage.getItem('tripInfo'));
  fetchReservationInfo(pax_data).then(data => {
    //console.log('reservation_date', data);
    if (data.length > 0) {
      if (data[0].ReservationStatus != 'ACTIVE') {
        swal.fire('Oops..', 'This reservation is invalid/expired', 'info').then(function () {
          window.location = "user-admin.html";
        });
      }
      sessionStorage.setItem("refNo", data[0].ReferenceNo);
      sessionStorage.setItem("reservation", JSON.stringify(data));

      sessionStorage.setItem("departure", data[0].TripDate),
        sessionStorage.setItem("RouteId", data[0].RouteId);
      sessionStorage.setItem("BusType", data[0].BusType);
      sessionStorage.setItem("clientId", data[0].clientID);

      sessionStorage.setItem("passenger_count", data.length);
      let header = document.getElementById("header_travel");
      let header1 = document.getElementById("side_header");
      let placeholder = document.querySelector(" .search-result-main");
      placeholder.innerHTML = `<p style="margin-left:15px">Click CONTINUE to proceed.</p>`;
      header.innerHTML = `<p class="mb-0"><span>${data[0].Origin}</span> TO <span>${data[0].Destination}</span></p>
        <span class="fs-3 fw-lighter">Travel Date: <span class="fw-bold">${moment(data[0].TripDate).format("MMMM DD, YYYY - ddd ")}</span></span>`;
      header1.innerHTML = `<p><span>${data[0].Origin}</span> - <span>${data[0].Destination}</span></p>`;
      let passList = document.getElementById("passenger_assign");
      let passLists = document.getElementById("passenger-list");
      let resBox = document.querySelector(".reserveBox");
      resBox.style.display = "block";
      document.getElementById("reservationNo").innerHTML =
        data[0].ReservationNo;

      // header.innerHTML = `<p><span>${data[0].Origin}</span> TO <span>${data[0].Destination}</span></p>`
      let html = "",
        htmList = "";

      let fare = 0;
      let paxCount = data.length;
      let sub_total = 0;
      let resvFee = 0;
      data.forEach((res, index) => {
        fare = res.AccommodationFee;
        sub_total += res.AccommodationFee;
        resvFee += res.ConvenienceFee;
        let name = `${res.LastName}, ${res.FirstName}`;
        if (res.SeatNo === "UNASSIGNED") {
          seatOK = false;
        }
        html += `<option value="${res.ReferenceNo}">${name}</option>`;
        htmList += `<div class="block">
                              <div class="item">
                                  <div>
                                      <p>Seat no:</p>
                                      <p>${res.SeatNo}</p>
                                  </div>
                              </div>
                              <div class="item">
                                  <div>
                                      <p>Name:</p>
                                      <p>${name}</p>
                                  </div>
                                  <i class="fas fa-pencil-alt" data-id ="${index}" onclick="editBookingUser(this)"></i>
                              </div>
                          </div>`;
      });
      let dest = JSON.parse(JSON.stringify(data[0]));

      document.getElementById("side_departure").textContent = `${formatDate(
        dest.TripDate
      )} - ${formatTime(dest.Departure)}`;
      document.getElementById("s_fare").textContent =
        "₱ " + fare.toFixed(2);
      document.getElementById(
        "sub_total"
      ).innerHTML = `<p>Departure <span>(${paxCount} pax)</span></p>
                  <div class="item">
                  <p>Sub Total <span>(${paxCount} pax)</span></p>
                  <h3><span>₱ ${sub_total.toFixed(2)}</span></h3>
              </div>`;
      document.getElementById("gran_total").textContent =
        "₱ " + (sub_total + resvFee).toFixed(2);
      document.getElementById("res_fee").textContent =
        "₱ " + resvFee.toFixed(2);

      document.querySelector('#consent').style.display = 'block';
      passengersInfo.classList.add("active");
      payCon.removeAttribute("disabled", false);
      passList.innerHTML = html;
      passLists.innerHTML = htmList;
      cancelBtn.classList.add("active");
      //continueBtn.classList.add("active");
      // getReserve();
      //modal.classList.add("active");
      $.LoadingOverlay('hide');

    } else {
      swal.fire('Oops..', 'This reservation is invalid/expired', 'info').then(function () {
        window.location = "user-admin.html";
      });

    }
  });
  $.LoadingOverlay('hide');

}


function SetTrip(refNo, tripId, clientId, redirect = true) {
  let pax_data = {
    "clientid": clientId,
    "token": sessionStorage.getItem('TOKEN'),
    "tripID": tripId,
    "referenceNo": '~' + refNo
  };
  sessionStorage.setItem('tripInfo', JSON.stringify(pax_data));
  if (redirect) window.location.href = "booking.html?action=getreservation";
  // //console.log(data);

}


function jump(h) {
  var top = document.querySelector(h).offsetTop;
  window.scrollTo(0, top - 60);
}


async function changeContactNo() {
  Swal.fire({
    html: `<div class="text-center">
            <p>Mobile number is requested in case there are updates regarding your trip and other concerns.</p>
            <label class="form-label fs-5">Enter your Contact No.</label>
            <input id="contactNo" class="form-control fs-4" type="text" placeholder="Enter Contact No." />
        </div>`,
    confirmButtonText: 'Submit',
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      let num = Swal.getPopup().querySelector('#contactNo').value
      if (!num) {
        Swal.showValidationMessage(`Please enter Contact No.`)
      }
      return { contactNo: num }
    }
  }).then((result) => {
    if (result.value.contactNo) {
      Swal.fire({
        title: "Please Wait..",
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
        allowEscapeKey: false,
        willOpen: async function (e) {
          Swal.showLoading();
          let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
          let userInfo = JSON.parse(localStorage.getItem('userInfo'));
          let data = {
            token: userInfo.TOKEN,
            password: loginInfo.pwd,
            firstname: userInfo.USERNAME.split(',')[1],
            middlename: "",
            lastname: userInfo.USERNAME.split(',')[1],
            birthDate: formatDate1(userInfo.BIRTHDATE),
            contactNo: result.value.contactNo,
            gender: "M"
          };
          //console.log(data);
          let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/updateonlineuser`;
          let res = await axios.post(input, data, axiosConfig);
          //console.log('response', res.data);
          if (res.data.RESULT === "SAVED") {
            Swal.fire(
              "Success.. Contact No. successfull saved",
              "",
              "success"
            );
            userInfo['CONTACT_NO'] = result.value.contactNo;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
          } else {
            Swal.fire("Oops.. Error Occured. Pleaset try again.", "", "error");
          }
          //console.log(result.value);
        },
      });
    }

  })

}

async function changeContactNo1() {
  Swal.fire({
    text: "Mobile number is requested in case there are updates regarding your trip and other concerns.",
    input: "text",
    inputLabel: "Enter your Contact No.",
    inputPlaceholder: "Enter Contact No.",
    allowOutsideClick: false,
    showCancelButton: true,
    confirmButtonText: "Submit",
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Please Wait..",
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
        allowEscapeKey: false,
        willOpen: async function (e) {
          Swal.showLoading();
          let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
          let userInfo = JSON.parse(localStorage.getItem('userInfo'));
          let data = {
            token: userInfo.TOKEN,
            password: loginInfo.pwd,
            firstname: userInfo.USERNAME.split(',')[1],
            middlename: "",
            lastname: userInfo.USERNAME.split(',')[1],
            birthDate: formatDate1(userInfo.BIRTHDATE),
            contactNo: result.value,
            gender: "M"
          };
          //console.log(data);
          let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/updateonlineuser`;
          let res = await axios.post(input, data, axiosConfig);
          //console.log('response', res.data);
          if (res.data.RESULT === "SAVED") {
            Swal.fire(
              "Success.. Contact No. successfull saved",
              "",
              "success"
            );
          } else {
            Swal.fire("Oops.. Error Occured", "", "error");
          }
          //console.log(result.value);
          userInfo['CONTACT_NO'] = result.value;
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        },
      });
    }
  });
}


// async function getSelectedTrip(){

//   let data = {
//     clientId: sessionStorage.getItem("clientId"),
//     token: token,
//     tripDate: sessionStorage.getItem("departure"),
//     noOfPax: sessionStorage.getItem("passenger_count"),
//     routeId: sessionStorage.getItem("RouteId"),
//     reservationStatus: "0",
//     firstName: "a",
//     middleName: "a",
//     lastName: "a",
//     seatNo: "UNASSIGNED",
//     paxDiscountId: "",
//     discountType: "",
//     bookingAgent: "IWS",
//     userId: "1",
//     bookedBy: "",
//     paidBy: "",
//     modeOfPayment: "",
//     paymentRemarks: "",
//     pickUp: sessionStorage.getItem("RouteId").split(".")[1],
//     dropOff: sessionStorage.getItem("RouteId").split(".")[2],
//   };

//   let dest = schedules[e.dataset.id];
//   sessionStorage.setItem("sched-etd", dest.etd);
//   sessionStorage.setItem("selected-sched", JSON.stringify(dest));
//   //console.log(dest);
//   sessionStorage.setItem("RouteId", dest.tkey);
//   sessionStorage.setItem("BusType", dest.bustype);
//   sessionStorage.setItem("clientId", dest.clientid);
//   let body = document.querySelector("body");
//   //  body.classList.toggle("modal-open");
//   let bookingDetails = document.querySelector(".booking-details");
//   bookingDetails.style = "position:relative;transform:unset";
//   cancelBtn.classList.add("active");
// }
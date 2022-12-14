let confirmModal = document.querySelector(".booking-confirm");
$.LoadingOverlaySetup({
    imageColor      : "#4a6923"
});
async function fetchBookingHistory() {
    let token = localStorage.getItem('TOKEN');
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/bookinghistorytest/${token}`;
    if (token) {
        //console.log(input);
        let data = {
            "token": token,
        }
        ////console.log(input)
        let response = await fetch(input, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'post',
            body: JSON.stringify(data)
        });
        //console.log(JSON.stringify(data));

        return await response.json();
    } else {
        window.location.href = document.URL.substring(0, document.URL.lastIndexOf('/')) + '/login.html';
    }
}

async function fetchResults(show = false, options = {}, target = 'body') {
    let clientId, date, origin, destination, paxCount;
    ////console.log(target);
    if (show) $(target).LoadingOverlay("show", options)
    origin = localStorage.getItem('originName');
    destination = localStorage.getItem('destinationName');
    date = localStorage.getItem('departure');
    clientId = localStorage.getItem('clientId');
    paxCount = localStorage.getItem('passenger_count');
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/getschedules2test/2/${clientId}/${date}/${origin.trim()}/${destination.trim()}/${paxCount}`;
    //console.log(input);
    let response = await fetch(input);
    $(target).LoadingOverlay("hide")
    return await response.json();
}

async function fetchReservationInfo(data) {
    let token = localStorage.getItem('TOKEN');
    if (token) {

        let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/getreservationinfotest/${token}`;
        //console.log(input);
        let response = await fetch(input, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'post',
            body: JSON.stringify(data)
        });
        //console.log(JSON.stringify(data));

        return await response.json();
    } else {
        window.location.href = document.URL.substring(0, document.URL.lastIndexOf('/')) + '/login.html';
    }
}


async function fetchUpdatePassenger(data) {
    let token = localStorage.getItem('TOKEN');
    if (token) {
        let refNo = localStorage.getItem('refNo');
        let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/passenger/${token}/${refNo}`;
        //console.log(input);
        let response = await fetch(input, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'post',
            body: JSON.stringify(data)
        });
        //console.log(JSON.stringify(data));

        return await response.json();
    } else {
        window.location.href = document.URL.substring(0, document.URL.lastIndexOf('/')) + '/login.html';
    }
}

async function fetchCancelBooking(data) {
    let token = localStorage.getItem('TOKEN');
    if (token) {

        let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/cancelbooking/${token}`;
        //console.log(input);
        let response = await fetch(input, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'post',
            body: JSON.stringify(data)
        });
        //console.log(JSON.stringify(data));
        return await response.json();
    } else {
        window.location.href = document.URL.substring(0, document.URL.lastIndexOf('/')) + '/login.html';
    }
}


async function fetchPassengerSeat(refNo, seatNo) {
    // $('.bus-seat-select').LoadingOverlay('show');
    let token = localStorage.getItem('TOKEN');
    if (token) {
        let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/updatepassengerseattest/${token}`;
        let data = {
            "ClientID": localStorage.getItem('clientId'),
            "TripDate": localStorage.getItem('departure'),
            "RouteID": localStorage.getItem('RouteId'),
            "BusType": localStorage.getItem('BusType'),
            "ReferenceNo": refNo,
            "SeatNo": seatNo
        };
        //console.log(input);
        let response = await fetch(input, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'post',
            body: JSON.stringify(data)
        });
        //console.log(JSON.stringify(data));
        // $('.bus-seat-select').LoadingOverlay('hide');
        return await response.json();
    } else {
        window.location.href = document.URL.substring(0, document.URL.lastIndexOf('/')) + '/login.html';
    }
}

async function fetchManifest() {
    $('.bus-seat-select').LoadingOverlay('show');
    let token = localStorage.getItem('TOKEN');
    if (token) {
        let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/manifesttest/${token}`;
        //console.log(input);
        let data = {
            "clientid": localStorage.getItem('clientId'),
            "tripdate": localStorage.getItem('departure'),
            "routeid": localStorage.getItem('RouteId'),
            "BusType": localStorage.getItem('BusType')
        };
        // //console.log(JSON.stringify(data));
        let response = await fetch(input, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'post',
            body: JSON.stringify(data)
        });
        //console.log(JSON.stringify(data));
        $('.bus-seat-select').LoadingOverlay('hide');
        // $('.modal-content').LoadingOverlay('hide');
        return await response.json();

    } else {
        window.location.href = document.URL.substring(0, document.URL.lastIndexOf('/')) + '/login.html';
    }
}

async function fetchReserve() {
    $('.booking-details').LoadingOverlay('show');
    let token = localStorage.getItem('TOKEN');
    if (token) {

        let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/reservetest/${token}`;
        //console.log(input);
        let data = {
            "clientId": localStorage.getItem('clientId'),
            "token": token,
            "tripDate": localStorage.getItem('departure'),
            "noOfPax": localStorage.getItem('passenger_count'),
            "routeId": localStorage.getItem('RouteId'),
            "reservationStatus": "0",
            "firstName": "a",
            "middleName": "a",
            "lastName": "a",
            "seatNo": "UNASSIGNED",
            "paxDiscountId": "",
            "discountType": "",
            "bookingAgent": "IWS",
            "userId": "1",
            "bookedBy": "",
            "paidBy": "",
            "modeOfPayment": "",
            "paymentRemarks": "",
            "pickUp": localStorage.getItem('RouteId').split('.')[1],
            "dropOff": localStorage.getItem('RouteId').split('.')[2]
        };
        ////console.log('RESERVE POST');
        ////console.log(JSON.stringify(data));
        let response = await fetch(input, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'post',
            body: JSON.stringify(data)
        });
        $('.booking-details').LoadingOverlay('hide');
        return await response.json();

    } else {
        window.location.href = document.URL.substring(0, document.URL.lastIndexOf('/')) + '/login.html';
    }
}

async function fetchLocation() {
    // $('.from-value').LoadingOverlay('show');
    let input = 'https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/getorigindestinations2/1/-1/1000';
    //console.log(input);
    let response = await fetch(input);
    // $('.from-value').LoadingOverlay('hide');
    return await response.json();
}

async function fetchToLocation() {
    let name = localStorage.getItem('originName');
    // $('.to-value').LoadingOverlay('show');
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/getorigindestinations2/2/${name}/1000`;
    //console.log(input);
    let response = await fetch(input);
    // $('.to-value').LoadingOverlay('hide');
    return await response.json();
}

groupBy = (list, keyGetter) => {
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
}

getPassengerInfo = (id) => {
    let reservation = localStorage.getItem('reservation');
    let cinfo = JSON.parse(reservation)[id];
    let pBooker = parseInt(id) === 0 ? 1 : 0;
    localStorage.setItem('refNo', cinfo.ReferenceNo);
    localStorage.setItem('pBooker', pBooker);
    document.querySelector('#email').value = cinfo.Email;
    document.querySelector('#first_name').value = cinfo.FirstName;
    document.querySelector('#last_name').value = cinfo.LastName;
    // if (cinfo.Gender === 'Male') {
    //     document.querySelector('#male').checked = true;
    // } else {
    //     document.querySelector('#female').checked = true;
    // }
    document.querySelector('#birthday').value = cinfo.BirthDate;
    document.querySelector('#contact_number').value = cinfo.ContactNo;
};

cancelBookings = () => {
    let reservation = localStorage.getItem('reservation');
    let info = JSON.parse(reservation)[0];
    let data = {
        "ClientID": info.clientID,
        "TripDate": info.TripDate,
        "RouteID": info.RouteId,
        "BusType": info.BusType,
        "ReservationNo": info.ReservationNo,
        "CancelStatus": "1",
        "CancelRemarks": "CANCEL"
    }
    fetchCancelBooking(data).then(res => {
        if (res.result === 'OK') {
            localStorage.removeItem('reservation');
            // modal.classList.remove('active');
            // Swal.fire('Success', 'Your bookings is successfully cancelled.', 'success');
        }
    })
}

EditInfo = (e) => {
    e.preventDefault();
    let data = {
        "clientid": localStorage.getItem('clientId'),
        "loyaltyId": "",
        "birthDate": document.querySelector('#birthday').value,
        "contactNo": document.querySelector('#contact_number').value,
        "email": document.querySelector('#email').value,
        "firstName": document.querySelector('#first_name').value,
        // "gender": document.querySelector("input[name='gender']:checked").value,
        "lastName": document.querySelector('#last_name').value,
        "middleName": "",
        "referenceNo": localStorage.getItem('refNo'),
        "replaceprimarybooker": parseInt(localStorage.getItem('pBooker')),
        "tripID": localStorage.getItem('departure') + '.' + localStorage.getItem('RouteId')
    }
    fetchUpdatePassenger(data).then(res => {
        console.log(res);
        if (res.result === 'OK') {
            editBookedInfo.classList.remove("active");
            getReserve(false);
        }
    }).catch(error => {
        //console.log(error);
    });

};

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
//                     html += `<a data-clientid="${loc.clientID}" data-id="${loc.destinationid}"><i class="uil uil-crosshair"></i>${loc.originName} </a>`;
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


getReserve = (gManifest = true) => {
    let modal = document.querySelector('.modal');
    fetchReserve().then(data => {
        console.log('RESERVE RESULT',data);
        if (data.length > 0) {
            let passList = document.getElementById('passenger_assign');
            let passLists = document.getElementById('passenger-list');
            let header = document.getElementById("header-booking");
            let resBox = document.querySelector('.reserveBox');
            resBox.style.display = 'block';
            document.getElementById('reservationNo').innerHTML = data[0].ReservationNo;
            // header.innerHTML = `<p><span>${data[0].Origin}</span> TO <span>${data[0].Destination}</span></p>`
            let html = '', htmList = '';
            localStorage.setItem('refNo', data[0].ReferenceNo);
            localStorage.setItem('reservation', JSON.stringify(data));
            if (data.length !== parseInt(localStorage.getItem('passenger_count'))) {
                console.log('bookings cancelled');
                cancelBookings();
                return getReserve();
            }

            let aComplete = true;
            data.forEach((res, index) => {
                let name = `${res.LastName}, ${res.FirstName}`;
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
                                    <i class="uil uil-pen" data-id ="${index}" onclick="editBookingUser(this)"></i>
                                </div>
                            </div>`;
                if(res.SeatNo === 'UNASSIGNED'){
                    aComplete = false;
                }

            })
            if(aComplete) {
                seatSelect.classList.remove("active");
            }
            passengersInfo.classList.add("active");
            payCon.removeAttribute("disabled", false);
            passList.innerHTML = html;
            passLists.innerHTML = htmList;
            if (gManifest) getManifest();
            //modal.classList.add("active");
            //seatSelect.classList.add("active");
        }
    }).catch(error => {
        //console.log(error);
    });


}

function assignSeat() {
    getManifest();
    seatSelect.classList.add("active");
    bookingDetails.scrollTop = 0;
}

function closeModalInfo() {
    editBookedInfo.classList.remove('active');
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

getManifest = () => {
    fetchManifest().then(data => {
        // //console.log(data);
        bookingDetails.scrollTop = 0;
        if (data.RESULT === 'SEATPLAN NOT FOUND') {
            Swal.fire(data.RESULT);
        } else {
            let gp = _.groupBy(JSON.parse(JSON.stringify(data)), 'row');
            console.log(gp);
            let placeholder = document.querySelector('.bus-body');
            let html = `<table class="table table-sm"><tbody>`;
            _.forEach(gp, (list, row) => {
                html += '<tr>';
                list.forEach((row1) => {
                    if (row1.row === 0) {
                        if (row1.label === 'DRIVER') {
                            html += `<td><div class="unavailable">
                                <img alt="" src="assets/images/driver.svg"/>
                                   </div></td>`;

                        } else if (row1.label === 'CONDUCTOR') {
                            html += `<td><div class="unavailable">
                                <img alt="" style="width: 65%" src="assets/images/conducter.svg"/>
                                   </div></td>`;
                        } else {
                            html += `<td></td>`;
                        }
                    } else {
                        html += `<td>`;
                        switch (row1.type) {
                            case '0':
                                html += `<div class="">
                                <img alt="" src="assets/images/blank.svg"/>
                                   </div>`;
                                break;
                            case '1':
                                html += `<div data-id="${row1.value}" data-type="${row1.type}" class="seat ${(row1.value === '') ? 'unavailable booked' : 'available'}">
                                <img alt="" src="assets/images/chair.svg"/>
                                <span>${row1.label}</span>
                                   </div>`;
                                break;
                            case '2':
                                if (row1.value === '' || row1.value === 'COMFORT ROOM' || row1.value === 'CR' || row1.label === 'CR' || row1.label === 'COMFORT ROOM') {
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
                            case '3':
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
                })
                html += `</tr>`;
            })
            html += `</tbody></table>`;
            placeholder.innerHTML = html;

            let seats = document.querySelectorAll(".seat.available");
            // let bookingModal = document.querySelector(".booking-modal");
            seats.forEach((e) => {
                e.addEventListener("click", () => {
                    let seat = document.querySelector('.booking-modal>.wraper-item>table>tbody').children[1];
                    let btn = document.getElementById('btn_reserve_passenger');

                    seat.innerHTML = `<td>${e.dataset.id}</td>
                                        <td>Seat ${e.dataset.id}</td>
                                        <td>${e.dataset.type}</td>`;
                    btn.setAttribute('data-seat', e.dataset.id);
                    bookingModal.classList.toggle("active");
                    floatingSearch.style.display = "none";
                });
            });
        }
    }).catch(error => {
        //console.log(error);
    });

}

getSchedules = () => {

    fetchResults().then((data) => {
        if (data.length > 0) {
            localStorage.setItem('schedules', JSON.stringify(data));
            let html = '';
            ////console.log(data);
            let placeholder = document.querySelector(" .search-result-main");
            let header = document.getElementById("header_travel");
            let header1 = document.getElementById("side_header");
            header.innerHTML = `<p><span>${data[0].originname}</span> TO <span>${data[0].destinationname}</span></p>`
            header1.innerHTML = `<p><span>${data[0].originname}</span> - <span>${data[0].destinationname}</span></p>`
            data.forEach((results, index) => {
                html += `<div class="search-result">
            <div class="highlight">
                <p id="fare">PHP <span>${results['fare']}</span></p>
                <p id="etd">Departure: <span>${formatTime(results['etd'])}</span></p>
            </div>
            <div class="details">
                <h3 id="bus_type">${results['busoperator']} | ${results['bustype']}</h3>
                <div class="travel-info">
                  <div class="item">
                    <i class="uil uil-user"></i>
                    <p id="seat_available">Seats available: <span>${results['seatcount'] - results['seatstaken']}</span></p>
                  </div>
                  <div class="item">
                    <i class="uil uil-clock"></i>
                    <p>Time: <span>-</span> hours</p>
                  </div>
                  <div class="item">
                    <i class="uil uil-user-location"></i>
                    <p id="eta">Arrival: <span>${formatTime(results['eta'])}</span></p>
                  </div>
               </div>
            </div>
            <button data-id="${index}" class="btn book">Book seats</button></div>`;
            })
            placeholder.innerHTML = html;
        }

        let bookBtn = document.querySelectorAll(".btn.book");
        let schedules = JSON.parse(localStorage.getItem('schedules'));
        bookBtn.forEach((e) => {
            e.addEventListener("click", attr => {
                let ok = true;
                let current_sched = JSON.parse(localStorage.getItem('selected-sched'));
                if (_.isEqual(current_sched, schedules[e.dataset.id]) === false && current_sched !== null) {
                    let text = "Choosing another trip will cancel your seat selection for this trip. Continue?";
                    if (confirm(text) == true) {
                        ok = true;
                        cancelBookings();
                    } else {
                        ok = false;
                    }
                }
                if (ok) {
                    bookBtn.forEach(e => {
                        e.classList.remove('active');
                        e.removeAttribute("disabled");
                    })
                    e.classList.add("active");
                    // e.setAttribute("disabled", true);

                    let dest = schedules[e.dataset.id];
                    localStorage.setItem('selected-sched', JSON.stringify(dest))
                    //console.log(dest);
                    let fare = dest.fare;
                    let paxCount = localStorage.getItem('passenger_count');
                    let sub_total = fare * paxCount;
                    let resvFee = 50 * paxCount;
                    document.getElementById('side_departure').textContent = `${formatDate(dest.tripdate)} ${formatTime(dest.etd)}`;
                    document.getElementById('s_fare').textContent = 'PHP ' + fare.toFixed(2);
                    document.getElementById('sub_total').innerHTML =
                        `<p>Departure <span>(${paxCount} pax)</span></p>
                            <div class="item">
                            <p>Sub Total <span>(${paxCount} pax)</span></p>
                            <h3><span>PHP ${sub_total.toFixed(2)}</span></h3>
                        </div>`;
                    document.getElementById('gran_total').textContent = 'PHP ' + (sub_total + resvFee).toFixed(2);
                    document.getElementById('res_fee').textContent = 'PHP ' + resvFee.toFixed(2);
                    localStorage.setItem('RouteId', dest.tkey);
                    localStorage.setItem('BusType', dest.bustype);
                    localStorage.setItem('clientId', dest.clientid);
                    getReserve();
                    body.classList.toggle("modal-open");
                    cancelBtn.classList.add("active");
                    continueBtn.classList.add("active");
                    seatSelect.classList.add("active");

                }

                // body.classList.toggle("modal-open");
                // cancelBtn.classList.add("active");
                // continueBtn.classList.add("active");
                // seatSelect.classList.add("active");
            });
        });

    }).catch(error => {
        //console.log(error);
    });


}

getLocation = (search = '') => {
    fetchLocation().then(data => {
        // //console.log(data);
        if (data.length > 0) {
            let html = '';
            let placeholder = document.querySelector(".item.from-locations");

            var results = _.filter(data, function (row) {
                return row.originName.indexOf(search.toUpperCase()) > -1;
            });

            let gd = _.groupBy(JSON.parse(JSON.stringify(results)), 'area');
            _.forEach(gd, function (item, area) {
                html += `<div><h5 style="margin-left: 10px;font-size: small">${area}</h5>`;
                item.forEach(loc => {
                    html += `<a data-clientid="${loc.clientID}" data-id="${loc.destinationid}"><i class="uil uil-crosshair"></i>${loc.originName} </a>`;
                })
                html += '</div>'
            })
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
                localStorage.setItem('originName', e.textContent);
                document.querySelector('.to-value').value = '';
                getDestination();
            });
        });
    }).catch(error => {
        //console.log(error);
    });

}

Logout = () => {
    localStorage.clear();
    window.location.href = 'index.html';
}
//     localStorage.removeItem('USERNAME');
//     localStorage.removeItem('TOKEN');
//     localStorage.removeItem('originName');
//     localStorage.removeItem('destinationName');
//     localStorage.removeItem('passenger_count');
//     localStorage.removeItem('departure');
//     localStorage.removeItem('schedules');
//     localStorage.removeItem('clientId');
//     localStorage.removeItem('RouteId');
//     localStorage.removeItem('BusType');
// }


getDestination = (search = '') => {
    // alert(origin);
    let toLocation, toValue;
    toLocation = document.querySelectorAll(".item.to-locations a");
    fetchToLocation().then(data => {
        if (data.length > 0) {
            let destination = localStorage.getItem('destinationName');
            let html = '';
            let placeholder = document.querySelector(".item.to-locations");
            var results = _.filter(data, function (row) {
                return row.destinationname.indexOf(search.toUpperCase()) > -1;
            });

            let gd = _.groupBy(JSON.parse(JSON.stringify(results)), 'area');

            // toValue = document.querySelector(".to-value");
            // toValue.value = '';
            ////console.log(dg);
            _.forEach(gd, (item, area) => {
                html += `<div><h5 style="margin-left: 10px;font-size: small">${area}</h5>`;
                // toValue.value = item[0].destinationname;
                // toValue.setAttribute("data-id", item[0].destinationid);
                item.forEach((loc) => {
                    if (destination === loc.destinationname) {
                        //console.log(destination);
                        toValue.value = loc.destinationname;
                        toValue.setAttribute("data-id", loc.destinationid);
                    }
                    html += `<a data-id="${loc.destinationid}"><i class="uil uil-crosshair"></i>${loc.destinationname} </a>`;
                })
                html += '</div>'
            })
            placeholder.innerHTML = html;

        }
        let toLocation, toValue;
        toValue = document.querySelector(".to-value");
        toLocation = document.querySelectorAll(".item.to-locations a");
        toLocation.forEach((e) => {
            e.addEventListener("click", () => {
                ////console.log(e);
                toValue.setAttribute("value", e.textContent);
                toValue.value = e.textContent;
            });
        });
    }).catch(error => {
        //console.log(error);
    });


};

formatDate = (date) => {
    return moment(date).format('ddd, MMM D')
    // let tDate = new Date(date)
    // return tDate.toLocaleString('en', {
    //     weekday: "short",
    //     month: "short",
    //     day: "numeric",
    // })
}
formatDate1 = (date) => {
    return moment(date).format('YYYY-MM-DD');
    // let tDate = new Date(date);
    // let y = tDate.getFullYear();
    // let m = tDate.getMonth() < 10 ? '0' + tDate.getMonth() : tDate.getMonth();
    // let d = tDate.getDay() < 10 ? '0' + tDate.getDay() : tDate.getDay();
    // return (y + '-' + m + '-' + d);
}

formatDateL = (date) => {
    let tDate = new Date(date)
    return tDate.toLocaleString('en', {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}


formatTime = (time) => {
    return moment('2022-01-01 ' + time).format('hh:mm A');
}

SearchForm = (e) => {
    e.preventDefault();
    let from = document.getElementById('from')

    let to = document.getElementById('to');
    let paxcount = document.getElementById('passenger').value;
    // alert(paxcount);
    let departure = document.getElementById('date_of_departure').value;
    let origin = from.value;
    let destination = to.value
    let clientId = from.dataset.clientid;
    let result;
    if (from && to) {
        localStorage.setItem('originName', origin);
        localStorage.setItem('destinationName', destination);
        localStorage.setItem('passenger_count', paxcount);
        localStorage.setItem('departure', departure);
        localStorage.setItem('clientId', clientId);
        // fetchResults(true, {background: 'rgba(255, 255, 255, 0.3)', image: '', text: 'searching'}).then(res => {
        fetchResults(true).then(res => {
            if (res.length === 0) {
                //Swal.fire('NO SCHEDULES FOUND');
                Swal.fire({
                    html: "<p style='font-size: medium'>No trips available on the date or route you selected at this time. You may make another search or contact <span style='color: blue'>info@iwantseats.com.ph</span> for inquiries.</p>",
                });
            } else {
                window.location.href = document.URL.substring(0, document.URL.lastIndexOf('/')) + '/booking.html';
            }
        }).catch(error => {
            //console.log(error);
        });
    }

}


$('.gcashi').click(function () {
    let fee = 0;
    let refNo = '';
    // let data = {
    //     "clientid": localStorage.getItem('clientId'),
    //     "token": localStorage.getItem('TOKEN'),
    //     "tripID": localStorage.getItem('departure') + '.' + localStorage.getItem('RouteId'),
    //     "referenceNo": localStorage.getItem('refNo')
    // };
    // // //console.log(data);
    // fetchReservationInfo(data).then(result => {
    //     localStorage.setItem('reserve_list', JSON.stringify(result));
    //     // let f = 0;
    //     // //console.log(result);
    //     // if(result.length >0 ){
    //     //     result.forEach(d => {
    //     //         refNo = d.ReferenceNo;
    //     //         f += parseInt(d.AccommodationFee);
    //     //     })
    //     // }
    //     // fee = f;
    // })
    let reslist = JSON.parse(localStorage.getItem('reservation'));
    refNo = reslist[0].ReferenceNo;
    reslist.forEach(row => {
        fee += row.AccommodationFee;
    })
    paygcash(fee, refNo);

});

function paygcash(amount, refNo) {
    // alert(amount + '=' + refNo)
    var pax_data = {
        module: "IWANTSEATS",
        amount: parseInt(amount),
        //amount: "100",
        email: "",
        refno: refNo,
        mobile: "",
        token: localStorage.getItem("TOKEN")
    }

    try {
        $.ajax({
            url: "https://iwsenterprise.com/iwsticketing_v3/enterprise/paymongocreatesource_augmata.aspx",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $.LoadingOverlay('show');
            },
            complete: function () {
                $.LoadingOverlay('hide');
            },
            data: JSON.stringify(pax_data),
            success: function (data) {
                var data1 = JSON.stringify(data);
                var data11 = JSON.parse(data1);
                if (data11.RESULT === "SAVED") {
                    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

                    open(data11.URL, 'GCASH', params);
                } else {
                    alert("Oops. It appears we cannot process your GCash payment for now.")
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("a:" + textStatus);
            } //End for ajax error
        }); //End for ajax /api/reservations/passenger/
    } catch (ex) {
        alert(ex.message);
    }

}

var loadFile = function (event) {
    var output = document.getElementById('iproof');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
};

UploadFile = evt => {
    evt.preventDefault();
    var token = localStorage.getItem("TOKEN");
    //alert(newpaxlist[0].ReservationNo);
    // Before the request starts, show the 'Loading message...'
    // $('.result').text('File is being uploaded...');
    //event.preventDefault();
    // On the click even,
    var formData = new FormData($('#payForm')[0]);
    let apiURL = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine`;
    let reslist = JSON.parse(localStorage.getItem('reservation'));
    $.ajax({
        type: 'POST',
        url: apiURL + "/savefile/" + token + "/" + reslist[0].ReservationNo + "/PAYMENT",
        processData: false,
        contentType: false,
        data: formData,
        success: function (data) {
            // The file was uploaded successfully...
            alert('File was uploaded.');
            window.location.href = document.URL.substring(0, document.URL.lastIndexOf('/')) + '/user-admin.html';
        },
        error: function (data) {
            alert('error');
            // there was an error.
            // $('#alert_message span').text('Whoops! There was an error in the request.');
        }
    });

}

getHistory = () => {
    fetchBookingHistory().then(result => {
        let options = {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };
        let placeholder = document.querySelector('.booking-history>div>table>tbody');
        let placeholder1 = document.querySelector('.active-booking>div>table>tbody');
        let html = '';
        let html1 = '';
        //console.log(result);
        result.forEach(row => {
            if (row.reservationstatus === 'ACTIVE') {
                html1 += `<tr class="s-ac">
                      <td>${row.bus_operator}</td>
                      <td>${row.origin} - ${row.destination}</td>
                      <td>
                        <p>
                          <i class="uil uil-calender"></i> <span>${(row.etd).split(' ')[0]}</span>
                        </p>
                        <p><i class="uil uil-clock"></i><span>${formatTime((row.etd).split(' ')[1])}</span></p>
                      </td>
                      <td>${row.reference_no}</td>
                      <td>${(row.total_amount_due).toLocaleString('en', options)}</td>
                      <td>${row.paidstatus}</td>
                      <td>${row.reservationstatus}</td>
                      <td>
                        <p>
                          <i class="uil uil-calender"></i> <span>${(row.expiration).split(' ')[0]}</span>
                        </p>
                        <p><i class="uil uil-clock"></i><span>${formatTime((row.expiration).split(' ')[1])}</span></p>
                      </td>
                    </tr>`;
            } else {
                html += `<tr>
                      <td>${row.bus_operator}</td>
                      <td>${row.origin} - ${row.destination}</td>
                      <td>
                        <p>
                          <i class="uil uil-calender"></i> <span>${(row.etd).split(' ')[0]}</span>
                        </p>
                        <p><i class="uil uil-clock"></i><span>${formatTime((row.etd).split(' ')[1])}</span></p>
                      </td>
                      <td>${row.reference_no}</td>
                      <td>${(row.total_amount_due).toLocaleString('en', options)}</td>
                      <td>${row.paidstatus}</td>
                      <td>${row.reservationstatus}</td>
                      <td>
                        <p>
                          <i class="uil uil-calender"></i> <span>${(row.expiration).split(' ')[0]}</span>
                        </p>
                        <p><i class="uil uil-clock"></i><span>${formatTime((row.expiration).split(' ')[1])}</span></p>
                      </td>
                    </tr>`;
            }
        });

        placeholder.innerHTML = html;
        placeholder1.innerHTML = html1;
    }).catch(error => {
        //console.error('There was an error!', error);
    });
}

$(document).ready(() => {
    $.LoadingOverlay('show');
    let div = document.querySelector('.status');
    if (localStorage.getItem('TOKEN')) {
        div.innerHTML = `
                        <a href="user-admin.html" onclick="menu()">My Account</a>
                    <a href="#" onclick="Logout()">
                    <button style="margin-left: 5px" class="btn-primary">Logout</button>
                </a>`;
    } else {
        div.innerHTML = `<a href="signup.html" onclick="menu()">
                <button class="btn-primary">Sign up</button>
            </a> `;
    }

    let path = window.location.pathname;
    let page = path.split("/").pop();

    if (page.includes('index') || page === '') {
        getLocation();
    }
    if (page.includes('booking')) {
        getSchedules();
        localStorage.removeItem('selected-sched');
    }
    $.LoadingOverlay('hide');
})

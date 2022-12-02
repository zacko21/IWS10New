let confirmModal = document.querySelector(".booking-confirm");

async function fetchBookingHistory() {
    let token = sessionStorage.getItem('TOKEN');
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/bookinghistorytest/${token}`;
    let data = {
        "token": token,
    }
    //console.log(input)
    let response = await fetch(input, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'post',
        body: JSON.stringify(data)
    });

    return await response.json();
}

async function fetchResults(show = false, options = {}, target = 'body') {
    let clientId, date, origin, destination, paxCount;
    //console.log(target);
    if (show) $(target).LoadingOverlay("show", options)
    origin = sessionStorage.getItem('originName');
    destination = sessionStorage.getItem('destinationName');
    date = sessionStorage.getItem('departure');
    clientId = sessionStorage.getItem('clientId');
    paxCount = sessionStorage.getItem('passenger_count');
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/getschedules2test/2/${clientId}/${date}/${origin.trim()}/${destination.trim()}/${paxCount}`;
    //console.log(input);
    let response = await fetch(input);
    $(target).LoadingOverlay("hide")
    return await response.json();
}

async function fetchReservationInfo(data) {
    let token = sessionStorage.getItem('TOKEN');
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/getreservationinfotest/${token}`;
    //console.log(JSON.stringify(data));
    let response = await fetch(input, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'post',
        body: JSON.stringify(data)
    });

    return await response.json();
}


async function fetchUpdatePassenger(data) {
    let token = sessionStorage.getItem('TOKEN');
    let refNo = sessionStorage.getItem('refNo');
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/passenger/${token}/${refNo}`;
    //console.log(JSON.stringify(data));
    let response = await fetch(input, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'post',
        body: JSON.stringify(data)
    });

    return await response.json();
}

async function fetchCancelBooking(data) {
    $('.modal-content').LoadingOverlay('show');
    let token = sessionStorage.getItem('TOKEN');
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/cancelbooking/${token}`;
    //console.log(JSON.stringify(data));
    let response = await fetch(input, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'post',
        body: JSON.stringify(data)
    });
    $('.modal-content').LoadingOverlay('hide');
    return await response.json();
}


async function fetchPassengerSeat(refNo, seatNo) {
    // $('.bus-seat-select').LoadingOverlay('show');
    let token = sessionStorage.getItem('TOKEN');
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/updatepassengerseattest/${token}`;
    let data = {
        "ClientID": sessionStorage.getItem('clientId'),
        "TripDate": sessionStorage.getItem('departure'),
        "RouteID": sessionStorage.getItem('RouteId'),
        "BusType": sessionStorage.getItem('BusType'),
        "ReferenceNo": refNo,
        "SeatNo": seatNo
    };
    //console.log('PASSENGER SEAT');
    //console.log(JSON.stringify(data));
    let response = await fetch(input, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'post',
        body: JSON.stringify(data)
    });
    // $('.bus-seat-select').LoadingOverlay('hide');
    return await response.json();
}

async function fetchManifest() {
    $('.bus-seat-select').LoadingOverlay('show');
    let token = sessionStorage.getItem('TOKEN');
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/manifesttest/${token}`;
    let data = {
        "clientid": sessionStorage.getItem('clientId'),
        "tripdate": sessionStorage.getItem('departure'),
        "routeid": sessionStorage.getItem('RouteId'),
        "BusType": sessionStorage.getItem('BusType')
    };
    // console.log(JSON.stringify(data));
    let response = await fetch(input, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'post',
        body: JSON.stringify(data)
    });
    $('.bus-seat-select').LoadingOverlay('hide');
    // $('.modal-content').LoadingOverlay('hide');
    return await response.json();
}

async function fetchReserve() {
    $('.modal-content').LoadingOverlay('show');
    let token = sessionStorage.getItem('TOKEN');
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/reservetest/${token}`;
    let data = {
        "clientId": sessionStorage.getItem('clientId'),
        "token": token,
        "tripDate": sessionStorage.getItem('departure'),
        "noOfPax": sessionStorage.getItem('passenger_count'),
        "routeId": sessionStorage.getItem('RouteId'),
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
        "pickUp": sessionStorage.getItem('RouteId').split('.')[1],
        "dropOff": sessionStorage.getItem('RouteId').split('.')[2]
    };
    //console.log('RESERVE POST');
    //console.log(JSON.stringify(data));
    let response = await fetch(input, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'post',
        body: JSON.stringify(data)
    });
    return await response.json();
}

async function fetchLocation() {
    $('.from-value').LoadingOverlay('show');
    let input = 'https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/getorigindestinations2/1/-1/1000';
    let response = await fetch(input);
    $('.from-value').LoadingOverlay('hide');
    return await response.json();
}

async function fetchToLocation(name) {
    $('.to-value').LoadingOverlay('show');
    let input = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine/getorigindestinations2/2/${name}/1000`;
    let response = await fetch(input);
    $('.to-value').LoadingOverlay('hide');
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
    let reservation = sessionStorage.getItem('reservation');
    let cinfo = JSON.parse(reservation)[id];
    let pBooker = parseInt(id) === 0 ? 1 : 0;
    sessionStorage.setItem('refNo', cinfo.ReferenceNo);
    sessionStorage.setItem('pBooker', pBooker);
    document.querySelector('#email').value = cinfo.Email;
    document.querySelector('#first_name').value = cinfo.FirstName;
    document.querySelector('#last_name').value = cinfo.LastName;
    // document.querySelector("input[name='gender']:checked").value = cinfo.;
    document.querySelector('#birthday').value = cinfo.BirthDate;
    document.querySelector('#contact_number').value = cinfo.ContactNo;
};

cancelBookings = () => {
    let reservation = sessionStorage.getItem('reservation');
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
            sessionStorage.removeItem('reservation');
            // modal.classList.remove('active');
            // Swal.fire('Success', 'Your bookings is successfully cancelled.', 'success');
        }
    })
}

EditInfo = (e) => {
    e.preventDefault();
    let data = {
        "clientid": sessionStorage.getItem('clientId'),
        "loyaltyId": "",
        "birthDate": document.querySelector('#birthday').value,
        "contactNo": document.querySelector('#contact_number').value,
        "email": document.querySelector('#email').value,
        "firstName": document.querySelector('#first_name').value,
        "gender": document.querySelector("input[name='gender']:checked").value,
        "lastName": document.querySelector('#last_name').value,
        "middleName": "",
        "referenceNo": sessionStorage.getItem('refNo'),
        "replaceprimarybooker": parseInt(sessionStorage.getItem('pBooker')),
        "tripID": sessionStorage.getItem('departure') + '.' + sessionStorage.getItem('RouteId')
    }
    fetchUpdatePassenger(data).then(res => {
        if (res.result === 'OK') {
            editBookedInfo.classList.remove("active");
            getReserve();
        }
    }).catch(error => {
        console.error('There was an error!', error);
    });

};

getReserve = () => {
    if (sessionStorage.getItem('TOKEN')) {

        let modal = document.querySelector('.modal');
        fetchReserve().then(data => {
            //console.log('RESERVE RESULT');
            //console.log(data);
            if (data.length > 0) {
                let passList = document.getElementById('passenger_assign');
                let passLists = document.getElementById('passenger-list');
                let header = document.getElementById("header-booking");
                // header.innerHTML = `<p><span>${data[0].Origin}</span> TO <span>${data[0].Destination}</span></p>`
                let html = '', htmList = '';
                sessionStorage.setItem('refNo', data[0].ReferenceNo);
                sessionStorage.setItem('reservation', JSON.stringify(data));
                data.forEach((res, index) => {
                    let name = `${res.LastName}, ${res.FirstName} ${res.MiddleName}`;
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
                })
                passList.innerHTML = html;
                passLists.innerHTML = htmList;
                getManifest();
                //modal.classList.add("active");

                //seatSelect.classList.add("active");
            }
        }).catch(error => {
            console.error('There was an error!', error);
        });
    } else {
        window.location.href = document.URL.substring(0, document.URL.lastIndexOf('/')) + '/login.html';
    }


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
        // console.log(data);
        bookingDetails.scrollTop = 0;
        if (data.RESULT === 'SEATPLAN NOT FOUND') {
            Swal.fire(data.RESULT);
        } else {
            let gp = groupBy(data, list => list.row);
            // console.log(gp);
            let placeholder = document.querySelector('.bus-body');
            let html = `<table class="table table-sm"><tbody>`;
            gp.forEach((list, row) => {
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
                                if (row1.value === '') {

                                    html += `<div class="seat">
                                <img alt="" src="assets/images/cr.svg"/>
                                <span>${row1.label}</span>
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
        console.error('There was an error!', error);
    });

}

getSchedules = () => {

    fetchResults().then((data) => {
        if (data.length > 0) {
            sessionStorage.setItem('schedules', JSON.stringify(data));
            let html = '';
            //console.log(data);
            let placeholder = document.querySelector(" .search-result-main");
            let header = document.getElementById("header_travel");
            let header1 = document.getElementById("side_header");
            header.innerHTML = `<p><span>${data[0].originname}</span> TO <span>${data[0].destinationname}</span></p>`
            header1.innerHTML = `<p><span>${data[0].originname}</span> - <span>${data[0].destinationname}</span></p>`
            data.forEach((results, index) => {
                html += `<div class="search-result">
            <div class="highlight">
                <p id="fare">php <span>${results['fare']}</span></p>
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
        let schedules = JSON.parse(sessionStorage.getItem('schedules'));
        bookBtn.forEach((e) => {
            e.addEventListener("click", attr => {
                let ok = true;
                let current_sched = JSON.parse(sessionStorage.getItem('selected-sched'));
                if (_.isEqual(current_sched, schedules[e.dataset.id]) === false && current_sched !== null) {
                    let text = "Choosing another trip will cancel your seat selection for this trip. \nContinue?";
                    if (confirm(text) == true) {
                        ok = true;
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
                    sessionStorage.setItem('selected-sched', JSON.stringify(dest))
                    console.log(dest);
                    let fare = dest.fare;
                    let paxCount = sessionStorage.getItem('passenger_count');
                    let sub_total = fare * paxCount;
                    document.getElementById('side_departure').textContent = `${formatDate(dest.tripdate)} ${formatTime(dest.etd)}`;
                    document.getElementById('s_fare').textContent = 'PHP ' + fare.toFixed(2);
                    document.getElementById('sub_total').innerHTML =
                        `<p>Departure <span>(${paxCount} pax)</span></p>
                            <div class="item">
                            <p>Sub Total <span>(${paxCount} pax)</span></p>
                            <h3><span>PHP ${sub_total.toFixed(2)}</span></h3>
                        </div>`;
                    document.getElementById('gran_total').textContent = 'PHP ' + (sub_total + 50).toFixed(2);
                    document.getElementById('res_fee').textContent = 'PHP ' + (50 * paxCount).toFixed(2);
                    sessionStorage.setItem('RouteId', dest.tkey);
                    sessionStorage.setItem('BusType', dest.bustype);
                    sessionStorage.setItem('clientId', dest.clientid);
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
        console.error('There was an error!', error);
    });


}

getLocation = () => {
    return new Promise(function (resolve, reject) {
        fetchLocation().then(data => {
            // console.log(data);
            if (data.length > 0) {
                let html = '';
                let placeholder = document.querySelector(".item.from-locations");

                let dg = groupBy(data, locs => locs.area);

                dg.forEach(function (item, area) {
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
                    getDestination(e.textContent);
                });
            });
        }).catch(error => {
            console.error('There was an error!', error);
        });
    });
}


getDestination = (origin) => {
    // alert(origin);
    let toLocation, toValue;
    toLocation = document.querySelectorAll(".item.to-locations a");
    fetchToLocation(origin).then(data => {
        if (data.length > 0) {
            let destination = sessionStorage.getItem('destinationName');
            let html = '';
            let placeholder = document.querySelector(".item.to-locations");
            let dg = groupBy(data, locs => locs.area);
            toValue = document.querySelector(".to-value");
            toValue.value = '';
            //console.log(dg);
            dg.forEach((item, area) => {
                html += `<div><h5 style="margin-left: 10px;font-size: small">${area}</h5>`;
                toValue.value = item[0].destinationname;
                toValue.setAttribute("data-id", item[0].destinationid);
                item.forEach((loc) => {
                    if (destination === loc.destinationname) {
                        console.log(destination);
                        toValue.value = loc.destinationname;
                        toValue.setAttribute("data-id", loc.destinationid);
                    }
                    html += `<a data-id="${loc.destinationid}"><i class="uil uil-crosshair"></i>${loc.destinationname} </a>`;
                })
                html += '</div>'
            })
            placeholder.innerHTML = html;
        }
        toLocation = document.querySelectorAll(".item.to-locations a");
        toLocation.forEach((e) => {
            e.addEventListener("click", () => {
                //console.log(e);
                toValue.setAttribute("value", e.textContent);
                toValue.value = e.textContent;
            });
        });
    }).catch(error => {
        console.error('There was an error!', error);
    });


};

formatDate = (date) => {
    let tDate = new Date(date)
    return tDate.toLocaleString('en', {
        weekday: "short",
        month: "short",
        day: "numeric",
    })
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
    let tTime = new Date('0000 ' + time);
    return tTime.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
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
        sessionStorage.setItem('originName', origin);
        sessionStorage.setItem('destinationName', destination);
        sessionStorage.setItem('passenger_count', paxcount);
        sessionStorage.setItem('departure', departure);
        sessionStorage.setItem('clientId', clientId);
        // fetchResults(true, {background: 'rgba(255, 255, 255, 0.3)', image: '', text: 'searching'}).then(res => {
        fetchResults(true).then(res => {
            if (res.length === 0) {
                Swal.fire('NO SCHEDULES FOUND');
            } else {
                window.location.href = document.URL.substring(0, document.URL.lastIndexOf('/')) + '/booking.html';
            }
        }).catch(error => {
            console.error('There was an error!', error);
        });
    }

}


$('input[type=radio][name=gcash]').click(function () {
    let fee = 0;
    let refNo = '';
    let data = {
        "clientid": sessionStorage.getItem('clientId'),
        "token": sessionStorage.getItem('TOKEN'),
        "tripID": sessionStorage.getItem('departure') + '.' + sessionStorage.getItem('RouteId'),
        "referenceNo": sessionStorage.getItem('refNo')
    };
    // console.log(data);
    fetchReservationInfo(data).then(result => {
        sessionStorage.setItem('reserve_list', JSON.stringify(result));
        // let f = 0;
        // console.log(result);
        // if(result.length >0 ){
        //     result.forEach(d => {
        //         refNo = d.ReferenceNo;
        //         f += parseInt(d.AccommodationFee);
        //     })
        // }
        // fee = f;
    })
    let reslist = JSON.parse(sessionStorage.getItem('reserve_list'));
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
        token: sessionStorage.getItem("TOKEN")
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
    var token = sessionStorage.getItem("TOKEN");
    //alert(newpaxlist[0].ReservationNo);
    // Before the request starts, show the 'Loading message...'
    // $('.result').text('File is being uploaded...');
    //event.preventDefault();
    // On the click even,
    var formData = new FormData($('#payForm')[0]);
    let apiURL = `https://iwsenterprise.com/iwsticketing_v3/iwsapiengine`;
    let reslist = JSON.parse(sessionStorage.getItem('reserve_list'));
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






import 'bootstrap';
import $ from 'jquery';
import './assets/img/favicon.ico';

//date

$(function () {
    $('[type="date"]').prop('max', function () {

        let aYearFromNow = new Date();
        aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
        return aYearFromNow.toJSON().split('T')[0];
    });
});

let adult = parseInt($('#adult-result').text());
let child = parseInt($('#child-result').text());
let baby = parseInt($('#baby-result').text());

// pasażerowie 

$(document).ready(function () {

    function peopleAdd() {
        let total = adult + child + baby;

        if (total > 9) {
            return;
        }
        else {
            $("#total-alert").hide();
            $("#card-style-people").toggle();
        }
    };

    $("#ok-btn").on("click", function () { peopleAdd(); });
    $("#people-btn").on("click", function () { peopleAdd(); });

    function maxPeople() {
        let total = adult + child + baby;
        if (total > 9) {
            $("#total-alert").show();
        }
        if (total <= 9) {
            $("#total-alert").hide();
        }
    }

    $('#adult-plus-btn').on('click', function () {
        if (adult < 9) {
            adult++;
            document.querySelector("#adult-result").innerHTML = adult;
        };
        maxPeople();
    });

    $('#adult-minus-btn').on('click', function () {
        if (adult > 0) {
            adult--;
            document.querySelector("#adult-result").innerHTML = adult;
        };
        maxPeople();
    });

    $('#child-plus-btn').on('click', function () {
        if (child < adult * 3) {
            child++;
            document.querySelector("#child-result").innerHTML = child;
        };
        maxPeople();
    });

    $('#child-minus-btn').on('click', function () {
        if (child > 0) {
            child--;
            document.querySelector("#child-result").innerHTML = Math.max(Math.min(child, adult * 3), 0);
        };
        maxPeople();
    });

    $('#baby-plus-btn').on('click', function () {
        if (baby < adult) {
            baby++;
            document.querySelector("#baby-result").innerHTML = Math.max(Math.min(baby, adult), 0);
        };
        maxPeople();
    });

    $('#baby-minus-btn').on('click', function () {
        if (baby > 0) {
            baby--;
            document.querySelector("#baby-result").innerHTML = Math.max(Math.min(baby, adult), 0);
        };
        maxPeople();
    });

});


// log-in

let valid = false;
let check = 1;

$('#log-in-btn').on('click', function () {
    validate();
});

$('#log-out-btn').on('click', function () {
    valid = false;
    $('#log-in').show();
});

function validate() {
    let un = $('#InputEmail').val();
    let pw = $('#InputPassword').val();

    fetch("https://raw.githubusercontent.com/goraska/json-loty/master/users.json")
        .then((resp) => resp.json())
        .then(function (data) {
            data.forEach(function (element) {

                if ((un == element.email) && (pw == element.password)) {
                    // $('#wrong-password').hide();
                    valid = true;
                    if (check == 2) {
                        localStorage.removeItem("uname");
                        localStorage.setItem("uname", element.first_name);
                        window.location = "./reservation.html"
                    }
                    else {
                        $('#LogIn').modal('toggle');
                        $('#hello').html(element.first_name + ", witaj na pokładzie");
                        $('#log-in').hide();
                    }
                }
                else  {
                    $('#wrong-password').show();
                }
            })
        });
};

// sprawdz

$('#check-btn').on('click', function () {
    $('#alert-miejsce').hide();
    $('#alert-cel').hide();
    $('#alert-data').hide();
    $('#alert-pasazer').hide();

    let departure = $('#departure').val();
    let destination = $('#destination').val();
    let date = $('#flight-date').val();
    adult = parseInt($('#adult-result').text());
    child = parseInt($('#child-result').text());
    baby = parseInt($('#baby-result').text());
    
 
    let dep = $("#departure option:selected").html()
    let dest = $("#destination option:selected").html()

    localStorage.removeItem("lot");
    localStorage.removeItem("data");
    localStorage.removeItem("dorosli");
    localStorage.removeItem("dzieci");
    localStorage.removeItem("bobasy");
    localStorage.setItem("lot", `${dep} - ${dest}`);
    localStorage.setItem("data", date);
    localStorage.setItem("dorosli", adult);
    localStorage.setItem("dzieci", child);
    localStorage.setItem("bobasy", baby);

    if (departure == 0) {
        $('#alert-miejsce').show();
    }
    else if (destination == 0 || departure == destination) {
        $('#alert-cel').show();
    }
    else if (date == "") {
        $('#alert-data').show();
    }
    else if (adult == 0) {
        $('#alert-pasazer').show();
    }
    else {
        if (valid == true) {
            window.location = "/reservation.html";
        }
        else {
            check = 2
            $('#check-btn').attr('data-toggle', 'modal').attr('data-target', '#LogIn');
        }
    }

});



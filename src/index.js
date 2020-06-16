import { sum } from "./sum";
import style from "./css/style.scss";
import Icon from "./assets/img/proba.png";
import 'bootstrap';
import $ from 'jquery';

//date

$(function () {
    $('[type="date"]').prop('max', function () {

        var aYearFromNow = new Date();
        aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
        return aYearFromNow.toJSON().split('T')[0];
    });
});

var adult = parseInt($('#adult-result').text());
var child = parseInt($('#child-result').text());
var baby = parseInt($('#baby-result').text());

// pasażerowie 

$(document).ready(function () {

    function peopleAdd() {
        var total = adult + child + baby;
    
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
    var total = adult + child + baby;
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

var valid = false;
var check = 1;

$('#log-in-btn').on('click', function () {
    validate();
});

$('#log-out-btn').on('click', function () {
    var valid = false;
    console.log(valid);
    $('#log-in').show();
});

function validate() {
    var count = 3;
    var un = $('#InputEmail').val();
    var pw = $('#InputPassword').val();


    fetch("users.json")
        .then((resp) => resp.json())
        .then(function (data) {
            data.forEach(function (element) {
                if ((un == element.email) && (pw == element.password)) {
                    valid = true;
                    $('#wrong-password').hide();
                    if (check ==2) {
                        localStorage.removeItem("uname");
                        localStorage.setItem("uname", element.first_name);                       
                        window.location = "/reservation.html"
                    }
                    else {
                        $('#LogIn').modal('toggle');
                        $('#hello').html(element.first_name + ", witaj na pokładzie");
                        $('#log-in').hide();                     
                    }
                }
                else {
                    $('#wrong-password').show();            
                }
            })
        });
    };

// sprawdz

$('#check-btn').on('click', function () {
    var departure = $('#departure').val();
    var destination = $('#destination').val();
    var adult = parseInt($('#adult-result').text());
    var child = parseInt($('#child-result').text());
    var baby = parseInt($('#baby-result').text());
    var date = $('#flight-date').val();

    var dep = $("#departure option:selected").html()
    var dest = $("#destination option:selected").html()

    localStorage.removeItem("lot");
    localStorage.removeItem("data");
    localStorage.removeItem("dorosli");
    localStorage.removeItem("dzieci");
    localStorage.removeItem("bobasy");
    localStorage.setItem("lot", `${dep} ---> ${dest}`);
    localStorage.setItem("data", date);
    localStorage.setItem("dorosli", adult);
    localStorage.setItem("dzieci", child);
    localStorage.setItem("bobasy", baby);    

    if (departure == 0) {
        alert("wybierz miejsce wylotu");
    }
    else if (destination == 0 || departure == destination ) {
        alert("wybierz miejce destynacji");
    }
    else if (date == "") {
        alert("brak wybranej daty");
    }
    else if (adult == 0) {
        alert("brak pasażerów");
    }    
    else {
        if (valid == true) {
            window.location = "/reservation.html";
        }
        else {
            check = 2
            $('#check-btn').attr('data-toggle','modal').attr('data-target','#LogIn');
        }
    }
    
});












































console.log(sum(10, 5))

let heading = document.querySelector("#demo"),
    sumValue = sum(10, 5);

heading.innerHTML = `10 + 5 = ${sumValue}`;

let myIcon = new Image();
myIcon.src = Icon;
document.querySelector("div").appendChild(myIcon);


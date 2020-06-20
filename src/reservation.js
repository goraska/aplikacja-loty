import style from "./css/style.scss";
import 'bootstrap';
import $ from 'jquery';
import './assets/img/favicon.ico';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

// 3min sesja logowania

$(document).ready(function () {
    setTimeout(function() {
        $('#sesion-time-out').modal('show')
    }, 180000);


    $('#home-page').on('click', function () {
        window.location = "./index.html"
    })

    $('#home-logo').on('click', function () {
        window.location = "./index.html"
    })
});


$(document).ready(function () {

    localStorage.removeItem("suitcase_price");
    $('#hello-res').html(`${localStorage.getItem("uname")}, witaj na pokładzie`);

    $('.card-opcje-2').height($('.card-opcje-1').height());

    var lot = localStorage.getItem("lot");
    document.getElementById("lot").innerHTML = lot;
    document.getElementById("data-lotu").innerHTML = localStorage.getItem("data");
    var dorosli = parseInt(localStorage.getItem("dorosli"));
    var dzieci = parseInt(localStorage.getItem("dzieci") == "null" ? 0 : localStorage.getItem("dzieci"));
    var pasazerowie = `${localStorage.getItem("dorosli")} x dorosły 
                        ${localStorage.getItem("dzieci")} x dziecko 
                        ${localStorage.getItem("bobasy")} x bobas`
    document.getElementById("pasazerowie").innerHTML = pasazerowie;


    var pakiet = "brak";
    var max_bagaz_seats = dorosli + dzieci
    $(".suitcase-input").attr({ "max": max_bagaz_seats });

    $('#suitcase-btn-subbmit').on('click', function () {

        var sm_suitcase_price = $("#sm-suitcase-input").val() * 79;
        var b_suitcase_price = $("#b-suitcase-input").val() * 129;
        var s_suitcase_price = $("#s-suitcase-input").val() * 199;
        var suitcase_price = sm_suitcase_price + b_suitcase_price + s_suitcase_price;
        $('#uslugi').html(`bagaż rejstrowany:  ${suitcase_price} PLN`)

        if (localStorage.getItem("suitcase_price") != null) {
            var last_sutcase_price = parseInt(localStorage.getItem("suitcase_price"))
            var sum = parseInt($("#suma").text())
            var new_sum = sum - last_sutcase_price + suitcase_price
            $('#suma').html(new_sum)
            localStorage.setItem("suitcase_price", suitcase_price)
        }
        else {
            var sum = parseInt($("#suma").text())
            var new_sum = sum + suitcase_price
            $('#suma').html(new_sum)
            localStorage.setItem("suitcase_price", suitcase_price)
        }

    })

    fetch("https://raw.githubusercontent.com/goraska/json-loty/master/reservation_data.json")
        .then((resp) => resp.json())
        .then(function (data) {
            data.forEach(function (element) {
                if (lot == `${element.departure} - ${element.destination}`) {
                    $('#b-cena-d').html(`${element.price_adult} PLN`);
                    $('#b-cena-c').html(`${element.price_child} PLN`);
                    $('#g-cena-d').html(`${Math.round(element.price_adult * 1.1)} PLN`);
                    $('#g-cena-c').html(`${Math.round(element.price_child * 1.1)} PLN`);
                    $('#p-cena-d').html(`${Math.round(element.price_adult * 1.2)} PLN`);
                    $('#p-cena-c').html(`${Math.round(element.price_child * 1.2)} PLN`);

                    $('#plus-btn').on('click', function () {
                        $(".alert-packages").hide();
                        var last_sutcase_price = parseInt(localStorage.getItem("suitcase_price") == null ? 0 : localStorage.getItem("suitcase_price"));
                        var cena = dorosli * Math.round(element.price_adult * 1.2)
                            + dzieci * Math.round(element.price_child * 1.2)
                        var cena_all = cena + last_sutcase_price
                        $('#suma').html(cena_all);
                        $('#pakiet').html(`RelaxLot PLUS: ${cena} PLN`);
                        pakiet = "RelaxLot PLUS";
                    })

                    $('#go-btn').on('click', function () {
                        $(".alert-packages").hide();
                        var last_sutcase_price = parseInt(localStorage.getItem("suitcase_price") == null ? 0 : localStorage.getItem("suitcase_price"));
                        var cena = dorosli * Math.round(element.price_adult * 1.1)
                            + dzieci * Math.round(element.price_child * 1.1)
                        var cena_all = cena + last_sutcase_price
                        $('#suma').html(cena_all);
                        $('#pakiet').html(`RelaxLot GO: ${cena} PLN`);
                        pakiet = "RelaxLot GO";
                    })

                    $('#basic-btn').on('click', function () {
                        $(".alert-packages").hide();
                        var last_sutcase_price = parseInt(localStorage.getItem("suitcase_price") == null ? 0 : localStorage.getItem("suitcase_price"));
                        var cena = dorosli * Math.round(element.price_adult)
                            + dzieci * Math.round(element.price_child)
                        var cena_all = cena + last_sutcase_price
                        $('#suma').html(cena_all);
                        $('#pakiet').html(`RelaxLot BASIC: ${cena} PLN`);
                        pakiet = "RelaxLot BASIC";                        
                    })

                    if (element.plane == 3) {
                        $('.embraer').show();
                    }
                    else if (element.plane == 2) {
                        $('.boeing').show();
                    }
                    else if (element.plane == 1) {
                        $('.dreamliner').show();
                    }

                }
            })
        })

    // wybór miejsca

    var seats_array = [];

    $('.seat').on('click', function () {

        if ($(this).attr('class') == 'seat') {
            if (seats_array.length < max_bagaz_seats) {
                $('.seats-worning').hide();
                $(this).removeClass('seat').addClass('reserved');
                seats_array.push(this.id);
                $('#selected-seats').html(`MIEJSCA: ${seats_array}`);
            }
        }
        else if ($(this).attr('class') == 'reserved') {
            $(this).removeClass('reserved').addClass('seat');
            var index = seats_array.indexOf(this.id);
            seats_array.splice(index, 1);
            $('#selected-seats').html(`MIEJSCA: ${seats_array}`);
        }
    })

    $('#seats-btn-subbmit').on('click', function () {

        if (seats_array.length < max_bagaz_seats) {
            $('.seats-worning').show();
            $('#seats-btn-subbmit').attr("data-dismiss", "none");
        }
        else {
            localStorage.removeItem("seats")
            localStorage.setItem("seats", seats_array)
            $('#miejsca').html(`${seats_array}`)
            $('#seats-btn-subbmit').attr("data-dismiss", "modal");
        }
    })

    // POdsumowanie rezerwacji

    $('#reserv-btn').on('click', function () {
        if (pakiet =="brak") {
            console.log(pakiet);
            $(".alert-packages").show();
        }
        else {
            alert("Strona w rozbudowie...")
        }
    })



});
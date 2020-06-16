$(document).ready(function () {
    localStorage.removeItem("suitcase_price");
    $('#hello-res').html(`${localStorage.getItem("uname")}, witaj na pokładzie`);

    var lot = localStorage.getItem("lot");
    document.getElementById("lot").innerHTML = lot;
    document.getElementById("data-lotu").innerHTML = localStorage.getItem("data");
    var dorosli = parseInt(localStorage.getItem("dorosli"));
    var dzieci = parseInt(localStorage.getItem("dzieci") == "null" ? 0 : localStorage.getItem("dzieci"));
    var pasazerowie = `${localStorage.getItem("dorosli")} x dorosły 
                        ${localStorage.getItem("dzieci")} x dziecko 
                        ${localStorage.getItem("bobasy")} x bobas` 
    document.getElementById("pasazerowie").innerHTML = pasazerowie;    

    $('.card-opcje-2').height($('.card-opcje-1').height());

    var max_bagaz = dorosli + dzieci
    $(".suitcase-input").attr({"max" : max_bagaz});

    

    $('#suitcase-btn-subbmit').on('click', function () {

        var sm_suitcase_price = $("#sm-suitcase-input").val()*79;
        var b_suitcase_price = $("#b-suitcase-input").val()*129;
        var s_suitcase_price = $("#s-suitcase-input").val()*199;
        var suitcase_price =  sm_suitcase_price + b_suitcase_price +s_suitcase_price;
        $('#uslugi').html(`dodatkowy bagaż rejstrowany:  ${suitcase_price} PLN`)
        
        if (localStorage.getItem("suitcase_price") != null) {
            var last_sutcase_price = parseInt(localStorage.getItem("suitcase_price"))
            var sum = parseInt($("#suma").text())
            var new_sum = sum-last_sutcase_price + suitcase_price
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

    fetch("reservation_data.json")
        .then((resp) => resp.json())
        .then(function (data) {
            data.forEach(function (element) {
                if (lot == `${element.departure} ---> ${element.destination}`) {
                    $('#b-cena-d').html(`${element.price_adult} PLN`)
                    $('#b-cena-c').html(`${element.price_child} PLN`)
                    $('#g-cena-d').html(`${Math.round(element.price_adult*1.1)} PLN`)
                    $('#g-cena-c').html(`${Math.round(element.price_child*1.1)} PLN`)
                    $('#p-cena-d').html(`${Math.round(element.price_adult*1.2)} PLN`)
                    $('#p-cena-c').html(`${Math.round(element.price_child*1.2)} PLN`)
                    
                    

                    $('#plus-btn').on('click', function () {
                        var last_sutcase_price = parseInt(localStorage.getItem("suitcase_price") == null ? 0 : localStorage.getItem("suitcase_price"));
                        var cena = dorosli * Math.round(element.price_adult*1.2) 
                                    + dzieci * Math.round(element.price_child*1.2)
                        var cena_all = cena + last_sutcase_price
                        $('#suma').html(cena_all)
                        $('#pakiet').html(`RelaxLot PLUS: ${cena} PLN`)                        
                    })

                    $('#go-btn').on('click', function () {
                        var last_sutcase_price = parseInt(localStorage.getItem("suitcase_price") == null ? 0 : localStorage.getItem("suitcase_price"));
                        var cena = dorosli * Math.round(element.price_adult*1.1) 
                                    + dzieci * Math.round(element.price_child*1.1)                                    
                        var cena_all = cena + last_sutcase_price
                        $('#suma').html(cena_all)
                        $('#pakiet').html(`RelaxLot GO: ${cena} PLN`)                        
                    })

                    $('#basic-btn').on('click', function () {
                        var last_sutcase_price = parseInt(localStorage.getItem("suitcase_price") == null ? 0 : localStorage.getItem("suitcase_price"));
                        var cena = dorosli * Math.round(element.price_adult) 
                                    + dzieci * Math.round(element.price_child)
                        var cena_all = cena + last_sutcase_price
                        $('#suma').html(cena_all)
                        $('#pakiet').html(`RelaxLot BASIC: ${cena} PLN`)                        
                    })                    

                    }
                })
            })
    
    // wybór pakietu
    
    
});
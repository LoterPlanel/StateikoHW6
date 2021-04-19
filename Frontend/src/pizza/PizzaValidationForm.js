// /**
//  * Created by PC on 08.11.2017.
//  */
//
// var nameValidate = false;
// var phoneValidate = false;
// var addressValidate =false;
//
// $("#inputName").blur(function () {
//     $str=$("#inputName").val();
//     var Reg61 = new RegExp("^.*[^A-zА-яЁё].*$");
//     if(Reg61.test($str))
//     {
//         $('.name-group').addClass('has-error');
//         $('.name-help-block').addClass('danger');
//         nameValidate = false;
//         //не только буквы
//
//
//     }
//     else
//     {
//         $('.name-group').removeClass('has-error');
//
//         nameValidate = true;
//         //только буквы
//     }
// });
//
//
// $("#inputPhone").blur(function () {
//     var Reg61=new RegExp("/^\d[\d\(\)\ -]{10}\d$/");
//     $str=$('#inputPhone').val();
//     if (Reg61.test($str)||$str.length<10){
//         $('.phone-group').addClass('has-error');
//         $('.phone-help-block').addClass('danger');
//         phoneValidate = false;
//     }
//     else {
//         $('.phone-group').removeClass('has-error');
//         phoneValidate=true;
//     }
// });
//
// // $("#inputAdress").blur(function () {
// //    var Reg61=new RegExp("/^[a-z]+\,[a-z]+\,[0-9]{1,5}$/i");
// //     $str=$('#inputAdress').val();
// //     if (Reg61.test($str)){
// //         $('.address-group').addClass('has-error');
// //         $('.address-help-block').addClass('danger');
// //         phoneValidate = false;
// //     }
// //     else {
// //         $('.address-group').removeClass('has-error');
// //         phoneValidate=true;
// //     }
// // });
//
//
// $(".next-step-button").click(function () {
//    call();
// });
//
//
// function call() {
//     var msg   = $('.orderForm').serialize();
//     $.ajax({
//         type: 'POST',
//         url: 'server.js',
//         data: msg,
//         success: function(data) {
//             alert("success");
//         },
//         error:  function(xhr, str){
//             alert('Возникла ошибка: ' + xhr.responseCode);
//         }
//     });
//
// }
//
//
// function validate(str) {
//     alert(str);
// }
//
var API = require('../API');



$(".next-step-button").click(function () {
    if ($("#inputName").val() === "") {
        $(".name-help-block").show();
    } else $(".name-help-block").hide();
    if ($("#inputPhone").val() === "") {
        $(".phone-help-block").show();
    } else $(".phone-help-block").hide();
    if ($("#inputAddress").val() === "") {
        $(".address-help-block").show();
    } else $(".address-help-block").hide();
});

$("#inputName").on("input", function () {
    if (!valName()) {
        $(".name-help-block").show();
    } else {
        $(".name-help-block").hide();
    }
});

$("#inputPhone").on("input", function () {
    if (!valPhone()) {
        $(".phone-help-block").show();
    } else {
        $(".phone-help-block").hide();
    }
});

$("#inputAddress").on("input", function () {
    if (!valAddress()) {
        $(".address-help-block").show();
    } else {
        $(".address-help-block").hide();
    }
});

function valName() {
    var expr = $("#inputName").val();
    return expr.match(/^([a-zA-Zа-яА-Я]+|[a-zA-Zа-яА-Я]+[ ][a-zA-Zа-яА-Я]+|([a-zA-Zа-яА-Я]+[\-][a-zA-Zа-яА-Я]+))+$/);
}

function valPhone() {
    var expr = $("#inputPhone").val();
    return expr.match(/^(\+380\d{9}|0\d{9})$/);
}

function valAddress() {
    //later, when google map
    return true;
}

function createOrder(callback) {
    API.createOrder({
        Name: $("#inputName").val(),
        Phone: $("#inputPhone").val(),
        Address: $("#inputAddress").val()
    }, function (err, result) {
        if(err) return callback(err);
        callback(null,  result);
    })
}

$(".next-step-button").click(function () {
    if (valName() && valPhone() && valAddress()) {
       createOrder(function (err, data) {
            if (err){
                return console.log("Can't create order");
            }
            alert("Order created");

        });
    }
});

exports.createOrder = createOrder;
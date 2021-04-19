/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");
var $navigation=$(".navigation");



$navigation.find(".all").click(function () {
    showPizzaList(Pizza_List);
    $(".howManyPizza").text("8");
});

$navigation.find(".meat").click(function () {
   filterPizza("М’ясна піца");
});

$navigation.find(".pineapple").click(function () {
   filterPizza("pineapple");
});

$navigation.find(".mushrooms").click(function () {
    filterPizza("mushroom");
});

$navigation.find(".seafood").click(function () {
   filterPizza("Морська піца");
});

$navigation.find(".vega").click(function () {
    filterPizza("Вега піца");
});






function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big,pizza.big_size.price);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small,pizza.small_size.price);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    var i=0;
    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру

        if(pizza.type.localeCompare(filter)==0){
            pizza_shown.push(pizza);
            i+=1;
        }

        if (filter.localeCompare("pineapple")==0&&pizza.content.pineapple!=undefined&&pizza.content.pineapple!=null){
            pizza_shown.push(pizza);
            i+=1;
        }


        if (filter.localeCompare("mushroom")==0&&pizza.content.mushroom!=undefined&&pizza.content.mushroom!=null){
            pizza_shown.push(pizza);
            i+=1;
        }


        $(".howManyPizza").text(i);

        //TODO: зробити фільтри
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;
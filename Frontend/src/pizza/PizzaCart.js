/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var API = require('../API');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");
var $bottom=$(".bottomOfBuyCart");
var $top=$(".headerOfBuyCart");

function addToCart(pizza, size,price) {
    //Додавання однієї піци в кошик покупок
    var k=Number($(".totalWorse").text())+Number(price);
    $bottom.find(".totalWorse").text(k);
    k=Number($top.find(".howManyOrders").text())+1;
    $top.find(".howManyOrders").text(k);


    var n=0;

    for(var i=0;i<Cart.length;i++) {
        if (Cart[i] != null && Cart[i] != undefined) {
        if (Cart[i].pizza == pizza && Cart[i].size == size && Cart[i].price == price) {
            Cart[i].quantity += 1;
            Cart[i].totalPrice += Cart[i].price;
            n += 1;
            //Оновлюємо відображення
            updateCart();
        }
    }
    }
    if(n==0){
        //Приклад реалізації, можна робити будь-яким іншим способом
        Cart.push({
            pizza: pizza,
            size: size,
            price:price,
            totalPrice:price,
            quantity: 1
        });


        //Оновити вміст кошика на сторінці
        updateCart();
    }
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    for (var i=0;i<Cart.length;i++){
        if(Cart[i]==cart_item){
            delete Cart[i];
        }
    }
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...


    var saved_cart=JSON.parse(localStorage.getItem("Cart"));
    var orders=localStorage.getItem("how_many_orders");
    var price=localStorage.getItem("totalPrice");
    if(saved_cart){
          Cart=saved_cart;
          $top.find(".howManyOrders").text(orders);
         $bottom.find(".totalWorse").text(price);
     }
    // var saved_cart = Storage.read("cart");
    // if (saved_cart) {
    //     Cart = saved_cart;
    // }
    updateCart();
    

}

function getPizzaSum() {
    return $('.totalWorse').text();
}

var basil=require('basil.js');

basil=new basil();

function write (key,value) {
    basil.set(key,value);
}

function read (key) {
    return basil.get(key);
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    // Storage.write("cart",Cart);
    // Storage.write("sum",$(".priceForOneOrder").text());
    // Storage.write("order",$(".howManyOrders").text());
    //Очищаємо старі піци в кошику
    //Storage.write("cart", Cart);
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            cart_item.totalPrice+=cart_item.price;


            var k=Number($(".totalWorse").text())+Number(cart_item.price);
            $bottom.find(".totalWorse").text(k);

            k=Number($top.find(".howManyOrders").text())+1;
            $top.find(".howManyOrders").text(k);
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minus").click(function () {
            if(cart_item.quantity>0){
                cart_item.quantity -=1;
                var k=Number($(".totalWorse").text())-Number(cart_item.price);
                $bottom.find(".totalWorse").text(k);
                k=Number($top.find(".howManyOrders").text())-1;
                $top.find(".howManyOrders").text(k);
                if(cart_item.quantity==0){
                    removeFromCart(cart_item);
                    updateCart();
                }
                else {
                    cart_item.totalPrice -= cart_item.price;
                    updateCart();
                }
            }
        });

        $node.find(".delete").click(function () {
            var k=Number($(".totalWorse").text())-Number(cart_item.totalPrice);
            $bottom.find(".totalWorse").text(k);

            k=Number($top.find(".howManyOrders").text())-cart_item.quantity;
            $top.find(".howManyOrders").text(k);
            removeFromCart(cart_item);
            updateCart();
        });


        $cart.append($node);
    }
    $(".clearOrders").click(function () {
        Cart=[];
        $bottom.find(".totalWorse").text(0);
        $top.find(".howManyOrders").text(0);
        updateCart();
    });


    // var serializedCart=JSON.stringify(Cart);
    //


     localStorage.setItem("Cart",JSON.stringify(Cart));
     localStorage.setItem("totalPrice",$(".totalWorse").text());
     localStorage.setItem(("how_many_orders"),$(".howManyOrders").text());
    Cart.forEach(showOnePizzaInCart);

}


exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;
exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;
exports.write=write;
exports.read=read;
exports.PizzaSize = PizzaSize;
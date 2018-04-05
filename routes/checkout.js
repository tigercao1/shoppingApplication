var express                 = require('express');
var paypal            = require('paypal-rest-sdk');
var router                  = express.Router();
var Cart                    = require('../models/cart');
var Order                   = require('../models/order');


paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Aab2QIrRswcJV_OvId7_3A1LNIukXK8XOSKHVVJiP30Dx0g7H5oVjINFWNcFbCbW_veZ4AFBi-wjLFx4',
  'client_secret': 'EJ5h2uMfTrYYKK8YGktnZY0OlHnXVONEyAOfy6nebtb9FTzrOMLqjquif61nua4u6ozLoahsARmA_e9W'
});

var payment_id;
var payment_method;
var payment_urls;
var CREATE_PAYMENT_URL = "";
var EXECUTE_PAYMENT_URL = "";

// GET checkout page
router.get('/', ensureAuthenticated, function(req, res, next){
    console.log(`ROUTE: GET CHECKOUT PAGE`)
    var cart = new Cart(req.session.cart)
    var totalPrice = cart.totalPrice
    res.render('checkout', {title: 'Checkout Page', items: cart.generateArray(), totalPrice: cart.totalPrice, bodyClass: 'registration', containerWrapper: 'container', userFirstName: req.user.fullname});
})

// POST checkout-process
router.post("/checkout-process", function(req, res){
   console.log(`ROUTE: POST CHECKOUT-PROGRESS`)
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice;

    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://thehiddentent.com/checkout/checkout-success",
            "cancel_url": "http://thehiddentent.com/checkout/checkout-cancel"
        },
        "transactions": [{
            "item_list": {
                "items": []
            },
            "amount": {
                "currency": "CAD",
                "total": cart.totalPrice
            },
            "description": "Purchase Summary from Supreme China"
        }]
    };

    var itemArray = cart.generateArray();
    // console.log (create_payment_json.intent);
    for (let item of itemArray){
      // console.log("Title: " + item.item.title + " \n");
      // console.log("Price: " + item.price + "\n");
      let itemToAdd = {
        "name" : item.item.title,
        "sku" : item.item.title,
        "price" : item.price,
        "currency" : "CAD",
        "quantity" : item.qty};
      console.log("Item: " + itemToAdd);
      create_payment_json.transactions[0].item_list.items.push(itemToAdd);
    }

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
          // console.log("Create Payment Response");
          console.log(payment);
          for (let url of payment.links){
            console.log(url.rel);
            if (url.rel === "approval_url"){
              console.log(url.href);
              res.redirect(url.href);
            }
          }
      }
    });


});

// GET checkout-success
router.get('/checkout-success', ensureAuthenticated, function(req, res){
    console.log(`ROUTE: GET CHECKOUT-SUCCESS`)
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice;
    let paymentId = req.query.paymentId
    let payerId = req.query.PayerID
    console.log("PayerID: " + payerId);
    console.log("PaymentID: " + paymentId);
    let execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "CAD",
              "total": cart.totalPrice
          }
      }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log("Get Payment Response");
          // console.log(JSON.stringify(payment));
          let order_id = payment.transactions[0].related_resources[0].sale.id;
          let shippingAddressObj = payment.payer.payer_info.shipping_address;
          let shipping_address = shippingAddressObj.line1 +
            ", " + shippingAddressObj.city +
            ", " + shippingAddressObj.state +
            ", " + shippingAddressObj.postal_code +
            ", " + shippingAddressObj.country_code;
          let order_date = payment.transactions[0].related_resources[0].sale.create_time
          var newOrder = new Order({
            orderID             : order_id,
            username            : req.user.username,
            address             : shipping_address,
            orderDate           : order_date,
            shipping            : true
          });
          newOrder.save();
          res.render('checkoutSuccess', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname});
      }
    });
    cart.emptyCart();
    console.log (cart);
    req.session.cart = cart;
    console.log(req.session.cart);
});

// PAYMENT CANCEL
router.get('/checkout-cancel', ensureAuthenticated, function(req, res){
    console.log(`ROUTE: GET CHECKOUT-CANCEL`)
    res.render('checkoutCancel', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname});
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        console.log(`ERROR: USER IS NOT AUTHENTICATED`)
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/');
    }
}

module.exports = router;

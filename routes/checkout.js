var express                 = require('express');
var router                  = express.Router();
var Cart                    = require('../models/cart');
var Order                   = require('../models/order');


// GET checkout page
router.get('/', ensureAuthenticated, function(req, res, next){
    console.log(`ROUTE: GET CHECKOUT PAGE`)
    var cart = new Cart(req.session.cart)
    var totalPrice = cart.totalPrice
    res.render('checkout', {title: 'Checkout Page', items: cart.generateArray(), totalPrice: cart.totalPrice, bodyClass: 'registration', containerWrapper: 'container', userFirstName: req.user.fullname});
})

// POST checkout-process
router.post('/checkout-process', function(req, res){
   console.log(`ROUTE: POST CHECKOUT-PROGRESS`)
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice;
    var didPaymentSucceed = Math.random()
    //FOR NOW
    if (didPaymentSucceed >= 0.5){
       //either of these two could work
       //res.render('checkoutSuccess', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
       res.redirect(302, '/checkout/checkout-success')
     }
    else {
       //either of these two could work
       //res.render('checkoutCancel', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
       res.redirect(302, '/checkout/checkout-cancel')
    }
});

// GET checkout-success
router.get('/checkout-success', ensureAuthenticated, function(req, res){
    console.log(`ROUTE: GET CHECKOUT-SUCCESS`)
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice;
    res.render('checkoutSuccess', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
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

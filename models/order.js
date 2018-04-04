var mongoose    = require('mongoose');

var orderSchema  = mongoose.Schema({
    orderID: {
        type    : String,
        index   : true
    },
    username: {
        type    : String
    },
    address: {
        type    : String
    },
    orderDate: {
        type    : String
    },
    shipping: {
        type    : Boolean
    }
});

var Order = module.exports = mongoose.model('Order', orderSchema);

// {
//   "id":"PAY-6E709189KG755910ULLCQDEQ",
//   "intent":"sale",
//   "state":"approved",
//   "cart":"8G368227X1596760E",
//   "payer":{
//     "payment_method":"paypal",
//     "status":"VERIFIED",
//     "payer_info":{
//       "email":"c359247377-buyer@hotmail.com",
//       "first_name":"test",
//       "last_name":"buyer",
//       "payer_id":"3E6VTHJZHY8S2",
//       "shipping_address":{
//         "recipient_name":"test buyer",
//         "line1":"1 Maire-Victorin",
//         "city":"Toronto",
//         "state":"Ontario",
//         "postal_code":"M5A 1E1",
//         "country_code":"CA"
//       },
//       "country_code":"CA"
//     }
//   },
//   "transactions":[
//     {
//       "amount":{
//         "total":"20289.98",
//         "currency":"CAD",
//         "details":{}
//       },"payee":{
//         "merchant_id":"NBKEPG3SY6FE6",
//         "email":"c359247377-facilitator@hotmail.com"
//       },
//       "description":"Purchase Summary from Supreme China",
//       "item_list":{
//         "items":[
//           {
//             "name":"Supreme Kryptonite U-Lock",
//             "sku":"Supreme Kryptonite U-Lock",
//             "price":"289.99",
//             "currency":"CAD","quantity":1
//           },{
//             "name":"Louis Vuitton",
//             "sku":"Louis Vuitton",
//             "price":"19999.99",
//             "currency":"CAD",
//             "quantity":1
//           }
//         ],
//         "shipping_address":{
//           "recipient_name":"test buyer",
//           "line1":"1 Maire-Victorin",
//           "city":"Toronto",
//           "state":"Ontario",
//           "postal_code":"M5A1E1",
//           "country_code":"CA"
//         }
//       },
//       "related_resources":[
//         {
//           "sale":{"id":"7VN90613W6667344Y","state":"pending","amount":{"total":"20289.98","currency":"CAD","details":{"subtotal":"20289.98"}},"payment_mode":"ECHECK","reason_code":"ECHECK","protection_eligibility":"INELIGIBLE","clearing_time":"2018-04-16T23:59:59.000Z","parent_payment":"PAY-6E709189KG755910ULLCQDEQ","create_time":"2018-04-04T16:47:46Z","update_time":"2018-04-04T16:47:46Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/sale/7VN90613W6667344Y","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/sale/7VN90613W6667344Y/refund","rel":"refund","method":"POST"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-6E709189KG755910ULLCQDEQ","rel":"parent_payment","method":"GET"}]}}]}],"create_time":"2018-04-04T16:47:46Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-6E709189KG755910ULLCQDEQ","rel":"self","method":"GET"}],"httpStatusCode":200}

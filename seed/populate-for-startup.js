var Product     = require('../models/product');
var User        = require('../models/user');
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/shoppingApp');

Product.remove({}, function(err){ //remove existing cat documents
  if(err) {
    console.log('ERROR: Remove failed')
    return
  }
  //ALL CAT DOCUMENTS REMOVED
});

User.remove({}, function(err){ //remove existing cat documents
  if(err) {
    console.log('ERROR: Remove failed')
    return
  }
  //ALL CAT DOCUMENTS REMOVED
});

var products = [
    new Product({
        imagePath   : 'https://images.stadiumgoods.com/imageresize?sku=011475%7CSU2277&image=gallery[1]&height=600&width=1000',
        title       : 'Supreme Chopstricks',
        description : 'Chopsticks SU2277, Colorway-RED',
        price       : 179.99
    }),
    new Product({
        imagePath   : 'https://images.stadiumgoods.com/imageresize?sku=009944%7CM53414&image=gallery[1]&height=600&width=1000',
        title       : 'Louis Vuitton',
        description : 'Christopher Backpack PM M53414',
        price       : 19999.99
    }),
    new Product({
        imagePath   : 'https://images.stadiumgoods.com/imageresize?sku=004000%7CSU0637&image=gallery[1]&height=600&width=1000',
        title       : 'Supreme Kryptonite U-Lock',
        description : 'Keep your bike from getting stolen in ultimate style with this high-quality Kryptonite U-Lock in collaboration with Supreme.',
        price       : 289.99
    }),

    new Product({
        imagePath   : 'https://assets.supremenewyork.com/149195/ma/9JSRXtmu_Jc.jpg',
        title       : 'Supreme Classic Wheels(Set of 4)',
        description : 'Classic Spitfire wheels with custom Supreme art. Each size sold separately as a set of four wheels.',
        price       : 35.99
    }),
    new Product({
        imagePath   : 'https://assets.supremenewyork.com/150013/ma/A_y8ADqvIYw.jpg',
        title       : 'Ladybug Pin',
        description : 'enamel pin',
        price       : 18.99
    }),
    new Product({
        imagePath   : 'https://assets.supremenewyork.com/147255/ma/ViH0QWMnTNU.jpg',
        title       : 'Chest Stripes Polo(Light Pink)',
        description : 'All cotton yarn dyed polo with flat knit collar and chest pocket with embroidered logo',
        price       : 128.99
    }),
    new Product({
        imagePath   : 'https://assets.supremenewyork.com/149806/ma/K-tKQp5La7Y.jpg',
        title       : 'Fiorenza Tee',
        description : 'All cotton classic Supreme t-shirt with printed graphic on front',
        price       : 41.99
    }),
    new Product({
        imagePath   : 'https://assets.supremenewyork.com/146201/ma/YYEPG6OtcVE.jpg',
        title       : 'Polka Dot Denim Shirt(Black)',
        description : 'All cotton denim with printed pattern. Chest pockets with button closure and embroidered logo on back',
        price       : 135.99
    }),
    new Product({
        imagePath   : 'https://assets.supremenewyork.com/147071/ma/17BFWJXFKfs.jpg',
        title       : 'Nan Goldin/Supreme Misty and Jimmy Paulette Coaches Jacket(Gold)',
        description : 'Water resistant poly with cotton jersey lining and snap front closure. Hand pockets at lower front with drawcord at waist. Printed graphic on back and printed logo on chest, Original artwork by Nan Goldin',
        price       : 228.99
    }),
    new Product({
        imagePath   : 'https://assets.supremenewyork.com/147016/ma/JfBKC7hn6kA.jpg',
        title       : 'Repeat Zip Up Hooded Sweatshirt',
        description : 'Cotton fleece with printed pattern, pouch pocket and zip closure',
        price       : 228.99
    }),
    new Product({
        imagePath   : 'https://assets.supremenewyork.com/149187/ma/AHiy6C168yc.jpg',
        title       : 'Supreme/Hanes Tagless Tees(3 Pack)',
        description : 'All cotton classic Hanes crewneck tee with stamped logo on lower front',
        price       : 36.99
    }),
    new Product({
        imagePath   : 'https://assets.supremenewyork.com/148435/ma/YJ3QsO4FWDw.jpg',
        title       : 'Waist Bag(Black)',
        description : '1050D Cordura ripstop nylon. Main zipper compartment with internal pockets. Front zipper compartment and adjustable waist strap with clasp. Jacquard logo webbing on strap and top handle. 2.5L',
        price       : 99.99
    }),
];

for (var i = 0; i < products.length; i++){
    products[i].save(function(err, result) {
        if(err) throw err;
    });
}

var users = [
  new User({
    username    : 'admin@admin.com',
    password    : 'admin',
    fullname    : 'Yizhang Cao',
    admin       : true
  }),
  new User({
    username    : 'elainedeng',
    password    : 'password',
    fullname    : 'Elaine Deng',
    admin       : true
  }),
  new User({
    username    : 'test',
    password    : 'test',
    fullname    : 'test',
    admin       : true
  })
];
for (var i=0; i < users.length; i++){
  User.createUser(users[i], function(err, user){
      if(err) throw err;
      if (i >= users.length -1){
        console.log("Exiting");
        exit();
      }
      console.log(user);

  });
}


function exit() {
    mongoose.disconnect();
}

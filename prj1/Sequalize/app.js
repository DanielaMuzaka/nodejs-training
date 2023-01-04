const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'Sequalize/views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }); //one to many
User.hasMany(Product);

User.hasOne(Cart); //one to one
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem }); //many to many
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User); //one to many

Product.hasMany(Order);  //many to many
Order.belongsToMany(Product, { through: OrderItem }); 

sequelize
  //.sync({ force: true })
   .sync()
  .then(db => {
   // console.log('starting point ******');
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      // console.log("user in second then:" , user);
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
   // console.log("user last then :" , user);
    return user.createCart();
  })
  .then(cart => {
    // console.log("user cart :" , cart);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

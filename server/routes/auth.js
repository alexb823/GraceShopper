const router = require('express').Router();
const {
  models: { User, Cart, LineItem },
} = require('../db');

module.exports = router;

// POST :/api/auth
// To login
router.post('/', (req, res, next) => {
  const { lineItems } = req.session;

  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  })
    .then(user => {
      if (!user) {
        const error = new Error('Incorrect email or password');
        error.status = 401;
        throw error;
      }
      req.session.user = user;
// Will merge the lineItems from session with what's in the users cart on login
      if (lineItems) {
        let usersCart;
        Cart.findOne({ where: { userId: user.id, status: 'inCart' } })
          .then(cart => (usersCart = cart))
          .then(() =>lineItems.forEach(item => {
            const { productId, quantity } = item;
            LineItem.findOne({ where: { productId: productId } })
            .then(lineItem => {
              if (lineItem) {
                lineItem.update({quantity: lineItem.quantity + quantity});
              } else {
                LineItem.create({productId, quantity, cartId: usersCart.id})
              }
            });
          })
        );
      }
      res.send(user);
    })
    .catch(next);
});

// DELETE :/api/auth
//To logout
router.delete('/', (req, res, next) => {
  req.session.destroy(() => res.sendStatus(204));
});

// GET :/api/auth
//Return the currently logged in user
router.get('/', (req, res, next) => {
  if (!req.session.user) {
    const error = new Error('Not logged in');
    error.status = 401;
    return next(error);
  }
  res.send(req.session.user);
});

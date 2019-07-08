const router = require('express').Router();
module.exports = router;

const {
  models: { Cart },
} = require('../db');

// GET :/api/carts
router.get('/', (req, res, next) => {
  Cart.findAll()
    .then(carts => {
      res.status(200).json(carts);
    })
    .catch(next);
});

// POST :/api/carts
router.post('/', (req, res, next) => {
  const { status, userId } = req.body;
  Cart.create({ status, userId })
    .then(newCart => {
      res.status(201).json(newCart);
    })
    .catch(next);
});

// PUT :/api/carts/:cartId
router.put('/:cartId', (req, res, next) => {
  const { cartId } = req.params;

  Cart.findByPk(cartId)
    .then(cart => {
      return cart.update({ ...req.body });
    })
    .then(updatedCart => res.status(202).json(updatedCart))
    .catch(next);
});

// GET :/api/carts/:userId/:status
router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;
  Cart.findAll({ where: { userId } })
    .then(carts => {
      res.status(200).json(carts);
    })
    .catch(next);
});

// GET :/api/carts/:userId/:status
router.get('/:userId/:status', (req, res, next) => {
  const { userId, status } = req.params;
  Cart.findAll({ where: { userId, status } })
    .then(carts => {
      res.status(200).json(carts);
    })
    .catch(next);
});

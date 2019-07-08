const router = require('express').Router();
const Op = require('sequelize').Op;

module.exports = router;

const {
  models: { Cart, LineItem },
} = require('../db');

//GET :/api/orders/:userId
router.get('/:userId/current', (req, res, next) => {
  const { userId } = req.params;
  return Cart.findAll({
      where: {
        userId,
        status: {
          [Op.or]: ['processing', 'shipped'] },
      },
      include: [{ model: LineItem }],
    })
    .then(orders => res.send(orders))
    .catch(next)
});

router.get('/:userId/past', (req, res, next) => {
  const { userId } = req.params;
  return Cart.findAll({
      where: {
        userId,
        status: 'delivered',
      },
      include: [{ model: LineItem }],
    })
    .then(orders => res.send(orders))
    .catch(next)
});

//GET :/api/orders/
router.get('/', (req, res, next) => {
  return Cart.findAll({
      where: {
        status: {
          [Op.or]: ['processing', 'shipped', 'delivered'] },
      },
      include: [{ model: LineItem }],
    })
    .then(orders => res.send(orders))
    .catch(next)
});

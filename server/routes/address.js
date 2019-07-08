const router = require('express').Router();
const {
  models: { Address },
} = require('../db');

module.exports = router;

// GET :/api/address/:userId
router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;

  Address.findAll({ where: { userId }, order: [['createdAt']] })
    .then(addresses => res.status(200).json(addresses))
    .catch(next);
});

// POST :/api/address/
router.post('/', (req, res, next) => {
  const {
    streetAddress,
    streetAddress2,
    city,
    state,
    zipCode,
    userId,
  } = req.body;

  Address.create({
    streetAddress,
    streetAddress2,
    city,
    state,
    zipCode,
    userId,
  })
    .then(address => {
      res.status(201).json(address);
    })
    .catch(next);
});

// PUT :/api/address/:addressId
router.put('/:addressId', (req, res, next) => {
  const { addressId } = req.params;
  const revisedAddress = req.body;

  Address.findByPk(addressId)
    .then(address => address.update(revisedAddress))
    .then(newAddress => res.status(202).json(newAddress))
    .catch(next);
});

// DELETE :/api/address/:addressId
router.delete('/:addressId', (req, res, next) => {
  const { addressId } = req.params;

  Address.destroy({ where: { id: addressId } })
    .then(() => {
      res.sendStatus(202);
    })
    .catch(next);
});

const router = require('express').Router();
module.exports = router;

const { models: { User } } = require('../db');


// GET :/api/users/
router.get('/', (req, res, next) => {
  User.findAll({ order: [
        ['firstName'],
        ['lastName']
      ] })
    .then(users => res.send(users))
    .catch(next)
})


// Delete :/api/users/
router.delete('/:userId', (req, res, next) => {
  User.findByPk(req.params.userId)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})

// PUT :/api/users/
router.put('/:userId', (req, res, next) => {
  User.findByPk(req.params.userId)
  .then(user => user.update(req.body))
  .then(user => res.status(201).send(user))
  .catch(next)
})

// POST :/api/users/
router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(user => res.status(201).send(user))
  .catch(next)
})

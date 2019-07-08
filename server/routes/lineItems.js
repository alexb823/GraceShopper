const router = require('express').Router();
module.exports = router;

const {
  models: { LineItem },
} = require('../db');

// POST :/api/lineItems
// Will add line item to db, or to session if not logged in
router.post('/', (req, res, next) => {
  const { productId, quantity, cartId } = req.body;
  const { user, lineItems } = req.session;

  if (!user && !lineItems) {
    req.session.lineItems = [req.body];
    res.send(req.session.lineItems);
  } else if (!user) {
    const lineItem = lineItems.find(item => item.productId === productId);
    if (lineItem) lineItem.quantity += quantity;
    else lineItems.push(req.body);
    res.send(req.session.lineItems);
  } else {
    LineItem.create({ productId, quantity, cartId })
      .then(lineitem => {
        res.status(201).json(lineitem);
      })
      .catch(next);
  }
});

// GET :/api/lineItems/
// Will get the lineItems saved on the session
router.get('/', (req, res, next) => {
  const { lineItems } = req.session;
  if (lineItems) res.send(lineItems);
});

// GET :/api/lineItems/:cartId
router.get('/:cartId', (req, res, next) => {
  const { cartId } = req.params;
  LineItem.findAll({ where: { cartId }, order: [['createdAt']] })
    .then(lineItems => res.status(200).json(lineItems))
    .catch(next);
});

// PUT :/api/lineItems/:lineItemId
router.put('/:lineItemId', (req, res, next) => {
  const { lineItemId } = req.params;
  const { quantity } = req.body;
  LineItem.findByPk(lineItemId)
    .then(lineItem => lineItem.update({ quantity }))
    .then(newLineItem => res.status(204).json(newLineItem))
    .catch(next);
});

// DELETE :/api/lineItems/:lineItemId
router.delete('/:lineItemId/:productId', (req, res, next) => {
  const { lineItemId, productId } = req.params;
  const id = parseInt(productId);
  let { user, lineItems } = req.session;
  if (!user) {
    req.session.lineItems = lineItems.filter(item => item.productId !== id);
    res.sendStatus(204);
  } else {
    LineItem.destroy({ where: { id: lineItemId } })
      .then(() => res.sendStatus(204))
      .catch(next);
  }
});

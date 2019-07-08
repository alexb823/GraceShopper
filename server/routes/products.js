const router = require('express').Router();
const {
  models: { Product, Category },
} = require('../db');

module.exports = router;

// GET :/api/products
router.get('/', (req, res, next) => {
  return Product.findAll({ order: [['id']] })
    .then(products => res.send(products))
    .catch(next);
});

// GET :/api/products/categories
router.get('/categories', (req, res, next) => {
  return Category.findAll({ order: [['name']] })
    .then(categories => res.send(categories))
    .catch(next);
});

// GET :/api/products/categories/:category
router.get('/categories/:categoryId', (req, res, next) => {
  return Product.findAll({
    where: {
      categoryId: req.params.categoryId,
    },
  })
    .then(products => res.send(products))
    .catch(next);
});

// GET :/api/products/:productId
router.get('/:productId', (req, res, next) => {
  return Product.findByPk(req.params.productId)
    .then(product => res.send(product))
    .catch(next);
});

// DELETE :/api/products/categories/:categoryId
// delete category
router.delete('/categories/:categoryId', (req, res, next) => {
  return Product.update(
    {
      categoryId: null,
    },
    { where: { categoryId: req.params.categoryId } }
  )
    .then(() => Category.destroy({ where: { id: req.params.categoryId } }))
    .then(() => res.sendStatus(204))
    .catch(next);
});

// DELETE :/api/products/:productId
// delete product
router.delete('/:productId', (req, res, next) => {
  Product.destroy({ where: { id: req.params.productId } })
    .then(() => res.sendStatus(204))
    .catch(next);
});

// PUT :/api/products/:productId
router.put('/:productId', (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then(product => product.update(req.body))
    .then(product => res.status(201).send(product))
    .catch(next);
});

// PUT :/api/products/categories/:categoryId
// updated category
router.put('/categories/:categoryId', (req, res, next) => {
  Category.findByPk(req.params.categoryId)
    .then(category => category.update(req.body))
    .then(category => res.status(201).send(category))
    .catch(next);
});

// POST :/api/products
router.post('/', (req, res, next) => {
  return Product.create(req.body)
    .then(product => res.status(201).send(product))
    .catch(next);
});

// POST :/api/products/categories
// create a new category
router.post('/categories', (req, res, next) => {
  return Category.create(req.body)
    .then(category => res.status(201).send(category))
    .catch(next);
});

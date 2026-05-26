const slug = require('mongoose-slug-updater');
const express = require('express');
const router = express.Router();

const billController = require('../app/controllers/billControlers');
router.get('/show', billController.index);
router.get('/create', billController.create);
router.post('/store', billController.store);
router.delete('/:id', billController.delete);
router.get('/:id/pdf', billController.pdf);
module.exports = router;
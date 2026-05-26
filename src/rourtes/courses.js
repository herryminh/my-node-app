
const slug = require('mongoose-slug-updater');
const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/courseController');

// NewsController.index;
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.delete);
router.get('/:slug', courseController.show);


module.exports = router;

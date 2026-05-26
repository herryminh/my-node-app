const slug = require('mongoose-slug-updater');
const express = require('express');
const router = express.Router();

const clientController = require('../app/controllers/clientControler');

// NewsController.index;
router.get('/show', clientController.storedClient);
router.get('/:id/edit', clientController.edit);
router.get('/create', clientController.create);
router.post('/store', clientController.store);
router.put('/:id', clientController.update);
router.delete('/:id', clientController.delete);
// router.get('/:slug', clientController.show);


module.exports = router;


const slug = require('mongoose-slug-updater');
const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/meController');

// NewsController.index;
router.get('/stored', meController.storedCouses);
module.exports = router;

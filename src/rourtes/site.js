const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/siteController');

// NewsController.index;
router.get('/', siteController.index);

module.exports = router;

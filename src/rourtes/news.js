
const slug = require('mongoose-slug-updater');
const express = require('express');
const router = express.Router();

const NewsController = require('../app/controllers/newsController');
const { ensureAuthenticated, ensureGuest } = require('../middleware/authMiddleware');
// NewsController.index;

router.get('/create', ensureGuest, NewsController.create);
router.post('/store', NewsController.store);
router.get('/acount', ensureAuthenticated, NewsController.acount);
router.get('/login', ensureGuest, NewsController.login);
router.post('/checkLogin', NewsController.checkLogin);
router.get('/logout', ensureAuthenticated, NewsController.logout);
router.get('/', NewsController.index);

module.exports = router;

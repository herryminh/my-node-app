
const slug = require('mongoose-slug-updater');
const express = require('express');
const router = express.Router();

const billController = require('../app/controllers/billControlers');

// Hiển thị danh sách hóa đơn
router.get('/show', billController.index);

// Trang thống kê doanh số khách hàng
router.get('/statistics', billController.statistics);

// Tạo hóa đơn
router.get('/create', billController.create);

// Lưu hóa đơn
router.post('/store', billController.store);

// Xóa hóa đơn
router.delete('/:id', billController.delete);

// In hóa đơn PDF
router.get('/:id/pdf', billController.pdf);

module.exports = router;
const mongoose = require('mongoose');
const Bill = require('../models/bill.js');
const Client = require('../models/client.js');
const Course = require('../models/course.js');
const { multipleMongooseToObject, mongooseToObject } = require('../util/mongoose.js');
const PDFDocument = require('pdfkit');

class BillController {
   
    // UPDATE: Hàm index giờ đã có thể bắt query từ URL để lọc ngày tháng
    index(req, res, next) {
        // Lấy ngày tháng từ form (thanh URL)
        const { fromDate, toDate } = req.query;
        let query = {};

        // Nếu người dùng có chọn ngày thì thêm điều kiện vào truy vấn DB
        if (fromDate || toDate) {
            query.createdAt = {};
            if (fromDate) {
                // Lấy từ 00:00:00 của ngày bắt đầu
                query.createdAt.$gte = new Date(`${fromDate}T00:00:00.000Z`);
            }
            if (toDate) {
                // Lấy đến 23:59:59 của ngày kết thúc
                query.createdAt.$lte = new Date(`${toDate}T23:59:59.999Z`);
            }
        }

        // Truy vấn DB với bộ lọc query và sắp xếp hóa đơn mới nhất lên đầu (-1)
        Bill.find(query).sort({ createdAt: -1 })
            .then(bills => res.render('bill/show', {
                bills: multipleMongooseToObject(bills),
                fromDate: fromDate || '', // Trả lại ngày để giữ giá trị trên ô input
                toDate: toDate || ''      // Trả lại ngày để giữ giá trị trên ô input
            }))
            .catch(next);
    }

    create(req, res) {
        Promise.all([
            Client.find({}),
            Course.find({ trang_thai: "còn hàng" })
        ])
        .then(([clients, courses]) => {
            res.render('bill/createBill', { 
                clients: multipleMongooseToObject(clients),
                courses: multipleMongooseToObject(courses) 
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Lỗi khi tải dữ liệu');
        });
    }

    store(req, res) {
        const formData = req.body;
        
        // Tạo đối tượng hóa đơn mới dựa trên formData
        const bill = new Bill(formData);

        bill.save()
            .then(() => res.redirect('/bill/show')) // Đảm bảo URL này khớp với route render danh sách của bạn
            .catch((error) => {
                console.error(error);
                res.status(500).send('Lỗi tạo hóa đơn');
            });
    }

    delete(req, res, next) {
        Bill.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    pdf(req, res, next) {
        Bill.findById(req.params.id)
            .then(bill => {
                res.render('bill/pdf', { 
                    bill: mongooseToObject(bill),
                    hideHeader: true // Dòng quan trọng để ẩn header hệ thống
                });
            })
            .catch(next);
    }
}

module.exports = new BillController();
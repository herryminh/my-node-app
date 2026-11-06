
const mongoose = require('mongoose');
const Bill = require('../models/bill.js');
const Client = require('../models/client.js');
const Course = require('../models/course.js');
const {
    multipleMongooseToObject,
    mongooseToObject
} = require('../util/mongoose.js');
const PDFDocument = require('pdfkit');

class BillController {

    // HIỂN THỊ DANH SÁCH HÓA ĐƠN
    index(req, res, next) {
        const { fromDate, toDate } = req.query;
        let query = {};

        if (fromDate || toDate) {
            query.createdAt = {};

            if (fromDate) {
                query.createdAt.$gte =
                    new Date(`${fromDate}T00:00:00.000Z`);
            }

            if (toDate) {
                query.createdAt.$lte =
                    new Date(`${toDate}T23:59:59.999Z`);
            }
        }

        Bill.find(query)
            .sort({ createdAt: -1 })
            .then(bills => res.render('bill/show', {
                bills: multipleMongooseToObject(bills),
                fromDate: fromDate || '',
                toDate: toDate || ''
            }))
            .catch(next);
    }


    // THỐNG KÊ TỔNG TIỀN THEO KHÁCH HÀNG
   // THỐNG KÊ TỔNG TIỀN THEO KHÁCH HÀNG
statistics(req, res, next) {
    const { customerName, fromDate, toDate } = req.query;

    const query = {};

    // Lọc theo tên quầy thuốc
    if (customerName) {
        query.pharmacyName = customerName;
    } else {
        // Chưa chọn quầy thuốc thì không hiển thị hóa đơn
        query._id = null;
    }

    // Lọc theo ngày
    if (fromDate || toDate) {
        query.createdAt = {};

        if (fromDate) {
            query.createdAt.$gte =
                new Date(`${fromDate}T00:00:00.000Z`);
        }

        if (toDate) {
            query.createdAt.$lte =
                new Date(`${toDate}T23:59:59.999Z`);
        }
    }

    Promise.all([
        Bill.find(query).sort({ createdAt: -1 }),
        Client.find({}).sort({ name: 1 })
    ])
        .then(([bills, clients]) => {

            // Chuyển dữ liệu hóa đơn
            const billData = multipleMongooseToObject(bills)
                .map((bill, index) => ({
                    ...bill,
                    stt: index + 1
                }));

            // Giữ lại quầy thuốc đã chọn
            const clientData = multipleMongooseToObject(clients)
                .map(client => ({
                    ...client,
                    selected: client.name === customerName
                }));

            // Tính tổng tiền
            const totalAmount = bills.reduce(
                (sum, bill) =>
                    sum + Number(bill.totalAmount || 0),
                0
            );

            res.render('bill/statistics', {
                bills: billData,
                clients: clientData,
                customerName: customerName || '',
                fromDate: fromDate || '',
                toDate: toDate || '',
                totalAmount,
                totalBills: bills.length
            });
        })
        .catch(next);
}


    // TẠO HÓA ĐƠN
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


    // LƯU HÓA ĐƠN
    store(req, res) {
        const formData = req.body;

        const bill = new Bill(formData);

        bill.save()
            .then(() => res.redirect('/bill/show'))
            .catch((error) => {
                console.error(error);
                res.status(500).send('Lỗi tạo hóa đơn');
            });
    }


    // XÓA HÓA ĐƠN
    delete(req, res, next) {
        Bill.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }


    // IN HÓA ĐƠN PDF
    pdf(req, res, next) {
        Bill.findById(req.params.id)
            .then(bill => {
                res.render('bill/pdf', {
                    bill: mongooseToObject(bill),
                    hideHeader: true
                });
            })
            .catch(next);
    }

}

module.exports = new BillController();

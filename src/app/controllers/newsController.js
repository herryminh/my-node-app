const User = require('../models/user');
const { mongooseToObject,multipleMongooseToObject } = require('../util/mongoose');

class NewsController {
    index(req, res) {
        // Code để hiển thị danh sách người dùng, nếu cần thiết
    }
    
    create(req, res) {
        res.render('login/news'); // Render form để tạo người dùng
    }

    store(req, res) {
        const formData = req.body;
        const user = new User(formData);

        user.save()
            .then(() => res.redirect('/news/login'))
            .catch(error => {
                // Xử lý lỗi
                console.error('Lỗi khi lưu người dùng:', error);
                res.status(500).send('Đã xảy ra lỗi khi lưu người dùng.');
            });
    }

    login(req, res) {
        res.render('login/login'); 
    }

    async checkLogin(req, res) {
        const { userName, password } = req.body;
    
        try {
            // Kiểm tra xem người dùng có tồn tại không
            const user = await User.findOne({ userName });
            if (!user) {
                return res.status(400).json({ message: 'Tên đăng nhập không đúng' });
            }
    
            // So sánh mật khẩu
            if (password !== user.password) {
                return res.status(400).json({ message: 'Mật khẩu không đúng' });
            }
    
            // Lưu thông tin người dùng vào session
            req.session.user = user;
    
            // Chuyển hướng đến trang acount
            return res.redirect('/');
        } catch (error) {
            return res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng nhập' });
        }
    }

    async acount(req, res, next) {
        try {
            const userId = req.session.user._id;
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
    
            // Render view acount và truyền dữ liệu người dùng cùng với layout
            res.render('login/acount', { user: mongooseToObject(user)});
        } catch (error) {
            return next(error);
        }
    }
    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng xuất' });
            }
            res.redirect('/news/login');
        });
    }
}

module.exports = new NewsController();

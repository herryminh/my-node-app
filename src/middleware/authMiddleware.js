// middleware/authMiddleware.js
module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.session.user) {
            return next();
        }
        res.redirect('/news/login');
    },
    ensureGuest: (req, res, next) => {
        if (req.session.user) {
            return res.redirect('/');
        }
        next();
    }
};

const newsRouters = require('./news');
const coursesRouters = require('./courses');
const meRouters = require('./me');
const siteRouters = require('./site');
const clientRouters = require('./client');
const billRouters = require('./bill');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
function route(app) {
    app.use('/courses',ensureAuthenticated , coursesRouters);
    app.use('/bill',ensureAuthenticated ,billRouters);
    app.use('/client',ensureAuthenticated ,clientRouters);
    app.use('/me',ensureAuthenticated , meRouters);
    app.use('/news' , newsRouters);
    app.use('/',ensureAuthenticated , siteRouters);

}
module.exports = route;

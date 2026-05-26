const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars').engine;
const app = express();
const PDFDocument = require('pdfkit');
const port = 3000;
const methodOverride = require('method-override')
const jsonExpress = express.json()
const slug = require('mongoose-slug-updater')
const session = require('express-session');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const bcrypt = require('bcrypt');
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Đặt thành true nếu bạn sử dụng HTTPS
  }));

app.use(methodOverride('_method'))
// Import các route và kết nối database
const route = require('./rourtes/index.js');
const bd = require('./config/db');
// connect data base
bd.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.engine(
    'hbs',
    exphbs({
        extname: '.hbs',
        helpers : {
            sum : (a,b) => a+b ,
            eq: (a, b) => a === b,  // Thêm helper eq
        }
    }),
);


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// Đoạn mã để xử lý yêu cầu favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Sử dụng các route được định nghĩa trong file routes.js
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const handlebars = require('express-handlebars').engine;
const route = require('./routes');
const db = require('./config/db/index');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const connectCloudinary = require('./config/cloudinary');
const cors = require('cors');
require('dotenv').config();

const SESSION_SECRET = process.env.SESSION_SECRET || 'default_secret_key'; // Thêm giá trị mặc định

// **Kết nối database & Cloudinary**
db.connect();
connectCloudinary();

// **Middleware**
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(
    cors({
        origin: 'http://localhost:5173', // Cho phép frontend React
        methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS', // Thêm PATCH vào danh sách
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
    }),
);
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(methodOverride('_method'));
app.use(SortMiddleware);

// **Cấu hình session**
app.use(
    session({
        secret: SESSION_SECRET, // Chuỗi bí mật (có giá trị mặc định)
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Để test trên localhost
    }),
);

// **Cấu hình Handlebars**
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'main',
        helpers: require('./helpers/handlebars'),
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// **Khai báo route**
route(app);

// **Chạy server**
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

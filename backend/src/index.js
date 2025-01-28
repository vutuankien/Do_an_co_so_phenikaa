const express = require('express');
const app = express();
const session = require('express-session');
const Port = 3000;
const path = require('path');
const handlebars = require('express-handlebars').engine;
const route = require('./routes');
const db = require('./config/db/index');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const connectCloudinary = require('./config/cloudinary');
require('dotenv').config();

//**Connected to database */
db.connect();
connectCloudinary();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(SortMiddleware);
//config engine
app.use(
    session({
        secret: process.env.SESSION_SECRET, // Chuỗi bí mật
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Để test trên localhost
    }),
);

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

route(app);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:${Port}`);
});

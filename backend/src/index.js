const express = require('express');
const app = express();
const Port = 3000;
const path = require('path');
const handlebars = require('express-handlebars').engine;
const route = require('./routes');
const db = require('./config/db/index');
const methodOverride = require('method-override');

//**Connected to database */
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//config engine
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

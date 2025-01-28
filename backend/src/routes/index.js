const express = require('express');
const homeRouter = require('./home');
const cosmeticRouter = require('./cosmetic');
const trashRouter = require('./trash');
const cartRouter = require('./API/cartData');
const productRouter = require('./API/product');
const blogRouter = require('./blog');
const userRouter = require('./auth_route/user');
const adminAuth = require('../app/middlewares/adminAuth');

function route(app) {
    // Khi vào trang chủ (`/`), hiển thị trang đăng nhập
    app.get('/', (req, res) => {
        res.render('layouts/login', { layout: 'login' });
    });

    // Xử lý đăng nhập
    app.use('/api/user', userRouter);

    // API routes
    app.use('/api/cart', cartRouter);
    app.use('/api/product', productRouter);
    app.use('/trash', trashRouter);
    app.use('/cosmetic', cosmeticRouter);
    app.use('/blog', blogRouter);

    app.get('/home', adminAuth, (req, res) => {
        res.render('layouts/main', { layout: 'main' });
    });
    app.get('/logout', (req, res) => {
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
}

module.exports = route;

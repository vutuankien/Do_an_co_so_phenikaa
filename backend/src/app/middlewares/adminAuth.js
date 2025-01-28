const jwt = require('jsonwebtoken');

const adminAuth = async (req, res, next) => {
    try {
        const token = req.session.token; // ✅ Lấy token từ session

        if (!token) {
            return res.redirect('/'); // Nếu không có token, quay về trang login
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.email !== process.env.ADMIN_EMAIL) {
            return res.redirect('/'); // Nếu không phải admin, quay về login
        }

        req.user = tokenDecode; // Lưu thông tin admin vào request
        next();
    } catch (error) {
        return res.redirect('/');
    }
};

module.exports = adminAuth;

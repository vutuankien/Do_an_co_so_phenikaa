const User = require('../../models/User');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

class UserController {
    async userLogin(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    message: 'Please register your account',
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: 'Invalid credentials',
                });
            } else {
                const token = createToken(user._id);
                res.status(200).json({
                    message: 'Login successful',
                    user: user,
                    token: token,
                });
            }
            // Generate JWT token
        } catch (error) {
            res.status(500).json({
                message: 'Server Error',
            });
        }
    }

    async userRegister(req, res) {
        try {
            const { name, email, password } = req.body;

            // Check for missing fields
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: 'Please enter all fields',
                });
            }

            // Check if user already exists
            const exitsUser = await User.findOne({ email });
            if (exitsUser) {
                return res.status(400).json({
                    message: 'User already exists',
                });
            }

            // Validate email
            if (!validator.isEmail(email)) {
                return res.json({
                    success: false,
                    message: 'Invalid email',
                });
            }

            // Validate password strength
            if (password.length < 8) {
                return res.json({
                    success: false,
                    message: 'Enter a strong password',
                });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new user
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });

            const user = await newUser.save();

            // Generate token
            const token = createToken(user._id);

            // Respond with success
            res.status(200).json({
                message: 'User created successfully',
                user: user,
                token: token,
            });
        } catch (error) {
            console.log(error);
            console.log('JWT_SECRET: ' + process.env.JWT_SECRET);
            res.status(500).json({
                message: 'Server Error',
            });
        }
    }

    async adminLogin(req, res) {
        const { email, password } = req.body;

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const token = jwt.sign(
                { email, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
            );

            // ✅ Lưu token vào session
            req.session.token = token;

            // ✅ Chuyển hướng đến trang chính
            return res.redirect('/home');
        }

        return res.render('layouts/login', {
            layout: 'login',
            error: 'Email hoặc mật khẩu không chính xác!',
        });
    }

    index(req, res) {
        User.find({})
            .lean()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json('Error:' + err));
    }
}

module.exports = new UserController();

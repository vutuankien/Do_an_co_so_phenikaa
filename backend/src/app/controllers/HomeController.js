const Customer = require('../models/Customer');
const Bill = require('../models/Bill');
const Blog = require('../models/Blog');
const Employee = require('../models/Employee');
const Cosmetic = require('../models/Cosmetic');

class HomeController {
    async index(req, res) {
        try {
            // Đếm số lượng khách hàng, nhân viên, mỹ phẩm, bài viết
            const [customers, employees, cosmetics, blogs, bills] =
                await Promise.all([
                    Customer.countDocuments(),
                    Employee.countDocuments(),
                    Cosmetic.countDocuments(),
                    Blog.countDocuments(),
                    Bill.countDocuments(),
                ]);

            // Lấy dữ liệu doanh thu theo tháng
            const revenueAggregation = await Bill.aggregate([
                {
                    $match: { orderDate: { $exists: true, $ne: null } },
                },
                {
                    $project: {
                        month: { $month: '$orderDate' },
                        totalPrice: {
                            $toDouble: {
                                $substrBytes: [
                                    { $toString: '$totalPrice' },
                                    1,
                                    -1,
                                ], // Chuyển về số, bỏ ký tự '$' nếu có
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: '$month',
                        total: { $sum: '$totalPrice' },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            const revenueData = {
                labels: revenueAggregation.map((item) => `Tháng ${item._id}`),
                values: revenueAggregation.map((item) => item.total.toFixed(2)), // Định dạng số có 2 chữ số sau dấu thập phân
            };

            // Kiểm tra dữ liệu trước khi render

            const billCountAggregation = await Bill.aggregate([
                { $match: { orderDate: { $exists: true, $ne: null } } },
                {
                    $group: {
                        _id: { $month: '$orderDate' },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            const billCountData = {
                labels: billCountAggregation.map((item) => `Tháng ${item._id}`),
                values: billCountAggregation.map((item) => item.count),
            };

            const blogPostAggregation = await Blog.aggregate([
                {
                    $group: {
                        _id: { $month: '$createdAt' },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            const blogPostData = {
                labels: blogPostAggregation.map((item) => `Tháng ${item._id}`),
                values: blogPostAggregation.map((item) => item.count),
            };

            const productCategoryAggregation = await Cosmetic.aggregate([
                {
                    $group: {
                        _id: '$category',
                        count: { $sum: 1 },
                    },
                },
            ]);

            const productCategoryData = {
                labels: productCategoryAggregation.map((item) => item._id),
                values: productCategoryAggregation.map((item) => item.count),
            };

            console.log('Dữ liệu doanh thu gửi về frontend:', revenueData);
            console.log('Dữ liệu bài viết gửi về frontend:', blogPostData);
            console.log(
                'Dữ liệu product gửi về frontend:',
                productCategoryData,
            );
            console.log('Dữ liệu bill gửi về frontend:', billCountData);
            res.render('home', {
                customerCount: customers || 0,
                billCount: bills || 0,
                blogCount: blogs || 0,
                cosmeticCount: cosmetics || 0,
                employeeCount: employees || 0,
                revenueTotal:
                    revenueAggregation
                        .reduce((acc, item) => acc + item.total, 0)
                        .toFixed(2) || 0,
                revenueData: JSON.stringify(revenueData),
                billCountData: JSON.stringify(billCountData),
                blogPostData: JSON.stringify(blogPostData),
                productCategoryData: JSON.stringify(productCategoryData),
            });
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
            res.status(500).json({
                message: 'Lỗi server',
                error: error.message,
            });
        }
    }
}

module.exports = new HomeController();

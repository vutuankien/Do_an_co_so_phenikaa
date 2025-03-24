const Customer = require('../models/Customer');
const Bill = require('../models/Bill');
const Blog = require('../models/Blog');
const Employee = require('../models/Employee');
const Cosmetic = require('../models/Cosmetic');

class HomeController {
    async index(req, res) {
        const convertBillChartData = (bills) => {
            let monthCount = {}; // Đếm số đơn hàng theo tháng
            bills.forEach(bill => {
                let month = new Date(bill.orderDate).getMonth() + 1; // Lấy tháng (1-12)
                monthCount[month] = (monthCount[month] || 0) + 1;
            });

            return {
                labels: Object.keys(monthCount).map(m => `Tháng ${m}`),
                values: Object.values(monthCount)
            };
        };
        const convertEmployeeChartData = (employees) => {
            let monthCount = {}; // Đếm số đơn hàng theo tháng
            employees.forEach(employee => {
                let month = new Date(employee.createdAt).getMonth() + 1; // Lấy tháng (1-12)
                monthCount[month] = (monthCount[month] || 0) + 1;
            });

            return {
                labels: Object.keys(monthCount).map(m => `Tháng ${m}`),
                values: Object.values(monthCount)
            };
        };


        const convertBlogChartData = (blogs) => {
            let monthCount = {}; // Đếm số đơn hàng theo tháng
            blogs.forEach(blog => {
                let month = new Date(blog.createdAt).getMonth() + 1; // Lấy tháng (1-12)
                monthCount[month] = (monthCount[month] || 0) + 1;
            });

            return {
                labels: Object.keys(monthCount).map(m => `Tháng ${m}`),
                values: Object.values(monthCount)
            };
        };
        try {
            // Lấy số lượng khách hàng, nhân viên, mỹ phẩm, bài viết
            const customers = await Customer.countDocuments({});
            const employees = await Employee.countDocuments({});
            const cosmetics = await Cosmetic.countDocuments({});
            const blogs = await Blog.countDocuments({});


            const employeeData = await Employee.find({}).lean();
            const BillData = await Bill.find({}).lean();
            const blogData = await Blog.find({}).lean();

            // Lấy số lượng đơn hàng
            const bills = await Bill.countDocuments({});

            // Lấy danh sách tổng giá trị hóa đơn
            const billsData = await Bill.find({}, { totalPrice: 1, createdAt: 1 }).lean();
            console.log("Danh sách Bills:", billsData);

            // Chuyển đổi tổng giá thành số, tránh lỗi khi xử lý aggregation
            const revenue = await Bill.aggregate([
                {
                    $match: { createdAt: { $exists: true, $ne: null } }
                },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        totalPrice: {
                            $toDouble: { $substrBytes: ["$totalPrice", 1, -1] } // Cắt bỏ ký tự đầu tiên ('$')
                        }
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: "$totalPrice" }
                    }
                },
                { $sort: { _id: 1 } }
            ]);


            // Kiểm tra nếu không có dữ liệu
            const revenueData = revenue.length > 0 ? {
                labels: revenue.map(item => `Tháng ${item._id}`),
                values: revenue.map(item => item.total)
            } : { labels: [], values: [] };

            console.log("Dữ liệu revenueData:", JSON.stringify(revenueData, null, 2));
            console.log("employeeData", JSON.stringify(convertEmployeeChartData(employeeData), null, 2));
            console.log("billChartData", JSON.stringify(convertBillChartData(BillData), null, 2));
            console.log("blogData", JSON.stringify(convertBlogChartData(blogData), null, 2));

            res.render('home', {
                customerCount: customers || 0,
                billCount: bills || 0,
                blogCount: blogs || 0,
                cosmeticCount: cosmetics || 0,
                employeeCount: employees || 0,
                revenueTotal: revenue.reduce((acc, item) => acc + item.total, 0).toFixed(2) || 0,
                revenueData: JSON.stringify(revenueData),
                // customerData: JSON.stringify(customerData),
                employeeData: JSON.stringify(convertEmployeeChartData(employeeData)),
                billChartData: JSON.stringify(convertBillChartData(BillData)),
                blogData: JSON.stringify(convertBlogChartData(blogData)),

            });


        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
            res.status(500).send("Lỗi server");
        }
    }
}

module.exports = new HomeController();

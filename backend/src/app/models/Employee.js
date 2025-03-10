const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const jwt = require('jsonwebtoken')
const shortUniqueId = require('short-unique-id');
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const uid = new shortUniqueId({ length: 5 });

const EmployeeSchema = new Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String, maxLength: 255, require: true },
        address: { type: String, maxLength: 500 },
        email: { type: String, require: true, maxLength: 100 },
        phone: { type: String, maxLength: 40 },
        age: { type: Number },
        slug: { type: String, unique: true },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
        level: { type: String },
        image: { type: String },
        salary: { type: Number },
    },
    {
        timestamps: true,
        minimize: false,
    },
);

EmployeeSchema.pre('save', async function (next) {
    if (!this.name || typeof this.name !== 'string') {
        this.slug = `employee_${uid.randomUUID()}`; // Nếu không có name, dùng ID ngẫu nhiên
        return next();
    }

    let employeeSlug = slugify(this.name, { lower: true, replacement: '_' });

    if (!employeeSlug || employeeSlug === '') {
        employeeSlug = `employee_${uid.randomUUID()}`; // Nếu slug bị rỗng, tạo mới
    }

    // Kiểm tra xem slug đã tồn tại chưa
    const existingEmployee = await mongoose
        .model('Employee')
        .findOne({ slug: employeeSlug })
        .lean();
    if (existingEmployee) {
        employeeSlug = `${employeeSlug}_${uid.randomUUID()}`;
    }

    this.slug = employeeSlug;
    next();
});

module.exports = mongoose.model('Employee', EmployeeSchema, 'Employee');

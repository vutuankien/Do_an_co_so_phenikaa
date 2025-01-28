const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const jwt = require('jsonwebtoken')
const shortUniqueId = require('short-unique-id');
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const uid = new shortUniqueId({ length: 5 });

const UserSchema = new Schema(
    {
        id: { type: Number },
        name: { type: String, maxLength: 255, require: true },
        address: { type: String, maxLength: 500 },
        email: { type: String, require: true, maxLength: 100 },
        password: { type: String, require: true, maxLength: 100 },
        image: { type: String, maxLength: 300 },
        token: { type: String, maxLength: 100 },
        slug: { type: String, unique: true },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
        cartData: { type: Object, default: {} },
    },
    {
        timestamps: true,
        minimize: false,
    },
);

// UserSchema.plugin(AutoIncrement);

UserSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});
UserSchema.pre('save', function (next) {
    let user = this;
    let userSlug = slugify(user.name, {
        lower: true,
        replacement: '_',
    });

    const existUser = mongoose.model('User').findOne({ slug: userSlug }).lean();

    if (existUser) {
        userSlug = `${userSlug}_${uid.randomUUID(5)}`;
    }
    user.slug = userSlug;
    next();
});

// UserSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({
//         _id: this._id,
//         email: this.email,
//         isAdmin: this.isAdmin
//     }, process.env.JWT_PRIVATE_KEY)
// };

module.exports = mongoose.model('User', UserSchema, 'User');

const {Schema, Model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    studentNo: {
        type: String,
        required: true
    },
    indexNo: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum:['TELESA', 'ELEESA', 'ACES', 'BMESS']
    },
    level: {
        type: Number,
        required: true,
        enum: [100, 200, 300, 400]
    },
    shopID: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Shop'
    },
    likedProducts: [{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Product'
    }],
    likedBlogs: [{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Blog'
    }],
    image: {
        type: String,
        required: false
    },
}, {timestamps: true});


const User = new Model('User', userSchema, 'Users');

module.exports = User;
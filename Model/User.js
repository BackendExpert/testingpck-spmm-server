const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, required: true, default: 'user'},
    is_active: {type: Boolean, required: true, default: 1}
}, {timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
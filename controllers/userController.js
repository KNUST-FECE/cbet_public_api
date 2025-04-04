const User = require('../models/users'); // Assuming you have a User model
const asyncHandler = require('express-async-handler');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Create a new user
// @route   POST /api/users
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
    const { name, indexNo, department, level, studentNo } = req.body;

    const userExists = await User.findOne({ name });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        indexNo,
        studentNo,
        department,
        level, 
    }); 

    if (user) {
        res.status(201).json(user);
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password; // Make sure to hash the password in the User model
        }

        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { indexNumber } = req.body;

    const user = await User.findOne({  indexNo: indexNumber });
    if (!user) {
        res.status(401);
        throw new Error('Invalid index number');
    }

    if (user) {
        // Store user data in session
        req.session.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
        };
 
        req.session.authenticated = true; // Set authenticated flag
        req.session.save(); // Save the session

        res.json(user);
    } else {
        res.status(401); 
        throw new Error('Invalid email or password');
    }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            res.status(500);
            throw new Error('Failed to log out');
        } else {
            res.json({ message: 'User logged out' });
        }
    });
});

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
};
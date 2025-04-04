const Resource = require('../models/resource');
const asyncHandler = require('express-async-handler');

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
const getResources = asyncHandler(async (req, res) => {
    const resources = await Resource.find({});
    res.json(resources);
});



// @desc    Get resource by ID
// @route   GET /api/resources/:id
// @access  Public
const getResourceById = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);

    if (resource) {
        res.json(resource);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// @desc    Create a new resource
// @route   POST /api/resources
// @access  Private/Admin
const createResource = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const resource = new Resource({
        name,
        description,
    });

    const createdResource = await resource.save();
    res.status(201).json(createdResource);
});

// @desc    Update a resource
// @route   PUT /api/resources/:id
// @access  Private/Admin
const updateResource = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const resource = await Resource.findById(req.params.id);

    if (resource) {
        resource.name = name || resource.name;
        resource.description = description || resource.description;

        const updatedResource = await resource.save();
        res.json(updatedResource);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Private/Admin
const deleteResource = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);

    if (resource) {
        await resource.remove();
        res.json({ message: 'Resource removed' });
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

module.exports = {
    getResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource,
};
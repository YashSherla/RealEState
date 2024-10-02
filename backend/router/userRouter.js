const express = require('express');
const verifyToken = require('../middelware/verifyToken');
const bcryptjs = require('bcryptjs');
const { User, Listing } = require('../db/db');
const  z  = require('zod');
const router = express.Router();
const updateBody = z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    avatar: z.string().optional(),
})
router.post('/update/:id',verifyToken, async (req, res) => {
    if (req.user.id !== req.params.id) {
        return res.status(401).json({
            success: false,
            message: "You can only update your own account!"
        })
    }
    try {
        const body = updateBody.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
            })
        }
        if (body.data.password) {
            body.data.password = bcryptjs.hashSync(body.data.password, 10);
        }
        const update = await User.findByIdAndUpdate(req.params.id,body.data,{new: true});
        if (!update) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        const {password:pass,...others} = update._doc;
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: others
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
router.delete('/delete/:id',verifyToken, async (req, res) => {
    if (req.user.id !== req.params.id) {
        return res.json({
            success: false,
            message: "You can only delete your own account!"
        })
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
router.get('/:id',verifyToken, async (req, res) => {
    if (req.user.id !== req.params.id) {
        return res.status(401).json({
            success: false,
            message: "You can only view your own account!"
        })
    }
    try {
        const user = await User.findById(req.params.id);
        const {password:pass,...others} = user._doc;
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: others
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})
router.get('/listing/:id',verifyToken, async (req, res) => {
    if (req.user.id !== req.params.id) {
        return res.status(401).json({
            success: false,
            message: "You can only view your own Listing!"
        })
    }
    try {
        const user = await Listing.find({userRef: req.params.id});
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})
module.exports = router
const express = require('express')
const router = express.Router();
const z = require('zod');   
const { Listing } = require('../db/db');
const verifyToken = require('../middelware/verifyToken');
const listingSchema = z.object({
    name: z.string(),
    description: z.string(),
    address: z.string(),
    regularPrice: z.number(),
    discountPrice: z.number(),
    bathrooms: z.number(),
    bedrooms: z.number(),
    furnished: z.boolean(),
    parking: z.boolean(),
    type: z.string(),
    offer: z.boolean(),
    imageUrls: z.array(z.string()),
    userRef: z.string(),
})
// const updateListingSchema = z.object({
//     name: z.string().optional(),
//     description: z.string().optional(),
//     address: z.string().optional(),
//     regularPrice: z.number().optional(),
//     discountPrice: z.number().optional(),
//     bathrooms: z.number().optional(),
//     bedrooms: z.number().optional(),
//     furnished: z.boolean().optional(),
//     parking: z.boolean().optional(),
//     type: z.string().optional(),
//     offer: z.boolean().optional(),
//     imageUrls: z.array(z.string()).optional(),
//     userRef: z.string().optional(),
// })
router.post('/create',async (req, res) => {
    const body = listingSchema.safeParse(req.body);
    try {
        if (!body.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
            })
        }
        await Listing.create(body.data);
        return res.status(200).json({
            success: true,
            message: "Listing created successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
router.post('/update/:id',verifyToken, async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return res.status(404).json({
            success: false,
            message: "Listing not found",
        })
    }
    if (req.user.id !== listing.userRef) {
        return res.status(401).json({
            success: false,
            message: "You can only update your own listing!",
        })
    }
    try {
        const body = req.body;
        const updatedListing =  await Listing.findByIdAndUpdate(req.params.id, body, { new: true });
        return res.status(200).json({
            success: true,
            message: "Listing updated successfully",
            data: updatedListing,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            
        })
    }
})
router.delete('/delete/:id',verifyToken, async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return res.status(404).json({
            success: false,
            message: "Listing not found",
        })
    }
    if (req.user.id !== listing.userRef) {
        return res.status(401).json({
            success: false,
            message: "You can only update your own listing!",
        })
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Listing deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            
        })
    }
})
router.get('/get/:id',async (req, res) => {
    try {
        const users = await Listing.findById(req.params.id);  
        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
// router.get('/get',async(req, res) => {
//     const limit = parseInt(req.query.limit) || 8;
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     let offer = req.query.offer;
//     if (offer === undefined || offer === 'false') {
//         offer = { $in: [false, true] };
//     }
// })
module.exports = router;
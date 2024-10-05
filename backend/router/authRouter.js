const express = require('express')
const router = express.Router();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const password = "admin"
const z = require('zod');
const { User } = require('../db/db');
const signupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
})
const signinSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})
const googleSignupSchema = z.object({
    username:z.string(),
    email: z.string().email(),
    avatar:z.string()
})
router.post('/signup',async (req, res) => {
    const body = signupSchema.safeParse(req.body);
   try {
    if (!body.success) {
        return res.status(400).json({
            success: false,
            message: "Email already taken / Incorrect inputs",
        })
    }
    const hashedPassword = bcryptjs.hashSync(body.data.password, 10);
    await User.create({
        username: body.data.username,
        email: body.data.email,
        password: hashedPassword,
    })
    res.status(200).json({
        success: true,
        message: "User created successfully",
    })
   } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
   }
});

router.post('/signin', async (req, res) => {
    const body = signinSchema.safeParse(req.body);
   try {
    if (!body.success) {
        return res.status(400).json({
            success: false,
            message: "Incorrect inputs",
        })
    }
    const user = await User.findOne({ email: body.data.email });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found",
        })
    }
    const validPassword = bcryptjs.compareSync(body.data.password, user.password);
    if(!validPassword) {
        return res.status(400).json({
            success: false,
            message: "Invalid password",
        })
    }
    const token  = jwt.sign({ id: user._id },password);
    console.log(token);
    const {password:pass,...others} = user._doc;
    return res.cookie("access_token", token, { httpOnly: true  }).status(200).json({
        success: true,
        message: "User logged in successfully",
        token: token,
        user: others
    })
   } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    })
   }
})
router.post("/google",async (req,res)=>{
    try {
        console.log(`This is Req Body ${req.body.username} ${req.body.email} ${req.body.avatar}`);
        const body = googleSignupSchema.safeParse(req.body);
        console.log(body.success);
        const user = await User.findOne({ email: body.data.email})
        if (user) {
            const token = jwt.sign({id:user._id},password);
            const {password:pass,...others} = user._doc;
            return res.cookie("access_token",token, {httpOnly:true}).status(200).json({
                success:true,
                message:"User logged in successfully",
                token:token,
                user:others
            })

        }else{
            const generatedPassword =  Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser =  await User.create({
                username: body.data.username,
                email: body.data.email,
                password: hashedPassword,
                avatar:body.data.avatar,
            });
            await newUser.save();
            const token = jwt.sign({id:newUser._id},password);
            const {password:pass , ...others} = newUser._doc;
            return res.cookie("access_token",token, {httpOnly:true}).status(200).json({
                success:true,
                message:"User logged in successfully",
                token:token,
                user:others
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
router.get('/logout', async (req, res) => {
    try {
        res.clearCookie("access_token").status(200).json({
            success: true,
            message: "User logged out successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
module.exports = router;
const express = require('express')
const bodyParser = require('body-parser')
const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');
const listingRouter = require('./router/listingRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use('/auth', authRouter);
app.use('/user',userRouter);
app.use('/listing',listingRouter );
app.get('/check-cookie', (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        })
    }
    res.json({
        success: true,  
        message: "Cookies fetched successfully",
        got: token
    })
})
app.listen(5000, () => console.log('Server started on port 5000'))
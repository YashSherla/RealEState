const express = require('express')
const bodyParser = require('body-parser')
const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');
const listingRouter = require('./router/listingRouter');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())

app.use('/auth', authRouter);
app.use('/user',userRouter);
app.use('/listing',listingRouter )
app.listen(5000, () => console.log('Server started on port 5000'))
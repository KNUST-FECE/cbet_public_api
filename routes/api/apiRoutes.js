const express = require('express')
const apiRouter =express.Router()


const userRouter = require('./userRoutes')


apiRouter.use('/users', (req,res,next)=>{
    console.log('User route accessed')
    next()
},userRouter)


module.exports = apiRouter;
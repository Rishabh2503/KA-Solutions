const express = require('express')
const User = require('../models/userModel')
const asynchandler = require('express-async-handler')


const authUser = asynchandler( async (req,res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    } else {
        res.status(401).send('UnAuthorized')
    }
})


module.exports = {authUser}
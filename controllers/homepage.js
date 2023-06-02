require('dotenv').config()
const express = require('express')
const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);




const homepage = (req, res) => { 

    res.status(200).json({
        status : true,
        message: 'Welcome to my API'
    })
}

module.exports = homepage
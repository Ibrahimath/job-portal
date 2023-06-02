
require('dotenv').config()
const jobPortalModels = require('../models/jobPortalModels')

const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);const bcrypt = require('bcrypt');


const sendOtp = (req, res) => {
    const { email, otp } = req.params
    if(!email || !otp) { 
        res.status(400).json({
            status: false,
            message: 'Email and OTP are required'
        })
        return
    }

    const customer = jobPortalModels.otpStore.find(data => data.email === email && data.otp == otp )
  
    if (!customer) { 
        res.status(400).json({
            status: false,
            message: 'Invalid OTP',
            customer: customer
        })
        return
    }
    //check otp expiration time
    const timeDifference = new Date() - new Date(customer.date)
    const timeDifferenceInMinutes = Math.ceil(timeDifference / (1000 * 60))
    if (timeDifferenceInMinutes > 5) {
        res.status(400).json({
            status: false,
            message: 'OTP expired'
        })
        return
    }

    const newCustomerStore = jobPortalModels.customerStore.map(data => {
        if (data.email === email) {
           data.status  = "active"
        }
        return data
    })

    jobPortalModels.customerStore = [...newCustomerStore]
    sendEmail(email, 'Registration Successful', `Hi, We arev happy to have you onboard. Let do some awesome stuffs together`,)
    res.status(200).json({
        status: true,
        message: 'OTP verified successfully'
    })
    
}

module.exports = sendOtp
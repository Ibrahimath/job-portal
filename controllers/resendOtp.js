require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
const helpers = require('../models/helpers')
const jobPortalModels = require('../models/jobPortalModels')


const resendOtp = (req, res) => { 
    const { email } = req.params
    if (!email) {
        res.status(400).json({
            status: false,
            message: 'Email is required'
        })
        return
    }

    const customer = jobPortalModels.customerStore.find(data => data.email === email)
    if (!customer) { 
        res.status(400).json({
            status: false,
            message: 'Invalid email'
        })
        return
    }
    const otp = helpers.generateOtp()
    const tempOtp = {
        id: uuidv4(),
        otp,
        email,
        date: new Date()
    }

    otpStore.push(tempOtp)
    //ssend email
    sendEmail(email, 'Resend OTP ', `Hi ${firstname}, Your new OTP is ${otp}. Kindly note that this OTP expires in 5 minutes.`,)
    
    res.status(200).json({
        status: true,
        message: "Otp resent successfully"
    })

}

module.exports = resendOtp
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
const bcrypt = require('bcrypt');
const saltRounds = 10;
const axios = require('axios')
const authorization = require('../models/authorization')


const register = async(req, res) => { 
 
    const { lastname, firstname, email, phone, password } = req.body

    const RegisterSchema = Joi.object({
        lastname: Joi.string().required().min(3),
        firstname: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        password: Joi.string().required()
    })

    const { value, error } = RegisterSchema.validate(req.body)
    if (error != undefined) { 
        res.status(400).json({
            status: false,
            message: error.details[0].message
        })

        return
    }

    const isEmailOrPhoneRegistered = customerStore.find(customer => customer.email === email || customer.phone === phone)
   
    if (isEmailOrPhoneRegistered) { 
        res.status(400).json({
            status: false,
            message: 'Email or Phone already registered'
        })
        return 
    }

    const responseSalt = await bcrypt.genSalt(saltRounds)
    if (!responseSalt) {
        res.status(500).json({
            status: false,
            message: 'Sorry , we cannot create account this time, try again later'
        })
        return
    }
    const responseHash  = await bcrypt.hash(password, responseSalt)
    if (!responseHash) {
        res.status(500).json({
            status: false,
            message: 'Sorry , we cannot create account this time, try again later'
        })
        return
    }
    const customer = {
                id: uuidv4(),
                lastname,
                firstname,
                email,
                phone,
                salt: responseSalt,
                password: responseHash,
                status: "in-active",
                registeredDate: new Date()
    }

    customerStore.push(customer)
    
    
    const otp = generateOtp()
    const tempOtp = {
        id: uuidv4(),
        otp,
        email,
        date: new Date()
    }

    otpStore.push(tempOtp)
    // send otp to email
    sendEmail(email, 'OTP Verification', `Hi ${firstname}, Your OTP is ${otp}. Kindly note that this OTP expires in 5 minutes.`,)

    res.status(201).json({
        status: true,
        message: 'An otp has been sent to your email, use that to complete your registration',
        data: customerStore
    })

}

module.exports = register
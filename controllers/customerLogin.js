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



const login = async(req, res) => {

    const { emailOrPhone, password } = req.body

    const LoginSchema = Joi.object({
        emailOrPhone: Joi.string().required(),
        password: Joi.string().required()
    })

    const { value, error } = LoginSchema.validate(req.body)
    if (error != undefined) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        })

        return
    }

    const customer = customerStore.find(data => data.email === emailOrPhone || data.phone === emailOrPhone)
    if (!customer) {
        res.status(400).json({
            status: false,
            message: 'Invalid email or password'
        })
        return
    }
   
    const responseHash = await bcrypt.hash(password, customer.salt)
    if (!responseHash) {
        res.status(500).json({
            status: false,
            message: 'Sorry , you canaot login this time, try again later'
        })
        return
    }

    if (responseHash !== customer.password) {
        res.status(400).json({
            status: false,
            message: 'Invalid email or password'
        })
        return
    }

    if (customer.status !== 'active') {
        res.status(400).json({
            status: false,
            message: 'Account not verified, Kindly go verify your accoiunt'
        })
        return
    }


    res.status(200).json({
        status: true,
        message: 'Login successful'
    })

}

module.exports = login
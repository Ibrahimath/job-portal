require('dotenv').config()
const sendGrid = require('@sendgrid/mail')
const authorization = require('../models/authorization')


sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const customerList = (req, res) => { 
    
    const { apikey } = req.headers
    const response = authorization(apikey)
    if (!response) {
        res.status(401).json({
            status: false,
            message: 'Unauthorized'
        })
        return
    }

        res.status(200).json({
            status: true,
            data: customerStore
        })
}

module.exports = customerList
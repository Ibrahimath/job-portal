require('dotenv').config()

const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
const axios = require('axios')
const authorization = require('../models/authorization')


const availableJobs =async (req, res) => {

    const { apikey } = req.headers
    const length = req.query.length || 10
    const category = req.query.category || ''
    const company = req.query.company || ''

    const response = authorization(apikey)
    if (!response) {
        res.status(401).json({
            status: false,
            message: 'Unauthorized'
        })
        return
    }

    const result = await axios({
        method: "get",
        url: `${process.env.REMOTE_API_BASEURL}/remote-jobs?limit=${length}&category=${category}&company_name=${company}`
    })
 
    res.status(200).json({
        status: true,
        count: result.data.jobs.length,
        data: result.data.jobs
    })


    // fetch('https://remotive.com/api/remote-jobs')
    // .then(response => response.json())
    // .then(data => {
    //     res.status(200).json({
    //         status: true,
    //         data: data.jobs
    //     })
    // })



 }

 module.exports = availableJobs
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
const bcrypt = require('bcrypt');
const jobPortalModels = require('../models/jobPortalModels.js')


const applicationStatus = (req,res) => {
    const jobId = req.params.jobId
    const isJobAppliedFor = jobPortalModels.jobApplicationStore.find(job => job.id === jobId)
    
    if(!isJobAppliedFor){
    res.status(404).json({
        message: `You have not applied for this job`
    })
        return
    
    }
            res.status(200).json({
            status : true,
            message : isJobAppliedFor.status
    
    
    })
    
    
    }

    module.exports = applicationStatus
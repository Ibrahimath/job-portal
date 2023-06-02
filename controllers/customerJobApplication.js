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



const jobApplication = (req, res) => {

    const applySchema = Joi.object({
       fullname: Joi.string().required().min(4),
       address: Joi.string().required().min(10),
       email: Joi.string().email().required(),
       jobId : Joi.string().required(),
       yearsOfExperiece: Joi.number().required(),
       qualifications : Joi.string().required().valid('SSCE', 'BSC', 'MSC')
    })
   
   const { value, error } = applySchema.validate(req.body)

   if (error !== undefined) {
       res.status(400).json({
           status: false,
           message: error.details[0].message
       })
       return
   }
   
   const { fullname, address, email, jobId, yearsOfExperiece, qualifications } = req.body
   const job = {
       id: uuidv4(),
       fullname,
       address,
       email,
       jobId,
       yearsOfExperiece,
       qualifications,
       status: 'submitted',
       date: new Date()
   }

   jobApplicationStore.push(job)

   res.status(200).json({
       status: true,
       message: 'Job application submitted successfully'
   })


}

module.exports = jobApplication
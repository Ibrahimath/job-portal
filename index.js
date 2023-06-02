require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
const adminCUstomerLists = require('./controllers/adminCustomerList.js');
const availableJobs = require('./controllers/availableJobs');
const customer_register = require('./controllers/customer-register')
const homepage = require('./controllers/homepage')
const applicationStatus = require('./controllers/customerApplicationstatus.js')
const sendOtp = require('./controllers/send-otp')
const resendOtp = require('./controllers/resendOtp')
const customerLogin = require('./controllers/customerLogin')
const customerJobApplication = require('./controllers/customerJobApplication')
const categoriesOfJob = require('./controllers/jobCategories')


 
app.use(bodyParser.json())

app.get('/', homepage)

app.post('/register', customer_register)

app.get('/verify/:email/:otp', sendOtp)

app.get('/resend-otp/:email', resendOtp )

app.post('/login', customerLogin)

app.get('/jobs', availableJobs)

app.get('/jobs/categories',  categoriesOfJob)

app.post('/job/apply', customerJobApplication)

app.get('/admin/customers', adminCUstomerLists)

app.get('/customer/applicationStatus/:JobId', applicationStatus)


app.listen(process.env.PORT, () => {

    console.log(`Server is running on port ${process.env.PORT}`)


 })
require('dotenv').config()
const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
const axios = require('axios')



const jobCategories = async(req, res) => {

    // const result = fetch(`${process.env.REMOTE_API_BASEURL}/remote-jobs`)
    // .then((res)=> {res.json}).then(()=> {
    //     console.log("result: " + res)
    // }).catch(() => {console.log("error fetching")})
try{
    const result = await axios({
        method: 'get',
        url: `${process.env.REMOTE_API_BASEURL}/remote-jobs`
    })
  

    // const response1 = await axios({
    //     method: "get",
    //     url: "https://remotive.com/api/remote-jobs",

    // })

   const categories = result.data.jobs.map(item => item.category)

    res.status(200).json({
        status: true,
        data: categories
   })

}catch(err){console.log(err)}

}

module.exports = jobCategories
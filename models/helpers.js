
const generateOtp = () => {
    return  Math.floor(100000 + Math.random() * 900000)
}

const sendEmail = (email, subject, message) => {
    const msg = {
        to: email,
        from: process.env.EMAIL_SENDER, // Use the email address or domain you verified above
        subject: subject,
        text:message,
       };
    sendGrid
        .send(msg)
        .then(() => { })
        .catch((error) => { })
   
}

module.exports = {
    generateOtp,
    sendEmail
}
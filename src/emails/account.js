const nodemailer = require('nodemailer');

const sendEmail = (mailDetails) => {

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    })
}

const sendWelcomeEmail  = (email, name) =>{
    
    let mailDetails = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Welcome to our task app',
        text: `Welecome to our app, ${name} let me know how you get along with the app`
    };

    sendEmail(mailDetails)
}

const sendCancelationEmail = (email, name) => {

    let mailDetails = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Sorry to see you go',
        text: `Goodbye, ${name} i hope to see you back soon :)`
    };

    sendEmail(mailDetails)
}
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
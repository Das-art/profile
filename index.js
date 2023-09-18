const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000;
const path= require('path')
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname +"/public")))

app.post('/send', (req, res) => {
  const userData = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: userData.email,
    subject: `Contact Form Submission from ${userData.name}`,
    to: 'pnihal056@gmail.com', 
    text: `
      Name: ${userData.name}
      Email: ${userData.email}
      
      Message:
      ${userData.message}
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error:", error);
      res.status(500).json({ success: false, message: 'Failed to send email' });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

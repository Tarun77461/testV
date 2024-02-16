const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000; // or any other port you prefer

// Replace with your Gmail credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourgmail@gmail.com", // replace with your Gmail email address
    pass: "yourgmailpassword", // replace with your Gmail password
  },
});

app.get("/send-email", async (req, res) => {
  const pdfFileName = req.query.pdfFileName;

  // Send email with attachment
  const mailOptions = {
    from: "yourgmail@gmail.com",
    to: "officialtarun070@gmail.com",
    subject: "Subject of the email",
    text: "Body of the email",
    attachments: [
      {
        filename: pdfFileName,
        path: `./${pdfFileName}`, // assuming the PDF is in the same directory as server.js
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

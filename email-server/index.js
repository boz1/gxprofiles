"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();
var app = express();
app.use(cors());

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

const nodemailer = require("nodemailer");
const uuid = require("uuid");
const redis = require("redis");
const client = redis.createClient();

var server = app.listen(8081, async () => {
  console.log("Email server listening at http://localhost:8081");
  await client.connect();
  client.on("error", (err) => console.log("Redis Client Error", err));
});

app.post("/sendEmail", async (req, res) => {
  const receiver = req.body?.email;
  const tzAddress = req.body?.address;
  const challenge = uuid.v4();
  await sendEmail(receiver, challenge);
  await client.set(receiver + ":" + tzAddress, challenge);
  res.sendStatus(200);
});

app.post("/verifyChallenge", async (req, res) => {
  const receiver = req.body?.email;
  const tzAddress = req.body?.address;
  const challenge = req.body?.challenge;
  const value = await client.get(receiver + ":" + tzAddress);
  if (value === challenge) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (receiver, challenge) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.MAIL_SERVER_USER,
      pass: process.env.MAIL_SERVER_PWD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"ASCS <ascsgxprofilesserver@ascs.com>', // sender address
    to: receiver, // list of receivers
    subject: "GX Profiles - Email Verification Credential", // Subject line
    text: challenge, // plain text body
    html: "<b>" + challenge + "</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

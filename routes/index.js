const express = require("express");
const router = express.Router();
const path = require("path");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Email = require("../models/email");
var conn = require("../config/db");

const app = express();

router.get("/", (req, res) => {
  try {
    var fileName = path.join(__dirname, "../index.html");
    res.sendFile(fileName);
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});
router.post("/schedule-email", (req, res) => {
  try {
    console.log(req.body);
    var sender = req.body.sender;
    var receiver = req.body.receiver;
    var date = req.body.date;
    var subject = req.body.subject;
    var body = req.body.body;
    // e-mail message options
    var email = new Email({
      from: sender,
      to: receiver,
      subject: subject,
      body: body,
      timeStamp: new Date(),
    });
    let mailOptions = {
      from: sender,
      to: receiver,
      subject: subject,
      text: body,
    };

    // e-mail transport configuration
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: sender,
        pass: "ly221194",
      },
    });

    cron.schedule(" * * */13 */10 *", () => {
      // Send e-mail
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          email.save(function (err, result) {
            if (err) {
              console.log(err);
            }
            console.log(result._id);
          });
        }
      });
    });

    res.send("Email scheduled");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;

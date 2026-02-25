const express = require('express')
const routerServer = express.Router()
const pagesController = require('../controllers/pagesController')
const nodemailer = require('nodemailer')

routerServer.get('/Home', pagesController.home)
routerServer.get('/Contact', pagesController.contact)
routerServer.get('/About', pagesController.about)
routerServer.get('/Portfolio', pagesController.portfolio)
routerServer.get('/Portfolio/Project-Website', pagesController.website)
routerServer.get('/Portfolio/Project-Marketing', pagesController.marketing)
routerServer.get('/Portfolio/Project-Branding', pagesController.branding)
routerServer.get('/Portfolio/Project-Photo-Edition', pagesController.photo_edition)

routerServer.post('/Contact', async (req, res) => {
  const {name, email, message} = req.body
  
  try {
    // Configuration email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: "didier.genetier7@gmail.com",
      subject: "Nouveau message depuis le portfolio",
      html: `
        <h3>Nouveau message</h3>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong><br/>${message}</p>
      `
    });

    res.json({ success: true })

  } catch (error) {
    console.error("Erreur d'envoi d'email:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = routerServer
const { PrismaClient } = require('@prisma/client')
const express = require('express')
const path = require('path')
const routePages = require('./routes/pages')
const helmet = require('helmet')
const cors = require('cors')
const server = express()
const port = 3900
const prisma = new PrismaClient()
const { body } = require('express-validator')


// Sécurité
server.use(helmet())
// Middleware pour parser le JSON
server.use(express.json())
// Prend en charge les requêtes multi-origines sécurisées et les transferts de données entre des navigateurs et des serveurs web
server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Évite les attaques XSS et SQL injection
server.post('/contact',
  body('email').isEmail().normalizeEmail(),
  body('message').trim().escape(),
  body('name').trim().escape(),
  async (req, res) => {
    try {
      const {email, message, name} = req.body
      const newMessage = await prisma.message.create({
        data: {email, message, name},
      })
      res.json(newMessage)
    } catch (error) {
      res.status(500).json({error: 'Erreur lors de la création du message'})
    }
  }
)


// Configuration EJS
server.set('view engine', 'ejs')
server.set('view options', {delimiter: '$'}) // Delimitador global
server.set('views', path.join(__dirname, '../src/views'))


server.use(express.static(path.join(__dirname, '../../01 front-end')))


// Routes
server.use('/', routePages)

// Middleware
// Ajouter une oeuvre
server.post('/api/artworks', async (req, res) => {
  try {
    const {titre, annee, categorie, imageUrl} = req.body
    const newArtwork = await prisma.artwork.create({
      data: {titre, annee, categorie, imageUrl},
    })
    res.json(newArtwork)
  } catch (error) {
    res.status(500).json({error: 'Erreur lors de la création de l\'œuvre'})
  }
})


// Supprimer une oeuvre
server.delete('/api/artworks/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteArtwork = await prisma.artwork.delete({
      where: { id: parseInt(id) },
    })
    res.json(deleteArtwork)
  } catch (error) {
    res.status(500).json({error: 'Erreur lors de la suppression de l\'œuvre'})
  }
})


server.listen(port, () => console.log(`Connectée au port: ${port}!`))

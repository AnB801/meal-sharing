const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')

const mealsRouter = require('./api/meals')
const buildPath = path.join(__dirname, '../../dist')
const port = process.env.PORT || 3000
const cors = require('cors')

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath))

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))
// Parse JSON bodies (as sent by API clients)
app.use(express.json())

app.use(cors())

//localhost:5000/api/meals
router.use('/meals', mealsRouter)

//--Homework week1--

//I like this solution, but Ahmed recommended another one

app.get('/:requeSt', async (req, res) => {
  const { requeSt } = req.params
  const knex = require('./database')

  let basePath = ''

  switch (requeSt) {
    case 'all': {
      basePath = await knex.select('*').from('Meal')
      res.json(basePath)
      break
    }

    case 'future-meals': {
      basePath = await knex
        .select('*')
        .from('Meal')
        .where('when_created', '<', '01-01-2023')
      res.json(basePath)
      break
    }

    case 'past-meals': {
      basePath = await knex
        .select('*')
        .from('Meal')
        .where('when_created', '>', '01-01-2023')
      res.json(basePath)
      break
    }

    case 'all-meals': {
      basePath = await knex.select('*').from('Meal').orderBy('id')
      res.json(basePath)
      break
    }

    case 'first-meal': {
      basePath = await knex.select('*').from('Meal').where('id', 1)
      res.json(basePath)
      break
    }

    case 'last-meal': {
      basePath = await knex
        .select('*')
        .from('Meal')
        .orderBy('id', 'desc')
        .first()
      res.json(basePath)
      break
    }

    default:
      console.log(requeSt)
      res.status(404).json({ error: 'there is no such thing ' })
      break
  }
})

// like Ahmed say ))

app.get('/future-meals', (req, res) => {
  knex
    .raw("SELECT * FROM Meal WHERE 'when_created'<'01-01-2023'")
    .then((rows) => {
      const jsonResponce = JSON.stringify(rows)
      res.send(jsonResponce)
    })
    .catch((error) => {
      console.error(error)
    })
})

app.get('/past-meals', (req, res) => {
  knex
    .raw("SELECT * FROM Meal WHERE 'when_created'>'01-01-2023'")
    .then((rows) => {
      const jsonResponce = JSON.stringify(rows)
      res.send(jsonResponce)
    })
    .catch((error) => {
      console.error(error)
    })
})

app.get('/all-meals', (req, res) => {
  knex
    .raw('SELECT * FROM Meal ORDER BY id')
    .then((rows) => {
      const jsonResponce = JSON.stringify(rows)
      res.send(jsonResponce)
    })
    .catch((error) => {
      console.error(error)
    })
})

app.get('/first-meal', (req, res) => {
  knex
    .raw('SELECT FIRST(`id`) FROM Meal')
    .then((rows) => {
      const jsonResponce = JSON.stringify(rows)
      res.send(jsonResponce)
    })
    .catch((error) => {
      console.error(error)
    })
})

app.get('/last-meal', (req, res) => {
  knex
    .raw('SELECT MAX(`id`) FROM Meal')
    .then((rows) => {
      const jsonResponce = JSON.stringify(rows)
      res.send(jsonResponce)
    })
    .catch((error) => {
      console.error(error)
    })
})

//-- end

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router)
} else {
  throw 'API_PATH is not set. Remember to set it in your .env file'
}

// for the frontend. Will first be covered in the react class
app.use('*', (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`))
})

module.exports = app

app.get('/my-route', (req, res) => {
  res.send('Hi friend')
})

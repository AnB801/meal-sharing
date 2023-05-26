const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')
const mealsRouter = require('./api/meals')
const reservationRouter = require('./api/reservations')

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
router.use('/Reservations', reservationRouter)
// router.use('/Reviews', reviewsRouter)

//--Homework week1--

// like Ahmed say ))
const knex = require('./database')

//This query gives me additional fields in the data array that I don't really understand
// app.get('/all-meals', (req, res) => {
//   knex
//     .raw('SELECT * FROM Meal ')
//     .then((rows) => {
//       const jsonResponce = JSON.stringify(rows)
//       res.send(jsonResponce)
//     })
//     .catch((error) => {
//       console.error(error)
//     })
// })

// This query works correctly.Rewrite all queries according to this

app.get('/all-meals', async (req, res) => {
  try {
    const allMeals = await knex('Meal').orderBy('id', 'desc')
    res.json(allMeals)
  } catch (error) {
    throw error
  }
})

app.get('/future-meals', async (req, res) => {
  try {
    const futureMeals = await knex('Meal').where(
      'created_date',
      '>',
      '2023-02-02'
    )
    res.json(futureMeals)
  } catch (error) {
    throw error
  }
})

app.get('/past-meals', async (req, res) => {
  try {
    const futureMeals = await knex('Meal').where(
      'created_date',
      '<',
      '2023-02-02'
    )
    res.json(futureMeals)
  } catch (error) {
    throw error
  }
})

app.get('/first-meal', async (req, res) => {
  try {
    const firstMeal = await knex('Meal').orderBy('id').first()
    if (!firstMeal) {
      res.status(404)
    } else {
      res.json(firstMeal)
    }
  } catch (error) {
    throw error
  }
})

app.get('/last-meal', async (req, res) => {
  try {
    const lastMeal = await knex('Meal').orderBy('id', 'desc').first()
    if (!lastMeal) {
      res.status(404)
    } else {
      res.json(lastMeal)
    }
  } catch (error) {
    throw error
  }
})

//-- end

//--Homework week2--
// app.use('/api/meals', mealsRouter)
// app.use('/api/reservations', reservationsRouter)

//app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('This is a search engine')
// })

// app.get('/search', (req, res) => {
//   const q = req.query.q
//   const documents = JSON.parse(fs.readFileSync('documents.json'))
//   const filteredDocuments = q
//     ? documents.filter((doc) =>
//         Object.values(doc).some((value) => value.toString().includes(q))
//       )
//     : documents

//   res.json(filteredDocuments)
// })

// app.get('/documents/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10)
//   const documents = JSON.parse(fs.readFileSync('documents.json'))
//   const document = documents.find((doc) => doc.id === id)

//   if (document) {
//     res.json(document)
//   } else {
//     res.status(404).send('Not Found')
//   }
// })

// app.post('/search', (req, res) => {
//   const q = req.query.q
//   const fields = req.body.fields
//   const documents = JSON.parse(fs.readFileSync('documents.json'))

//   if (q && fields) {
//     res.status(400).send('Both query parameter and fields cannot be provided.')
//     return
//   }
//   const filteredDocuments = q
//     ? documents.filter((doc) =>
//         Object.values(doc).some((value) => value.toString().includes(q))
//       )
//     : fields
//     ? documents.filter((doc) =>
//         Object.entries(fields).some(([key, value]) => doc[key] === value)
//       )
//     : documents

//   res.json(filteredDocuments)
// })

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`)
// })

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

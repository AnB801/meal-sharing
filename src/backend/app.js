const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')
const mealsRouter = require('./api/meals')
const reservationsRouter = require('./api/reservations')

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
router.use('/Meal', mealsRouter)
router.use('/Reservations', reservationsRouter)
router.use('/Reviews', reviewsRouter)

//--Homework week1--

// like Ahmed say ))
const knex = require('./database')

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

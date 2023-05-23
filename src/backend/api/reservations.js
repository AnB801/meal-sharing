const express = require('express')
const router = express.Router()
const knex = require('../database')

// all
router.get('/', async (req, res) => {
  try {
    const reservations = await knex('Reservation').select('*')
    res.json(reservations)
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving reservations' })
  }
})

// new
router.post('/', async (req, res) => {
  try {
    const newReservation = {
      ...req.body,
    }
    await knex('Reservation').insert(newReservation)
    res.status(201).json({ message: 'Reservation created' })
  } catch (error) {
    res.status(500).json({ error: 'Error creating reservation' })
  }
})

// by id
router.get('/:id', async (req, res) => {
  try {
    const resId = parseInt(req.params.id)
    const reservations = await knex('Reservation')
      .select('*')
      .where({ id: resId })
      .first()
    res.json(reservations)
  } catch (error) {
    res.status(500).send('Error retrieving reservations: ' + error.message)
  }
})

// export default router
module.exports = router

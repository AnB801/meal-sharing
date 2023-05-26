const express = require('express')
const router = express.Router()
const knex = require('../database')
const reservationRouter = express.Router()

// all
reservationRouter.get('/', async (req, res) => {
  try {
    const reservations = await knex('Reservation').select('*')
    if (!reservations.length) {
      response.status(404).json({ error: 'That Reservation doesn’t exist.' })
    }
    res.json(reservations)
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving reservations' })
  }
})

// new
reservationRouter.post('/', async (req, res) => {
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
reservationRouter.get('/:id', async (req, res) => {
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

// del by id
reservationRouter.delete('/:id', async (req, res) => {
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

module.exports = reservationRouter

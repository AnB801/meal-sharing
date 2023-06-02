const express = require('express')
const router = express.Router()
const knex = require('../database')
const reservationRouter = router
// all

reservationRouter.get('/', async (req, res) => {
  try {
    const availableReservations = req.query.availableReservations
    let reservations

    if (availableReservations) {
      const mealIdsWithReservations = await knex('Reservations').pluck(
        'meal_id'
      )
      if (availableReservations === 'true') {
        reservations = await knex('Reservation')
          .join('Meal', 'Reservation.meal_id', 'Meal.id')
          .select('Reservation.*', 'Meal.*')
          .whereIn('Meal.id', mealIdsWithReservations)
      } else if (availableReservations === 'false') {
        reservations = await knex('Reservation')
          .join('Meal', 'Reservation.meal_id', 'Meal.id')
          .select('Reservation.*', 'Meal.*')
          .whereNotIn('Meal.id', mealIdsWithReservations)
      }
    } else {
      reservations = await knex('Reservation').select('*')
    }

    if (!reservations.length) {
      res.status(404).json({ error: 'That Reservation doesn’t exist.' })
      return
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
      .del()
    res.json(reservations)
  } catch (error) {
    res.status(500).send('Error retrieving reservations: ' + error.message)
  }
})

module.exports = reservationRouter

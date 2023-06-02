const express = require('express')
const router = express.Router()
const knex = require('../database')
const reviewRouter = express.Router()

reviewRouter.get('/api/reviews', async (req, res) => {
  try {
    const allReviews = await knex('Reviews').select('*')
    res.json(allReviews)
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving reviews' })
  }
})

reviewRouter.get('/api/meals/:meal_id/reviews', async (req, res) => {
  try {
    const reviews = await knex('reviews')
      .select('*')
      .where({ meal_id: req.params.meal_id })
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving reviews' })
  }
})

reviewRouter.post('/api/reviews', async (req, res) => {
  const newReview = req.body
  await knex('reviews').insert(newReview)
  res.status(201).json(newReview)
})

reviewRouter.get('/api/reviews/:id', async (req, res) => {
  const review = await knex('reviews').select('*').where({ id: req.params.id })
  if (review.length === 0) {
    res.status(404).send({ message: 'Review not found' })
  } else {
    res.json(review[0])
  }
})

reviewRouter.put('/api/reviews/:id', async (req, res) => {
  const updatedReview = req.body
  await knex('reviews').where({ id: req.params.id }).update(updatedReview)
  res.json(updatedReview)
})

reviewRouter.delete('/api/reviews/:id', async (req, res) => {
  await knex('reviews').where({ id: req.params.id }).del()
  res.status(200).send({ message: 'Review deleted' })
})

module.exports = reviewRouter

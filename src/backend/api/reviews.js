const express = require('express')
const router = express.Router()
const knex = require('../database')

router.get('/api/reviews', async (req, res) => {
  const allReviews = await knex('reviews').select('*')
  res.json(allReviews)
})

router.get('/api/meals/:meal_id/reviews', async (req, res) => {
  const reviews = await knex('reviews')
    .select('*')
    .where({ meal_id: req.params.meal_id })
  res.json(reviews)
})

router.post('/api/reviews', async (req, res) => {
  const newReview = req.body
  await knex('reviews').insert(newReview)
  res.status(201).json(newReview)
})

router.get('/api/reviews/:id', async (req, res) => {
  const review = await knex('reviews').select('*').where({ id: req.params.id })
  if (review.length === 0) {
    res.status(404).send({ message: 'Review not found' })
  } else {
    res.json(review[0])
  }
})

router.put('/api/reviews/:id', async (req, res) => {
  const updatedReview = req.body
  await knex('reviews').where({ id: req.params.id }).update(updatedReview)
  res.json(updatedReview)
})

router.delete('/api/reviews/:id', async (req, res) => {
  await knex('reviews').where({ id: req.params.id }).del()
  res.status(200).send({ message: 'Review deleted' })
})

module.exports = router

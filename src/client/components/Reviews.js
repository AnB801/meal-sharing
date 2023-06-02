import React from 'react'

function Reviews({ reviews }) {
  if (!reviews || reviews.length === 0) return null

  return (
    <div>
      <h3>Reviews:</h3>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>{review.content}</p>
          <p>By {review.author}</p>
        </div>
      ))}
    </div>
  )
}

export default Reviews

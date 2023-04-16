import React, { useEffect, useState } from 'react';
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux';
import StarRating from '../StarRating/index';
import { getReviewsBySpotThunk } from '../../store/reviews';
import { CreateReview } from '../../store/reviews';
import maincss from './createReview.css'

function CreateReviewModal({ prop }) {
  const { closeModal, setModalContent } = useModal()
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch()
  const id = prop.id

  const handleRate = (value) => {
    setRating(value);
  };
  const handleSubmit = () => {

    dispatch(CreateReview({ description, rating, id }))
    dispatch(getReviewsBySpotThunk(id))
    closeModal()
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='createBiggerBox'>

          <div className='createbigBox'>
            <h2>{`How was your stay at ${prop.name}?`}</h2>

            <label htmlFor="text-input"></label>
            <textarea
              className='CreateAnReviewbox'
              id="text-input"
              name="text"
              rows="10"
              cols="50"
              placeholder='Leave your review here...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <StarRating onRate={handleRate} />
            <button className='SubmittheReview' onClick={handleSubmit} disabled={description.length < 10 || rating === 0}>Submit Your Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateReviewModal;

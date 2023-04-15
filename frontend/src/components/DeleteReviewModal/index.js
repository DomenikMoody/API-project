import React, { useEffect } from 'react';
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DeleteReview } from '../../store/reviews';
import { getReviewsBySpotThunk } from '../../store/reviews';

function DeleteReviewModal({prop}) {
    const {closeModal,setModalContent} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    const id = prop.id
    const spotId = prop.spotId



  const handleDeleteClick = () => {
   dispatch(DeleteReview(id))
   dispatch(getReviewsBySpotThunk(spotId))
    closeModal()
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Deleting Review: {prop?.name}</h2>
        <p>Are you sure you want to delete this Review?</p>
        <button onClick={handleDeleteClick}>Yes</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteReviewModal;

import React, { useEffect } from 'react';
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux';
import { DeleteReview } from '../../store/reviews';
import { getReviewsBySpotThunk } from '../../store/reviews';

function DeleteReviewModal({prop}) {
    const {closeModal,setModalContent} = useModal()
    const dispatch = useDispatch()
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
      <div className='deleteModalStuff'>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this review?</p>
        <div className='yesAndno'>
          <button className='yesBtn' onClick={handleDeleteClick}>{"Yes (Delete Review)"}</button>
          <button className='noBtn' onClick={closeModal}>{"No (Keep Review)"}</button>
        </div>
      </div>
    </div>
  </div>
);
}

export default DeleteReviewModal;

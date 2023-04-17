import React, { useEffect } from 'react';
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux';
import { RemoveSpot } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import { getSpotsThunk } from '../../store/spots';
import deletespotcss from './modal.css'

function DeleteSpotModal({ prop }) {
  const { closeModal, setModalContent } = useModal()
  const dispatch = useDispatch()
  const history = useHistory()


  const handleDeleteClick = () => {
    dispatch(RemoveSpot(prop.id))
    dispatch(getSpotsThunk())
    closeModal()
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='deleteModalStuff'>
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to remove this spot from the listings?</p>
          <div className='yesAndno'>
            <button className='yesBtn' onClick={handleDeleteClick}>{"Yes (Delete Spot)"}</button>
            <button className='noBtn' onClick={closeModal}>{"No (Keep Spot)"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteSpotModal;

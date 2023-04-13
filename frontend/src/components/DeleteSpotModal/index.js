import React, { useEffect } from 'react';
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux';
import { RemoveSpot } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import { UserSpot } from '../../store/spots';

function DeleteSpotModal({prop}) {
    const {closeModal,setModalContent} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()


  const handleDeleteClick = () => {
    dispatch(RemoveSpot(prop.id))
    dispatch(UserSpot())
    closeModal()
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Deleting Spot: {prop?.name}</h2>
        <p>Are you sure you want to delete this spot?</p>
        <button onClick={handleDeleteClick}>Yes</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteSpotModal;

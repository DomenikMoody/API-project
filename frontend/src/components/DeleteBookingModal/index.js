import { useModal } from "../../context/Modal"
import OpenModalButton from "../OpenModalButton"
import { DeleteBookingThunk } from "../../store/booking"
import { useDispatch } from "react-redux"
import "./DeleteBookingModal.css"
import { getBookingbyuser } from '../../store/booking';
import { useState } from 'react';

const DeleteBookingModal = ({ prop, prop2 }) => {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // New state variable
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const handleClick = (e) => {
        e.preventDefault()
        closeModal()
    }
    const handleClickYes = async (e) => {
        e.preventDefault();

        try {
          const bookingdispatch = await dispatch(DeleteBookingThunk(prop));
          if (bookingdispatch.message) {
            setSuccessMessage(bookingdispatch.message); // Set the success message in the state
          }
          await dispatch(getBookingbyuser());
        } catch (err) {
          setError(err.message);
        }
    }

    return (
    <div className="bookingDeleteStuff">
        <div>
            <h1>Are Sure You Want To Delete {prop2}</h1>
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="errors">{successMessage}</p>}
        <div className="buttonsforDeleteModal">
            <div>
                <button  className="userDeleteButton" onClick={handleClickYes}>Yes</button>
            </div>
            <div>
                <button onClick={handleClick}>Cancel</button>
            </div>
        </div>
    </div>)
}

export default DeleteBookingModal

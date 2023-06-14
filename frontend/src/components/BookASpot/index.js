import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { allbookingofSpot } from "../../store/booking";
import { createBookingThunk } from "../../store/booking";
import "./BookASpot.css"
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

const BookASpot = ({ prop }) => {
  const user = useSelector((state) => state.session.user);
  const existingBookings = useSelector((state) => state.booking);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const { closeModal } = useModal()
  const history = useHistory()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allbookingofSpot(prop.id));
  }, [dispatch, prop.id]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    setError("");
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const overlaps = existingBookings.some((booking) => {
      const existingStartDate = new Date(booking.startDate);
      const existingEndDate = new Date(booking.endDate);
      const selectedStartDate = new Date(startDate);
      const selectedEndDate = new Date(endDate);

      return (
        (selectedStartDate >= existingStartDate && selectedStartDate <= existingEndDate) ||
        (selectedEndDate >= existingStartDate && selectedEndDate <= existingEndDate) ||
        (selectedStartDate <= existingStartDate && selectedEndDate >= existingEndDate)
      );
    });

    if (overlaps) {
      setError("Selected dates overlap with an existing booking.");
      return;
    }

    let newBooking = {
      spotId: prop.id,
      startDate,
      endDate,
    };

    await dispatch(createBookingThunk(prop.id, newBooking));
    setStartDate("");
    setEndDate("");

    closeModal()
    history.push("/spots/current")
  };


  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div>
      {user ? (
        <div className="modalContent">
          <div>
            <h1>Book A Time</h1>
          </div>
          {error && <p className="errors">{error}</p>}
          <form onSubmit={handleSubmit} className="formforbooking">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
              min={currentDate}
            />
            <br />
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate || currentDate}
            />
            <br />
            <button type="submit" className="bookbtn">Book</button>
          </form>
        </div>
      ) : (
        "You must be logged in to Book a spot"
      )}
    </div>
  );
};

export default BookASpot;

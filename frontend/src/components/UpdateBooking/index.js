import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { EditBooking } from "../../store/booking";
import { getBookingbyuser } from "../../store/booking";
const Updatebooking = ({ prop, prop2 }) => {
    const [error, setError] = useState("");
    const existingBookings = useSelector((state) => state.booking);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { closeModal } = useModal()
    const history = useHistory()
    const dispatch = useDispatch();

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
            id: prop,
            startDate,
            endDate,
        };
        console.log(newBooking, "HERE IS THE BOOKING")
        await dispatch(EditBooking(newBooking));
        await dispatch(getBookingbyuser());
        setStartDate("");
        setEndDate("");

        closeModal()
        history.push("/spots/current")
    };
    const currentDate = new Date().toISOString().split("T")[0];
    return (
        <div>
            <div>
                <h1>Update Your Booking For {prop2}</h1>
            </div>
            <div>
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
        </div>
    )
}

export default Updatebooking

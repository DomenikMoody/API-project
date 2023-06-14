import { csrfFetch } from "./csrf";
const GET_BOOKINGS_BY_SPOT = "booking/getbookingbyspot"
const CREATE_BOOKING = "booking/createbookingforspot"
const REMOVE_BOOKING = "booking/removespot";

const getbookingbyspot = (data) => {
    return {
        type: GET_BOOKINGS_BY_SPOT,
        payload: data
    }
}
const removebooking = (spotId) => {
    return {
        type: REMOVE_BOOKING,
        payload: spotId
    };
};
export const allbookingofSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/bookings`)
    if (response.ok) {
        const data = await response.json()
        await dispatch(getbookingbyspot(data))
        return data
    }
}
export const createBookingThunk = (spotId, newBooking) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
    });
    if (response.ok) {
        const newBooking = await response.json();
        return newBooking;
    }
};
export const getBookingbyuser = () => async (dispatch) => {
    const response = await csrfFetch("/api/bookings/current")
    if (response.ok) {
        const data = await response.json()
        await dispatch(getbookingbyspot(data))
        return data
    }
}
export const DeleteBookingThunk = (bookingId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/bookings/${bookingId}`, { method: 'DELETE' })
        const data = await response.json()
        await dispatch(removebooking(bookingId))
        return data
    } catch (err) {
        return await err.json()
    }
}
export const EditBooking = (booking) => async (dispatch) => {
    console.log(booking, "HERE IS THE BOOKING")
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
    })
    if (response.ok) {
        const data = response.json()
        return booking
    }
}
const initialState = null;

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKINGS_BY_SPOT:
            return action.payload.Bookings;
        case REMOVE_BOOKING:
            return state.filter(booking => booking.id !== action.payload);

        default:
            return state;
    }
};

export default bookingReducer;

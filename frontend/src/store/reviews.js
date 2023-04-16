import { csrfFetch } from "./csrf";

const GET_REVIEWS = "review/showreviews"
const REMOVE_REVIEWS = 'review/deletereviews'
const CREATE_REVIEWS = 'review/createreviews'

const createreviews = (data) => {
    return {
        type: CREATE_REVIEWS,
        payload: data
    }
}
const removereview = (reviewId) => {
    return {
        type: GET_REVIEWS,
        payload: reviewId
    }
}

const showreviews = (data) => {
    return {
        type: GET_REVIEWS,
        payload: data
    }
}

export const CreateReview = ({ description, rating, id }) => async (dispatch) => {
    console.log("WE MADE IT TO THE THUNK")
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review: description, stars: rating })
    })
    if (response.ok) {
        const data = await response.json()
        await dispatch(createreviews(data))
        return data
    }
}
export const DeleteReview = (reviewId) => async (dispatch) => {
    console.log("THE THUNK FOR THE DELETEREVIEW")
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json()
        await dispatch(removereview(reviewId))
        return data
    }
}
export const getReviewsBySpotThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${parseInt(spotId)}/reviews`)
    if (response.ok) {
        const data = await response.json()
        await dispatch(showreviews(data))
        return data
    }
}
const initialState = { review: {} };
const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            newState = Object.assign({}, state.review)
            if (action.payload?.Reviews) { // check if Reviews is defined
                action.payload.Reviews.map(review => {
                    newState[review.id] = review
                })
            }
            return newState
        case REMOVE_REVIEWS:
            newState = Object.assign({}, state.review)
            delete newState[action.payload]
            return newState
        case CREATE_REVIEWS:
            return {...state,...state.review,[action.payload.id]: action.payload,};
        default:
            return state;
    }
};

export default reviewReducer

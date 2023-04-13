const GET_REVIEWS = "review/showreviews"

const showreviews = (data) => {
    return {
        type: GET_REVIEWS,
        payload: data
    }
}
export const getReviewsBySpotThunk = (spotId) => async(dispatch)=>{
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if (response.ok){
        const data = await response.json()
        await dispatch(showreviews(data))
        return data
    }
}
const initialState = { review: null };
const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            newState = Object.assign({}, state.review)
            action.payload.Reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        default:
            return state;
    }
};
export default reviewReducer

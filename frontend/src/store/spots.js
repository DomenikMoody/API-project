

const CREATE_SPOT = "spot/createspot";
const REMOVE_SPOT = "spot/removespot";
const SHOW_SPOTS = "spot/showspots"

const createspot = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot,
    };
};
const removespot = () => {
    return {
        type: REMOVE_SPOT,
    };
};
const showspots = (data) => {
    return {
        type: SHOW_SPOTS,
        payload: data
    }
}

export const getSpotsThunk = () => async (dispatch) => {
    const response = await fetch("/api/spots")
    if (response.ok) {
        const data = await response.json()
        await dispatch(showspots(data))
        return data
    }

}
const initialState = { spots: null };
const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SHOW_SPOTS:
            newState = Object.assign({}, state.spots)
            
            action.payload.Spots.forEach(spot => {
                newState[spot.id] = spot
            })
            return newState
        default:
            return state;
    }
};
export default spotReducer

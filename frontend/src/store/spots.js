import { csrfFetch } from "./csrf";

const USER_SPOT = "spot/getspotbyuserid";
const REMOVE_SPOT = "spot/removespot";
const SHOW_SPOTS = "spot/showspots";
const GET_SPOT = "spot/solospot"

const userspot = (data) => {
    return {
        type: USER_SPOT,
        payload: data
    }
}
const removespot = (spotId) => {
    return {
        type: REMOVE_SPOT,
        payload: spotId
    };
};
const showspots = (data) => {
    return {
        type: SHOW_SPOTS,
        payload: data
    }
}
const solospot = (data) => {
    return {
        type: GET_SPOT,
        payload: data
    }
}
export const EditSpot = (spot) => async (dispatch) => {
    console.log("JUST GOT IN THUNK",spot)
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    })
    if (response.ok){
        const data = response.json()
        return spot
    }
}

export const RemoveSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, { method: 'DELETE' })
    if (response.ok) {
        const data = await response.json()
        await dispatch(removespot(spotId))
        return data
    }
}
export const UserSpot = () => async (dispatch) => {
    console.log('FROM INSIDE THE THUNK')
    const response = await csrfFetch('/api/spots/current')
    console.log('THE RESPONSE============>', response)
    if (response.ok) {
        const data = await response.json()
        await dispatch(userspot(data))
        return data
    }
}

export const CreateSpot = (spot, images) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    });
    if (response.ok) {
        const newSpot = await response.json();
        for (let i = 0; i < images.length; i++) {
            console.log("HERE IS YOUR IMAGES", images[i])
            await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(images[i])
            })
        }
        return newSpot;
    }
};

export const getSoloSpotThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const data = await response.json()
        await dispatch(solospot(data))
        return data
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
const initialState = { spots: null, singleSpot: null, userSpots: null };
const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SHOW_SPOTS:
            newState = Object.assign({}, state.spots)
            action.payload.Spots.forEach(spot => { newState[spot.id] = spot })
            return newState
        case GET_SPOT:
            newState = Object.assign({}, state.singleSpot)
            newState[action.payload.id] = action.payload
            return newState
        case USER_SPOT:
            newState = Object.assign({}, state.userSpots)
            action.payload.Spots.forEach(spot => { newState[spot.id] = spot })
            return newState
        case REMOVE_SPOT:
            newState = Object.assign({}, state)
            delete newState[action.payload]
            return newState
        default:
            return state;
    }
};
export default spotReducer

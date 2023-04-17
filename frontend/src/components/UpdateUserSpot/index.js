import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSoloSpotThunk } from "../../store/spots";
import { EditSpot } from "../../store/spots";


function UpdateForm() {
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const soloSpot = useSelector(state => state.singleSpot);


    const [country, setCountry] = useState(localStorage.getItem('country') || soloSpot[spotId]?.country);
    const [address, setAddress] = useState(localStorage.getItem('address') || soloSpot[spotId]?.address);
    const [city, setCity] = useState(localStorage.getItem('city') || soloSpot[spotId]?.city);
    const [state, setState] = useState(localStorage.getItem('state') || soloSpot[spotId]?.state);
    const [latitude, setLatitude] = useState(localStorage.getItem('latitude') || soloSpot[spotId]?.lat);
    const [longitude, setLongitude] = useState(localStorage.getItem('longitude') || soloSpot[spotId]?.lng);
    const [description, setDescription] = useState(localStorage.getItem('description') || soloSpot[spotId]?.description);
    const [name, setName] = useState(localStorage.getItem('name') || soloSpot[spotId]?.name);
    const [price, setPrice] = useState(localStorage.getItem('price') || soloSpot[spotId]?.price);
    const [issues, setIssues] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()



    // useEffect to update localStorage on state changes

    //----------------------------USE EFFECTS---------------------------------
    useEffect(() => {
      localStorage.setItem('country', country);
      localStorage.setItem('address', address);
      localStorage.setItem('city', city);
      localStorage.setItem('state', state);
      localStorage.setItem('latitude', latitude);
      localStorage.setItem('longitude', longitude);
      localStorage.setItem('description', description);
      localStorage.setItem('name', name);
      localStorage.setItem('price', price);
    }, [country, address, city, state, latitude, longitude, description, name, price]);
    useEffect(() => {
        dispatch(getSoloSpotThunk(spotId))
    }, [dispatch]);


    //---------------------------HANDLE UPDATE--------------------------------
    const handleUpdate = async (e) => {
        e.preventDefault()
        let errors = {}
        if (!address) {
            errors.address = "Street address is required"
        }
        if (!city) {
            errors.city = "City is required"
        }
        if (!state) {
            errors.state = "State is required"
        }
        if (!country) {
            errors.country = "Country is required"
        }
        if (+latitude < -90 || +latitude > 90 || latitude === "" || typeof (Number(latitude)) !== "number") {
            errors.lat = "Latitude is not valid"
        }
        if (+longitude < -180 || +longitude > 180 || longitude === "" || typeof (Number(latitude)) !== "number") {
            errors.lng = "Longitude is not valid"
        }
        if (!name) {
            errors.name = "Name is required"
        }
        if (name.length > 50) {
            errors.name = "Name must be less then 50 characters"
        }
        if (!description || description.length < 30) {
            errors.description = "Description is required"
        }
        if (isNaN(+price)) {
            errors.price = "Price per night is required"
        }
        setIssues(errors)

        if (Object.values(errors).length === 0) {
            const editSpot = await dispatch(EditSpot({id:spotId, address, city, state, country, lat: latitude, lng: longitude, name, description, price }))
            history.push(`/spots/${editSpot.id}`)
        }
    }



    if (!sessionUser){
        return (
            <div>
                <p>Please log in</p>
            </div>
        );
    }
    if (sessionUser.id === soloSpot[spotId]?.ownerId) {
        return (
            <div className='centeringBox'>
            <form className="CreateForm" onSubmit={handleUpdate}>
                <div className='CreateFormcontainer'>
                    <h1 className='CreateNewSpotForm'>Update your spot</h1>
                    <h2 className="wheres">{`Where's your place located?`}</h2>
                    <h3 className='guess'>Guests will only get your exact address once they booked a reservation.</h3>

                    <div className='addressDivContainer'>
                        <div className="countryContainer">
                            <label>
                                <div className="countryDiv">Country {issues.country && <p className='errorsValidation'>{issues.country}</p>}</div>
                                <input className="countryInput" type="text" value={country} placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
                            </label>
                        </div>

                        <div className="addressContainer">
                            <label>
                                <div className="addressDiv">Street Address{issues.address && <p className='errorsValidation'>{issues.address}</p>}</div>
                                <input className="AddressInput" type="text" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                            </label>
                        </div>

                        <div className="CityAndStateContainer">
                            <div className="CityAndStateLabelContainer">
                                <div className="CityDiv">City{issues.city && <p className='errorsValidation'>{issues.city}</p>}</div>
                                <input className="CityInput" type="text" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)} />
                            </div>

                            <div className="CityAndStateLabelContainer">
                                <div className="StateDiv">State {issues.state && <p className='errorsValidation'>{issues.state}</p>}</div>
                                <input className="StateInput" type="text" value={state} placeholder="State" onChange={(e) => setState(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='describePlace'>
                        <div className='AboutSpot'>
                            <h2 className='wheres'>Describe your place to guests</h2>
                        </div>
                        <div className="DetailsOfHouseDescription">
                            <h4 className='guess'>Mention the best features of your space, any special amentities like
                                fast wifi or parking, and what you love about the neighborhood.</h4>
                            <div className="describePlacetextbox">
                                <div className='theTextArea'>
                                    <label htmlFor="text-input"></label>
                                    <textarea
                                        id="text-input"
                                        name="text"
                                        rows="10"
                                        cols="50"
                                        placeholder='Please write at least 30 characters'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                    {issues.description && <p className='errorsValidation'>{issues.description}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='nameYourPlace'>
                        <div className='NameOfPlace'>
                            <h2 className='wheres'>Create a title for your spot</h2>
                        </div>
                        <div className="DetailsOfNameOfPlace">
                            <h4 className='guess'>Catch guests' attention with a spot title that highlights what makes
                                your place special.</h4>
                            <div className='thenameInput'>

                                <input className="nameInput" type="text" value={name} placeholder="Name of your spot" onChange={(e) => setName(e.target.value)} />
                                <div>
                                    {issues.name && <p className='errorsValidation'>{issues.name}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='Price'>
                        <div className='PriceOfPlace'>
                            <h2 className='wheres'>Set a base price for your spot</h2>
                        </div>
                        <div className="DetailsOfPriceOfPlace">
                            <h4 className='guess'>Competitive pricing can help your listing stand out and rank higher
                                in search results.</h4>
                            <div className='thenameInput'>
                                $ <input className="PriceInput" type="text" value={price} placeholder="Price per night (USD)" onChange={(e) => setPrice(e.target.value)} />
                            </div>
                                {issues.price && <div className='errorsValidation'>{issues.price}</div>}
                        </div>
                    </div>

                </div>
                <div className='creatSpotDiv'>
                    <button className="create-spot-button" type="submit">
                        Update Spot
                    </button>
                </div>
            </form>
            </div>
        )
    } else {
        return (
            <div>
                <p>YOU CAN ONLY EDIT YOUR SPOTS</p>
            </div>
        );

    }
}


export default UpdateForm

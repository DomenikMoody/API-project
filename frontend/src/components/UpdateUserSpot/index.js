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
    const [issues, setissues] = useState({})
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
        if (+price !== NaN && +price < 1) {
            errors.price = "Price per night is required"
        }
        setissues(errors)
        if (Object.values(issues) < 1) {
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
            <form onSubmit={handleUpdate}>
            <div className="UpdateFormContainer">
                <h1>Update your Spot</h1>
                <h2>{`Where's your place located?`}</h2>
                <h3>Guests will only get your exact address once they booked a reservation.</h3>

                <div className='UpdateaddressDivContainer'>
                    <div className="UpdatecountryContainer">
                        <label>
                            <div className="UpdatecountryDiv"><p>Country</p> {issues.country && <p className='errorsValidation'>{issues.country}</p>}</div>
                            <input className="UpdatecountryInput" type="text" value={soloSpot[spotId]?.country} placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
                        </label>
                    </div>

                    <div className="UpdateaddressContainer">
                        <label>
                            <div className="UpdateaddressDiv"><p>Street Address</p> {issues.address && <p className='errorsValidation'>{issues.address}</p>}</div>
                            <input className="UpdateAddressInput" type="text" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                        </label>
                    </div>

                    <div className="UpdateCityAndStateContainer">
                        <div className="UpdateCityAndStateLabelContainer">
                            <div className="UpdateCityDiv"><p>City</p> {issues.city && <p className='errorsValidation'>{issues.city}</p>}</div>
                            <input className="UpdateCityInput" type="text" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="updatecommaDiv">
                            <p className="updatecomma">,</p>
                        </div>

                        <div className="UpdateCityAndStateLabelContainer">
                            <div className="UpdateStateDiv"><p>State</p> {issues.state && <p className='errorsValidation'>{issues.state}</p>}</div>
                            <input className="UpdateStateInput" type="text" value={state} placeholder="State" onChange={(e) => setState(e.target.value)} />
                        </div>
                    </div>
                    <div className="UpdateLatAndLongContainer">
                        <div className="UpdateLatLabelContainer">
                            <div className="UpdateLatDiv"><p>Latitude</p> {issues.lat && <p className='errorsValidation'>{issues.lat}</p>}</div>
                            <input className="UpdateLatInput" type="text" value={latitude} placeholder="Latitude" onChange={(e) => setLatitude(e.target.value)} />
                        </div>
                        <div className="UpdatecommaDiv">
                            <p className="Updatecomma">,</p>
                        </div>
                        <div className="UpdateLongLabelContainer">
                            <div className="UpdateLongDiv"><p>Longitude</p> {issues.lng && <p className='errorsValidation'>{issues.lng}</p>}</div>
                            <input className="UpdateLongInput" type="text" value={longitude} placeholder="Longitude" onChange={(e) => setLongitude(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='UpdatedescribePlace'>
                    <div className='UpdateAboutSpot'>
                        <h2>Describe your place to guests</h2>
                    </div>
                    <div className="UpdateDetailsOfHouseDescription">
                        <h4>Mention the best features of your space, any special amentities like
                            fast wifi or parking, and what you love about the neighborhood.</h4>
                        <div className="UpdatedescribePlacetextbox">
                            <div>
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
                <div className='UpdatenameYourPlace'>
                    <div className='UpdateNameOfPlace'>
                        <h2>Create a title for your spot</h2>
                    </div>
                    <div className="UpdateDetailsOfNameOfPlace">
                        <h4>Catch guests' attention with a spot title that highlights what makes
                            your place special.</h4>
                        <input className="UpdatenameInput" type="text" value={name} placeholder="Name of your spot" onChange={(e) => setName(e.target.value)} />
                        {issues.name && <p className='errorsValidation'>{issues.name}</p>}
                    </div>
                </div>
                <div className='UpdatePrice'>
                    <div className='UpdatePriceOfPlace'>
                        <h2>Set a base price for your spot</h2>
                    </div>
                    <div className="UpdateDetailsOfPriceOfPlace">
                        <h4>Competitive pricing can help your listing stand out and rank higher
                            in search results.</h4>
                        $ <input className="UpdatePriceInput" type="text" value={price} placeholder="Price per night (USD)" onChange={(e) => setPrice(e.target.value)} />
                        {issues.price && <p className='errorsValidation'>{issues.price}</p>}
                    </div>
                </div>
                <button>Update Spot</button>
            </div>
            </form>
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

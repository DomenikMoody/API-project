import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CreateSpot } from '../../store/spots';
import './CreateSpotForm.css';

function CreateSpotForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [photo, setPhoto] = useState('')
    const [photo1, setPhoto1] = useState('')
    const [photo2, setPhoto2] = useState('')
    const [photo3, setPhoto3] = useState('')
    const [photo4, setPhoto4] = useState('')
    const [issues, setissues] = useState({})

    //--------------------------------validations-------------------------
    const HandleSubmit = async (e) => {
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
        //------------------FOR IMAGES VALIDATION--------------------------
        if (Object.values(issues) < 1) {
            let imageArray = []
            if (photo) { imageArray.push({ url: photo, preview: true, }) }
            if (photo1) { imageArray.push({ url: photo1, preview: false, }) }
            if (photo2) { imageArray.push({ url: photo2, preview: false, }) }
            if (photo3) { imageArray.push({ url: photo3, preview: false, }) }
            if (photo4) { imageArray.push({ url: photo4, preview: false, }) }
            const newSpot = await dispatch(CreateSpot({ address, city, state, country, lat: latitude, lng: longitude, name, description, price }, imageArray))
            history.push(`/spots/${newSpot.id}`)
        }
    }


    return (
        <>
            <form className="CreateForm" onSubmit={HandleSubmit}>
                <h1>Create a new spot</h1>
                <h2>{`Where's your place located?`}</h2>
                <h3>Guests will only get your exact address once they booked a reservation.</h3>

                <div className='addressDivContainer'>
                    <div className="countryContainer">
                        <label>
                            <div className="countryDiv"><p>Country</p> {issues.country && <p className='errorsValidation'>{issues.country}</p>}</div>
                            <input className="countryInput" type="text" value={country} placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
                        </label>
                    </div>

                    <div className="addressContainer">
                        <label>
                            <div className="addressDiv"><p>Street Address</p> {issues.address && <p className='errorsValidation'>{issues.address}</p>}</div>
                            <input className="AddressInput" type="text" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                        </label>
                    </div>

                    <div className="CityAndStateContainer">
                        <div className="CityAndStateLabelContainer">
                            <div className="CityDiv"><p>City</p> {issues.city && <p className='errorsValidation'>{issues.city}</p>}</div>
                            <input className="CityInput" type="text" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)} />
                        </div>

                        <div className="CityAndStateLabelContainer">
                            <div className="StateDiv"><p>State</p> {issues.state && <p className='errorsValidation'>{issues.state}</p>}</div>
                            <input className="StateInput" type="text" value={state} placeholder="State" onChange={(e) => setState(e.target.value)} />
                        </div>
                    </div>
                    <div className="LatAndLongContainer">
                        <div className="LatLabelContainer">
                            <div className="LatDiv"><p>Latitude</p> {issues.lat && <p className='errorsValidation'>{issues.lat}</p>}</div>
                            <input className="LatInput" type="text" value={latitude} placeholder="Latitude" onChange={(e) => setLatitude(e.target.value)} />
                        </div>
                        <div className="LongLabelContainer">
                            <div className="LongDiv"><p>Longitude</p> {issues.lng && <p className='errorsValidation'>{issues.lng}</p>}</div>
                            <input className="LongInput" type="text" value={longitude} placeholder="Longitude" onChange={(e) => setLongitude(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='describePlace'>
                    <div className='AboutSpot'>
                        <h2>Describe your place to guests</h2>
                    </div>
                    <div className="DetailsOfHouseDescription">
                        <h4>Mention the best features of your space, any special amentities like
                            fast wifi or parking, and what you love about the neighborhood.</h4>
                        <div className="describePlacetextbox">
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
                <div className='nameYourPlace'>
                    <div className='NameOfPlace'>
                        <h2>Create a title for your spot</h2>
                    </div>
                    <div className="DetailsOfNameOfPlace">
                        <h4>Catch guests' attention with a spot title that highlights what makes
                            your place special.</h4>
                        <input className="nameInput" type="text" value={name} placeholder="Name of your spot" onChange={(e) => setName(e.target.value)} />
                        {issues.name && <p className='errorsValidation'>{issues.name}</p>}
                    </div>
                </div>
                <div className='Price'>
                    <div className='PriceOfPlace'>
                        <h2>Set a base price for your spot</h2>
                    </div>
                    <div className="DetailsOfPriceOfPlace">
                        <h4>Competitive pricing can help your listing stand out and rank higher
                            in search results.</h4>
                        $ <input className="PriceInput" type="text" value={price} placeholder="Price per night (USD)" onChange={(e) => setPrice(e.target.value)} />
                        {issues.price && <p className='errorsValidation'>{issues.price}</p>}
                    </div>
                </div>
                <div className='SpotImages'>
                    <div className='SpotImagesDiv'>
                        <h2>Liven up your spot with photos</h2>
                    </div>
                    <div className="DetailsOfSpotImage">
                        <h4>Submit a link to at least one photo to publish your spot.</h4>
                        <div className='PreviewImageUrl'>
                            <input className="PhotoInput" type="text" value={photo} placeholder="Preview Image URL" onChange={(e) => setPhoto(e.target.value)} />
                        </div>
                        <div className='ImageUrl1'>
                            <input className="PhotoInput" type="text" value={photo1} placeholder="Image URL" onChange={(e) => setPhoto1(e.target.value)} />
                        </div>
                        <div className='ImageUrl2'>
                            <input className="PhotoInput" type="text" value={photo2} placeholder="Image URL" onChange={(e) => setPhoto2(e.target.value)} />
                        </div>
                        <div className='ImageUrl3'>
                            <input className="PhotoInput" type="text" value={photo3} placeholder="Image URL" onChange={(e) => setPhoto3(e.target.value)} />
                        </div>
                        <div className='ImageUrl4'>
                            <input className="PhotoInput" type="text" value={photo4} placeholder="Image URL" onChange={(e) => setPhoto4(e.target.value)} />
                        </div>
                    </div>
                </div>
                <button>Create Spot</button>
            </form>
        </>
    );
}

export default CreateSpotForm;

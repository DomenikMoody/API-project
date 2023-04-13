import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSoloSpotThunk } from '../../store/spots';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getReviewsBySpotThunk } from '../../store/reviews';
import spot from "./spot.css"

function Spot() {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spot = useSelector(state => state.singleSpot)
    const allreviews = useSelector(state => state.review)
    const reviews = Object.values(allreviews)
    const soloSpot = spot[spotId]
    //------------------image stuff ------------------------------------
    let images = new Array(5).fill(null)
    soloSpot?.SpotImages?.forEach(image => {
        images.unshift(image.url)
    })

    //--------------------Reserve Button Submit Fuction------------------
    const reserveButton = (e) => {
        alert("Feature Coming Soon")
    }
    //--------------------Timefunction-----------------------------------
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    //------------------------OUR USEEFFECTS-----------------------------
    useEffect(() => {
        dispatch(getSoloSpotThunk(spotId))
    }, [dispatch])
    useEffect(() => {
        dispatch(getReviewsBySpotThunk(spotId))
    }, [dispatch])
    //-------------------------OUR RETURN---------------------------------
    if (!spot) return null
    return (
        <div className='spotDetails'>
            <div className='spotName'>
                <h3>{soloSpot?.name}</h3>
            </div>
            <div className='cityStateCountryContainer'>
                <p>{`${soloSpot?.city?.charAt(0).toUpperCase() + soloSpot?.city?.slice(1)}, ${soloSpot?.state?.charAt(0).toUpperCase() + soloSpot?.state?.slice(1)}, ${soloSpot?.country.charAt(0).toUpperCase() + soloSpot?.country?.slice(1)}`}</p>
            </div>
            <div className="spotImagesContainer">
                <div className="container">
                    <div className="half">
                        <img className='Halfpic'src={images[0] === null ? "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg":images[0]} alt="Half-sized image" />
                    </div>
                    <div className="quad">
                        <img className='quad1' src={images[1] === null ? "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg":images[1]} alt="Quad-sized image" />
                    </div>
                    <div className="quad">
                        <img className='quad2' src={images[2] === null ? "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg":images[2]} alt="Quad-sized image" />
                    </div>
                    <div className="quad3">
                        <img className='quad3' src={images[3] === null ? "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg":images[3]} alt="Quad-sized image" />
                    </div>
                    <div className="quad4">
                        <img className='quad4'src={images[4] === null ? "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg":images[4]} alt="Quad-sized image" />
                    </div>
                </div>
            </div>
            <div className='spotOwnerContainer'>
                <div className='SpotOwner'>
                    <h2>{`Hosted by ${soloSpot?.Owner?.firstName} ${soloSpot?.Owner?.lastName} `}</h2>
                    <p className='description'>{soloSpot?.description}</p>
                </div>
                <div className='Priceandreviews'>
                    <div className='price'>
                        <div className='priceStuff1'>
                            <p className='priceStuff'>${soloSpot?.price}</p>
                        </div>
                        <div className='nightStuff'>
                            <p className='night'>night</p>
                        </div>
                    </div>
                    <div className='reviewsForReservebutton'>
                        <i class="fa-solid fa-star"></i>{`${soloSpot?.avgStarRating || "0.0"} · ${soloSpot?.numReviews || "0"} reviews`}
                    </div>
                    <div className='ReserveButton'>
                        <button
                            className='cssForReserveButton'
                            onClick={reserveButton}
                        >
                            Reserve</button>
                    </div>
                </div>
            </div>
            <div className='reviewsContainers'>
                <div className='reviewTitlebar'><i class="fa-solid fa-star"></i>{`${soloSpot?.avgStarRating || "0.0"} · ${soloSpot?.numReviews || "0"} reviews`}</div>
            </div>
            {reviews?.map(review =>
                <div className='individualreview'>
                    <div className='review'>
                        <div className='reviewName'>
                            <p>{review?.User?.firstName.charAt(0).toUpperCase() + review?.User?.firstName.slice(1)}</p>
                        </div>
                        <div className="monthYear">
                            <p>{formatDate(review?.updatedAt)}</p>
                        </div>
                        <div className='actualReview'>
                            <p>{review?.review}</p>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}
export default Spot

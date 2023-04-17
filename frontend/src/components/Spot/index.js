import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSoloSpotThunk } from '../../store/spots';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getReviewsBySpotThunk } from '../../store/reviews';
import spot from "./spot.css"
import OpenModalButton from '../OpenModalButton'
import DeleteReviewModal from '../DeleteReviewModal';
import CreateReviewModal from '../CreateReviewModal';

function Spot() {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spot = useSelector(state => state.singleSpot)
    const sessionUser = useSelector(state => state.session.user);
    const allreviews = useSelector(state => state.review)
    const reviews = Object.values(allreviews)
    const soloSpot = spot[spotId]
    //------------------image stuff ------------------------------------
    let images = []
    soloSpot?.SpotImages?.forEach(image => {
        images.push(image.url)
    })
    //--------------------Reserve Button Submit Fuction------------------
    const reserveButton = (e) => {
        alert("Feature Coming Soon")
    }
    //--------------------Timefunction-----------------------------------
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    //------------------------OUR USEEFFECTS-----------------------------
    useEffect(() => {
        dispatch(getSoloSpotThunk(spotId))
    }, [dispatch, reviews.length])
    useEffect(() => {
        dispatch(getReviewsBySpotThunk(spotId))
    }, [dispatch, reviews.length])
    //-------------------------OUR RETURN---------------------------------
    if (!spot) return null
    return (
        <div className='biggerBox'>
            <div className='bigBox'>
                <div className='spotDetails'>
                    <div className='spotName'>
                        <h3>{soloSpot?.name}</h3>
                    </div>
                    <div className='cityStateCountryContainer'>
                        <p>{`${soloSpot?.city?.charAt(0).toUpperCase() + soloSpot?.city?.slice(1)}, ${soloSpot?.state?.charAt(0).toUpperCase() + soloSpot?.state?.slice(1)}, ${soloSpot?.country.charAt(0).toUpperCase() + soloSpot?.country?.slice(1)}`}</p>
                    </div>
                    <div className="spotImagesContainer">
                        <div className="my-page">
                            <img className='first-image' src={images[0] === undefined ? "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" : images[0]} alt="Half-sized image" />
                            <div className='quadrent'>
                                <div className='firstColumn'>
                                    <img className='remaining-images' src={images[1] === undefined ? "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" : images[1]} alt="Quad-sized image" />
                                    <img className='remaining-images' src={images[2] === undefined ? "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" : images[2]} alt="Quad-sized image" />
                                </div>
                                <div className="secondColumn">
                                    <img className='remaining-images' src={images[3] === undefined ? "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" : images[3]} alt="Quad-sized image" />
                                    <img className='remaining-images' src={images[4] === undefined ? "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" : images[4]} alt="Quad-sized image" />
                                </div>
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
                                <i class="fa-solid fa-star"></i>{soloSpot?.numReviews === 0 ? "New" : `${soloSpot?.avgStarRating || "0.0"} · ${soloSpot?.numReviews || "0"} reviews`}
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
                        <div className='reviewTitlebar'><i class="fa-solid fa-star"></i>{soloSpot?.numReviews === 0 ? "New" : `${soloSpot?.avgStarRating || "0.0"} · ${soloSpot?.numReviews} ${soloSpot?.numReviews > 1 ? "Reviews" : "Review"}`}</div>
                        {/* -------------------------THIS IS WHERE WE PUT THE BUTTON FOR REVIEW--------------------- */}
                        {sessionUser && !reviews.some(review => review?.userId === sessionUser?.id) && soloSpot?.ownerId !== sessionUser?.id && (
                            <div className='ReviewButton'>
                                <OpenModalButton className="userReviewPostButton" buttonText="Post Your Review" modalComponent={<CreateReviewModal prop={soloSpot} />} />
                            </div>
                        )}

                    </div>
                    {reviews.length === 0 ? soloSpot?.ownerId === sessionUser?.id ? <p className='BeTheFirst'>No reviews yet!</p> : <p className='BeTheFirst'>Be the first to post a review!</p> :
                        reviews?.toReversed().map(review =>
                            <div className='individualreview'>
                                <div className='review'>
                                    <div className='reviewName'>
                                        {console.log(review)}
                                        <p className='UserfirstnameofReview'>{review?.User?.firstName}</p>
                                    </div>
                                    <div className="monthYear">
                                        <p className="userDateofReview">{formatDate(review?.updatedAt)}</p>
                                    </div>
                                    <div className='actualReview'>
                                        <p className="userdescriptionforReview">{review?.review}</p>
                                    </div>
                                    {sessionUser?.id === review?.userId && (
                                        <div>
                                            <OpenModalButton className="userReviewDeleteButton" buttonText="DELETE" modalComponent={<DeleteReviewModal prop={review} />} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}


                </div>
            </div>
        </div>
    )
}
export default Spot

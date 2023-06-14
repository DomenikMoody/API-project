import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { getSpotsThunk } from '../../store/spots';
import DeleteSpotModal from '../DeleteSpotModal';
import './ManageAllSpotofUser.css';
import OpenModalButton from '../OpenModalButton';
import { useModal } from "../../context/Modal";
import UpdateForm from '../UpdateUserSpot';
import { getBookingbyuser } from '../../store/booking';
import DeleteBookingModal from '../DeleteBookingModal';
import Updatebooking from '../UpdateBooking';

function ManageAllSpotofUser() {
    const sessionUser = useSelector(state => state.session.user);
    const allSpots = useSelector(state => state.spots);
    const bookings = useSelector(state => state.booking);
    const array = Object.values(allSpots);
    const userSpotArray = array.filter(spot => spot?.ownerId === sessionUser.id);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpotsThunk());
        dispatch(getBookingbyuser());
    }, [dispatch]);

    const handleCreateNewSpot = () => {
        history.push('/spots/new');
    };

    if (!sessionUser) {
        return (
            <div>
                <p>Please log in</p>
            </div>
        );
    }

    return (
        <div className="ManageYourSpotsContainer">
            <h2 className="ManageYourSpots">Manage Spots</h2>
            <div className="userEachSpotContainer">
                {userSpotArray?.length > 0 ? (
                    userSpotArray.map(uspot => (
                        <div className="UserSpotCard" key={uspot?.id}>
                            <Link to={`/spots/${uspot?.id}`}>
                                <div className="userSpot" title={uspot?.name}>
                                    <div>
                                        <img
                                            src={
                                                uspot?.previewImage ||
                                                'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
                                            }
                                            className="Userpic"
                                            alt="Spot preview"
                                        />
                                    </div>
                                    <div className="userCityStateStars">
                                        <div className="usercityState">
                                            <div>
                                                {`${uspot?.city.charAt(0).toUpperCase() + uspot?.city.slice(1)}`}
                                            </div>
                                            <div>
                                                {`, ${uspot?.state.charAt(0).toUpperCase() + uspot?.state.slice(1)}`}
                                            </div>
                                        </div>
                                        <div className="userstars">
                                            <div>
                                                <i className="fa-solid fa-star"></i>
                                                {uspot?.avgStarRating || '0.0'}
                                            </div>
                                        </div>
                                    </div>
                                    <div>${uspot?.price}/night</div>
                                </div>
                            </Link>
                            <div className="buttonContainer">
                                <Link to={`/spots/${uspot?.id}/edit`}>
                                    <button className="userUpdateButton">UPDATE</button>
                                </Link>
                                <OpenModalButton className="userDeleteButton" buttonText="DELETE" modalComponent={<DeleteSpotModal prop={uspot} />} />
                            </div>
                        </div>
                    ))
                ) : (
                    <button className="CreateASpotButton" onClick={handleCreateNewSpot}>
                        Create a New Spot
                    </button>
                )}
            </div>
            <div>
                <h2 className="ManageYourSpots">Here Are Your Bookings</h2>
                {bookings?.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Spot</th>
                                <th>Book At</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Delete or Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>{allSpots[booking.spotId]?.name}</td>
                                    <td>{booking.createdAt?.slice(0, 10)}</td>
                                    <td>{booking.startDate?.slice(0, 10)}</td>
                                    <td>{booking.endDate?.slice(0, 10)}</td>
                                    <td className='boxwithbtns'><OpenModalButton className="userDeleteButton" buttonText="DELETE" modalComponent={<DeleteBookingModal prop={booking.id} prop2={allSpots[booking.spotId]?.name} />} />
                                    <OpenModalButton className="" buttonText="Update" modalComponent={<Updatebooking prop={booking.id} prop2={allSpots[booking.spotId]?.name} />} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>You don't have any bookings.</p>
                )}
            </div>

        </div>
    );
}

export default ManageAllSpotofUser;

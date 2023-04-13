import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { UserSpot } from '../../store/spots';
import DeleteSpotModal from '../DeleteSpotModal';
import './ManageAllSpotofUser.css';
import OpenModalButton from '../OpenModalButton'
import { useModal } from "../../context/Modal";
import UpdateForm from '../UpdateUserSpot';


function ManageAllSpotofUser() {
    const sessionUser = useSelector(state => state.session.user);
    const userSpot = useSelector(state => state.userSpots);
    const userSpotArray = Object.values(userSpot);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(UserSpot());
    }, [dispatch]);


    const handleCreateaNewSpot = () => {
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
            <h2 className="ManageYourSpots">Manage Your Spots</h2>
            <button className="CreateASpotButton" onClick={handleCreateaNewSpot}>
                Create a New Spot
            </button>
            <div className="userEachSpotContainer">
                {userSpotArray.length > 0 &&
                    userSpotArray.map((spot) => (
                        <div className="UserSpotCard" key={spot?.id}>
                            <Link to={`/spots/${spot?.id}`}>
                                <div className="userSpot" title={spot?.name}>
                                    <div>
                                        <img
                                            src={
                                                spot?.previewImage ||
                                                'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'}
                                            className="Userpic" />
                                    </div>
                                    <div className="userCityStateStars">
                                        <div className="usercityState">
                                            <div>
                                                {`${spot?.city.charAt(0).toUpperCase() + spot?.city.slice(1)}`}
                                            </div>
                                            <div>
                                                {`, ${spot?.state.charAt(0).toUpperCase() + spot?.state.slice(1)}`}
                                            </div>
                                        </div>
                                        <div className="userstars">
                                            <div>
                                                <i className="fa-solid fa-star"></i>
                                                {spot?.avgStarRating || '0.0'}
                                            </div>
                                        </div>
                                    </div>
                                    <div>${spot?.price}/night</div>
                                </div>
                            </Link>
                            <div className="buttonContainer">
                                <Link to={`/spots/${spot?.id}/edit`}>
                                    <button className="userUpdateButton">UPDATE</button>
                                </Link>
                                <OpenModalButton className="userDeleteButton" buttonText="DELETE" modalComponent={<DeleteSpotModal prop={spot} />} />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}


export default ManageAllSpotofUser

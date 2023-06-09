import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSpotsThunk } from '../../store/spots';
import { useEffect } from 'react'
import allspots from "./allspots.css"
import { Link } from 'react-router-dom';

function AllSpot() {
  const dispatch = useDispatch()
  const allSpots = useSelector(state => state.spots)

  useEffect(() => {
    dispatch(getSpotsThunk())
  }, [dispatch])
  return (

      <div className='allspotbigbox'>
        <div className='eachSpotContainer'>
          {Object.values(allSpots).length > 0 && Object.values(allSpots).map(spot =>
            <>
              <Link to={`/spots/${spot?.id}`}>
                <div className='Spot' title={spot?.name}>
                  <div><img src={spot?.previewImage || "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"} alt='house pic' className={"pic"}></img></div>
                  <div className='cityStateStars'>
                    <div className='cityState'>
                      <div>{`${spot?.city.charAt(0).toUpperCase() + spot?.city.slice(1)}`}</div>
                      <div>{`, ${spot?.state.charAt(0).toUpperCase() + spot?.state.slice(1)}`}</div>
                    </div>
                    <div className='stars'>
                      <div><i class="fa-solid fa-star"></i>{spot?.numReviews === 0 ? "New" : spot?.avgStarRating}</div>
                    </div>
                  </div>
                  <div className='spotPriceallSpot'>${spot?.price} night</div>
                </div>
              </Link>
            </>
          )}
        </div>

      </div>

  );
}

export default AllSpot;

import { NavLink, useHistory, useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"
import { getSpotsThunk } from '../../store/spots';
import { Link } from 'react-router-dom';

function SearchResults() {
    const params = useParams()
    const dispatch = useDispatch()
    const query = params["search"]
    const allSpots = useSelector(state => state.spots)
    const allSpotsArray = Object.values(allSpots)
    const searchedSpot = allSpotsArray.filter((spot) => {
      if (query.length === 0) {
          return spot
      }
      else if (
        spot?.name?.toLowerCase().includes(query?.toLowerCase()) ||
        spot?.state?.toLowerCase().includes(query?.toLowerCase()) ||
        spot?.city?.toLowerCase().includes(query?.toLowerCase()) ||
        spot?.description?.toLowerCase().includes(query?.toLowerCase())
      )
        return spot;
    });

    useEffect(() => {
      dispatch( getSpotsThunk())
    }, [dispatch])

    return (
      <div className="EntireSearchpage">
        <div className="titletoSearchPage">
          <h1>Search Results</h1>
        </div>
        <div className="eachSpotContainer">
          {searchedSpot.length > 0 ? (
            searchedSpot.map(spot => (
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
            ))
          ) : (
            <div className="NoResultsMessage">No results for that search. Please try again.</div>
          )}
        </div>
      </div>
    )
  }

  export default SearchResults

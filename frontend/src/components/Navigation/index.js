// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory()

  const handleSearchbarSubmit = (e) => {
    e.preventDefault()
    setSearchQuery("")
    history.push(`/search/${searchQuery}`)
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const createANewSpotClick = (e) => {
    e.preventDefault()
    history.push("/spots/new")
  }
  const isSearchButtonDisabled = searchQuery === '';
  return (
    <nav>
      <div className='navbar'>
        <div className='logoHome'>
          <NavLink exact to="/"><img src="/paradisAbode.JPG" className='logo'></img>
          </NavLink>
        </div>
        <div className="searchContainer">
        <form className="SearchForm" onSubmit={handleSearchbarSubmit}>
          <div className="SearchInputContainer">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="SearchInput"
            />
            <button type="submit" className="SearchButton" disabled={isSearchButtonDisabled}>
              <i className="fas fa-search SearchIcon"></i>
            </button>
          </div>
        </form>
      </div>
        <div className='ProfileButton'>
          <div className='CreateaNewSpotDiv'>
            {sessionUser && <button onClick={createANewSpotClick} className='CreateNewSpotBtn'>Create a New Spot</button>}
          </div>
          {isLoaded && (
            <ProfileButton user={sessionUser} />
          )}
        </div>
      </div>

    </nav>
  );
}

export default Navigation;

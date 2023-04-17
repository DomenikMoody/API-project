// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <div className='navbar'>
        <div className='logoHome'>
          <NavLink exact to="/"><img src="/paradisAbode.JPG" className='logo'></img>
          </NavLink>
        </div>
        <div className='ProfileButton'>
          <div className='CreateaNewSpotDiv'>
            {sessionUser && <NavLink to="/spots/new">Create a New Spot</NavLink>}
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

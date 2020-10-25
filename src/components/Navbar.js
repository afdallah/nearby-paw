import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// Load files
import iconComment from '../assets/images/comment.svg';
import logo from '../assets/images/logo/logo-pet.svg';
import bell from '../assets/images/bell.svg';

function Navbar({ history, ...rest }) {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    history.push('/signin');
  };

  const user = jwtDecode(localStorage.getItem('access_token'));

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__row">
          <div className="logo">
            <img src={logo} alt="" className="logo__img" />
          </div>

          <div className="navbar__menu">
            <img className="icon" src={iconComment} alt="" />
            <img className="icon icon--bell" src={bell} alt="" />

            <div className="avatar">
              <img
                className="avatar__img"
                src={`https://ui-avatars.com/api/?name=${user && user.email.split('@')[0]}`}
                alt="avatar"
              />
            </div>

            <div className="dropdown username">
              {user && user.email.split('@')[0]}

              <div className="dropdown__menu">
                <div
                  className="dropdown__menu-item clickable"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);

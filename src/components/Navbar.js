import React from 'react';
import { withRouter } from 'react-router-dom';

// Load files
import iconComment from '../assets/images/comment.svg';
import logo from '../assets/images/logo/logo-pet.svg';
import bell from '../assets/images/bell.svg';

function Navbar({ history }) {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    history.push('/signin');
  };

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
                src="https://ui-avatars.com/api/?name=John+Doe"
                alt="avatar"
              />
            </div>

            <div className="clickable" onClick={handleLogout}>Logout</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);

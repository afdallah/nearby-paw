import React from 'react'
import iconComment from '../assets/images/comment.svg'
import logo from '../assets/images/logo.svg'
import bell from '../assets/images/bell.svg'

function Navbar() {
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
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

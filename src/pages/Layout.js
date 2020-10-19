import React from 'react';
import { withRouter } from 'react-router-dom'

// Load files
import Navbar from '../components/Navbar';

// List of unique slugs
const slugArr = ['signup', 'signin', 'about']

function isUniqueSlug(slug) {
 return slugArr.includes(slug.split('/')[1])
}

function Layout(props) {
  const { children, location } = props

  return (
    <div className="app">
      {isUniqueSlug(location.pathname) ? '' : <Navbar />}

      {children}
    </div>
  );
}

export default withRouter(Layout)

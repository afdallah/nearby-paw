import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import heartIcon from './assets/images/heart.svg'
import commentIcon from './assets/images/comment.svg'

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="main">
        <div className="main__inner">
          <Sidebar />

          <section className="content">
            <button className="callout">Write a post</button>

            {/* Posts */}
            <div className="posts">
              {[1, 2, 3, 4].map(() => (
                <div className="post">
                  <div className="post__owner avatar">
                    <img src="avatar__img" alt="" />
                  </div>

                  <div className="post__card">
                    <div className="post__left">
                      <div className="post__img">
                        <img src="http://placekitten.com/g/400/400" alt="" />
                      </div>

                      <div className="post__engagement">
                        <div className="post__likes">
                          <img src={heartIcon} alt="" />
                          <span>1352 Likes</span>
                        </div>
                        <div className="post__comments">
                          <img src={commentIcon} alt="" />
                          <span>24 Comments</span>
                        </div>
                      </div>
                    </div>

                    <div className="post__content">
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{ width: 'calc(50% - 15px)', marginRight: 30 }}
                        >
                          <p className="post__label">Name</p>
                          <p className="post__value">Justin</p>
                          <p className="post__label">Age</p>
                          <p className="post__value">1 Years Old</p>
                          <p className="post__label">Location</p>
                          <p className="post__value">
                            4140 Parker Rd. Allentown, New Mexico 31134
                          </p>
                        </div>
                        <div>
                          <p className="post__label">Gender</p>
                          <p className="post__value">Male</p>
                          <p className="post__label">Category</p>
                          <p className="post__value">Cat</p>
                          <p className="post__label">Status</p>
                          <p className="post__value">Available</p>
                        </div>
                      </div>

                      <button className="button button--outline">Request a meeting</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App

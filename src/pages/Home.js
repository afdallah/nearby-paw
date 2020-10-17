import React from 'react';
import { HiOutlineHeart } from 'react-icons/hi';
import { FaRegComments, FaPaw } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';

// Load files
import Sidebar from '../components/Sidebar'
import avatarImg from '../assets/images/avatar.jpg';

function Home() {
  return (
    <main className="main">
      <div className="main__inner">
        <Sidebar />

        <section className="content">
          <button className="button callout">
            <FiPlus size={20} />
            Write a Post
          </button>

          {/* Posts */}
          <div className="posts">
            {[1, 2, 3, 4].map((i) => (
              <div className="post" key={i}>
                <div className="post__owner avatar">
                  <img className="avatar__img" src={avatarImg} alt="" />
                </div>

                <div className="post__card">
                  <div className="post__left">
                    <div className="post__img">
                      <img src={`http://placekitten.com/g/40${i}/400`} alt="" />
                    </div>

                    <div className="post__engagement">
                      <div className="post__likes">
                        {/* <img src={heartIcon} alt="" /> */}
                        <HiOutlineHeart size="25px" />
                        <span>1352 Likes</span>
                      </div>
                      <div className="post__comments">
                        {/* <img src={commentIcon} alt="" /> */}
                        <FaRegComments size="20px" />
                        <span>24 Comments</span>
                      </div>
                    </div>
                  </div>

                  <div className="post__content">
                    <div style={{ display: 'flex' }}>
                      <div
                        style={{ width: 'calc(65% - 15px)', marginRight: 30 }}
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

                    <button className="button button--outline">
                      <FaPaw size={20} />
                      Request a meeting
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;

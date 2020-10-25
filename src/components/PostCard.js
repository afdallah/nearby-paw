import React from 'react';

import { HiOutlineHeart } from 'react-icons/hi';
import { FaRegComments, FaPaw } from 'react-icons/fa';

function PostCard(props) {
  return (
    <div className="post" key={props._id}>
      <div className="post__owner avatar">
        <img className="avatar__img" src={props.postOwner.profilePhoto} alt="" />
      </div>

      <div className="post__card">
        <div className="post__left">
          <div className="post__img">
            <img src={props.image} alt="" />
          </div>

          <div className="post__engagement">
            <div className="post__likes">
              {/* <img src={heartIcon} alt="" /> */}
              <HiOutlineHeart size="25px" />
              <span>{props.likeCount}</span>
            </div>
            <div className="post__comments">
              {/* <img src={commentIcon} alt="" /> */}
              <FaRegComments size="20px" />
              <span>{props.commentCount}</span>
            </div>
          </div>
        </div>

        <div className="post__content">
          <div style={{ display: 'flex' }}>
            <div style={{ width: 'calc(65% - 15px)', marginRight: 30 }}>
              <p className="post__label">Name</p>
              <p className="post__value">{props.name}</p>
              <p className="post__label">Age</p>
              <p className="post__value">{props.age}</p>
              <p className="post__label">Location</p>
              <p className="post__value">
                4140 Parker Rd. Allentown, New Mexico 31134
              </p>
            </div>
            <div>
              <p className="post__label">Gender</p>
              <p className="post__value">{props.gender}</p>
              <p className="post__label">Category</p>
              <p className="post__value">{props.category}</p>
              <p className="post__label">Status</p>
              <p className="post__value">
                {props.status ? 'Available' : 'Unavailable'}
              </p>
            </div>
          </div>

          <button className="button button--outline">
            <FaPaw size={20} />
            Request a meeting
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineHeart } from 'react-icons/hi';
import { FaRegComments, FaPaw } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { BsPlusSquare } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';

// Load files
import avatarImg from '../assets/images/avatar.jpg';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Dropzone from 'react-dropzone';

function Home() {
  const [uploaded, setUploaded] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    mode: 'all',
  });

  const renderModalBody = () => {
    return (
      <>
        <form action="">
          <div className="flex">
            <div className="form-upload">
              <Dropzone
                onDrop={(acceptedFiles) => {
                  setUploaded(URL.createObjectURL(acceptedFiles[0]));
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <>
                    {uploaded.length ? (
                      <div className="img-preview">
                        <div
                          className="remove-image"
                          onClick={() => setUploaded([])}
                        >
                          <GrFormClose />
                        </div>
                        <img src={uploaded} alt="" />
                      </div>
                    ) : (
                      <section className="drop-area">
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>
                            <BsPlusSquare />
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                        </div>
                      </section>
                    )}
                  </>
                )}
              </Dropzone>
            </div>

            <div className="form-rest">
              <div className="field">
                <label htmlFor="">Pet name</label>
                <input
                  className="input"
                  type="text"
                  name="petName"
                  ref={register({
                    required: 'Pet name is required!',
                  })}
                />
                {errors.petName && (
                  <p className="error">{errors.petName.message}</p>
                )}
              </div>

              <div className="fields">
                <div className="field">
                  <label htmlFor="">Pet age</label>
                  <input
                    className="input"
                    type="number"
                    name="petAge"
                    ref={register({ required: 'Pet age is required!' })}
                  />

                  {errors.petAge && (
                    <p className="error">{errors.petAge.message}</p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="">Pet Category</label>
                  <select
                    className="input"
                    type="text"
                    name="petCategory"
                    ref={register({
                      required: 'Pet Category is required!',
                    })}
                  >
                    <option>Category 1</option>
                    <option>Category 2</option>
                  </select>

                  {errors.petCategory && (
                    <p className="error">{errors.petCategory.message}</p>
                  )}
                </div>
              </div>

              <div className="fields">
                <div className="field">
                  <label htmlFor="">Gender</label>
                  <select
                    className="input"
                    type="text"
                    name="gender"
                    ref={register({ required: 'Gender is required!' })}
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>

                  {errors.gender && (
                    <p className="error">{errors.gender.message}</p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="">Breed</label>
                  <input
                    className="input"
                    type="text"
                    name="breed"
                    ref={register({
                      required: 'Breed is required!',
                    })}
                  />

                  {errors.breed && (
                    <p className="error">{errors.breed.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="field field--button field--align-right" style={{marginTop: 10}}>
            <Button type="submit" variant="outline" style={{ marginRight: 10 }}>
              Cancel
            </Button>
            <Button type="submit">Create account</Button>
          </div>
        </form>
      </>
    );
  };

  return (
    <main className="main">
      <div className="main__inner">
        <Sidebar />

        <section className="content">
          <button
            className="button callout"
            onClick={() => setModalActive(true)}
          >
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

            {/* Modal create post */}
            <Modal
              header="Create post"
              renderBody={renderModalBody}
              active={modalActive}
              // onOk
              onClose={() => setModalActive(false)}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;

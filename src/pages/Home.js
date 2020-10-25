import React, { useState, useEffect, Suspense } from 'react';
import Dropzone from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { BsPlusSquare } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';

// Load files
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import Button from '../components/Button';
import PostCard from '../components/PostCard';
import notification from '../components/Notification';

import Api from '../api';

function Home(props) {
  const [posts, setPosts] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await Api.get('/post', {
          headers: {
            Authorization: localStorage.getItem('access_token'),
          },
        });

        setPosts(posts.data.data);
      } catch (err) {
        notification.err({ message: err.response.data.message });
      }
    };

    fetchPosts();
  }, []);

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

          <div
            className="field field--button field--align-right"
            style={{ marginTop: 10 }}
          >
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
          <Button
            className="callout"
            onClick={() => setModalActive(true)}
          >
            <FiPlus size={20} />
            Write a Post
          </Button>

          {/* <Button className="callout">Write a post</Button> */}

          {/* Posts */}
          <div className="posts">
            {posts.map((post) => (
              <Suspense fallback={<h2>Loading...</h2>} key={post._id}>
                <PostCard {...post} />
              </Suspense>
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

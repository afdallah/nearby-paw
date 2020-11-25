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
  const [isLoading, setIsLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [categories, setCategories] = useState([]);
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
  });
  console.log(categories)

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const posts = await Api.get('/post?page=1&limit=3');

      setPosts(posts.data.data);
    } catch (err) {
      notification.err({ message: err.response.data.message });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await Api.get('/category');

      setCategories(res.data.data);
    } catch (err) {
      notification.err({ message: err.response.data.message });
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    if (uploaded || uploaded.length) {
      setIsSpinning(true);
      let formData = new FormData();

      formData.append('image', uploaded[0]);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];

          formData.append(key, element);
        }
      }

      try {
        await Api.post('/post', formData);

        notification.success({
          message: 'Post created',
        });
      } catch (error) {
        notification.success({
          message: `Failed due to ${error.response.data.message}`,
        });
      } finally {
        setIsSpinning(false);
        setModalActive(false);
      }
    }
  };

  const renderModalBody = () => {
    if (categories.length < 1) return 'Loading...';

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="form-upload">
              <Dropzone
                name="image"
                onDrop={(acceptedFiles) => {
                  setUploaded(acceptedFiles);
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
                        <img src={URL.createObjectURL(uploaded[0])} alt="" />
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
                  name="name"
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
                    name="age"
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
                    {categories.length && categories.map(category => <option key={category._id} value={category.name}>{category.name}</option>)}
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
            className="fields"
            style={{ marginTop: 10, justifyContent: 'flex-end' }}
          >
            <Button type="submit" variant="outline" style={{ marginRight: 10 }}>
              Cancel
            </Button>
            <Button type="submit" isSpinning={isSpinning}>
              Create Post
            </Button>
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
          <Button className="callout" onClick={() => setModalActive(true)}>
            <FiPlus size={20} />
            Write a Post
          </Button>

          {/* <Button className="callout">Write a post</Button> */}

          {/* Posts */}
          <div className="posts">
            {isLoading ? (
              'Loading...'
            ) : (
              <Suspense fallback={<h2>Loading..</h2>}>
                {posts.map((post) => (
                  <PostCard {...post} key={post._id} />
                ))}
              </Suspense>
            )}
          </div>
        </section>
      </div>

      {/* Modal create post */}
      <Modal
        header="Create post"
        renderBody={renderModalBody}
        active={modalActive}
        onClose={() => setModalActive(false)}
      />
    </main>
  );
}

export default Home;

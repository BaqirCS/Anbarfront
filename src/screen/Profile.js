import React, { useReducer, useState, useEffect, useContext } from 'react';
import { userReducer, initialState } from '../reducers/userReducer';
import MessageBox from '../component/MessageBox';
import axios from 'axios';
import { Store } from '../context/Store';
function Profile() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { state: ctxState } = useContext(Store);
  const data = ctxState.userCredentials.user;
  const [user, setUser] = useState({
    name: data.name,
    email: data.email,
    status: data.status,
    _id: data.userId,
    password: '',
    confirmPassword: '',
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user.password) {
      return dispatch({
        type: 'UPDATE_USER_FAIL',
        payload: 'please fill the password field',
      });
    }
    if (user.password.length < 6) {
      return dispatch({
        type: 'UPDATE_USER_FAIL',
        payload: 'password should be more than 6 characters',
      });
    }
    if (user.password !== user.confirmPassword) {
      return dispatch({
        type: 'UPDATE_USER_FAIL',
        payload: 'passwords do not match',
      });
    }

    try {
      dispatch({ tyep: 'UPDATE_USER_REQUEST' });
      const { data } = await axios.patch(
        `${ctxState.baseUrl}/users/${user._id}`,
        user,
        {
          headers: {
            authorization: `Bearer ${ctxState.userCredentials.token}`,
          },
        }
      );

      dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'UPDATE_USER_FAIL', payload: error.response.data });
    }
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    {state.error && (
                      <div className="row">
                        <MessageBox
                          showMessage={showMessage}
                          message={state.message}
                          color="danger"
                        />{' '}
                      </div>
                    )}
                    <>
                      {state.success && (
                        <div className="text-center">
                          <MessageBox
                            showMessage={showMessage}
                            message={state.message}
                            color="success"
                          />{' '}
                        </div>
                      )}
                    </>
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <h3 className="text-center mb-3 mt-3">Your Profile</h3>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i
                            className="bi bi-person-fill h3"
                            style={{
                              marginTop: '-30px',
                              marginRight: '10px',
                            }}
                          ></i>

                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              placeholder="Name"
                              value={user.name}
                              disabled
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            ></label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i
                            className="bi bi-envelope-fill h3"
                            style={{
                              marginTop: '-30px',
                              marginRight: '10px',
                            }}
                          ></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              placeholder=" Email"
                              value={user.email}
                              disabled
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            ></label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i
                            className="bi bi-lock-fill h3"
                            style={{
                              marginTop: '-30px',
                              marginRight: '10px',
                            }}
                          ></i>{' '}
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              placeholder="Password"
                              value={user.password}
                              onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                              }
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            ></label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i
                            className="bi bi-key-fill h3"
                            style={{
                              marginTop: '-30px',
                              marginRight: '10px',
                            }}
                          ></i>{' '}
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example4cd"
                              className="form-control"
                              placeholder="Repeat Your Password"
                              value={user.confirmPassword}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  confirmPassword: e.target.value,
                                })
                              }
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4cd"
                            ></label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2  ms-4">
                          <div>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              checked={user.status === 'admin' ? true : false}
                              disabled
                            />
                            <label
                              className="form-check-label mx-3"
                              htmlFor="flexRadioDefault1"
                            >
                              Admin
                            </label>
                          </div>
                          <div className="form-check ms-5">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              checked={user.status === 'user' ? true : false}
                              disabled
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            >
                              User
                            </label>
                          </div>
                        </div>
                        <div className=" justify-content-center   text-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={submitHandler}
                            style={{
                              backgroundColor: '#009000',
                              borderColor: '#009000',
                            }}
                          >
                            Change Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;

import React, { useContext, useEffect, useReducer, useState } from 'react';
import { allUserReducer, initialState } from '../reducers/allUserReducer';
import MessageBox from '../component/MessageBox';
import axios from 'axios';
import Loader from '../component/Loader';
import { Store } from '../context/Store';
function Users() {
  const { state: ctxState } = useContext(Store);

  const [state, dispatch] = useReducer(allUserReducer, initialState);
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    status: '',
    _id: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const getUsers = async () => {
    try {
      dispatch({ type: 'GET_U_REQUEST' });
      const { data } = await axios.get(`${ctxState.baseUrl}/users`, {
        headers: {
          authorization: `Bearer ${ctxState.userCredentials.token}`,
        },
      });

      const x = data.filter((item) => {
        return item.status !== 'owner';
      });
      dispatch({ type: 'GET_U_SUCCESS', payload: x });

      setUsers(x);
    } catch (error) {
      dispatch({ type: 'GET_U_FAIL', payload: error.response.data });
    }
  };

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm('do you want to delete this User?');
    if (confirmDelete) {
      try {
        await axios.delete(`${ctxState.baseUrl}/users/${id}`, {
          headers: {
            authorization: `Bearer ${ctxState.userCredentials.token}`,
          },
        });
        const newArray = users.filter((item) => {
          return item._id !== id;
        });
        setUsers(newArray);
      } catch (error) {
        dispatch({ type: 'DELETE_U_FAIL', payload: error.response.data });
      }
    }
  };
  const updateHander = (id) => {
    const selectedUser = users.find((item) => item._id === id);
    setUser({
      ...user,
      name: selectedUser.name,
      email: selectedUser.email,
      status: selectedUser.status,
      _id: selectedUser._id,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let finalUser = {};
    if (!user.name) {
      return dispatch({
        type: 'UPDATE_U_FAIL',
        payload: 'please fill the name field',
      });
    }
    finalUser.name = user.name;
    if (!user.email) {
      return dispatch({
        type: 'UPDATE_U_FAIL',
        payload: 'please fill the emil field',
      });
    }
    finalUser.email = user.email;

    if (user.password) {
      if (user.password.length < 6) {
        return dispatch({
          type: 'UPDATE_U_FAIL',
          payload: 'password should be more than 6 characters',
        });
      }
      if (user.password !== user.confirmPassword) {
        return dispatch({
          type: 'UPDATE_U_FAIL',
          payload: 'passwords do not match',
        });
      }
      finalUser.password = user.password;
    }

    finalUser.status = user.status;
    try {
      dispatch({ type: 'UPDATE_U_REQUEST' });
      const { data } = await axios.patch(
        `${ctxState.baseUrl}/users/${user._id}`,
        finalUser,
        {
          headers: {
            authorization: `Bearer ${ctxState.userCredentials.token}`,
          },
        }
      );
      dispatch({ type: 'UPDATE_U_SUCCESS' });
      const newArray = users.map((item) =>
        item._id === user._id ? data : item
      );
      setUsers(newArray);
    } catch (error) {
      dispatch({ type: 'UPDATE_U_FAIL', payload: error.response.data });
    }
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  return (
    <div>
      {state.loadingUser ? (
        <Loader />
      ) : (
        <section className="vh-100" style={{ backgroundColor: '#eee' }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ borderRadius: 25 }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <h3 className="text-center mb-3 mt-3">User Info</h3>
                        {state.error && (
                          <div className="text-center">
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
                        <form className="mx-1 mx-md-4 mbx">
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
                                onChange={(e) =>
                                  setUser({ ...user, name: e.target.value })
                                }
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
                                onChange={(e) =>
                                  setUser({ ...user, email: e.target.value })
                                }
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
                                onChange={(e) =>
                                  setUser({
                                    ...user,
                                    status: e.target.checked ? 'admin' : 'user',
                                  })
                                }
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
                                onChange={(e) =>
                                  setUser({
                                    ...user,
                                    status: e.target.checked ? 'user' : 'admin',
                                  })
                                }
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
                              UPDATE USER{' '}
                            </button>
                          </div>
                        </form>
                      </div>

                      {users && users.length > 0 && (
                        <div className="col-md-9 col-lg-5 col-xl-6  align-items-center order-1 order-lg-2">
                          <h3 className="text-center mb-2 mt-3">ALL USERS</h3>
                          {state.deleteError && (
                            <p className="text-center">
                              <MessageBox
                                showMessage={showMessage}
                                message={state.deleteMessage}
                                color="red"
                              />{' '}
                            </p>
                          )}
                          <table
                            className="table align-middle table-hover"
                            style={{
                              backgroundColor: '#eee',
                              marginBottom: '70px',
                            }}
                          >
                            <thead className="bg-dark text-white ">
                              <tr className="text-center">
                                <th>Email</th>
                                <th>NAME</th>
                                <th>Status</th>
                                <th>action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.map((item) => (
                                <tr className="text-center" key={item._id}>
                                  <td>{item.email}</td>
                                  <td>{item.name}</td>
                                  <td>{item.status}</td>
                                  <td>
                                    <button
                                      onClick={() => deleteHandler(item._id)}
                                      className="btn"
                                      style={{ color: 'red' }}
                                    >
                                      {' '}
                                      <i className="bi bi-trash-fill"> </i>{' '}
                                    </button>

                                    <button
                                      onClick={() => updateHander(item._id)}
                                      className="btn"
                                      style={{ color: 'green' }}
                                    >
                                      {' '}
                                      <i className="bi bi-pencil-fill"></i>{' '}
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Users;

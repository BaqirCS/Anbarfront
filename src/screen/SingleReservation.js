import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  initialState,
  singleReserveReducer,
} from '../reducers/SingleReserveReducer';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
import { Store } from '../context/Store';
function SingleReservation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      date: '',
      requestName: '',
      guestNum: '',
      time: '',
      partyKind: '',
      status: '',
      _id: '',
    },
  ]);
  const [state, dispatch] = useReducer(singleReserveReducer, initialState);
  const { state: ctxState } = useContext(Store);

  useEffect(() => {
    getMonthlyData();
    // eslint-disable-next-line
  }, [id]);
  const getMonthlyData = async () => {
    try {
      dispatch({ type: 'GET_R_REQUEST' });
      const { data } = await axios.get(
        `${ctxState.baseUrl}/reservations/${id}`,
        {
          headers: {
            authorization: `Bearer ${ctxState.userCredentials.token}`,
          },
        }
      );
      setItems(data);
      dispatch({ type: 'GET_R_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_R_FAIL', payload: error.response.data });
    }
  };

  const clickHandler = (id) => {
    navigate(`/updatereservation/${id}`);
  };
  const deleteHandler = async (id) => {
    const con = window.confirm('do you want to delete this User?');
    if (con) {
      try {
        await axios.delete(`${ctxState.baseUrl}/reservations/${id}`, {
          headers: {
            authorization: `Bearer ${ctxState.userCredentials.token}`,
          },
        });
        dispatch({ type: 'DELETE_R_SUCCESS' });
      } catch (error) {
        dispatch({ type: 'DELETE_R_FAIL', payload: error.response.data });
      }
      const copyItems = items.filter((item) => item._id !== id);
      setItems(copyItems);
    }
  };

  const showMessage = () => {};
  return (
    <div className="container " style={{ marginBottom: '80px' }}>
      {state.loading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <div className=" my-4">
            <Link
              to={'/reservation'}
              className="btn   colorButtoms2"
              style={{
                color: 'white',
              }}
            >
              <i className="bi bi-arrow-left"> </i>
              بازگشت
            </Link>
            <h2 className="text-center" style={{ marginTop: '-40px' }}>
              وقت های گرفته شده در {id}
            </h2>
          </div>
          {state.error ? (
            <MessageBox
              color="danger"
              message={state.message}
              showMessage={showMessage}
            />
          ) : (
            <table
              className="table align-middle mb-0 table-hover"
              style={{ backgroundColor: '#eee' }}
            >
              <thead className="coloritable text-white ">
                <tr className="text-center">
                  <th>تاریخ</th>
                  <th>صاحب مراسم </th>
                  <th>میهمان</th>
                  <th>نوع مراسم</th>
                  <th> نوبت</th>
                  <th>حالت</th>
                  <th>تغییر</th>
                </tr>
              </thead>
              <tbody>
                {state.reserves &&
                  items.map((item, index) => (
                    <tr className="text-center" key={index}>
                      <td>{item.date}</td>
                      <td> {item.requestName}</td>
                      <td>{item.guestNum}</td>
                      <td>{item.partyKind}</td>
                      <td>{item.time}</td>
                      <td>{item.status}</td>
                      <td>
                        <button
                          className="btn btn-sm"
                          onClick={(e) => clickHandler(item._id)}
                        >
                          <i
                            className="bi bi-pencil-fill"
                            style={{ color: 'green' }}
                          ></i>
                        </button>
                        <button
                          className="btn btn-sm"
                          onClick={(e) => deleteHandler(item._id)}
                        >
                          <i
                            className="bi bi-trash-fill"
                            style={{ color: 'red' }}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default SingleReservation;

import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  initialState,
  singleInputReducer,
} from '../reducers/singleInputReducer';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
import { Store } from '../context/Store';
function IncomeAnbar() {
  const { date } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      name: '',
      type: '',
      receiver: '',
      date: '',
      amount: '',
      _id: '',
    },
  ]);
  const [state, dispatch] = useReducer(singleInputReducer, initialState);
  const { state: ctxState } = useContext(Store);

  useEffect(() => {
    getMonthlyData();
    // eslint-disable-next-line
  }, [date]);
  const getMonthlyData = async () => {
    try {
      dispatch({ type: 'GET_R_REQUEST' });
      const { data } = await axios.get(
        `${ctxState.baseUrl}/transaction/input/month/${date}`,
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
    navigate(`/updateinput/${id}`);
  };
  const deleteHandler = async (id) => {
    const con = window.confirm('do you want to delete this record?');
    if (con) {
      try {
        await axios.delete(`${ctxState.baseUrl}/transaction/input/${id}`, {
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
  const backHandler = () => {
    window.history.back();
  };
  return (
    <div className="container " style={{ marginBottom: '80px' }}>
      {state.loading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <div className=" my-4">
            <button
              onClick={backHandler}
              className="btn   colorButtoms2"
              style={{
                color: 'white',
              }}
            >
              <i className="bi bi-arrow-left"> </i>
              بازگشت
            </button>
            <h2 className="text-center" style={{ marginTop: '-40px' }}>
              تمامی ورودی ها به انبار در {date}
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
                  <th>#</th>
                  <th>نام جنس</th>
                  <th>واحد</th>
                  <th>مقدار</th>
                  <th>دریافت کننده</th>
                  <th>تاریخ</th>
                  {ctxState.userCredentials.user.status === 'admin' && (
                    <th>تغییر</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {state.inputs &&
                  items.map((item, index) => (
                    <tr className="text-center" key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td> {item.type}</td>
                      <td>{item.amount}</td>
                      <td>{item.receiver}</td>
                      <td>{item.date}</td>
                      {ctxState.userCredentials.user.status === 'admin' && (
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
                      )}
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

export default IncomeAnbar;

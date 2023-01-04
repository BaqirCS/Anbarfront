import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  initialState,
  singleOutputReducer,
} from '../reducers/singleOutputReducer';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
import { Store } from '../context/Store';
function OutcomeAnbar() {
  const { date } = useParams();
  const navigate = useNavigate();
  const { state: ctxState } = useContext(Store);

  const [items, setItems] = useState([
    {
      date: '',
      counter: '',
      status: '',
    },
  ]);
  const [state, dispatch] = useReducer(singleOutputReducer, initialState);
  useEffect(() => {
    getMonthlyData();
    // eslint-disable-next-line
  }, [date]);
  const getMonthlyData = async () => {
    try {
      dispatch({ type: 'GET_R_REQUEST' });
      const { data } = await axios.get(
        `${ctxState.baseUrl}/transaction/out/month/${date}`,
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

  const clickHandler = (date) => {
    navigate(`/transactionDate/${date}`);
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
              تمامی خروجی ها از انبار در {date}
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
                  <th>تاریخ</th>
                  <th> تعداد خروجی </th>
                  <th>حالت</th>
                  <th>جزییات بیشتر</th>
                </tr>
              </thead>
              <tbody>
                {state.inputs &&
                  items.map((item, index) => (
                    <tr className="text-center" key={index}>
                      <td>{index + 1}</td>
                      <td>{item.date}</td>
                      <td>{item.counter}</td>
                      <td>{item.status ? 'تایید است' : 'نیاز به بررسی'}</td>
                      <td>
                        <button
                          className="btn btn"
                          onClick={() => clickHandler(item.date)}
                        >
                          <i
                            className="bi bi-box-arrow-right"
                            style={{ color: 'green' }}
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

export default OutcomeAnbar;

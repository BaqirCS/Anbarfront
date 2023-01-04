import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
import { reserveReducer, initialState } from '../reducers/reserveReducer';
import { Store } from '../context/Store';

function Reservation() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reserveReducer, initialState);
  const { state: ctxState } = useContext(Store);
  useEffect(() => {
    getAllReserves();
  }, []);
  const getAllReserves = async () => {
    try {
      dispatch({ type: 'GET_R_REQUEST' });
      const { data } = await axios.get(`${ctxState.baseUrl}/reservations`, {
        headers: {
          authorization: `Bearer ${ctxState.userCredentials.token}`,
        },
      });
      dispatch({ type: 'GET_R_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_R_FAIL', payload: error.response.data });
    }
  };
  const clickHandler = (date) => {
    navigate(`/singlereserve/${date}`);
  };
  const showMessage = () => {
    // dispatch({ type: 'RESET' });
  };
  return (
    <div className="container mt-4" style={{ marginBottom: '80px' }}>
      {state.loading ? (
        <Loader />
      ) : (
        <div>
          {state.error ? (
            <MessageBox
              color="danger"
              message={state.message}
              showMessage={showMessage}
            />
          ) : (
            <>
              {' '}
              <h2 className="text-center mb-4 mt-3">
                تمامی وقت ها بر اساس ماه
              </h2>
              <table
                className="table align-middle mb-0 table-hover"
                style={{ backgroundColor: '#eee' }}
              >
                <thead className="coloritable text-white ">
                  <tr className="text-center">
                    <th>ماه </th>

                    <th>سال</th>
                    <th>مجموع رزرو </th>
                    <th>مجموع مهمان </th>
                  </tr>
                </thead>
                <tbody>
                  {state.reserves &&
                    state.reserves.map((item, index) => (
                      <tr
                        className="text-center"
                        key={index}
                        onClick={(e) =>
                          clickHandler(`${item.month}-${item.year}`)
                        }
                      >
                        <td>{item.year}</td>
                        <td>{item.month}</td>
                        <td>{item.allReserve}</td>
                        <td>{item.guestNum}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Reservation;

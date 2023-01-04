import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  anbarOutputReducer,
  initialState,
} from '../reducers/AnbarOutputReducer';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
import { Store } from '../context/Store';
function DecreaseFromAnbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { state: ctxState } = useContext(Store);

  const [state, dispatch] = useReducer(anbarOutputReducer, initialState);
  const [items, setItems] = useState([
    { name: '', type: '', amount: '', _id: '' },
  ]);
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = async () => {
    try {
      dispatch({ type: 'GET_P_REQUEST' });
      const { data } = await axios.get(`${ctxState.baseUrl}/anbar`, {
        headers: {
          authorization: `Bearer ${ctxState.userCredentials.token}`,
        },
      });
      dispatch({ type: 'GET_P_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_P_FAIL', payload: error.response.data });
    }
  };
  const searchhandler = () => {
    // eslint-disable-next-line
    const copyItems = state.products.filter((item) => {
      if (item.name.includes(search)) {
        return item;
      }
    });
    if (copyItems.length > 0) {
      setItems(copyItems);
    } else {
      dispatch({
        type: 'SET_P_FAIL',
        payload: 'کلمه ی جستجو شده موجود نمیباشد',
      });
      setItems([{ name: '', type: '', amount: '', _id: '' }]);
    }
  };
  const clickHandler = (id) => {
    navigate(`/minusProduct/${id}`);
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  const showMessage1 = () => {
    // dispatch({type:'RESET'})
  };

  return (
    <div className="container mt-4">
      {state.loading ? (
        <Loader />
      ) : state.error ? (
        <MessageBox
          color="danger"
          message={state.message}
          showMessage={showMessage1}
        />
      ) : (
        <>
          <h2 className="text-center mb-5  ">خارج کردن جنس از انبار</h2>
          <ul className=" d-flex mb-4 mt-4 ">
            <li className=" me-5 listItem">
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="نام جنس "
                style={{ minWidth: '100px' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </li>
            <li className=" me-5 listItem">
              <button
                className=" btn colorButtoms "
                onClick={searchhandler}
                style={{ color: 'white' }}
                href="#"
              >
                جستجوی جنس
              </button>
            </li>
          </ul>
          {state.ErrorP ? (
            <MessageBox
              color="danger"
              message={state.message}
              showMessage={showMessage}
            />
          ) : (
            <table
              className="table align-middle table-hover  mt-5"
              style={{ backgroundColor: '#eee', marginBottom: '90px' }}
            >
              <thead className="coloritable text-white ">
                <tr className="text-center">
                  <th>#</th>
                  <th>نام جنس</th>
                  <th>واحد اندازه گیری </th>
                  <th>مقدار کنونی</th>
                </tr>
              </thead>

              <tbody>
                {state.products &&
                  items.length > 0 &&
                  items.map((item, index) => (
                    <tr
                      className="text-center"
                      key={item._id}
                      onClick={() => clickHandler(item._id)}
                    >
                      <td>{index + 1}</td>
                      <td> {item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.amount} </td>
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

export default DecreaseFromAnbar;

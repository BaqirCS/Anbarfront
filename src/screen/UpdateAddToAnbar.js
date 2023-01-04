import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
import { Store } from '../context/Store';
import {
  updateToAnbarReducer,
  initialState,
} from '../reducers/updateAddToAnbar';
import Calender from './Calender';

function UpdateAddToAnbar() {
  const { id } = useParams();
  const [state, dispatch] = useReducer(updateToAnbarReducer, initialState);
  const { state: ctxState } = useContext(Store);

  const [product, setProduct] = useState({
    name: '',
    type: '',
    amount: '',
    date: '',
    receiver: '',
    productId: '',
    _id: '',
  });
  const [time, setTime] = useState({ fa: '' });

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);
  const getSingleProduct = async () => {
    try {
      dispatch({ type: 'GET_P_REQUEST' });
      const { data } = await axios.get(
        `${ctxState.baseUrl}/transaction/input/${id}`,
        {
          headers: {
            authorization: `Bearer ${ctxState.userCredentials.token}`,
          },
        }
      );
      setProduct(data);
      setTime({ fa: data.date });
      dispatch({ type: 'GET_P_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'GET_P_FAIL', payload: error.response.data });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    product.date = time.fa;
    if (!product.date) {
      return dispatch({
        type: 'SEND_R_FAIL',
        payload: 'تاریخ دریافت الزامی است',
      });
    }
    if (!product.amount || product.amount <= 0) {
      return dispatch({
        type: 'SEND_R_FAIL',
        payload: 'مقدار دریافت الزامی است',
      });
    }
    if (!product.receiver) {
      return dispatch({
        type: 'SEND_R_FAIL',
        payload: 'نام شخص دریافت  کننده الزامی است',
      });
    }
    try {
      dispatch({ type: 'SEND_R_REQUEST' });
      await axios.patch(
        `${ctxState.baseUrl}/transaction/input/${id}`,
        product,
        {
          headers: {
            authorization: `Bearer ${ctxState.userCredentials.token}`,
          },
        }
      );
      dispatch({ type: 'SEND_R_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'SEND_R_FAIL', payload: error.response.data });
    }
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  const showMessage1 = () => {
    dispatch({ type: 'RESET' });
  };
  const backHandler = () => {
    window.history.back();
  };
  const showClickHandler = () => {
    setTime({ fa: '' });
  };
  return (
    <div className="container mb-2 mt-4 ">
      {state.loading ? (
        <Loader />
      ) : state.error ? (
        <MessageBox
          showMessage={showMessage1}
          color="danger"
          message={state.message}
        />
      ) : (
        <>
          {' '}
          <div className="xp">
            <button
              onClick={backHandler}
              className="btn btn-primary colorButtoms"
              style={{
                marginLeft: '150px',
                color: 'white',
              }}
            >
              <i className="bi bi-arrow-left"> </i>
              برگشت
            </button>
          </div>
          <h2 className="text-center mb-3 marginManfi">
            اضافه کردن جنس به انبار{' '}
          </h2>
          {state.success && (
            <MessageBox
              showMessage={showMessage}
              color="info"
              message={state.message}
            />
          )}
          {state.sendError && (
            <MessageBox
              showMessage={showMessage}
              color="danger"
              message={state.message}
            />
          )}
          <form className="inp ">
            {' '}
            <div className="row  mb-3 ">
              <div
                className="form-group rtl1 col-md-3 "
                style={{ marginLeft: '150px' }}
              >
                <label htmlFor="type" className="mb-2">
                  واحد
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  placeholder="واحد اندازه گیری"
                  value={product.type && product.type}
                  disabled
                />
              </div>
              <div className="col-md-2 "></div>

              <div className="form-group col-md-3 rtl1">
                <label htmlFor="name" className="mb-2">
                  نام جنس
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="نام جنس"
                  value={product.name && product.name}
                  disabled
                />
              </div>
            </div>
            <div className="row  mb-3">
              <div
                className="form-group col-md-3 rtl1 "
                style={{ marginLeft: '150px' }}
              >
                <label htmlFor="newAmount" className="mb-2">
                  مقدار جنس وارده{' '}
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="newAmount"
                  placeholder="مقدار جدید جنس"
                  value={product.amount}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      amount: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-2"></div>

              <div className="form-group col-md-3 rtl1">
                <label htmlFor="reciever" className="mb-2">
                  دریافت کننده
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="شخص دریافت کننده"
                  id="reciever"
                  value={product.receiver}
                  onChange={(e) =>
                    setProduct({ ...product, receiver: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row  mb-3">
              <div
                className="form-group col-md-3 rtl1"
                style={{ marginLeft: '150px' }}
              >
                <button
                  type="submit"
                  onClick={submitHandler}
                  className="btn btn-primary colorButtoms"
                  style={{
                    width: '225px',
                    color: 'white',
                    marginBottom: '70px',
                    marginTop: '20px',
                  }}
                >
                  بروزرسانی
                </button>
              </div>
              <div className="col-md-2 "></div>
              <div className="form-group col-md-3  rtl1">
                <label htmlFor="date" className="mb-2">
                  تاریخ
                </label>
                <div>
                  {!time.fa ? (
                    <>
                      <Calender setTime={setTime} />
                    </>
                  ) : (
                    <>
                      <button onClick={showClickHandler}>
                        {' '}
                        <i className="bi bi-calendar"></i>
                      </button>
                      <b className="mx-3"> {time.fa}</b>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default UpdateAddToAnbar;

import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
import { Store } from '../context/Store';
import { addProductReducer, initialState } from '../reducers/AddProductReducer';
function AddNewToAnbar() {
  const [product, setProduct] = useState({
    name: '',
    type: '',
    amount: '',
    category: 'انبار',
  });
  const [state, dispatch] = useReducer(addProductReducer, initialState);
  const { state: ctxState } = useContext(Store);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!product.name) {
      return dispatch({ type: 'SEND_P_FAIL', payload: 'نام جنس الزامی است' });
    }
    if (!product.type) {
      return dispatch({
        type: 'SEND_P_FAIL',
        payload: 'واحد اندازه گیری جنس الزامی است',
      });
    }
    if (!product.amount) {
      return dispatch({
        type: 'SEND_P_FAIL',
        payload: 'مقدار کنونی جنس الزامی است',
      });
    }
    if (!product.category) {
      return dispatch({
        type: 'SEND_P_FAIL',
        payload: 'دسته بندی جنس الزامی است',
      });
    }
    try {
      dispatch({ type: 'SEND_P_REQUEST' });
      await axios.post(`${ctxState.baseUrl}/anbar`, product, {
        headers: {
          authorization: `Bearer ${ctxState.userCredentials.token}`,
        },
      });
      dispatch({ type: 'SEND_P_SUCCESS' });
      setProduct({
        name: '',
        type: '',
        amount: '',
        category: 'انبار',
      });
    } catch (error) {
      dispatch({ type: 'SEND_P_FAIL', payload: error.response.data });
    }
  };
  const backHandler = () => {
    window.history.back();
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  return (
    <div className="container mb-2 mt-3 ">
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
                marginLeft: '100px',
              }}
            >
              <i className="bi bi-arrow-left"> </i>
              بازگشت
            </button>
            <h2 className="text-center" style={{ marginTop: '-40px' }}>
              اضافه کردن جنس به انبار{' '}
            </h2>
          </div>
          {state.error && (
            <MessageBox
              color="danger"
              showMessage={showMessage}
              message={state.message}
            />
          )}
          {state.success && (
            <MessageBox
              color="info"
              showMessage={showMessage}
              message={state.message}
            />
          )}
          <form className="inp">
            <div className="row  mb-3 rtl1">
              <div
                className="form-group col-md-3 col-sm-12"
                style={{ marginRight: '150px' }}
              >
                <label htmlFor="name" className="mb-2">
                  نام جنس
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="نام جنس جدید"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </div>

              <div className="col-md-2"></div>
              <div className="form-group col-md-3 col-sm-6 ">
                <label htmlFor="type" className="mb-2">
                  واحد{' '}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  placeholder="واحد اندازه گیری جنس"
                  value={product.type}
                  onChange={(e) =>
                    setProduct({ ...product, type: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row  mb-3 rtl1">
              <div
                className="form-group col-md-3"
                style={{ marginRight: '150px' }}
              >
                <label htmlFor="amount" className="mb-2">
                  مقدار{' '}
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  placeholder="مقدار کنونی جنس در انبار"
                  value={product.amount}
                  onChange={(e) =>
                    setProduct({ ...product, amount: e.target.value })
                  }
                />
              </div>
              <div className="col-md-2"></div>
              <div className="form-group col-md-3 ">
                <label htmlFor="des" className="mb-2">
                  محل نگهداری{' '}
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                  value={product.category}
                >
                  <option value="انبار">انبار</option>
                  <option value="سردخانه">سردخانه</option>
                </select>
              </div>
            </div>

            <div className="row ">
              <div className="form-group col-md-3 m-auto my-3 ">
                <button
                  type="submit"
                  onClick={submitHandler}
                  className="btn btn-primary xpc colorButtoms"
                  style={{
                    width: '225px',
                  }}
                >
                  اضافه کردن به انبار
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default AddNewToAnbar;

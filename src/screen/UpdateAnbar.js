import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
import { useParams } from 'react-router-dom';
import {
  updateAnbarReducer,
  initialState,
} from '../reducers/updateAnbarReducer';
import { Store } from '../context/Store';
function UpdateAnbar() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    type: '',
    amount: '',
    category: '',
  });
  const [state, dispatch] = useReducer(updateAnbarReducer, initialState);
  const { state: ctxState } = useContext(Store);

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);
  const getSingleProduct = async () => {
    try {
      dispatch({ type: 'GET_R_REQUEST' });
      const { data } = await axios.get(`${ctxState.baseUrl}/anbar/${id}`, {
        headers: {
          authorization: `Bearer ${ctxState.userCredentials.token}`,
        },
      });
      setProduct(data);
      dispatch({ type: 'GET_R_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'GET_R_FAIL', payload: error.response.data });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!product.name) {
      return dispatch({ type: 'PATCH_R_FAIL', payload: 'نام جنس الزامی است' });
    }
    if (!product.type) {
      return dispatch({
        type: 'PATCH_R_FAIL',
        payload: 'واحد اندازه گیری جنس الزامی است',
      });
    }
    if (!product.amount) {
      return dispatch({
        type: 'PATCH_R_FAIL',
        payload: 'مقدار کنونی جنس الزامی است',
      });
    }
    if (!product.category) {
      return dispatch({
        type: 'PATCH_R_FAIL',
        payload: 'دسته بندی جنس الزامی است',
      });
    }
    try {
      dispatch({ type: 'PATCH_R_REQUEST' });
      await axios.patch(`${ctxState.baseUrl}/anbar/${id}`, product, {
        headers: {
          authorization: `Bearer ${ctxState.userCredentials.token}`,
        },
      });
      dispatch({ type: 'PATCH_R_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'PATCH_R_FAIL', payload: error.response.data });
    }
  };
  const backHandler = () => {
    window.history.back();
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  const showMessage1 = () => {
    // dispatch({ type: 'RESET' });
  };
  return (
    <div className="container mb-2 mt-3 ">
      {state.loading ? (
        <Loader />
      ) : state.GError ? (
        <MessageBox
          showMessage={showMessage1}
          color="danger"
          message={state.message}
        />
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
              بروزرسانی جنس در انبار{' '}
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
                  نام
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="نام  "
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
                  placeholder="واحد اندازه گیری "
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
                  placeholder="مقدار کنونی  در انبار"
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
                  <option value="سردخانه">سردخانه</option>
                  <option value="انبار">انبار</option>
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
                  بروزرسانی
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default UpdateAnbar;

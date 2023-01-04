import React, { useContext, useReducer, useState } from 'react';
import Calender from './Calender';
import axios from 'axios';
import { addReserveReducer, initialState } from '../reducers/addReserveReducer';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
import { Store } from '../context/Store';
function AddReservation() {
  const [reserve, setReserve] = useState({
    requestName: '',
    guestNum: '',
    partyKind: 'عروسی',
    status: 'رزرو',
    time: 'شب',
    date: '',
  });
  const [state, dispatch] = useReducer(addReserveReducer, initialState);
  const [time, setTime] = useState({ fa: '' });
  const { state: ctxState } = useContext(Store);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!reserve.requestName) {
      dispatch({ type: 'GET_R_FAIL', payload: 'نام درخواست کننده الزامی است' });
      return;
    }
    if (!reserve.guestNum) {
      dispatch({ type: 'GET_R_FAIL', payload: 'تعداد میهمان الزامی است' });
      return;
    }

    if (!reserve.status) {
      dispatch({ type: 'GET_R_FAIL', payload: ' حالت درخواست الزامی است' });
      return;
    }
    reserve.date = time.fa;
    if (!reserve.date) {
      dispatch({
        type: 'GET_R_FAIL',
        payload: ' تاریخ برگزاری مراسم الزامی است',
      });
      return;
    }

    try {
      dispatch({ type: 'GET_R_REQUEST' });
      await axios.post(`${ctxState.baseUrl}/reservations`, reserve, {
        headers: {
          authorization: `Bearer ${ctxState.userCredentials.token}`,
        },
      });
      dispatch({ type: 'GET_R_SUCCESS' });
      setReserve({
        requestName: '',
        guestNum: '',
        partyKind: 'عروسی',
        status: 'رزرو',
        time: 'شب',
        date: '',
      });
    } catch (error) {
      dispatch({ type: 'GET_R_FAIL', payload: error.response.data });
    }
  };

  const showClickHandler = () => {
    setTime({ fa: '' });
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  return (
    <div className="container mb-2 mt-4  ">
      {state.loading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <h2 className="text-center my-3"> ایجاد مراسم جدید</h2>
          {state.error && (
            <MessageBox
              showMessage={showMessage}
              color="danger"
              message={state.message}
            />
          )}
          {state.success && (
            <MessageBox
              showMessage={showMessage}
              color="info"
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
                  تعداد میهمان
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  placeholder="  تعداد میهمان"
                  value={reserve.guestNum}
                  onChange={(e) =>
                    setReserve({ ...reserve, guestNum: e.target.value })
                  }
                />
              </div>
              <div className="col-md-2 "></div>

              <div className="form-group col-md-3 rtl1">
                <label htmlFor="name" className="mb-2">
                  نام صاحب مراسم
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="نام صاحب مراسم"
                  value={reserve.requestName}
                  onChange={(e) =>
                    setReserve({ ...reserve, requestName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row  mb-3">
              <div
                className="form-group col-md-3 rtl1 "
                style={{ marginLeft: '150px' }}
              >
                <label htmlFor="newAmount" className="mb-2">
                  وضعیت
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setReserve({ ...reserve, status: e.target.value })
                  }
                >
                  <option value="رزرو">رزرو</option>
                  <option value="نامشخص">نامشخص</option>
                </select>
              </div>
              <div className="col-md-2"></div>

              <div className="form-group col-md-3 rtl1">
                <label htmlFor="current" className="mb-2">
                  نوع مراسم
                </label>

                <select
                  className="form-select"
                  aria-label="party select "
                  onChange={(e) =>
                    setReserve({ ...reserve, partyKind: e.target.value })
                  }
                >
                  <option value="عروسی">عروسی</option>
                  <option value="عقد">عقد</option>
                  <option value="ختم">ختم</option>
                  <option value="تولد">تولد</option>
                  <option value="ختنه سوران">ختنه سوران</option>
                  <option value="حنا بندان">حنا بندان</option>
                </select>
              </div>
            </div>
            <div className="row  mb-3">
              <div className="col-md-3 rtl1 " style={{ marginLeft: '150px' }}>
                <label htmlFor="currentTime" className="mb-2">
                  نوبت
                </label>

                <select
                  className="form-select"
                  aria-label="party select "
                  onChange={(e) =>
                    setReserve({ ...reserve, time: e.target.value })
                  }
                >
                  <option value="شب">شب</option>
                  <option value="ظهر">ظهر</option>
                  <option value="بعد از ظهر">بعد از ظهر</option>
                </select>
              </div>

              <div className="col-md-2 "></div>

              <div
                className="form-group col-md-3 rtl1"
                style={{ marginBottom: '70px' }}
              >
                <label htmlFor="customerdate" className="mb-2 ms-2">
                  تاریخ برگزاری مراسم
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
            <div
              className="row"
              style={{ marginTop: '-20px', marginBottom: '60px' }}
            >
              <button
                type="submit"
                onClick={submitHandler}
                className="btn btn-primary colorButtoms m-auto"
                style={{
                  width: '300px',
                  height: '40px',
                  marginTop: '5px',
                  color: 'white',
                  marginBottom: '70px',
                }}
              >
                ایجاد مراسم
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default AddReservation;

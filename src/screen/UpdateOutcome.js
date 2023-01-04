import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function UpdateOutcome() {
  const [product, setProduct] = useState({
    name: '',
    type: '',
    currentAmount: '',
    amount: '',
    date: '',
    receiver: '',
    status: '',
    description: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className="container mb-2 mt-4  ">
      <div className="xp">
        <Link
          to="/outcomeProductTransaction"
          className="btn btn-primary colorButtoms"
          style={{
            marginLeft: '150px',
            color: 'white',
          }}
        >
          <i className="bi bi-arrow-left"> </i>
          برگشت
        </Link>
      </div>
      <h2 className="text-center mb-3 marginManfi">خارج کردن جنس از انبار </h2>

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
              value={product.type}
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
              value={product.name}
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
              مقدار جنس خارجه{' '}
            </label>
            <input
              type="text"
              className="form-control"
              id="newAmount"
              placeholder="  مقدار جنس خارج شده"
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
            <label htmlFor="current" className="mb-2">
              مقدار انبار
            </label>
            <input
              type="text"
              className="form-control"
              id="current"
              placeholder="مقدار در انبار"
              value={product.currentAmount}
              disabled
            />
          </div>
        </div>
        <div className="row  mb-3">
          <div
            className="form-group col-md-3 rtl1"
            style={{ marginLeft: '150px' }}
          >
            <label htmlFor="reciever" className="mb-2">
              خارج کننده
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="شخص خارج کننده"
              id="reciever"
              value={product.receiver}
              onChange={(e) =>
                setProduct({ ...product, receiver: e.target.value })
              }
            />
          </div>
          <div className="col-md-2 "></div>
          <div className="form-group col-md-3  rtl1">
            <label htmlFor="date" className="mb-2">
              تاریخ
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              placeholder="تاریخ رسید"
              value={product.availableAmount}
              onChange={(e) => setProduct({ ...product, date: e.target.value })}
            />
          </div>
        </div>
        <div className="row  mb-3">
          <div
            className="form-group col-md-8 rtl1"
            style={{ marginLeft: '150px' }}
          >
            <label htmlFor="exp" className="mb-2">
              {' '}
              توضیحات
            </label>
            <textarea
              className="form-control"
              id="eNamexp"
              rows="2"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            ></textarea>
          </div>
        </div>
        <div className="row mb-3" style={{ direction: 'rtl' }}>
          <div className="col-md-1" style={{ marginRight: '230px' }}>
            <label htmlFor="label1">واکنش </label>
          </div>
          <div className="col-md-2">
            <label
              className="form-check-label mx-3"
              htmlFor="flexRadioDefault1"
            >
              تایید
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="flexRadioDefault1"
              checked={product.status === 'تایید' ? true : false}
              onChange={(e) =>
                setProduct({
                  ...product,
                  status: e.target.checked && 'تایید',
                })
              }
            />
          </div>
          <div className="col-md-2">
            <label
              className="form-check-label mx-3"
              htmlFor="flexRadioDefault1"
            >
              رد کردن
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="flexRadioDefault1"
              checked={product.status === 'رد کردن' ? true : false}
              onChange={(e) =>
                setProduct({
                  ...product,
                  status: e.target.checked && 'رد کردن',
                })
              }
            />
          </div>
          <div className="col-md-2">
            <label
              className="form-check-label mx-3"
              htmlFor="flexRadioDefault1"
            >
              نا مشخص
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="flexRadioDefault1"
              checked={product.status === 'نامشخص' ? true : false}
              onChange={(e) =>
                setProduct({
                  ...product,
                  status: e.target.checked && 'نامشخص',
                })
              }
            />
          </div>
        </div>
        <div
          className="row  mb-3 mt-3
           text-center align-items-center justify-content-center"
          style={{ marginLeft: '-90px' }}
        >
          <button
            type="submit"
            onClick={submitHandler}
            className="btn btn-primary colorButtoms"
            style={{
              width: '225px',
              color: 'white',
              marginBottom: '70px',
            }}
          >
            ذخیره
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateOutcome;

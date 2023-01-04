import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Loader from '../component/Loader';
import { anbarReducer, initialState } from '../reducers/anbarReducer';
import { useNavigate } from 'react-router-dom';
import { Store } from '../context/Store';
function Anbar() {
  const [state, dispatch] = useReducer(anbarReducer, initialState);
  const { state: ctxState } = useContext(Store);

  const navigate = useNavigate();
  const [items, setItems] = useState([
    { name: '', type: '', amount: '', category: '', _id: '' },
  ]);
  useEffect(() => {
    getAllProdcuts();
  }, []);
  const getAllProdcuts = async () => {
    try {
      dispatch({ type: 'GET_R_REQUEST' });
      const { data } = await axios.get(`${ctxState.baseUrl}/anbar`, {
        headers: {
          authorization: `Bearer ${ctxState.userCredentials.token}`,
        },
      });
      setItems(data);
      dispatch({ type: 'GET_R_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_R_FAIL', payload: error.response.data });
    }
  };
  const clickHandler = (id) => {
    navigate(`/updateproduct/${id}`);
  };
  const deleteHandler = async (id) => {
    const x = window.confirm('آیا واقعا میخواهید این جنس را پاک کنید؟');
    if (x) {
      try {
        await axios.delete(`${ctxState.baseUrl}/anbar/${id}`, {
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
  return (
    <div className="container mt-4" style={{ marginBottom: '70px' }}>
      {state.loading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <h2 className="text-center mb-4">موجودی انبار </h2>
          <table
            className="table align-middle table-hover"
            style={{ backgroundColor: '#eee' }}
          >
            <thead className="coloritable text-white ">
              <tr className="text-center">
                <th>#</th>
                <th>نام جنس</th>
                <th>واحد اندازه گیری</th>
                <th>مقدار</th>
                <th> محل نگهداری</th>
                {ctxState.userCredentials.user.status === 'owner' && (
                  <th> تغییر</th>
                )}
              </tr>
            </thead>
            <tbody>
              {state.products &&
                items.map((item, index) => (
                  <tr className="text-center" key={item._id}>
                    <td>{index + 1}</td>
                    <td> {item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.amount}</td>
                    <td> {item.category}</td>
                    {ctxState.userCredentials.user.status === 'owner' && (
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
        </>
      )}
    </div>
  );
}

export default Anbar;

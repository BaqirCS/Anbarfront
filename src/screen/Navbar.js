import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../context/Store';

function Navbar() {
  const { state, dispatch } = useContext(Store);
  const navigate = useNavigate();
  const logOutHandler = () => {
    dispatch({ type: 'LOG_OUT' });
    localStorage.removeItem('userCredentials');
    navigate('/');
  };
  return (
    <nav className="navbar navbar-expand-md colorify  p-3 navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          قصر چهل ستون{' '}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {state.userCredentials && (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="DrugDropDown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  انبار
                </Link>
                <div className="dropdown-menu " aria-labelledby="DrugDropDown">
                  <Link className="dropdown-item " to="/">
                    موجودی
                  </Link>
                  <Link className="dropdown-item " to="/newproduct">
                    اضافه کردن جدید
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="inputDropDown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  ورودی به انبار
                </Link>
                <div className="dropdown-menu" aria-labelledby="inputDropDown">
                  <Link className="dropdown-item" to="/input">
                    تمامی ورودی ها
                  </Link>
                  <Link className="dropdown-item" to="/addinput">
                    ورودی جدید
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="inputDropDown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  خروجی از انبار
                </Link>
                <div className="dropdown-menu" aria-labelledby="inputDropDown">
                  <Link className="dropdown-item" to="/output">
                    تمامی خروجی ها
                  </Link>
                  <Link className="dropdown-item" to="/minusAnbar">
                    خروجی جدید
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="AccountingDropDown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  رزرو
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="AccountingDropDown"
                >
                  <Link className="dropdown-item" to="/reservation">
                    تمامی وقت ها
                  </Link>
                  <Link className="dropdown-item" to="/addreservation">
                    وقت جدید
                  </Link>
                </div>
              </li>
            </ul>
          )}

          <ul className="navbar-nav ms-auto">
            {state.userCredentials ? (
              <>
                {state.userCredentials.user.status === 'user' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="profile">
                      {' '}
                      پروفایل{' '}
                    </Link>
                  </li>
                )}

                {state.userCredentials.user.status === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/users">
                      پروفایل{' '}
                    </Link>
                  </li>
                )}
                {state.userCredentials.user.status === 'owner' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/users">
                      پروفایل{' '}
                    </Link>
                  </li>
                )}

                <li className="nav-item" onClick={logOutHandler}>
                  <Link className="nav-link">خارج شدن </Link>
                </li>
              </>
            ) : (
              <>
                {' '}
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    LOG IN{' '}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    {' '}
                    REGISTER{' '}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

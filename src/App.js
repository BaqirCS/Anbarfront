import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './screen/Navbar';
import Footer from './screen/Footer';
import Anbar from './screen/Anbar';
import AddNewToAnbar from './screen/AddNewToAnbar';
import AddToAnbar from './screen/AddToAnbar';
import AddProduct from './screen/AddProduct';
import DecreaseFromAnbar from './screen/DecreaseFromAnbar';
import MinusProduct from './screen/MinusProduct';
import IncomeAnbar from './screen/IncomeAnbar';
import OutcomeAnbar from './screen/OutcomeAnbar';

import Reservation from './screen/Reservation';
import SingleReservation from './screen/SingleReservation';
import AddReservation from './screen/AddReservation';
import UpdateReservation from './screen/UpdateReservation';

import AnbarIn from './screen/AnbarIn';
import UpdateAddToAnbar from './screen/UpdateAddToAnbar';
import UpdateAnbar from './screen/UpdateAnbar';
import AnbarOut from './screen/AnbarOut';
import UpdateMinusProduct from './screen/UpdateMinusProduct';
import OutcomeAnbarDetails from './screen/OutcomeAnbarDetails';
import Login from './screen/Login';
import Register from './screen/Register';
import Landing from './screen/Landing';
import { useContext } from 'react';
import { Store } from './context/Store';
import Profile from './screen/Profile';
import Users from './screen/Users';
function App() {
  const { state } = useContext(Store);
  return (
    <BrowserRouter>
      <Navbar />
      {state.userCredentials ? (
        <>
          <Routes>
            <Route element={<Reservation />} path="/reservation" />
            <Route element={<SingleReservation />} path="/singlereserve/:id" />
            <Route element={<AddReservation />} path="/addreservation" />
            <Route
              element={<UpdateReservation />}
              path="/updatereservation/:id"
            />
            <Route element={<Anbar />} path="/" />
            <Route element={<AddNewToAnbar />} path="/newproduct" />
            <Route element={<UpdateAnbar />} path="/updateproduct/:id" />
            <Route element={<AnbarIn />} path="/input" />
            <Route element={<IncomeAnbar />} path="/singleinput/:date" />
            <Route element={<AddToAnbar />} path="/addinput" />
            <Route element={<AddProduct />} path="/addinput/:id" />
            <Route element={<UpdateAddToAnbar />} path="/updateinput/:id" />
            <Route element={<AnbarOut />} path="/output" />
            <Route element={<OutcomeAnbar />} path="/singleoutput/:date" />
            <Route element={<DecreaseFromAnbar />} path="/minusAnbar" />
            <Route
              element={<OutcomeAnbarDetails />}
              path="/transactionDate/:date"
            />
            <Route element={<MinusProduct />} path="/minusProduct/:id" />
            <Route element={<UpdateMinusProduct />} path="/updateminus/:id" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<Users />} path="/users" />
          </Routes>
        </>
      ) : (
        <>
          {' '}
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Landing />} path="/" />
          </Routes>
        </>
      )}

      <Footer />
    </BrowserRouter>
  );
}

export default App;

import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  userCredentials: localStorage.getItem('userCredentials')
    ? JSON.parse(localStorage.getItem('userCredentials'))
    : null,
  baseUrl: 'https://anbarback.onrender.com/api',
};
function storeReducer(state, action) {
  switch (action.type) {
    case 'LOG_IN': {
      return { ...state, userCredentials: action.payload };
    }
    case 'LOG_OUT': {
      return { ...state, userCredentials: null };
    }

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

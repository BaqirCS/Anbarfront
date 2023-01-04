export const anbarOutputReducer = (state, action) => {
  switch (action.type) {
    case 'GET_P_REQUEST':
      return { ...state, loading: true };

    case 'GET_P_SUCCESS':
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case 'GET_P_FAIL': {
      return { ...state, loading: false, error: true, message: action.payload };
    }
    case 'SET_P_FAIL': {
      return {
        ...state,
        loading: false,
        error: false,
        ErrorP: true,
        message: action.payload,
      };
    }

    case 'RESET': {
      return {
        ...state,
        loading: false,
        error: false,
        ErrorP: false,
        message: '',
      };
    }
    default:
      return state;
  }
};
export const initialState = {
  loading: false,
  error: false,
  message: '',
  ErrorP: false,
  products: [],
};

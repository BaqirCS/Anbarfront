export const singleReserveReducer = (state, action) => {
  switch (action.type) {
    case 'GET_R_REQUEST':
      return { ...state, loading: true };

    case 'GET_R_SUCCESS':
      return {
        ...state,
        loading: false,
        reserves: action.payload,
      };
    case 'GET_R_FAIL': {
      return { ...state, loading: false, error: true, message: action.payload };
    }
    case 'DELETE_R_SUCCESS':
      return {
        ...state,
        message: 'عملیات حذف موفقانه انجام شد',
      };
    case 'DELETE_R_FAIL': {
      return { ...state, error: true, message: action.payload };
    }
    default:
      return state;
  }
};
export const initialState = {
  loading: false,
  error: false,
  message: '',
  reserves: [],
};

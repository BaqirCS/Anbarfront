export const addReserveReducer = (state, action) => {
  switch (action.type) {
    case 'GET_R_REQUEST':
      return { ...state, loading: true };

    case 'GET_R_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        message: 'وقت جدید موفقانه اضافه شد',
      };
    case 'GET_R_FAIL': {
      return { ...state, loading: false, error: true, message: action.payload };
    }
    case 'RESET': {
      return {
        ...state,
        loading: false,
        error: false,
        success: false,
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
  success: false,
  message: '',
};

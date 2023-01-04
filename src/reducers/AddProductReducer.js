export const addProductReducer = (state, action) => {
  switch (action.type) {
    case 'SEND_P_PEQUEST':
      return { ...state, loading: true };

    case 'SEND_P_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        message: ' جنس جدید موفقانه اضافه شد',
      };
    case 'SEND_P_FAIL': {
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

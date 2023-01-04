export const addToAnbarReducer = (state, action) => {
  switch (action.type) {
    case 'GET_P_REQUEST':
      return { ...state, loading: true };

    case 'GET_P_SUCCESS':
      return {
        ...state,
        loading: false,
        input: action.payload,
      };
    case 'GET_P_FAIL': {
      return { ...state, loading: false, error: true, message: action.payload };
    }
    case 'SEND_R_REQUEST':
      return { ...state, loading: true };

    case 'SEND_R_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        message: 'جنس جدید موفقانه اضافه شد',
      };
    case 'SEND_R_FAIL': {
      return {
        ...state,
        loading: false,
        error: false,
        sendError: true,
        message: action.payload,
      };
    }
    case 'RESET': {
      return {
        ...state,
        loading: false,
        error: false,
        success: false,
        message: '',
        sendError: false,
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
  sendError: false,
  input: {},
};

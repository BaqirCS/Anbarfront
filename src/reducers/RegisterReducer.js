export const RegisterReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_REQUEST':
      return { ...state, loading: true };

    case 'REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case 'REGISTER_FAIL':
      return { ...state, loading: false, error: true, message: action.payload };
    case 'RESET':
      return {
        ...state,
        loading: false,
        error: false,
        message: '',
        success: false,
      };
    default:
      return state;
  }
};
export const initialState = {
  loading: false,
  error: false,
  message: '',
  success: false,
};

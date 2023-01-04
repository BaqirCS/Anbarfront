export const userReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER_REQUEST':
      return { ...state, loading: true };

    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        message: 'prfoile is successfully updated',
      };
    case 'UPDATE_USER_FAIL': {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };
    }
    case 'RESET':
      return {
        ...state,
        loading: false,
        error: false,
        success: false,
        message: '',
      };

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

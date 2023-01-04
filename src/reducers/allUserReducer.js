export const allUserReducer = (state, action) => {
  switch (action.type) {
    case 'GET_U_REQUEST':
      return {
        ...state,
        loadingUser: true,
      };

    case 'GET_U_SUCCESS':
      return {
        ...state,
        loadingUser: false,
        users: action.payload,
      };
    case 'GET_U_FAIL':
      return {
        ...state,
        error: true,
        message: action.payload,
      };

    case 'UPDATE_U_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'UPDATE_U_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        message: 'you have successfully updated this profile',
      };
    case 'UPDATE_U_FAIL':
      return {
        ...state,
        error: true,
        message: action.payload,
      };

    case 'DELETE_U_FAIL':
      return {
        ...state,
        deleteError: true,
        message: action.payload,
      };

    case 'RESET':
      return {
        ...state,
        deleteError: false,
        error: false,
        success: false,
        message: '',
        loading: false,
      };
    default:
      return state;
  }
};

export const initialState = {
  users: [],
  error: false,
  success: false,
  message: '',
  deleteError: false,
  loading: false,
  loadingUser: false,
};

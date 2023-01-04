export const updateReserveReducer = (state, action) => {
  switch (action.type) {
    case 'GET_R_REQUEST':
      return { ...state, loading: true };

    case 'GET_R_SUCCESS':
      return {
        ...state,
        loading: false,
        reserve: action.payload,
      };
    case 'GET_R_FAIL': {
      return { ...state, loading: false, error: true, message: action.payload };
    }
    case 'PATCH_R_SUCCESS': {
      return {
        ...state,
        loading: false,
        success: true,
        message: 'مراسم با موفقیت بروزرسانی شد',
      };
    }
    case 'RESET':
      return {
        ...state,
        success: false,
        loading: false,
        error: false,
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
  reserves: {},
};

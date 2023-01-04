export const updateAnbarReducer = (state, action) => {
  switch (action.type) {
    case 'PATCH_R_REQUEST':
      return { ...state, loading: true };
    case 'PATCH_R_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        message: ' اطلاعات موفقانه بروزرسانی شد',
      };
    case 'PATCH_R_FAIL': {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };
    }
    case 'GET_R_REQUEST':
      return { ...state, loading: true };

    case 'GET_R_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'GET_R_FAIL': {
      return {
        ...state,
        loading: false,
        error: false,
        GError: true,
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
        GError: false,
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
  GError: false,
};

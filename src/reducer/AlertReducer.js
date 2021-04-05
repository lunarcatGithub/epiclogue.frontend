export const initialAlert = { kind: 'initial', bool: false };

export function alertReducer(state, { type, payload }) {
  switch (type) {
    case 'NOT_SERVICE': {
      return { ...state, kind: 'NOT_SERVICE', bool: payload };
    }
    case 'SHARE': {
      return { ...state, kind: 'SHARE', bool: payload };
    }
    case 'FAIL': {
      return { ...state, kind: 'FAIL', bool: payload };
    }
    case 'UPLOADED': {
      return { ...state, kind: 'UPLOADED', bool: payload };
    }
    case 'UPLOADED_UPDATE': {
      return { ...state, kind: 'UPLOADED_UPDATE', bool: payload };
    }
    case 'UPLOADED_IMAGE': {
      return { ...state, kind: 'UPLOADED_FAIL', bool: payload };
    }
    case 'UPLOADED_FAIL': {
      return { ...state, kind: 'UPLOADED_FAIL', bool: payload };
    }
    case 'UPLOADED_TITLE': {
      return { ...state, kind: 'UPLOADED_TITLE', bool: payload };
    }
    case 'FEEDBACK_TWO': {
      return { ...state, kind: 'FEEDBACK_TWO', bool: payload };
    }
    case 'AUTH_FAIL': {
      return { ...state, kind: 'AUTH_FAIL', bool: payload };
    }
    case 'PROFILE_UPDATE': {
      return { ...state, kind: 'PROFILE_UPDATE', bool: payload };
    }
    case 'PASSWORD_UPDATE': {
      return { ...state, kind: 'PASSWORD_UPDATE', bool: payload };
    }
    case 'FEEDBACK_THANKS': {
      return { ...state, kind: 'FEEDBACK_THANKS', bool: payload };
    }
    case 'REPORT_SUBMIT': {
      return { ...state, kind: 'REPORT_SUBMIT', bool: payload };
    }
    case 'LOADING_PUSH': {
      return { ...state, kind: 'LOADING_PUSH', bool: payload };
    }
    case 'FILE_SIZEFULL': {
      return { ...state, kind: 'FILE_SIZEFULL', bool: payload };
    }
    case 'SUCCESS_PWSEND': {
      return { ...state, kind: 'SUCCESS_PWSEND', bool: payload };
    }
    case 'SUCCESS_PWCHANGE': {
      return { ...state, kind: 'SUCCESS_PWCHANGE', bool: payload };
    }
    case 'SUCCESS_LANGUAGE_UPDATE': {
      return { ...state, kind: 'SUCCESS_PWCHANGE', bool: payload };
    }
    case 'FAIL_LANGUAGE_UPDATE': {
      return { ...state, kind: 'FAIL_LANGUAGE_UPDATE', bool: payload };
    }
    default:
      return state;
  }
}

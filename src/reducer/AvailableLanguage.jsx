export const initialArr = [0, 1, 2];

export function availableLang(state, {type, payload}) {
    switch (type) {
        case 'AVAILABLE_LANG':
            return [ ...payload ];
        default:
            return state;
    }
  }
  
export const reducer = (state, action) => {
    switch (action.type) {
      case "SET_SELECTED_AIRPORT":
        return {
          ...state,
            selectedAirport : action.data
        }
        case "SET_AIRPORTS":
          return {
            ...state,
              airports : action.data
          }
          case 'SET_ERROR':
            return {
                ...state,
                error: action.data
            };
      default:
        return state
    }
  }
  
  export const initialState = {
    selectedAirport: null,
    airports: [],
    error: false
  }
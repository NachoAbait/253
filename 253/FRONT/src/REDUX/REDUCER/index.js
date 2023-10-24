const initialState = {
  Stock: [],
  Tropas: [],
  Distribuidores: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "TROPA_ADDED_SUCCESS":
      return {
        ...state,
        Tropas: [...state.Tropas, action.payload],
      };
    case "GET_DISTRIBUIDORES":
      return {
        ...state,
        Distribuidores: action.payload,
      };
    case "GET_TROPAS":
      return {
        ...state,
        Tropas: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;

const initialState = {
  Stock: [],
  Tropas: [],
  Distribuidores: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    /*//////  TROPAS  //////////////*/
    case "TROPA_ADDED_SUCCESS":
      return {
        ...state,
        Tropas: [...state.Tropas, action.payload],
      };
    case "GET_TROPAS":
      return {
        ...state,
        Tropas: action.payload,
      };

    /*//////  RESES  //////////////*/
    case "POST_RES":
      return {
        ...state,
        Stock: [...state.Stock, action.payload],
      };
    case "GET_STOCK":
      return {
        ...state,
        Stock: action.payload,
      };

    /*//////  DISTRIBUIDORES  //////////////*/
    case "GET_DISTRIBUIDORES":
      return {
        ...state,
        Distribuidores: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;

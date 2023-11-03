const initialState = {
  Stock: [],
  Tropas: [],
  Distribuidores: [],
  DetalleTropa: {},
  Salidas: [],
  Productores: [],
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
    case "GET_DETALLE_TROPA":
      return {
        ...state,
        DetalleTropa: action.payload,
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
    case "UPDATE_RES_SUCCESS":
      return {
        ...state,
        Stock: state.Stock.map((res) =>
          res._id === action.payload._id ? action.payload : res
        ),
      };
    case "UPDATE_RES_FAILURE":
      // Aquí podrías manejar el error como quieras.
      return {
        ...state,
      };

    /*//////  DISTRIBUIDORES  //////////////*/
    case "GET_DISTRIBUIDORES":
      return {
        ...state,
        Distribuidores: action.payload,
      };

    /*//////  SALIDAS  //////////////*/
    case "GET_SALIDAS":
      return {
        ...state,
        Salidas: action.payload,
      };
    ////////    PRODUCTOR  /////////
    case "GET_PRODUCTORES":
      return {
        ...state,
        Productores: action.payload,
      };
    case "POST_PRODUCTOR":
      return {
        ...state,
        Productores: [...state.Productores, action.payload],
      };
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;

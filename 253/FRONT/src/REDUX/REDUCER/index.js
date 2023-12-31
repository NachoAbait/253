const initialState = {
  Stock: [],
  Tropas: [],
  Distribuidores: [],
  DetalleTropa: {},
  Salidas: [],
  Productores: [],
  user: {
    isAuthenticated: false,
    isAdmin: false,
    // Otros datos del usuario si es necesario
  },
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
    case "DELETE_TROPA_SUCCESS":
      // Filtra las tropas para eliminar la que coincida con action.payload (el ID de la tropa)
      const updatedTropas = state.Tropas.filter(
        (tropa) => tropa._id !== action.payload
      );
      return { ...state, Tropas: updatedTropas };
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
    case "DELETE_RES":
      // Filtra las reses para eliminar la que coincida con action.payload
      const updatedStock = state.stock.filter(
        (res) => res.id !== action.payload
      );
      return { ...state, Stock: updatedStock };

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
    case "PUT_RES_SALIDA":
      return {
        ...state,
        Salidas: state.Salidas.map((salida) => {
          if (salida._id === action.payload.salidaId) {
            // Encuentra la salida específica
            const updatedAnimales = salida.animales.filter(
              (animalId) => animalId !== action.payload.resId
            );
            return {
              ...salida,
              animales: updatedAnimales,
            };
          }
          return salida;
        }),
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

    //////   LOGIN   ///////////
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: {
          isAuthenticated: true,
          isAdmin: action.payload.isAdmin,
          // Otros datos del usuario si es necesario
        },
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: {
          isAuthenticated: false,
          isAdmin: false,
        },
      };

    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;

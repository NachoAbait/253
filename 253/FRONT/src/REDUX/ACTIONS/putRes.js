import axios from "axios";

export const UPDATE_RES_SUCCESS = "UPDATE_RES_SUCCESS";
export const UPDATE_RES_FAILURE = "UPDATE_RES_FAILURE";

export function putRes(resId) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/res/${resId}`);
      const updatedRes = response.data;

      dispatch({
        type: UPDATE_RES_SUCCESS,
        payload: updatedRes,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_RES_FAILURE,
        error: error.message,
      });
    }
  };
}

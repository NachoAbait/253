import axios from "axios";

export function verifyToken(token) {
  return async function (dispatch) {
    const task = await axios.get(`/verify`);

    return dispatch({
      type: "VERIFY_TOKEN",
      payload: task.data,
    });
  };
}

export default verifyToken;

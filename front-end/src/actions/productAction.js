import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS
} from "../constants/productConstants"


const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    // TODO: update this url
    const { data } = await axios.get("http://127.0.0.1:8000/api/products/");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response &&
        error.response.data.detail ?
        error.response.data.detail :
        error.message
    })
  }
};


export default listProducts 
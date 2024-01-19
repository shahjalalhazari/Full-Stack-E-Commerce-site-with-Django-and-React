import axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS
} from "../constants/productConstants"


const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    // TODO: update this url
    const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response &&
        error.response.data.message ?
        error.response.data.message :
        error.message
    })
  }
};



export default listProductDetails;
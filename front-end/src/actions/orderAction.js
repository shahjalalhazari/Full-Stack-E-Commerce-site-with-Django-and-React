import axios  from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstants";



// User Details Action
export const orderCreate = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        // get current user
        const { userLogin: {userInfo}, } = getState();

        const config = {
            headers: {
                "content-type": "application/json",
                // send current user's token in headers
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/order/add-order/`,
            order,
            config
        );

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
};
import axios  from 'axios';
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS
} from "../constants/orderConstants";
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';



// Order Create Action
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

        // after order completed the order clear the cart.
        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        });

        localStorage.removeItem("cartItems");

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
};


// Order Details Action
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
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

        const { data } = await axios.get(
            `http://127.0.0.1:8000/api/order/${id}/`,
            config
        );

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
};
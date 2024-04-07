import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from "../constants/userConstants";
import axios from 'axios';


// Login Action
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                "content-type": "application/json"
            }
        };

        // post user login details to server by Axios
        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/users/login/`,
            { "username": email, "password": password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        // set user login info to local storage with token
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
};


// Logout Action
export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");

    dispatch({
        type: USER_LOGOUT
    })
}


// Register Action
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                "content-type": "application/json"
            }
        };

        // post user register details to server by Axios
        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/users/register/`,
            {"name":name, "username": email, "password": password },
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        // set user login info to local storage with token
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
};
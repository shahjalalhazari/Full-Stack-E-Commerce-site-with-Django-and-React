import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
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
    dispatch({type: USER_DETAILS_RESET})
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
            {"name":name, "email": email, "password": password },
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

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


// User Details Action
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
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
            `http://127.0.0.1:8000/api/users/${id}/`,
            config
        );

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
};


// User Details Action
export const userProfileUpdate = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_PROFILE_UPDATE_REQUEST
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

        const { data } = await axios.put(
            `http://127.0.0.1:8000/api/users/profile/update/`,
            user,
            config
        );

        dispatch({
            type: USER_PROFILE_UPDATE_SUCCESS,
            payload: data
        });

        // automatic login user with new details
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        // update user new details of local storage
        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
};
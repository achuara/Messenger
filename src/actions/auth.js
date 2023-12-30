import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';


export const signin=  (formData, history) => async(dispatch) => {
    try {
        const {data} = await api.signIn(formData);
        dispatch({type: AUTH, data});

        history('/messenger');
    } catch (error) {
        console.log(error);
    }

};

export const signup= (formData, history) => async(dispatch) => {
    try {
        const {data} = await api.signUp(formData);
        dispatch({type: AUTH, data});

        history('/messenger');
    } catch (error) {
        console.log(error);
    }

};

export const googleauth= (formData, history) => async(dispatch) => {
    try {
        const {data} = await api.googleAuth(formData);
        dispatch({type: AUTH, data});

        history('/messenger');
    } catch (error) {
        console.log(error);
    }

};

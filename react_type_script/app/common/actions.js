/*
 * Copyright (c) 2020. Prototype
 */

import {fetchAppSettings, fetchAppVersion, fetchCurrentUser,} from './service';
import {ALL, CLEAR, STATES} from '../constants/constants';
import {push as routerPush, replace as routerReplace} from 'connected-react-router';

export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const PUSH_ERROR = 'PUSH_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_SYSTEM_SETTINGS = 'GET_SYSTEM_SETTINGS';
export const GET_VERSION = 'GET_VERSION';

const initialState = {
    loading: false,
    error: null,
    authorized: false,
    user: {},
    currentUkd: {},
    settings: {},
    version: '',
};

export function redirect(routePath) {
    return dispatch => {
        dispatch(routerPush(routePath));
    };
}

export function replaceUrl(routePath) {
    return dispatch => {
        dispatch(routerReplace(routePath));
    };
}

export function getUserInfo() {
    return dispatch => {
        fetchCurrentUser()(dispatch)
            .then(user => {
                dispatch({type: GET_USER_INFO, user: user});
            })
            .catch(error => errorHandler(error)(dispatch));
    };
}

export function getAppSettings() {
    return dispatch => {
        fetchAppSettings()(dispatch)
            .then(data => {
                dispatch({
                    type: GET_SYSTEM_SETTINGS,
                    settings: data,
                });
            })
            .catch(error => errorHandler(error)(dispatch));
    };
}

export function getVersion() {
    return dispatch => {
        fetchAppVersion()(dispatch)
            .then(data => {
                dispatch({type: GET_VERSION, data: data});
            })
            .catch(error => errorHandler(error)(dispatch));
    };
}

export function logoutAction() {
    window.location = '/logout';
}

export function clearErrors() {
    return dispatch => dispatch({type: CLEAR_ERROR});
}

export function errorHandler(error) {
    return dispatch => {
        dispatch({
            type: PUSH_ERROR,
            error: error.responseJSON || {
                code: -1,
                text: 'Системная ошибка. Обратитесь к разработчикам.',
            },
        });
    };
}

export const clearAllStates = () => dispatch => dispatch({type: CLEAR + ALL + STATES});

export function globalReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO:
            return {...state, user: action.user};
        case GET_SYSTEM_SETTINGS:
            return {...state, settings: action.settings};
        case SHOW_LOADER:
            return {...state, loading: true};
        case HIDE_LOADER:
            return {...state, loading: false};
        case GET_VERSION:
            return {...state, version: action.data};
        case PUSH_ERROR:
            return {...state, error: action.error};
        case CLEAR_ERROR:
        case CLEAR + ALL + STATES:
            return {...state, error: null};
        default:
            return state;
    }
}

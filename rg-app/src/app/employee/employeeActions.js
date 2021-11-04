import { FETCH_EMPLOYEES_REQUEST, FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_FAILURE, UPDATE_EMPLOYEE_INFO, GET_EMPLOYEES } from "./employeeTypes"
import axios from 'axios';

const apiUrl = 'https://hiring.rewardgateway.net/list';
const headers = {
    auth: {
        username: 'medium',
        password: 'medium',
    }
}

export const fetchEmployessRequest = () => {
    return {
        type: FETCH_EMPLOYEES_REQUEST
    }
}

export const updateEmployeeInfo = (id) => {
    return {
        type: UPDATE_EMPLOYEE_INFO,
        payload: id,
    }
}

export const fetchEmployessSuccess = employees => {
    return {
        type: FETCH_EMPLOYEES_SUCCESS,
        payload: employees,
    }
}

export const fetchEmployessFailure = error => {
    return {
        type: FETCH_EMPLOYEES_FAILURE,
        payload: error,
    }
}

export const getEmployees = () => {
    return {
        type: GET_EMPLOYEES,
    }
}

export const fetchEmployees = () => {
    return (dispatch) => {
        dispatch(fetchEmployessRequest);
        axios.get(apiUrl, headers)
            .then(res => {
                const employees = res.data;
                dispatch(fetchEmployessSuccess(employees));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchEmployessFailure(errorMessage));
            })
    }
}

export const getAllEmployees = () => {
    return (dispatch, getState) => {
        dispatch(getEmployees());
    }
}

export const updateEmployee = (employeeInfo) => {
    return (dispatch) => {
        dispatch(updateEmployeeInfo(employeeInfo));
    }
}
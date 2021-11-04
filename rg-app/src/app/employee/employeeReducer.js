import { FETCH_EMPLOYEES_REQUEST, FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_FAILURE, UPDATE_EMPLOYEE_INFO, GET_EMPLOYEES } from "./employeeTypes";

const initialState = {
    loading: false,
    employees: [],
    error: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMPLOYEES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_EMPLOYEES_SUCCESS:
            return {
                loading: false,
                employees: action.payload,
                error: '',
            }
        case FETCH_EMPLOYEES_FAILURE:
            return {
                loading: false,
                employees: [],
                error: action.payload,
            }
        case UPDATE_EMPLOYEE_INFO:
            const newState = { ...state };
            let newEmployees = newState.employees.slice();
            const employeeInfo = action.payload;
            let employeeToChangeIndex = null;

            newEmployees.forEach((employee, index) => {
                if (employee.uuid === employeeInfo.uuid) {
                    employeeToChangeIndex = index;
                }
            });

            newEmployees.splice(employeeToChangeIndex, 1, employeeInfo);
            newState.employees = newEmployees;

            return {
                loading: false,
                employees: newState.employees,
                error: '',
            }
        case GET_EMPLOYEES:
            return {
                ...state,
            }
        default: return state
    }
}

export default reducer;
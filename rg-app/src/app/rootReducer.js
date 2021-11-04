import { combineReducers } from 'redux';
import employeeReducer from './employee/employeeReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['employee'],
}

const rootReducer = combineReducers({
    employee: employeeReducer,
})

export default persistReducer(persistConfig, rootReducer);
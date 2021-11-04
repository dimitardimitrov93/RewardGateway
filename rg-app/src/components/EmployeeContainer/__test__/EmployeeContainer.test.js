import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeContainer from '../EmployeeContainer';
import { store, persistor } from '../../../app/store';
import { Provider } from 'react-redux';
import { render, screen, cleanup } from '@testing-library/react';
import { PersistGate } from 'redux-persist/integration/react'
import renderer from 'react-test-renderer';

it('renders EmployeeContainer without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((<Provider store={store}>
        <PersistGate persistor={persistor}>
            <EmployeeContainer />
        </PersistGate>
    </Provider>), div);


    ReactDOM.unmountComponentAtNode(div);
});

it('renders Container component correctly', () => {
    render((
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <EmployeeContainer />
            </PersistGate>
        </Provider>
    ));
    const containerElement = screen.getByTestId('container-1');
    expect(containerElement).toBeInTheDocument();
});

it('renders Pagination component correctly', () => {
    render((
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <EmployeeContainer />
            </PersistGate>
        </Provider>
    ));
    const paginationElement = screen.getByTestId('pagination-1');
    expect(paginationElement).toBeInTheDocument();
});

test('matches snapshot', () => {
    const tree = renderer.create((
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <EmployeeContainer />
            </PersistGate>
        </Provider>
    )).toJSON();
    expect(tree).toMatchSnapshot();
})

afterEach(() => {
    cleanup();
});
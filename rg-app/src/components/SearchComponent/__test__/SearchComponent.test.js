import React from 'react';
import ReactDOM from 'react-dom';
import SearchComponent from '../SearchComponent';
import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

it('renders SearchComponent without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders Box component correctly', () => {
    render(<SearchComponent />);
    const boxElement = screen.getByTestId('box-1');
    expect(boxElement).toBeInTheDocument();
});

it('renders TextField component correctly', () => {
    render(<SearchComponent />);
    const textFieldElement = screen.getByTestId('textField-1');
    expect(textFieldElement).toBeInTheDocument();
});

it('renders Button component correctly', () => {
    render(<SearchComponent />);
    const buttonElement = screen.getByTestId('button-1');
    expect(buttonElement).toBeInTheDocument();
});

test('matches snapshot', () => {
    const tree = renderer.create(<SearchComponent />).toJSON();
    expect(tree).toMatchSnapshot();
})

afterEach(() => {
    cleanup();
});
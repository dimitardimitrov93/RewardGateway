import React from 'react';
import ReactDOM from 'react-dom';
import ColorRadioButtons from '../ColorRadioButtons';
import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

it('renders ColorRadioButtons without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ColorRadioButtons />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders YellowRadioElement component correctly', () => {
    render(<ColorRadioButtons />);
    const YellowRadioElement = screen.getByTestId('radio-yellow');
    expect(YellowRadioElement).toBeInTheDocument();
});

it('renders VioletRadioElement component correctly', () => {
    render(<ColorRadioButtons />);
    const VioletRadioElement = screen.getByTestId('radio-violet');
    expect(VioletRadioElement).toBeInTheDocument();
});

it('renders GreyRadioElement component correctly', () => {
    render(<ColorRadioButtons />);
    const GreyRadioElement = screen.getByTestId('radio-grey');
    expect(GreyRadioElement).toBeInTheDocument();
});

it('renders OrangeRadioElement component correctly', () => {
    render(<ColorRadioButtons />);
    const OrangeRadioElement = screen.getByTestId('radio-orange');
    expect(OrangeRadioElement).toBeInTheDocument();
});

it('renders PinkRadioElement component correctly', () => {
    render(<ColorRadioButtons />);
    const PinkRadioElement = screen.getByTestId('radio-pink');
    expect(PinkRadioElement).toBeInTheDocument();
});

test('matches snapshot', () => {
    const tree = renderer.create(<ColorRadioButtons />).toJSON();
    expect(tree).toMatchSnapshot();
})

afterEach(() => {
    cleanup();
});
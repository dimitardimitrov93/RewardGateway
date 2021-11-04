import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeCard from '../EmployeeCard';
import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

const employee = {
    "uuid": "55a3b557-971f-3e84-9870-5e1bdc5a12d3",
    "company": "Ferry-Dach",
    "bio": "Id qui repellendus eveniet eos odit ea autem. Ipsum veniam dicta omnis. Quae laudantium aperiam voluptas impedit veniam totam repudiandae pariatur. Et non eum aut.",
    "name": "Francesco Green",
    "title": "Production Control Manager",
    "avatar": "https://lorempixel.com/64/64/people/?75721"
}

it('renders EmployeeCard without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EmployeeCard employee={employee} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders Typography component with employee company info correctly', () => {
    render(<EmployeeCard employee={employee} />);
    const TypographyElement = screen.getByTestId('typography-1');
    expect(TypographyElement).toBeInTheDocument();
});

it('renders Typography component with employee company info correctly', () => {
    render(<EmployeeCard employee={employee} />);
    const TypographyElement = screen.getByTestId('typography-1');
    expect(TypographyElement).toBeInTheDocument();
});

it('renders Typography component with employee bio correctly', () => {
    render(<EmployeeCard employee={employee} />);
    const TypographyElement = screen.getByTestId('typography-2');
    expect(TypographyElement).toBeInTheDocument();
    expect(TypographyElement).toHaveTextContent(employee.bio);
});

it('renders CardHeader component with employee name and title correctly', () => {
    render(<EmployeeCard employee={employee} />);
    const cardHeaderElement = screen.getByTestId('cardHeader-1');
    expect(cardHeaderElement).toBeInTheDocument();
    expect(cardHeaderElement).toHaveTextContent(employee.name);
    expect(cardHeaderElement).toHaveTextContent(employee.title);
});

test('matches snapshot', () => {
    const tree = renderer.create(<EmployeeCard employee={employee} />).toJSON();
    expect(tree).toMatchSnapshot();
});

afterEach(() => {
    cleanup();
});
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from './TaskList'


test('Test if TaskList renders', () => {
    render(<TaskList />);
    expect(screen.getByText('Task Manager')).toBeInTheDocument();
});
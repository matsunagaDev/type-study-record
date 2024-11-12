import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from '../App';

describe('title', () => {
  it('should render title', () => {
    render(<App />);
    expect(screen.getByText('学習記録')).toBeInTheDocument();
  });
});

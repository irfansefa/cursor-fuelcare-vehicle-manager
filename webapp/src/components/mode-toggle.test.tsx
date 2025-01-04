import { render, screen } from '@testing-library/react';
import { ModeToggle } from './mode-toggle';
import { ThemeProvider } from 'next-themes';

describe('ModeToggle', () => {
  it('renders the theme toggle button', () => {
    render(
      <ThemeProvider>
        <ModeToggle />
      </ThemeProvider>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
}); 
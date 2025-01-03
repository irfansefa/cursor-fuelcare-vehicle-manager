import { render, screen } from '@/core/utils/test-utils';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-600');
  });

  it('renders with different variants', () => {
    render(
      <>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </>
    );

    const secondaryButton = screen.getByRole('button', { name: /secondary/i });
    const outlineButton = screen.getByRole('button', { name: /outline/i });
    const ghostButton = screen.getByRole('button', { name: /ghost/i });
    const linkButton = screen.getByRole('button', { name: /link/i });

    expect(secondaryButton).toHaveClass('bg-secondary-200');
    expect(outlineButton).toHaveClass('border-input');
    expect(ghostButton).toHaveClass('hover:bg-accent');
    expect(linkButton).toHaveClass('text-primary');
  });

  it('renders with different sizes', () => {
    render(
      <>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">Icon</Button>
      </>
    );

    const smallButton = screen.getByRole('button', { name: /small/i });
    const defaultButton = screen.getByRole('button', { name: /default/i });
    const largeButton = screen.getByRole('button', { name: /large/i });
    const iconButton = screen.getByRole('button', { name: /icon/i });

    expect(smallButton).toHaveClass('h-9');
    expect(defaultButton).toHaveClass('h-10');
    expect(largeButton).toHaveClass('h-11');
    expect(iconButton).toHaveClass('h-10 w-10');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    button.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });
}); 
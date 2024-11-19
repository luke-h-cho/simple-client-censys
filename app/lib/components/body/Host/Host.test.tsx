import { render, screen } from '@testing-library/react';
import Host from './Host'; 
import { mockHost } from '~/lib/mock/mocks';

// Mock the Port component
jest.mock('../Port/Port', () => ({
  __esModule: true,
  default: jest.fn(({ service }: { service: any }) => <div data-testid="mock-port">{service.name}</div>),
}));

describe('Host Component', () => {
  test('renders the host IP', () => {
    render(<Host host={mockHost} />);
    expect(screen.getByText(mockHost.ip)).toBeInTheDocument();
  });

  test('renders a Port component for each service', () => {
    render(<Host host={mockHost} />);
    
    // Verify the correct number of Port components
    const portComponents = screen.getAllByTestId('mock-port');
    expect(portComponents).toHaveLength(mockHost.services.length);

    // Verify the content of each Port component
    mockHost.services.forEach((service, index) => {
      expect(portComponents[index]).toHaveTextContent(service.name);
    });
  });
});

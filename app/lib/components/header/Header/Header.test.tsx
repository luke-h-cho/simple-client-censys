import { render, screen } from "@testing-library/react";
import Header from "./Header";

// Mock the SearchBar component
jest.mock("../SearchBar/SearchBar", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-search-bar" />),
}));

describe("Header Component", () => {
  test("renders the header title", () => {
    render(<Header />);
    
    // Check for the header text
    const headerTitle = screen.getByText("Welcome to the uglified Censys Search");
    expect(headerTitle).toBeInTheDocument();
  });

  test("renders the SearchBar component", () => {
    render(<Header />);
    
    // Check for the mocked SearchBar
    const searchBar = screen.getByTestId("mock-search-bar");
    expect(searchBar).toBeInTheDocument();
  });
});

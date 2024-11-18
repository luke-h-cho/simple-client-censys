import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  test("renders the form with label, input, and button", () => {
    render(<SearchBar />);

    // Check for the label
    const label = screen.getByText("Query:");
    expect(label).toBeInTheDocument();

    // Check for the input field
    const input = screen.getByPlaceholderText("Enter the Censys Query");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "q");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("size", "40");

    // Check for the button
    const button = screen.getByRole("button", { name: /search/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  test("allows user to enter text in the input field", () => {
    render(<SearchBar />);

    // Find the input field
    const input = screen.getByPlaceholderText("Enter the Censys Query");

    // Simulate user typing
    fireEvent.change(input, { target: { value: "test query" } });
    expect(input).toHaveValue("test query");
  });

  test("allows form submission", () => {
    const handleSubmit = jest.fn((event) => event.preventDefault());
    render(
      <form onSubmit={handleSubmit}>
        <SearchBar />
      </form>
    );

    // Find the button and simulate a click
    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    // Check if the form submission handler was called
    expect(handleSubmit).toHaveBeenCalled();
  });
});

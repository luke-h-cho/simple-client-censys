import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";
import { mockCursors } from "~/lib/mock/mocks";

describe("Pagination Component", () => {
  const mockQuery = "test-query";

  test("renders buttons with correct states and values", () => {
    render(<Pagination cursors={mockCursors} query={mockQuery} />);

    // Check for hidden input
    const hiddenInput = screen.getByDisplayValue(mockQuery);
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).toHaveAttribute("name", "q");
    expect(hiddenInput).toHaveAttribute("type", "hidden");

    // Check for 'Prev' button
    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toHaveAttribute("value", mockCursors.prev);
    expect(prevButton).not.toBeDisabled();

    // Check for 'Next' button
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveAttribute("value", mockCursors.next);
    expect(nextButton).not.toBeDisabled();
  });

  test("disables 'Prev' and 'Next' buttons when cursors are missing", () => {
    render(<Pagination cursors={{ prev: "", next: "" }} query={mockQuery} />);

    // Check for 'Prev' button
    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();

    // Check for 'Next' button
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  test("submits the correct cursor value on button click", () => {
    render(<Pagination cursors={mockCursors} query={mockQuery} />);

    const prevButton = screen.getByRole("button", { name: /previous/i });
    const nextButton = screen.getByRole("button", { name: /next/i });

    // Simulate clicks
    fireEvent.click(prevButton);
    expect(prevButton).toHaveAttribute("value", mockCursors.prev);

    fireEvent.click(nextButton);
    expect(nextButton).toHaveAttribute("value", mockCursors.next);
  });
});

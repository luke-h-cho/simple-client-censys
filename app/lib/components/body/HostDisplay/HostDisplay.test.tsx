import { render, screen } from "@testing-library/react";
import HostDisplay from "./HostDisplay";
import { mockCensysSuccessRes as mockRes } from "~/lib/mock/mocks";

jest.mock("../Host/Host", () => ({
  __esModule: true,
  default: jest.fn(({ host }: { host: any }) => <div data-testid="mock-host">{host.ip}</div>),
}));

jest.mock("../Pagination/Pagination", () => ({
  __esModule: true,
  default: jest.fn(({ cursors }: { cursors: any }) => (
    <div data-testid="mock-pagination">{`Page Links: ${cursors.join(", ")}`}</div>
  )),
}));

describe("HostDisplay Component", () => {

  const mockQuery = "test-query";

  test("does not render anything when res is null", () => {
    const { container } = render(<HostDisplay res={null} query={mockQuery} />);
    expect(container.firstChild).toBeNull();
  });

  test("renders the host information and pagination correctly", () => {
    render(<HostDisplay res={mockRes} query={mockQuery} />);

    // Check header
    expect(screen.getByText("Hosts")).toBeInTheDocument();

    // Check results and duration
    expect(screen.getByText("Results: 2 Time: 2s")).toBeInTheDocument();

    // Check Host components
    const hostComponents = screen.getAllByTestId("mock-host");
    expect(hostComponents).toHaveLength(mockRes.result.hits.length);
    mockRes.result.hits.forEach((host, index) => {
      expect(hostComponents[index]).toHaveTextContent(host.ip);
    });

    // Check Pagination component
    const pagination = screen.getByTestId("mock-pagination");
    expect(pagination).toHaveTextContent("Page Links: link1, link2");
  });
});

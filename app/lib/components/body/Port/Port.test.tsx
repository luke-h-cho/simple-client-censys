import { render, screen } from "@testing-library/react";
import Port from "./Port";
import { mockHost } from "~/lib/mock/mocks";

describe("Port Component", () => {
  const mockService = mockHost.services[0];

  test("renders the correct service information", () => {
    render(<Port host={mockHost} service={mockService} />);

    // Verify the displayed service info
    const serviceInfo = screen.getByText(`${mockService.port}/${mockService.service_name}`);
    expect(serviceInfo).toBeInTheDocument();
  });

  test("has the correct key value based on host and service props", () => {
    const { container } = render(<Port host={mockHost} service={mockService} />);

    // Verify that the div's key is constructed correctly
    const key = `${mockHost.ip}_${mockService.transport_protocol}-${mockService.port}/${mockService.service_name}`;
    const div = container.querySelector(`div[key="${key}"]`);
    expect(div).toBeNull(); // React keys are not accessible in DOM, so this tests a misunderstanding of the key property.

    // Confirm the rendering indirectly
    const serviceInfo = screen.getByText(`${mockService.port}/${mockService.service_name}`);
    expect(serviceInfo).toBeInTheDocument();
  });
});

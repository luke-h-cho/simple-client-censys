import { fetchCensys, CensysRequest } from './getCensys';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe("fetchCensys", () => {
  const mockQuery = "test-query";
  const mockCursor = "test-cursor";

  beforeEach(() => {
    fetchMock.resetMocks();
    process.env.CENSYS_SEARCH_API_BASE_URL = "https://search.censys.io";
    process.env.CENSYS_SEARCH_HOST_URL_V2 = "/api/v2/hosts/search";
    process.env.CENSYS_API_ID = "username"
    process.env.CENSYS_API_KEY = "password"
  });

  it("should call the correct URL with query and cursor", async () => {
    const mockResponse = { data: "test-data" };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const request: CensysRequest = { query: mockQuery, cursor: mockCursor };
    const result = await fetchCensys(request);

    const expectedUrl = `https://search.censys.io/api/v2/hosts/search?q=${mockQuery}&cursor=${mockCursor}`;

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
      headers: expect.any(Headers),
    });
    expect(result).toEqual(mockResponse);
  });

  it("should call the correct URL with query only (no cursor)", async () => {
    const mockResponse = { data: "test-data" };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const request: CensysRequest = { query: mockQuery, cursor: null };
    const result = await fetchCensys(request);

    const expectedUrl = `https://search.censys.io/api/v2/hosts/search?q=${mockQuery}`;
    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
      headers: expect.any(Headers),
    });
    expect(result).toEqual(mockResponse);
  });

  it("should handle a failed response (non-2xx status code)", async () => {
    const mockStatus = 400;
    const mockResponse = { data: "some error"}
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), {status: mockStatus});

    const request: CensysRequest = { query: mockQuery, cursor: null };

    console.error = jest.fn(); // Mock console.error to prevent polluting test output

    const result = await fetchCensys(request);

    const expectedUrl = `https://search.censys.io/api/v2/hosts/search?q=${mockQuery}`;
    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
      headers: expect.any(Headers),
    });
    expect(result).toEqual(mockResponse);
    expect(console.error).toHaveBeenCalledWith("failed res with status code ", mockStatus);
  });

  it("should handle a fetch error gracefully", async () => {
    const mockError = new Error("Network error");
    fetchMock.mockRejectOnce(mockError);

    const request: CensysRequest = { query: mockQuery, cursor: null };

    console.error = jest.fn(); // Mock console.error to prevent polluting test output

    await expect(fetchCensys(request)).rejects.toThrow(mockError);
    expect(console.error).toHaveBeenCalledWith("error in fetching for some reason: ", mockError);
  });
});

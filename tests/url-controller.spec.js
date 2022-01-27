const { addUrlController } = require("../controllers/url-controllers");

jest.mock("../models/url", () => ({
  addUrl: jest.fn(() => "response"),
}));

describe("addUrlController", () => {
  it("should call res.send function with correct parameters", async () => {
    const req = { body: { url: "oley" } };
    const mockSend = jest.fn();
    const res = { send: mockSend };

    await addUrlController(req, res);

    expect(mockSend.mock.calls[0][0]).toBe("response");
  });
});

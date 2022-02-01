const { generateQR } = require("../../utils/qr");

jest.mock("qrcode", () => ({
  toDataURL: jest.fn((url) => url),
}));

describe("generateQR", () => {
  it("should generate QR ", async () => {
    const url = "selam";
    const result = await generateQR(url);
    expect(result).toBe(url);
  });
});

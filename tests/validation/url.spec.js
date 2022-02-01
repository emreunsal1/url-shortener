const { validateData } = require("../../validation/url");

jest.mock("joi", () => ({
  object: () => ({
    validateAsync: () => "a",
  }),
  string: jest.fn().mockReturnThis(),
  uri: jest.fn().mockReturnThis(),
  trim: jest.fn().mockReturnThis(),
  required: jest.fn().mockReturnThis(),
  alphanum: jest.fn().mockReturnThis(),
}));

describe("generateQR", () => {
  it("should generate QR ", async () => {
    const data = "selam";
    const result = await validateData(data);

    expect(result).toBe("a");
  });
});

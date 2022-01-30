const {
  addUrlController,
  redirectUrlController,
} = require("../controllers/url-controllers");

const errorResponse = {
  error: true,
};

const NANOID_RESPONSE = "NANOID_RESPONSE";
const GETURLBYSLUG_RESPONSE = { url: "a" };

jest.mock("../models/url", () => ({
  addUrl: jest.fn((url, slug) => {
    if (url == "error") {
      return errorResponse;
    }
    return {
      url,
      slug,
    };
  }),

  getUrlBySlug: jest.fn(() => {
    return GETURLBYSLUG_RESPONSE;
  }),
}));

jest.mock("nanoid", () => ({
  nanoid: jest.fn(() => NANOID_RESPONSE),
}));

const requestFactory = (override = {}) => {
  return {
    body: { url: "oley" },
    ...override,
  };
};

describe("addUrlController", () => {
  const mockSend = jest.fn();
  const mockSendStatus = jest.fn();
  let req;
  let res;

  beforeEach(() => {
    req = requestFactory();
    res = { send: mockSend, sendStatus: mockSendStatus };
  });
  it("should call res.sendStatus with ", async () => {
    await addUrlController(req, res);

    expect(mockSend.mock.calls[0][0]).toStrictEqual({
      url: req.body.url,
      slug: NANOID_RESPONSE,
    });
  });
  it("should call res.sendStatus with 400 when addUrl function returns error", async () => {
    req = requestFactory({ body: { url: "error" } });

    await addUrlController(req, res);

    expect(mockSendStatus.mock.calls[0][0]).toBe(400);
  });
});

describe("redirectUrlController", () => {
  const mockSend = jest.fn();
  const mockSendStatus = jest.fn();
  const mockRedirect = jest.fn();
  let req;
  let res;

  beforeEach(() => {
    req = requestFactory();
    res = {
      redirect: mockRedirect,
      send: mockSend,
      sendStatus: mockSendStatus,
    };
  });

  it("should call res.redirect with data.url", async () => {
    req = { params: { slug: "abc" } };

    await redirectUrlController(req, res);

    expect(mockRedirect.mock.calls[0][0]).toBe(GETURLBYSLUG_RESPONSE.url);
  });

  it("should call res.sendStatus with 404 when req.params.slug favicon.ico", async () => {
    req = { params: { slug: "favicon.ico" } };

    await redirectUrlController(req, res);

    expect(mockSendStatus.mock.calls[0][0]).toBe(404);
  });
});

const QRCode = require("qrcode");

const generateQR = async (url) => {
  let qr = "";
  try {
    qr = await QRCode.toDataURL(url);
    // eslint-disable-next-line no-empty
  } catch (err) {}

  return qr;
};

module.exports = { generateQR };

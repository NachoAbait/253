const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config.js");

function createAccessToken(payload) {
  return new Promise((resolve, rejected) => {
    jwt.sign(
      payload, //(id del usuario)
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) rejected(err); // si sale mal
        resolve(token); // si sale bien
      }
    );
  });
}

module.exports = {
  createAccessToken,
};

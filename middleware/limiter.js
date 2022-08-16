const rateLimit = require("express-rate-limit").default;

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: "Trop de tentatives de connexion. Veillez réessayer dans 5 minutes",
});

module.exports = { limiter };
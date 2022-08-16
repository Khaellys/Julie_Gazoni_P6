const passwordSchema = require("../models/password");

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(
            400,
            "Le mot de passe doit comprendre minimum 8 caractères minuscules ET majuscules, et au moins deux chiffres, sans espaces",
            {
                "content-type": "application/json",
            }
        );
        res.end("Le format du mot de passe est incorrect.");
    } else {
        next();
    }
};
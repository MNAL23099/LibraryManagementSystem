const session = require("express-session");

const sessionMiddleware = (session({
    secret: "librarymanagementsystemSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60, //Session will live for 1 hour
        httpOnly: true
    }
}));

module.exports = sessionMiddleware;
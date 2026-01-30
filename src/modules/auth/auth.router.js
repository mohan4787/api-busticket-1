const authRouter = require("express").Router()
authRouter.post("/register", (req,res, next) => {
    res.json({
        data: null,
        message: "Register data",
        status: "Sucess",
        options: null
    })
})
authRouter.get("/activate/:token", (req, res, next) => {
    let params = req.params;
    const headers = req.headers;
    const query = req.query;
    res.json({
        data: {
            params,
            headers,
            query
        },
         message: "Activation token",
        status: "Sucess",
        options: null
    })
})
authRouter.post("/login", (req,res, next) => {
    res.json({
        data: null,
        message: "login ",
        status: "Sucess",
        options: null
    })
})
authRouter.post("/forget-password", (req,res, next) => {
    res.json({
        data: null,
        message: "forget password",
        status: "Sucess",
        options: null
    })
})
authRouter.get("/forget-password-verify/:token", (req,res, next) => {
    res.json({
        data: req.params.token,
        message: "verify token",
        status: "Sucess",
        options: null
    })
})
authRouter.put("/reset-password", (req,res, next) => {
    res.json({
        data: null,
        message: "Reset password",
        status: "Sucess",
        options: null
    })
})
authRouter.get("/me", (req,res, next) => {
    res.json({
        data: null,
        message: "me route ",
        status: "Sucess",
        options: null
    })
})
authRouter.get("/logout", (req,res, next) => {
    res.json({
        data: null,
        message: "logot router ",
        status: "Sucess",
        options: null
    })
})
authRouter.put("/user/:id", (req,res, next) => {
    res.json({
        data: req.params.id,
        message: "user update",
        status: "Sucess",
        options: null
    })
})
module.exports = authRouter
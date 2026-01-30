const express = require("express")
const route  = require("./router.config")
const app =express()

app.use('/api/v1/',route)

app.use((req, res, next) => {
    res.status(404).json({
        error: null,
        message: "Router not found",
        status: "NOT_FOUND",
        options: null
    })
})

module.exports = app
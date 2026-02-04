const Joi = require("joi");

const RegisterDTO = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().equal(Joi.ref("password")).required().messages({"any.only":"Password and ConfirmPassword must be same"}),
    phone: Joi.string().max(21).allow(null,"").optional().default(null),
    address: Joi.object({
        billingAddress: Joi.string().max(100).allow(null,"").default(null),
        shippingAddress: Joi.string().max(100).allow(null,"").default(null)
    }).allow(null,"").default(null),
    role: Joi.string().allow('passenger','busoperator','admin').default("customer"),
    gender: Joi.string().allow('male','female','other').optional().default(null),
    image: Joi.string().allow(null,"").optional().default(null)
})

module.exports = {
    RegisterDTO
}
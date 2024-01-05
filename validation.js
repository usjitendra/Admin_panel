
const { body, validationResult } = require('express-validator');
const emailvalidation=[
    body('email').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
,
]


module.exports={emailvalidation};
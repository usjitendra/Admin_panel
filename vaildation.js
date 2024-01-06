
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken");
const jwtsecret_key="jitendra";




// User validation middleware
const StudentMasterAdd = [
    body('firstName').notEmpty().withMessage('Firstname is required')
    .isLength({ max: 100 }).withMessage('Firstname cannot exceed 100 characters')
,
    body('lastName').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 100 }).withMessage('Last name must be at most 100 characters')
,
    body('regNo').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage('Registration number is required')
    .isAlphanumeric().withMessage('Registration number must be alphanumeric')
    .isLength({ min: 6, max: 10 }).withMessage('Registration number must be between 6 and 10 characters')
,
    body('currentClass').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage('Current class is required')
    .isInt({ min: 1, max: 12 }).withMessage('Current class must be between 1 and 12')
,

    body('Idtype').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage('Identification type is required')
    .isIn(['Aadhar', 'Pencard', 'Driving Lience',""]).withMessage('Invalid identification type')
,
    body('IdNo').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage('ID number is required')
    .matches(/^\d+$/).withMessage('ID number must consist of digits only')
    .isLength({ min: 6, max: 20 }).withMessage('ID number must be between 6 and 20 digits')
,
    body('gender').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Intersex']).withMessage('Invalid gender')
,
    body('dob').notEmpty().withMessage('Date of birth is required')
    .isDate().withMessage('Invalid date format')
,
    body('religion').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage('Religion is required')
    .isIn(['Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Judaism', 'Other']).withMessage('Invalid religion')
,
    body('caste') .trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage('Caste is required')
    .isIn(['General', 'OBC', 'SC', 'ST', 'Other']).withMessage('Invalid caste')
,
    body('subcast').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage('Subcaste is required')
    .isLength({ max: 100 }).withMessage('Subcaste must be at most 100 characters')
,
    body('joiningDate').notEmpty().withMessage('Joining date is required')
    .isDate().withMessage('Invalid date format')
,

    body('mobileNo').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage('Mobile number is required')
    .isMobilePhone(['en-IN']).withMessage('Invalid mobile number')
,
    body('email').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
// ,
//     body('studentImage').custom((value, { req }) => {
//         if (!req.file) {
//             throw new Error('Student image is required');
//         }
//         return true;
//     })
,
    body('fatherName').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage("Father's name is required")
    .isLength({ max: 100 }).withMessage("Father's name must be at most 100 characters")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Father's name must contain only letters and spaces")
,
    body('fatherOccupation') .trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage("Father's occupation is required")
    .isLength({ max: 100 }).withMessage("Father's occupation must be at most 100 characters")
,
    body('motherOccupation') .trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage("Mother's occupation is required")
    .isLength({ max: 100 }).withMessage("Mother's occupation must be at most 100 characters")
,
    body('fatherMobileNo').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage("Father's mobile number is required")
    .isMobilePhone(['en-IN']).withMessage("Invalid father's mobile number")
,
    body('fatherEmailID').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage("Father's email address is required")
    .isEmail().withMessage("Invalid email format for father's email")
,
    body('parentAddress').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage("Parent's address is required")
    .isLength({ max: 200 }).withMessage("Parent's address must be at most 200 characters")
,
    body('parentPermanentAddress').trim() // Remove leading/trailing whitespace
    .notEmpty().withMessage("Parent's permanent address is required")
    .isLength({ max: 200 }).withMessage("Parent's permanent address must be at most 200 characters")
    ,

];




module.exports={
    StudentMasterAdd,
   
};
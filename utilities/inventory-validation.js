const utilities = require(".")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/*  **********************************
 *  Add Classification Data Validation Rules
 * ********************************* */
validate.addClassificationRules = () => {
    console.log("addClassificationRules")
    return [
        // classification name is required and must be string
        body("classification_name")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a classification name."), // on error this message is sent.

        // classification must not contain special characters
        body("classification_name")
            .trim()
            .custom((value) => {
            // use regex to check for special characters
            if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(value)) {
                throw new Error("Classification name cannot contain special characters.")
            }
            return true
            }),

        // classification must not contain spaces
        body("classification_name")
            .trim()
            .custom((value) => {
            // check for spaces
            if (value.includes(" ")) {
                throw new Error("Classification name cannot contain spaces.")
            }
            return true
            }),

        // classification must not already exist in the DB
        body("classification_name")
            .trim()
            .custom(async (classification_name) => {
            const classificationExists = await invModel.checkExistingClassification(classification_name)
            if (classificationExists) {
                throw new Error("Classification already exists.")
            }
            }),
    ]
}


/* ******************************
 * Check data and return errors or continue to add classification
 * ***************************** */
validate.checkAddClassificationData = async (req, res, next) => {
    console.log("checkAddClassificationData")
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        console.log(errors)
        res.render("inventory/add-classification", {
            errors,
            title: "Add Classification",
            nav,
            classification_name,
        })
        return
    }
    next()
}


module.exports = validate
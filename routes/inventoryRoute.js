// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require('../utilities/inventory-validation')


// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build a specific vehicle detail view
router.get("/detail/:invId", utilities.handleErrors(invController.buildVehicleDetail));

// Route to inventory management view
router.get("/management", utilities.handleErrors(invController.buildInventoryManagement));

// Route to add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to add vehicle view
router.get("/add-vehicle", utilities.handleErrors(invController.buildAddVehicle));

// Route to process add classification
router.post(
    "/add-classification",
    invValidate.addClassificationRules(),
    invValidate.checkAddClassificationData,
    utilities.handleErrors(invController.processAddClassification)
)

module.exports = router;
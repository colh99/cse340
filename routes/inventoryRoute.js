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
router.get("", utilities.checkLogin, utilities.handleErrors(invController.buildInventoryManagement));

// Route to add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to add vehicle view
router.get("/add-vehicle", utilities.handleErrors(invController.buildAddVehicle));

// Route to edit vehicle view
router.get("/edit/:invId", utilities.handleErrors(invController.buildEditVehicle));

// Route to delete vehicle view
router.get("/delete/:invId", utilities.handleErrors(invController.buildDeleteVehicle));

// Route to get inventory by classification
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Route to process edit vehicle
router.post(
    "/update/",
    invValidate.addVehicleRules(),
    invValidate.checkUpdateVehicleData,
    utilities.handleErrors(invController.updateInventory)
)

// Route to process delete vehicle
router.post(
    "/delete/",
    utilities.handleErrors(invController.deleteInventory)
)

// Route to process add classification
router.post(
    "/add-classification",
    invValidate.addClassificationRules(),
    invValidate.checkAddClassificationData,
    utilities.handleErrors(invController.processAddClassification)
)

// Route to process add vehicle
router.post(
    "/add-vehicle",
    invValidate.addVehicleRules(),
    invValidate.checkAddVehicleData,
    utilities.handleErrors(invController.processAddVehicle)
)


module.exports = router;
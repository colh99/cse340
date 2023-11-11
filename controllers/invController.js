const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


/* ***************************
*  Build a specific vehicle detail view
* ************************** */
invCont.buildVehicleDetail = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getVehicleDetails(inv_id)
  const detail = await utilities.buildVehicleDetail(data)
  let nav = await utilities.getNav()
  res.render("./inventory/detail", {
    title: data.inv_make + " " + data.inv_model,
    nav,
    detail,
  })
}


/* ***************************
*  Build inventory management view
* ************************** */
invCont.buildInventoryManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
  })
}


/* ***************************
*  Build inventory add classification view
* ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  console.log("buildAddClassification")
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/* ***************************
*  Build inventory add vehicle view
* ************************** */
invCont.buildAddVehicle = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-vehicle", {
    title: "Add Vehicle",
    nav,
    errors: null,
  })
}


/* ***************************
*  Process add classification
* ************************** */
invCont.processAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body
  const result = await invModel.addClassification(classification_name) 
  
  if (result) {
    req.flash("notice", "Classification added successfully.")
    res.redirect("/inv/management")
  } else {
    req.flash("notice", "Sorry, there was an error adding the classification.")
    res.render("/inv/add-classification", {
      title: "Add Classification",
      nav,
    })
  }
}

module.exports = invCont
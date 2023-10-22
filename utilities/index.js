const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="' + vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors"></a>'
      grid += '<div class="namePrice">'
      grid += '<hr>'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
Build the vehicle detail view HTML
************************************ */
Util.buildVehicleDetail = async function(data){
  let detail = '<div id="detail-display">'
  detail += '<div id="detail-display-image">'
  detail += '<img src="' + data.inv_image + '" alt="' 
  + data.inv_make + ' ' + data.inv_model
  detail += '</div>'
  detail += '<div id="detail-display-info">'
  detail += '<h2>' + 'Year: ' + data.inv_year + '</h2>'
  detail += '<hr>'
  detail += '<h2>$' + new Intl.NumberFormat('en-US').format(data.inv_price) + '</h2>'
  detail += '<p>' + data.inv_description + '</p>'
  detail += '<ul>'
  detail += '<li><strong>Mileage:</strong> ' + new Intl.NumberFormat('en-US').format(data.inv_miles) + '</li>'
  detail += '<li><strong>Color:</strong> ' + data.inv_color + '</li>'
  detail += '</ul>'
  detail += '</div>'
  detail += '</div>'
  return detail
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util
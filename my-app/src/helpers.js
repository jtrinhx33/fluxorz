//import { FluxSDK } from 'https://unpkg.com/flux-sdk-browser@0.4/dist/flux-sdk-min.js';
//import { FluxHelpers } from 'https://unpkg.com/flux-sdk-helpers@0.1/dist/flux-sdk-helpers.min.js';
//import config from './config.js';

// TODO: Better to import this as its own config somehow
const config = {
  url: 'http://localhost:3000', // your url http://localhost:3000 http://localhost:8080
  flux_url: 'https://flux.io', // flux url
  flux_client_id: 'c92f2caf-9714-4a3a-b82d-34359d367294', // your app's client id
}

// instantiate the Flux SDK with your app's client id
var sdk = new window.FluxSdk(config.flux_client_id, { redirectUri: config.url, fluxUrl: config.flux_url })
var helpers = new window.FluxHelpers(sdk)

var user = null

var dataTables = {}

/**
 * Get a project's data table.
 */
function getDataTable(project) {
  if (!(project.id in dataTables)) {
    var dt = getUser().getDataTable(project.id)
    dataTables[project.id] = { table: dt, handlers: {}, websocketOpen: false }
  }
  return dataTables[project.id]
}

/**
 * Get a list of the project's cells (keys).
 */
function getCells(project) {
  return getDataTable(project).table.listCells()
}

/**
 * Get a specific project cell (key).
 */
function getCell(project, cell) {
  return getDataTable(project).table.getCell(cell.id)
}

/**
 * Get the value contained in a cell (key).
 */
function getValue(project, cell) {
  return getCell(project, cell).fetch()
}

/**
 * Get the Flux user.
 */
function getUser() {
  if (!user) {
    user = helpers.getUser()
  }
  return user
}

/**
 * Get the user's Flux projects.
 */
function getProjects() {
  return getUser().listProjects()
}

/**
 * Update the value in a project cell (key).
 */
function updateCellValue(project, cell, value) {
  var cell = getUser().getCell(project.id, cell.id)
  return cell.update({value: value})
}

/**
 * Create a project cell (key) in Flux.
 */
function createCell(project, name) {
  var dt = getDataTable(project).table
  return dt.createCell(name, {description: name, value: ''})
}

/**
 * Creates a websocket for a project that listens for data table events, and calls
 * the supplied handler function
 */
function createWebSocket(project, notificationHandler){
  var dataTable = getDataTable(project)
  var options = {
    onOpen: function() { console.log('Websocket opened.') },
    onError: function() { console.log('Websocket error.') }
  }
  // if this data table doesn't have websockets open
  if (!dataTable.websocketOpen) {
    dataTable.websocketOpen = true
    // open them
    dataTable.table.openWebSocket(options)
    // and attach the handler we created above
    if(notificationHandler)
      dataTable.table.addWebSocketHandler(notificationHandler)
  }
}

export default helpers;

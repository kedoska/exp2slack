const ErrorStackParser = require('error-stack-parser')
const { notify } = require('./index')

const getInitialState = () => {
  try {
    getCustomerById() 
  } catch (err) {
    notify(err)
  }
}

const initApplication = () => {
  getInitialState()
}

initApplication()
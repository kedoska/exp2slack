const { configure, notify } = require('../index')
const url = 'https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

// configure the hook url
configure(url)

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
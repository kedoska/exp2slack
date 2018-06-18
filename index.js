const { hostname, platform, release } = require('os')
const pkg = require('./package.json')
const ErrorStackParser = require('error-stack-parser')
const { IncomingWebhook } = require('@slack/client')
let webhook = undefined

const isError = (err) => (err instanceof Error)

const extract = (err) => {
  if (!isError(err)) {
    return []
  }
  const items = ErrorStackParser.parse(err)
  if (items.length <= 0){
    return []
  }
  return items
}

const buildErrorStack = (items = []) => {
  
  let text = ''
  const fields = items
    .filter(x => x.functionName)
    .forEach((x, i) => {
      let fileName = x.fileName.replace(__dirname, '')
      if (fileName.indexOf('node_modules') > -1) {
        const moduleName = fileName.split('/')[2]
        if (process.platform === "win32") {
          fileName = fileName.replace(`\\node_modules\\${moduleName}`, `-> ${moduleName}`)
        } else {
          fileName = fileName.replace(`/node_modules/${moduleName}`, `-> ${moduleName}`)
        }
      }
      let icon = ''
      if (i === 0) {
        return {}
      }
      const functionName = x.functionName.indexOf('anonymous') > -1 
        ? 'anonymous function'
        : x.functionName
      text += `${functionName} ${fileName} line *${x.lineNumber}*\n`
    })

  const errorStack = {
    "text": text,
    "ts": new Date().getTime() / 1000
  }
  return errorStack
}

const buildErrorSource = (x, message) => {
  const fileName = x.fileName.replace(__dirname, '')
  const errorStack = {
    "color": "#ff0000",
    "title": `${x.functionName} ${fileName} line ${x.lineNumber}`,
    "text": `:boom: ${message}`,
  }
  return errorStack
}

const notify = (err, next) => {
  const events = extract(err)
  const attachments = (events && events.length > 0) 
      ? [buildErrorSource(events[0], err.message), buildErrorStack(events)] 
      : []
  const message = {
    text: `${pkg.name} ${pkg.version} at ${hostname()} ${platform()} ${release()}`,
    attachments
  }
  webhook.send(message, (innerError) => {
    if (next) {
      next(err)
    }
  })
}

const exp2slack = (url) => {

  webhook = new IncomingWebhook(url)

  return function (err, req, res, next) {
      const webhookUrl = url || process.env.SLACK_WEBHOOK_URL
      if (!url) {
        return next(new Error('SLACK_WEBHOOK_URL is required to initialize IncomingWebhook'))
      }
      notify(err, next)
  }
}

module.exports = exp2slack
module.exports.configure = exp2slack
module.exports.notify = notify

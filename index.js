const { hostname, platform, release } = require('os')
const { basename } = require('path')
const pkg = require('./package.json')
const ErrorStackParser = require('error-stack-parser')
const { IncomingWebhook } = require('@slack/client')
const url = process.env.SLACK_WEBHOOK_URL
const webhook = new IncomingWebhook(url)

const isError = (err) => (err instanceof Error)

const extract = (err) => {
  if (!isError(err)) {
    return []
  }
  const items = ErrorStackParser.parse(err)
  if (items.length <= 0){
    return []
  }
  return items.filter(({fileName}) => fileName.indexOf('modules') === -1)
}

const buildErrorStack = (items = []) => {
  
  let text = ''
  const fields = items.forEach((x, i) => {
    let icon = ''
    if (i === 0) {
      return {}
    }
    const functionName = x.functionName.indexOf('anonymous') > -1 
      ? 'anonymous function'
      : x.functionName
    text += `${functionName} ${x.fileName} line *${x.lineNumber}*\n`
  })

  const errorStack = {
    "text": text,
    "ts": new Date().getTime() / 1000
  }
  return errorStack
}

const buildErrorSource = (x, message) => {
  const errorStack = {
    "color": "#ff0000",
    "title": `${x.functionName} ${x.fileName} line ${x.lineNumber}`,
    "text": `:boom: ${message}`,
  }
  return errorStack
}

const notify = (err) => {
  const events = extract(err)
  const attachments = (events && events.length > 0) 
      ? [buildErrorSource(events[0], err.message), buildErrorStack(events)] 
      : []
  const message = {
    text: `${pkg.name} ${pkg.version} at ${hostname()} ${platform()} ${release()}`,
    attachments
  }
  webhook.send(message, (err) => {
      if (err) {
          console.log(err.message);
      }
  })
}

module.exports.extract = extract
module.exports.notify = notify
exp2slack
=========

You can use this to report errors to Slack from your node application, **as an ExpressJs middleware** or **standalone library**.

<p align="center">
    <img src="https://user-images.githubusercontent.com/11739105/41510978-ac3989c4-7233-11e8-976b-2e3abe0199cb.png" alt="exp2slack" style="max-width:100%;">
</p>

## Get Your Slack Web Hook Url

1. set up a new application in slack
2. create a new Incoming Webhooks and get your `SLACK_WEBHOOK_URL`
3. `npm i @kedoska/exp2slack --save` or `yarn add @kedoska/exp2slack`

## Use it as express middleware

See the [example](https://github.com/kedoska/exp2slack/blob/master/examples/express-middleware.js) and make sure you are initializing this middleware AFTER all your `app` setup/routes. Also consider that when this *is a middleware* it will:

1. report the error to slack (wait for slack to reply)
2. call `next` passing the original error in the express pipeline. This will may slowdown your application (if it is firing a lot of errors).

```javascript
const express = require('express') // <-- Step 1
const exp2slack = require('@kedoska/exp2slack')
const app = express()

const url = 'https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

app.get('/', (req, res) => {
  const runTimeError = foo + bar  // <-- Step 3 ( foo not defined)
})

app.use((exp2slack(url))) // <-- Step 2

app.listen(8080)
```

More details about Express Error Handling available [here](https://expressjs.com/en/guide/error-handling.html)

## Now without express

Once you have initialized the `IncomingWebhook` with your `url` you can manually push an error to slack by calling the notify function. Here the example **without express**.

After passing the `url` to the `configure` method, you can `notify` any `Error`.

```javascript
const { configure, notify } = require('@kedoska/exp2slack') // <-- Step 1
const url = 'https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

configure(url) // <-- Step 2

const initApplication = () => {
  try {
    throw new Error('')
  } catch (err) {
    notify(err) // <-- Step 3
  }
}

initApplication()
```

### Dependencies

1. [error-stack-parser](https://github.com/stacktracejs/error-stack-parser)
2. [node-slack-sdk](https://github.com/slackapi/node-slack-sdk) (@slack/client)

### Extra code and fancy If/s

:warning: I'm adding some extra if to the original output of `error-stack-parser`. Mainly to cut some paths and try to get a nice format in slack.

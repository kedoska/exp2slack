Exp2Slack
=========

`try`, `catch` and `slack`

You can use this library to report errors to slack from your node application, as a ExpressJs middleware or standalone library.

<p align="center">
    <img src="https://user-images.githubusercontent.com/11739105/41510978-ac3989c4-7233-11e8-976b-2e3abe0199cb.png" alt="exp2slack" style="max-width:100%;">
</p>

### Before u start

1. set up a new application in slack
2. create a new Incoming Webhooks and get your `SLACK_WEBHOOK_URL`

### As express middleware

See the example and make sure you are initializing this middleware AFTER all your `app` setup/routes. Also consider that when this *is a middleware* it will:

1. report the error to slack (wait for slack to reply)
2. call `next` passing the original error in the express pipeline. This will may slowdown your application (if it is firing a lot of errors).

```javascript
app.use((exp2Slack(url)))
```

### Dependencies

1. [error-stack-parser](https://github.com/stacktracejs/error-stack-parser)
2. [node-slack-sdk](https://github.com/slackapi/node-slack-sdk) (@slack/client)

### Extra code and fancy If/s

:warning: I'm adding some extra if to the original output of `error-stack-parser`. Mainly to cut some paths and try to get a nice format in slack.

#Exp2Slack

`try`, `catch` and `slack`

<p align="center">
    <img src="https://user-images.githubusercontent.com/11739105/41500837-db479678-715e-11e8-8869-3daab649a86b.png" alt="exp2slack" style="max-width:100%;">
</p>

### Before u start

1. set up a new application in slack
2. create a new Incoming Webhooks and get your `SLACK_WEBHOOK_URL`

### Run

1. Set the env var `SLACK_WEBHOOK_URL` in `scripts.test`
2. run `npm test`

### Dependencies

1. [error-stack-parser](https://github.com/stacktracejs/error-stack-parser)
2. [node-slack-sdk](https://github.com/slackapi/node-slack-sdk) (@slack/client)

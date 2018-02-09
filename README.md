# SlackParty

An app designed to easily add up to 23 (Slack's max allowed) emojis to specific groups in your channel in order to create a long-lasting surprise for your Slack bros.

## How to use:

### Set Up Node
1) To install Node dependencies
```
  npm install
```

2) Duplicate **config.example.js** from root directory and rename it into **config.js**


## Get the legacy keys for each of your bros
--- or just for yourself if no one wants to party yet ---

1) https://api.slack.com/custom-integrations/legacy-tokens

2) Add legacy keys to **config.js** array

## Add Parrots to your channel ##

1) Go to https://${YOUR_SLACK_CHANEL_NAME}.slack.com/customize/emoji or rightClick on the left-top on the Slack App -> Customize Slack

2) Add some parrots!

### Run the Server ###

*) to test App out
```
  npm install
```
*) to run the dev mode
```
  npm run dev
```

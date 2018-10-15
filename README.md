# pixela-node

Pixela API Client for Node.js

[![npm version](https://badge.fury.io/js/pixela-node.svg)](https://badge.fury.io/js/pixela-node)

## Installation

via npm

```
$ npm install --save pixela-node
```

via yarn

```
$ yarn add pixela-node
```

## Usage

```js
import Client from 'pixela-node'
const client = new Client()

client.username = 'your_username'
client.token = 'your_token'

// Create User
client
  .createUser({
    token: 'your_token',
    username: 'your_username',
    agreeTermsOfService: 'yes',
    notMinor: 'yes'
  })
  .then(res => console.log(res.data))
  .catch(e => console.log(e.response.data))

// Create Graph
client
  .createGraph({
    id: 'kintore',
    name: 'kintore',
    unit: 'commit',
    type: 'int',
    color: 'shibafu'
  })
  .then(res => console.log(res.data))
  .catch(e => console.log(e.response.data))

// Get Graphs
client.getGraphs().then(res => console.log(res.data))

// Increment Pixel
client.incrementPixcel('kintore').then(res => {
  console.log(res.data)
})

console.log(client.getGraphUrl('kintore'))
```

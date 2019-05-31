var ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder();

const BncClient = require('@binance-chain/javascript-sdk');

const getClient = async (useAwaitSetPrivateKey = true, doNotSetPrivateKey = false) => {
    const client = new BncClient("https://testnet-dex.binance.org")
    await client.initChain()
    const privateKey = '19af207290bdeba210c77eedca2a72d0597bc06986c1b3251cb18db52ce6078f'
    if (!doNotSetPrivateKey) {
      if (useAwaitSetPrivateKey) {
        await client.setPrivateKey(privateKey)
      } else {
        client.setPrivateKey(privateKey) // test without `await`
      }
    }
    // use default delegates (signing, broadcast)
    client.useDefaultSigningDelegate()
    client.useDefaultBroadcastDelegate()
    return client
}

module.exports = api;

api.get('/', function () {
  'use strict';
  return 'Hello World';
});

api.get('/people/{name}', function (request) {
  'use strict';
  return request.pathParams.name + ' is cool!';
});

api.get('/json', function (request) {
  'use strict';
  return {
    name: 'John',
    surname: 'Doe',
    email: 'johndoe@example.com'
  };
});

api.post('/echo', function (request) {
  'use strict';
  return request.body;
});
# solabi-loader

This is a webpack loader that allows you to import the JSON `abi` of a smart contract, and use it with
`viem`. 
- Per `viem`'s documentation, you cannot directly import the JSON of an ABI today, because TypeScript does not import JSON using the `as const` structure -- which means some level of type information on the data is lost.
- This loader fixes that issue by code-generating an equivalent `.ts` file, which has the ABI with an `as const` declaration following it. From your main application, you can then import the ABI as normal and `viem` will work as expected. 

## Setup

1. **Install the loader**.

```
npm i solabi-loader
```

2. **Under your `webpack.config.js`, add the loader**. Preferably don't try to transform .json directly, since this may have other semantics for your TypeScript compiler or another webpack rule. Here, I've chosen to transform `.abi` files.

```js
module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.abi?$/,
        use: 'solabi-loader',
        exclude: /node_modules/,
      },
```

3. Update your contract compilation to output its `abi` JSON file into your App's `src/` directory.

4. From within your app, import the `.abi`.

```js
import abi from './Counter.abi'; // now possible!

import {createPublicClient, getContract, http} from 'viem';
import {mainnet} from 'viem/chains';

const publicClient = createPublicClient({
    chain: mainnet,
    transport: http()
})

const contract = getContract({
    address: '0x00',
    abi,
    client: publicClient
})
```
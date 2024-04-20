/**
 * TypeScript loader for Ethereum ABI files, for use with viem.
 * 
 * Usage:
 * 
 *  project:
 *      `npm i 'sol-loader'`
 * 
 *  webpack config:
 *       // register 'sol-loader' for .abi.json files.
 *      module.exports = {
 * //...
 * module: {
 *   rules: [
 *     {
 *       test: /\.sol$/,
 *       use: [
 *         {
 *           loader: 'sol-loader'
 *         },
 *     ],
 *   },
 *  ],
 * },
 * };
 *     const path = require('path');
 *  
 * code:
 *  `import MyContract from './contracts/mycontract.sol'
 * 
 *  console.log(MyContract('0xdeployaddress', publicClient) -> viem contract.
 * 
 */

import {transform} from './contract.template';
import path from 'path';

export default function (source: string) {
    const options = this.getOptions();
    const name = path.basename(this.resourcePath);

    try {
        // use `forge` to compile the contract.


        JSON.parse(source);
    } catch (err) {
        throw new Error(`invalid .abi.json file -- expected valid JSON (${err})`);
    }

    // Apply some transformations to the source...
    return transform({abi: source, name})
}
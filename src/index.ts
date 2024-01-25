/**
 * TypeScript loader for Ethereum ABI files, for use with viem.
 * 
 * Usage:
 * 
 *  project:
 *      `npm i 'solabi-loader'`
 * 
 *  webpack config:
 *       // register 'solabi-loader' for .abi.json files.
 *      module.exports = {
 * //...
 * module: {
 *   rules: [
 *     {
 *       test: /\.abi.json$/,
 *       use: [
 *         {
 *           loader: 'solabi-loader'
 *         },
 *     ],
 *   },
 *  ],
 * },
 * };
 *     const path = require('path');
 *  
 * code:
 *  `import MyContract from './abis/mycontract.abi.json'
 * 
 *  console.log(MyContract('0xdeployaddress', publicClient) -> viem contract.
 * 
 *  // typed abi object, with `as const` properly appended for viem :) 
 */

import {transform} from './contract.template';
import path from 'path';

export default function (source: string) {
    const options = this.getOptions();
    const name = path.basename(this.resourcePath);

    try {
        JSON.parse(source);
    } catch (err) {
        throw new Error(`invalid .abi.json file -- expected valid JSON (${err})`);
    }

    // Apply some transformations to the source...
    return transform({abi: source, name})
}
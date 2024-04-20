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
 *       test: /\.sol$/,
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
 *  `import MyContract from './contracts/mycontract.abi.json'
 * 
 *  console.log(MyContract('0xdeployaddress', publicClient) -> viem contract.
 * 
 */

import {transform} from './contract.template';
import path from 'path';
import { assertValidJSON } from './utils';

export default async function (contents: string, map: string, meta: string) {
    const options = this.getOptions();
    const callback = this.async();
    const name = path.basename(this.resourcePath);

    try {
        assertValidJSON(contents);
    } catch (error) {
        callback(error, '');
        return;
    }

    // Apply some transformations to the source...
    const transformedContents = transform({abi: contents, name});
    this.emitFile(`${name}.ts`, transformedContents);

    const result = await this.importModule(`${name}.ts`)

    callback(null, result.default || result);
}
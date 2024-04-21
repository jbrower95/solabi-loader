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

import { writeFileSync } from 'fs';
import {transform} from './contract.template';
import path from 'path';
import { assertValidJSON } from './utils';

export default async function (contents: string, map: string, meta: string) {
    const callback = this.async();
    const name = path.basename(this.resourcePath);

    try {
        assertValidJSON(contents);
    } catch (error) {
        callback(error, '');
        return;
    }

    let json = JSON.parse(contents);

    // some people might use the top-level 'abi' struct, or strip it out themselves.
    if (json['abi']) {
        json = json['abi'];
    }

    const transformedContents = transform({abi: json, name});
    const definitionFile = this.resourcePath.replace(/\.abi$/g, '.abi.ts');

    writeFileSync(definitionFile, transformedContents);
    callback(null, `const Contract = require('./${name}.ts');\nexport default Contract;`);
}
import { basename } from "path";
type TProps = {
    name: string,
    abi: any
}

let shaHash = (contents: string) => {
    const { createHash } = require('crypto');
    return createHash('sha256').update(contents).digest('hex');
}

export function transform(input: TProps): string {
    let contractName = basename(input.name).toUpperCase();
    
    // remove the suffix if it already ends with contract.
    if (contractName.endsWith('Contract')) {
        contractName = contractName.substring(0, contractName.length - 'Contract'.length);
    }

    let rawSource = `
/**
 * This file is generated to allow for typed abi imports in TypeScript, which
 * require an 'as const' suffix today. Unfortunately, directly importing .json via TypeScript does not
 * create a const type as-is.
 * 
 * @generated %hash%
 */
export const abi = ${JSON.stringify(input.abi, null, 2)} as const;

export default abi;
`;
    let hash = shaHash(rawSource);
    return rawSource.replace('%hash%', `sha256:${hash}`);
} 

type TProps = {
    name: string,
    abi: string
}

const ADDRESS_TYPE =  '\`0x$\{string\}\`'

export function transform(input: TProps): string {

    // contract name
    let contractName = input.name.substring(0, input.name.length - '.abi.json'.length).toUpperCase();
    
    // remove the suffix if it already ends with contract.
    if (contractName.endsWith('Contract')) {
        contractName = contractName.substring(0, contractName.length - 'Contract'.length);
    }

    return `

    import {getContract} from 'viem';

    /**
     * Strongly-Typed ABI for TypeScript.
     */
    export abi = ${JSON.stringify(input.abi, null, 2)} as const;

    /**
     * Quickly obtain a properly typed instance of the contract.
     */
    export default ${contractName}Contract = (address: ${ADDRESS_TYPE}, {}) => {
        return {
            read: (publicClient: PublicClient) => {
                return getContract({
                    abi,
                    address,
                    publicClient
                })
            },
            write: (walletClient: WalletClient) => {
                return getContract({
                    abi,
                    address,
                    walletClient
                })
            }
        };
    }
`;
} 
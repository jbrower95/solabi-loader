import abi from './Counter.abi';
import {createPublicClient, createWalletClient, getContract, http} from 'viem';
import {base, baseSepolia} from 'viem/chains';

const walletClient = createWalletClient({
    chain: base,
    transport: http()
})

const contract = getContract({
    address: '0x00',
    abi,
    client: walletClient
})

import abi from './Counter.abi';
import {createPublicClient, getContract, http} from 'viem';
import {base, mainnet} from 'viem/chains';

const publicClient = createPublicClient({
    chain: base,
    transport: http()
})

const contract = getContract({
    address: '0x00',
    abi,
    client: publicClient
})

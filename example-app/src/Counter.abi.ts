
/**
 * This file is generated to allow for typed abi imports in TypeScript, which
 * require an 'as const' suffix today. Unfortunately, directly importing .json via TypeScript does not
 * create a const type as-is.
 * 
 * @generated sha256:c74b5bd7af538c0bffc06c92a82323fbac9512f41c4709b7defb08ec819678f6
 */
export const abi = [
  {
    "type": "function",
    "name": "increment",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "number",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "setNumber",
    "inputs": [
      {
        "name": "newNumber",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
] as const;

export default abi;

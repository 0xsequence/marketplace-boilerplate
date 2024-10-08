export const NiftyswapFactory20_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'metadataContract',
        type: 'address',
      },
    ],
    name: 'MetadataContractChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'currency',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'salt',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lpFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'exchange',
        type: 'address',
      },
    ],
    name: 'NewExchange',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_currency',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_lpFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_instance',
        type: 'uint256',
      },
    ],
    name: 'createExchange',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_currency',
        type: 'address',
      },
    ],
    name: 'getPairExchanges',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'metadataProvider',
    outputs: [
      {
        internalType: 'contract IERC1155Metadata',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC1155Metadata',
        name: '_contract',
        type: 'address',
      },
    ],
    name: 'setMetadataContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'tokensToExchange',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

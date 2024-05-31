export const paymaster = [
  [
    {
      inputs: [
        {
          internalType: 'address',
          name: '_erc20',
          type: 'address'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      inputs: [],
      name: 'allowedToken',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes',
          name: '_context',
          type: 'bytes'
        },
        {
          components: [
            {
              internalType: 'uint256',
              name: 'txType',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'from',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'to',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'gasLimit',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'gasPerPubdataByteLimit',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxFeePerGas',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxPriorityFeePerGas',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'paymaster',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'nonce',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'value',
              type: 'uint256'
            },
            {
              internalType: 'uint256[4]',
              name: 'reserved',
              type: 'uint256[4]'
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes'
            },
            {
              internalType: 'bytes',
              name: 'signature',
              type: 'bytes'
            },
            {
              internalType: 'bytes32[]',
              name: 'factoryDeps',
              type: 'bytes32[]'
            },
            {
              internalType: 'bytes',
              name: 'paymasterInput',
              type: 'bytes'
            },
            {
              internalType: 'bytes',
              name: 'reservedDynamic',
              type: 'bytes'
            }
          ],
          internalType: 'struct Transaction',
          name: '_transaction',
          type: 'tuple'
        },
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        },
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        },
        {
          internalType: 'enum ExecutionResult',
          name: '_txResult',
          type: 'uint8'
        },
        {
          internalType: 'uint256',
          name: '_maxRefundedGas',
          type: 'uint256'
        }
      ],
      name: 'postTransaction',
      outputs: [],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        },
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        },
        {
          components: [
            {
              internalType: 'uint256',
              name: 'txType',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'from',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'to',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'gasLimit',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'gasPerPubdataByteLimit',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxFeePerGas',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxPriorityFeePerGas',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'paymaster',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'nonce',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'value',
              type: 'uint256'
            },
            {
              internalType: 'uint256[4]',
              name: 'reserved',
              type: 'uint256[4]'
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes'
            },
            {
              internalType: 'bytes',
              name: 'signature',
              type: 'bytes'
            },
            {
              internalType: 'bytes32[]',
              name: 'factoryDeps',
              type: 'bytes32[]'
            },
            {
              internalType: 'bytes',
              name: 'paymasterInput',
              type: 'bytes'
            },
            {
              internalType: 'bytes',
              name: 'reservedDynamic',
              type: 'bytes'
            }
          ],
          internalType: 'struct Transaction',
          name: '_transaction',
          type: 'tuple'
        }
      ],
      name: 'validateAndPayForPaymasterTransaction',
      outputs: [
        {
          internalType: 'bytes4',
          name: 'magic',
          type: 'bytes4'
        },
        {
          internalType: 'bytes',
          name: 'context',
          type: 'bytes'
        }
      ],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      stateMutability: 'payable',
      type: 'receive'
    }
  ]
] as const;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dIdentityAbi = void 0;
exports.dIdentityAbi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "Burn",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "Mint",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "_profiler",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "RemoveProfile",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "_profiler",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "SetProfile",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "Update",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "getID",
        outputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "UID",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "nameHash",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint256",
                        name: "dobHash",
                        type: "uint256",
                    },
                ],
                internalType: "struct DIdentity.Identity",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_profiler",
                type: "address",
            },
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "getProfile",
        outputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "entity",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "dataHash",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "timestamp",
                        type: "uint256",
                    },
                ],
                internalType: "struct DIdentity.Profile",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "getSoul",
        outputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "UID",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "nameHash",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint256",
                        name: "dobHash",
                        type: "uint256",
                    },
                ],
                internalType: "struct DIdentity.Identity",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_profiler",
                type: "address",
            },
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "hasProfile",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "hasSoul",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "listProfiles",
        outputs: [
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "UID",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "nameHash",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint256",
                        name: "dobHash",
                        type: "uint256",
                    },
                ],
                internalType: "struct DIdentity.Identity",
                name: "_identityData",
                type: "tuple",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_profiler",
                type: "address",
            },
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "removeProfile",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "string",
                        name: "entity",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "dataHash",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "timestamp",
                        type: "uint256",
                    },
                ],
                internalType: "struct DIdentity.Profile",
                name: "_profileData",
                type: "tuple",
            },
        ],
        name: "setProfile",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "UID",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "nameHash",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint256",
                        name: "dobHash",
                        type: "uint256",
                    },
                ],
                internalType: "struct DIdentity.Identity",
                name: "_identityData",
                type: "tuple",
            },
        ],
        name: "update",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
//# sourceMappingURL=dIdentity.js.map
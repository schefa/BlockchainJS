# BlockchainJS

This project is an implementation of the essence of a Blockchain. It demonstrates the main aspects and the challenge of a Blockchain as a distributed ledger.

```
BlockchainJS  
    |-- consensus/
        |-- proof-of-authority.js
        |-- proof-of-stake.js
        |-- proof-of-work.js
    |-- src/
        |-- Block.js
        |-- Blockchain.js
        |-- Participants.js
        |-- Transaction.js
    |-- example-poa.js
    |-- example-pos.js
    |-- example-pow.js
```

## What is a Blockchain?

A blockchain is a growing list of records, called blocks, that are linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data ([Wikipedia](https://en.wikipedia.org/wiki/Blockchain))
  
```json
Blockchain
[
    {
        "block": 0,
        "previousHash": "0",
        "timestamp": "01/01/2010",
        "transactions": "GenesisBlock",
        "hash": "c089b45f1bd2411f615e2d75eb6578488385199477c18c4022f8273ca557abfe",
        "nonce": 0
    },
    {
        "block": 1,
        "previousHash": "c089b45f1bd2411f615e2d75eb6578488385199477c18c4022f8273ca557abfe",
        ...
        "hash": "00000f7956bb8142c44526f2fda693d95468237dacb781aadb0aca00478ae2c9",
        "nonce": 1255248
    },
    {
        "block": 2,
        "previousHash": "00000f7956bb8142c44526f2fda693d95468237dacb781aadb0aca00478ae2c9",
        ...
        "hash": "00000f9571be245f9fdf796e57831ee47730eaad565439b553130a2d543f14cb",
        "nonce": 527477
    }
]
```

This is what a Blockchain looks like, printed in JSON format. You can see that the information of the previous block (previousHash) is stored in the subsequent block. A blockchain starts with a "Genesis Block" that has no previous hash. Once recorded, the data in any given block cannot be altered retroactively without alteration of all subsequent blocks, which requires consensus of the network majority, if the blockchain is distributed among the participants.

## What is consensus and why is it important?

The best known implementations of a blockchain are in the form of a **distributed ledger** (Bitcoin, Ethereum etc.). Each participant can hold a copy of the ledger. There is no centralized database, no instances like a database admin or super user which can garantee the validity across the peers, but also could manipulate blocks retroactively. It may even be that the blockchain grows differently at different nodes. How a valid block is created must be decided amongst the participants of the blockchain. Because anybody can submit blocks (even false ones, see [Byzantine fault](https://en.wikipedia.org/wiki/Byzantine_fault)), the *real* blockchain must be determined by specific consensus algorithms. 

## How to use this project

This project implements the main three consensus algorithms.

```shell
# Install dependencies
npm install
```

### Proof of Work

The main aspect is that in order to create a new block, a mathmatical problem must be solved by calculating a specific number of zeros in the beginning of a hash value. Run the sample script with the difficulty of 2. You can see that it might be fast. By increasing the difficulty the calculation takes longer.

```shell
node example-pow.js
```

### Proof of Stake

In a PoS-based networks, the creator of the next block is chosen via various combinations of random selection and wealth or age. To become a validator, you have to deposit a fee. If a validator abuses its position, it will lose its stake.

```shell
node example-pos.js
```

### Proof of Authority

In PoA-based networks, transactions and blocks are validated by approved participants, known as validators. Other than in PoW or PoS, the validator puts its reputation on the line.

```shell
node example-poa.js
```
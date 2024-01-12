# Gorilla Punk NFT Subgraph
Muktanshu's Subgraph Assignment Submission.

## Description

This Subgraph is designed to index and query data from the Gorilla Punk NFT Collection smart contract.

It allows developers to interact with the NFT collection's metadata and explore various information.

## Features

- Indexes Gorilla Punk NFT metadata.
- Provides a GraphQL API for querying Gorilla Punk NFT data.

## Subgraph Information

### Subgraph Name

Subgraph-Assignment

### Subgraph Version

v0.2

### Subgraph Endpoint

[Link for the Subgraph](https://api.studio.thegraph.com/query/31313/subgraph-assignment/version/latest)

## NFT Collection Information

### NFT Contract Address

0x7A79644bdcc87bCB8312a9F3814c9E949aae4C70

### NFT Metadata

![1705071918691](image/README/1705071918691.png)

## Subgraph Dashboard

![1705071956385](image/README/1705071956385.png)

## Subgraph Queries

![1705073624913](image/README/1705073624913.png)

### Example Query 1: Retrieve All NFTs

```graphql
query gorrilaInfo {
  gorrilas {
    id
    ipfsHashURI {
      description
      id
      image
      name
      traitType0
      value0
    }
    tokenID
    updatedAtTimestamp
    tokenURI
  }
}
```

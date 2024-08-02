# Hyperledger Fabric REST API Starter Kit - NestJS

## Dependencies

- [Node.js](https://nodejs.org/en/download/) (>= 18.x)
- [Fabric Pre-requisites](https://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html)

## Start the Fabric Network

```bash
cd bc-network
./network.sh up createChannel -c mychannel -ca
```

Default Blockchain Explorer User:

- Username: `exploreradmin`
- Password: `exploreradminpw`

## Deploy the Chaincode

```bash
cd bc-network
./network.sh deployCC -ccn asset -ccp ../chaincodes/asset-transfer-ts/ -ccl typescript
```

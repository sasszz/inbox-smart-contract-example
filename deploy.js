// deploy code will go here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
require("dotenv").config();
const { MNEMONIC, INFURA_API_SEPOLIA_LINK } = process.env;

const provider = new HDWalletProvider(
  MNEMONIC,
  INFURA_API_SEPOLIA_LINK
);

const web3 = new Web3(provider);

const INITIAL_STRING = "Init Message";
const deploy = async () => {
  accounts = await web3.eth.getAccounts();
  console.log(`Attempting to deploy from ${accounts[0]}`)
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: "1000000" });
  console.log(`DEPLOYMENT SUCCESSFUL. See contract at https://sepolia.etherscan.io/address/${result.options.address}`)
  provider.engine.stop() // prevents hanging deployment
};

deploy();
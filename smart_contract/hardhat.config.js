require("@nomicfoundation/hardhat-toolbox");

const API_URL='https://sepolia.infura.io/v3/87330cb0d1304f8ebcfe156fedf0d0e3';
const PRIVATE_KEY = 'ad621beeb4e9b363e7c2eb5dba30b6a354cbb813a442c521a79e8d88094a8751'
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
};

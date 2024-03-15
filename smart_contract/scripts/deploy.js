const hre = require("hardhat");

async function main() {
  const RealState = await hre.ethers.getContractFactory("RealState");
  const realState = await RealState.deploy();

  await realState.deployed();

  console.log("Library deployed to:", realState.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

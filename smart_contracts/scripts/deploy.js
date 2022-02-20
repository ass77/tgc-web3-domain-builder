const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("rexxie");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
      let txn = await domainContract.register("baby",  {value: hre.ethers.utils.parseEther('0.3')});
      await txn.wait();
    console.log("Minted domain baby.rexxie");
  
    txn = await domainContract.setRecord("baby", "Am I a baby or a ninja??");
    await txn.wait();
    console.log("Set record for baby.rexxie");
  
    const address = await domainContract.getAddress("baby");
    console.log("Owner of domain baby:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
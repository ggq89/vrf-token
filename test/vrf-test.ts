import { expect } from "chai";

import { ethers, upgrades } from "hardhat";
import { Contract, ContractFactory } from "ethers";

describe("VrfToken", function() {
  it('Deployment should assign the total supply of tokens to the owner', async () => {
    const VrfToken: ContractFactory = await ethers.getContractFactory("VrfToken");
    const vrfToken: Contract = await upgrades.deployProxy(VrfToken, { kind: 'uups' });
    // const vrfToken = await VrfToken.deploy();
    await vrfToken.deployed();

    console.log("VrfToken Proxy deployed to: ", vrfToken.address);
    console.log("VrfToken name: ", await vrfToken.name());
    console.log("VrfToken symbol: ", await vrfToken.symbol());

    const decimals = await vrfToken.decimals()
    console.log("VrfToken decimals: ", decimals);

    const [owner, addr1] = await ethers.getSigners();
    console.log("owner address: ", owner.address);

    var ownerBalance = await vrfToken.balanceOf(owner.address);
    console.log("owner balance: ", ownerBalance*10**-decimals);

    expect(await vrfToken.totalSupply()).to.equal(ownerBalance);

    await vrfToken.issue(3*10**decimals)
    ownerBalance = await vrfToken.balanceOf(owner.address);
    console.log("owner balance: ", ownerBalance*10**-decimals);

    await vrfToken.burn(2*10**decimals)
    ownerBalance = await vrfToken.balanceOf(owner.address);
    console.log("owner balance: ", ownerBalance*10**-decimals);

    console.log("addr1 address: ", addr1.address);
    await expect(vrfToken.connect(addr1).issue(1*10**decimals)).to.be.revertedWith("caller is not the owner");
  });
});

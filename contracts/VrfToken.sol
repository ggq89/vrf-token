// VrfToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract VrfToken is ERC20Upgradeable, OwnableUpgradeable {
    function initialize() initializer public {
        __ERC20_init("Vrf Token", "VRF");
        __Ownable_init();
        _mint(msg.sender, 1*10**7*10**decimals());
    }

    function decimals() public view virtual override returns (uint8) {
        return 8;
    }

    function issue(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }

    function burn(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);
    }
}

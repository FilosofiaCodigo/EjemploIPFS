// SPDX-License-Identifier: MIT

pragma solidity 0.8.5;

contract MyContract {
    string public image;

    function setImage(string memory _image) public {
        image = _image;
    }
}
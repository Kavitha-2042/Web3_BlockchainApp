// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
// };


// https://eth-goerli.g.alchemy.com/v2/Pb4OkRShSM-Zp0hL38N7NStc4qa9iYB1

// 3129cadfa2cb9efc8423e37e89acfe0e16f7d48539cc35a9a8428bc1f3202fc9

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks:{
    goerli:{
      url:'https://eth-goerli.g.alchemy.com/v2/Pb4OkRShSM-Zp0hL38N7NStc4qa9iYB1',
      accounts:['3129cadfa2cb9efc8423e37e89acfe0e16f7d48539cc35a9a8428bc1f3202fc9']

    }
  }
}
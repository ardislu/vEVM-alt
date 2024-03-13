# vEVM-alt

This is an alternate frontend to access [kethcode's vEVM smart contract](https://github.com/kethcode/vEVM) that has minimal dependencies and no build process.

This is not intended to be a pixel-perfect recreation, but rather a "close-enough" alternative with an emphasis on simplicity.

## Changes from the original

- Rewrote the JS and CSS from scratch to simplify logic and remove all dependencies except for the ABI coder.
- Used semantic HTML tags to improve accessibility.
- Updated output area to match the [evm.codes playground](https://www.evm.codes/playground) more closely (more useful in my opinion).
- Optimized image asset size by resizing, running it through [Oxipng](https://github.com/shssoichiro/oxipng), and providing an AVIF alternative for supported browsers.
- Optimized font asset size by directly declaring it in the inline CSS and restricting the character set to only the required characters.

## Smart contract

The original vEVM smart contract was deployed on the (now deprecated) Base Goerli testnet at [0x4121E8574D28b2E5f5777F7B00d435Ee4886A5F4](https://goerli.basescan.org/address/0x4121e8574d28b2e5f5777f7b00d435ee4886a5f4).

I've redeployed the same bytecode to the Ethereum Holesky testnet at [0xfc196393b6AD99081e0CE7D517599e254edBBCac](https://holesky.etherscan.io/address/0xfc196393b6ad99081e0ce7d517599e254edbbcac) for longer-term use.

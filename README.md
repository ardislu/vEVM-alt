# vEVM-alt

This is an alternate frontend to access [kethcode's vEVM smart contract](https://github.com/kethcode/vEVM) that has minimal dependencies and no build process.

This is not intended to be a pixel-perfect recreation, but rather a "close-enough" alternative with an emphasis on simplicity.

## Changes from the original

- Rewrote the JS and CSS from scratch to simplify logic and remove all dependencies except for the ABI coder.
- Used semantic HTML tags to improve accessibility.
- Updated output area to match the [evm.codes playground](https://www.evm.codes/playground) more closely (more useful in my opinion).
- Optimized image asset size by resizing, running it through [Oxipng](https://github.com/shssoichiro/oxipng), and providing an AVIF alternative for supported browsers.
- Optimized font asset size by directly declaring it in the inline CSS and restricting the character set to only the required characters.

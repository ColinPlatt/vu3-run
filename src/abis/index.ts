import { parseAbi } from 'viem'

import CUSTOM_ABI from './custom.abi.json';
import ERC721_ABI from './ERC721.abi.json';
import ERC1155_ABI from './ERC1155.abi.json';
import ERC5169_ABI from './ERC5169.abi.json';

const customAbi = parseAbi(CUSTOM_ABI);
const erc721Abi = parseAbi(ERC721_ABI);
const erc1155Abi = parseAbi(ERC1155_ABI);
const erc5169Abi = parseAbi(ERC5169_ABI); // extended to add inputs on scriptURI

export {
    customAbi,
    erc721Abi,
    erc1155Abi,
    erc5169Abi
}
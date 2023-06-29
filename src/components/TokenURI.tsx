/*
interface TokenURIProps {
  address?: Address;
  id?: BigInt;
}
*/

import {useState} from 'react';
import {useTokenURI} from '../hooks';
import {Address, isAddress} from "viem"
import {Button, Box, Input, Heading} from 'theme-ui';

interface TokenURIProps {}

const ZERO_ADDRESS: Address = '0x0000000000000000000000000000000000000000';

export function TokenURI({} : TokenURIProps) {
    const {
        address,
        setAddress,
        id,
        setId,
        tokenURI,
        fetchTokenURI,
        loading
    } = useTokenURI(ZERO_ADDRESS, BigInt(0));

    const [inputAddress, setInputAddress] = useState < Address | string > ('');
    const [inputId, setInputId] = useState < BigInt | string > ('');

    const update = () => {
        if (isAddress(inputAddress as Address)) {
            setAddress(inputAddress as Address);
        }
        if (!isNaN(Number(inputId))) {
            setId(BigInt(inputId.toString()));
        }
        fetchTokenURI(address, id);
    }

    return (
        <Box>
            <Heading>Retrieve token URI</Heading>
            <Input type="text"
                value={inputAddress}
                onChange={
                    (e) => setInputAddress(e.target.value)
                }
                placeholder="Enter address"/>
            <Input type="text"
                value={inputId.toString()}
                onChange={
                    (e) => setInputId(e.target.value)
                }
                placeholder="Enter ID"/>
            <Button onClick={update}>Retrieve</Button>
            {
            loading ? (
                <p>Loading...</p>
            ) : tokenURI ? (
                <div>
                    <h2>Token URI:</h2>
                    <p>{tokenURI}</p>
                </div>
            ) : (
                <p>No data could be retrieved for the given address and ID.</p>
            )
        } </Box>
    );
}

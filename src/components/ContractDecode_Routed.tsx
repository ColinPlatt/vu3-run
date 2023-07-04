import {useEffect, useState} from 'react';
import {useContractDecode} from '../hooks';
import {Address, isAddress} from "viem"
import {Button, Box, Input, Heading, Select} from 'theme-ui';

interface ContractDecodeProps {
    address: Address;
    functionName: string;
    id: string;
}

const ZERO_ADDRESS: Address = '0x0000000000000000000000000000000000000000';


export function ContractDecode_Routed(routingInput : ContractDecodeProps) {

    const {
        fetchEncodedData,
        decodedData, 
        decodedMediaData, 
        provider,
        loading, 
        error
    } = useContractDecode(routingInput.address, routingInput.functionName, routingInput.id);

    useEffect(() => {
        if(loading === null && routingInput.address && routingInput.functionName && routingInput.id) {
            fetchEncodedData(routingInput.address as Address, routingInput.functionName, routingInput.id);
        }
    }), [routingInput.address, routingInput.functionName, routingInput.id];

    return (
        <Box sx={{
            height: '85vh',
        }}>
            {
                provider ? (
                    loading === null ? (
                        <p>Enter an address and function to retrieve data.</p>
                    ) :
                        loading ? (
                            <p>Loading...</p>
                        ) : decodedMediaData ? (
                            <div>
                                {
                                decodedMediaData ? (
                                    <Box sx={{ height: '95vh', overflow: 'hidden' }}>
                                        <iframe 
                                            src={decodedMediaData}
                                            height="90%"
                                            width="90%"
                                        />
                                    </Box>
                                ) : null
                                }
                                {
                                error ? (
                                    <p>{error}</p>
                                ) : null
                                }
                            </div>
                        ) : (
                            <p>No data could be retrieved for the given address and ID.</p>
                        )
                ) : (
                    <p>Connect your wallet to retrieve data.</p>
                )
        } </Box>
    );
}

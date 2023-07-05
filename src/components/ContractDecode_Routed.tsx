import {useEffect, useState} from 'react';
import {useContractDecode_Routed} from '../hooks';
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
        providerReady,
        loading, 
        error
    } = useContractDecode_Routed(routingInput.address, routingInput.functionName, routingInput.id);
        

    useEffect(() => {
        if(providerReady && routingInput.address && routingInput.functionName && routingInput.id) {
            console.log("fetching data")
            fetchEncodedData(routingInput.address as Address, routingInput.functionName, routingInput.id);
        }
    }, [routingInput.address, routingInput.functionName, routingInput.id]);

    return (
        <Box sx={{
            height: '85vh',
        }}>
            {
                loading || loading === null ? (
                    <p>Loading...</p>
                ) : decodedMediaData ? (
                    <div>
                        {
                        decodedMediaData ? (
                            <Box sx={{ height: '95vh', overflow: 'hidden' }}>
                                <Button 
                                    sx={{ 
                                        marginLeft: '1rem',
                                        color: '#000000',
                                    }} 
                                    onClick={() => {

                                        const decoded = window.atob(decodedMediaData.split(',')[1]);
                                        const win = window.open("", "_parent");

                                        if (win) {
                                            win.document.write(decoded);
                                        };
                                    }}
                                >
                                    Open original asset
                                </Button>
                                <iframe 
                                    src={decodedMediaData}
                                    height="90%"
                                    width="90%"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                    sandbox="allow-same-origin allow-scripts allow-popups allow-modals allow-forms"
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
            } 
        </Box>
    );
}

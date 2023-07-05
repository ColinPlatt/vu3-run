import {useState} from 'react';
import {useContractDecode} from '../hooks';
import {Address, isAddress} from "viem"
import {Button, Box, Input, Heading, Select} from 'theme-ui';

interface ContractDecodeProps {}

const ZERO_ADDRESS: Address = '0x0000000000000000000000000000000000000000';


export function ContractDecode({} : ContractDecodeProps) {
    const {
        fetchEncodedData,
        decodedData, 
        decodedMediaData, 
        provider,
        loading, 
        error
    } = useContractDecode(ZERO_ADDRESS, '');

    const [inputAddress, setInputAddress] = useState < Address | string > ('');
    const [inputFn, setInputFn] = useState < string > ('');
    const [inputId, setInputId] = useState < BigInt | string > ('');
    const [inputArgs, setInputArgs] = useState < any[] > ([]);

    const update = () => {
        if (isAddress(inputAddress as Address) && typeof inputFn === 'string') {
            fetchEncodedData(inputAddress as Address, inputFn, BigInt(inputId.toString()));
        } 
    }

    return (
        <Box sx={{
            height: '85vh',
        }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1rem',
                    borderTop: '1px solid #eaeaea',
                }}
            >
                <Input 
                    type="text"
                    value={inputAddress}
                    onChange={(e) => setInputAddress(e.target.value)}
                    placeholder="Enter address"
                    sx={{ 
                        width: ['30%', '30%', '30%', '30%'],
                        margin: '1rem',
                        backgroundColor: '#eaeaea'
                    }}
                />
                <Select 
                    onChange={(e) => setInputFn(e.target.value)}
                    sx={{ 
                        width: ['125%', '125%', '125%', '125%'],
                        margin: '1rem',
                        backgroundColor: '#eaeaea'
                     }}
                >
                    <option value="">Select function</option>
                    <option value="uri">uri</option>
                    <option value="tokenURI">tokenURI</option>
                    <option value="scriptURI">scriptURI</option>
                    <option value="read">read</option>
                    <option value="get">get</option>
                </Select>
                <Input 
                    type="text"
                    value={inputId.toString()}
                    onChange={(e) => setInputId(e.target.value)}
                    placeholder="Enter ID"
                    sx={{ 
                        width: ['10%', '10%', '10%', '10%'],
                        margin: '1rem',
                        backgroundColor: '#eaeaea'
                    }}
                />
                <Button 
                    onClick={update}
                    sx={{ 
                        marginLeft: '1rem',
                        color: '#000000',
                    }} 
                >
                    Retrieve
                </Button>
            </Box>
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
                ) : (
                    <p>Connect your wallet to retrieve data.</p>
                )
        } </Box>
    );
}

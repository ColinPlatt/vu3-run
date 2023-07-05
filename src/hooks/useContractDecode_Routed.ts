import { useEffect, useState } from "react"
import { erc721Abi, erc1155Abi, erc5169Abi, customAbi } from "../abis"
import { Address } from "viem"
import { useAuth } from "./useAuth"
import atob from 'atob';


export function useContractDecode_Routed<T>(
    address: Address, 
    functionName: string,
    id?: BigInt | string, 
    args?: any[]
) {
    const { provider, chain } = useAuth(); 
    const [ providerReady, setProviderReady ] = useState(false);
    const [ decodedData, setDecodedData ] = useState<string>();
    const [ decodedMediaData, setDecodedMediaData ] = useState<string>();
    const [ loading, setLoading ] = useState<boolean | null>(null);
    const [ error, setError] = useState<string>();
    

    const fetchEncodedData = async (address: Address, functionName: string, id?: BigInt | string) => {
        setLoading(true);
        setDecodedData(undefined);

        if (!provider) {
            setDecodedData(undefined);
            setLoading(false);
            setError("Provider not available");
            return;
        }
        
        if(!address) {
            setDecodedData(undefined);
            setLoading(false);
            setError("Address not available");
            return;
        }

        if(!functionName) {
            setDecodedData(undefined);
            setLoading(false);
            setError("Function name not available");
            return;
        }

        let fnAbi = null;
        
        switch(functionName) {
            case 'tokenURI':
            case 'uri':
                if (id === undefined) {
                    throw new Error("`id` must not be undefined for 'tokenURI' or 'uri'");
                }
                fnAbi = functionName === 'tokenURI' ? erc721Abi : erc1155Abi;
                args = [id];
                break;
            case 'scriptURI':
                fnAbi = erc5169Abi;
                break;
            case 'read':
            case 'get':
                fnAbi = customAbi;
                break;
            default:
                throw new Error("Unknown function name");
        }

        try {
            const data = await provider.readContract({
                address: address,
                abi: fnAbi, 
                functionName: functionName,
                args: args
            });
            setDecodedData(`${data}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(provider && address && functionName) {
            setProviderReady(true); 
            fetchEncodedData(address, functionName, id);
        }
    }, [provider, address, functionName, id]);

    useEffect(() => {
        if (decodedData && typeof decodedData === 'string') {
            if(decodedData.startsWith('data:application/json;base64,')) {
                const decoded = atob(decodedData.substring(29)); //remove prefix and decode
                const json = JSON.parse(decoded);
                let imageData;

                if (json.animation_url) {
                    imageData = json.animation_url;
                } else if (json.image_data) {
                    imageData = json.image_data;
                } else if (json.image) {
                    imageData = json.image;
                }
        
                if (imageData) {
                    if (imageData.startsWith('data:image/svg+xml;base64,')
                        || imageData.startsWith('data:image/png;base64,')
                        || imageData.startsWith('data:text/html;base64,')
                        || imageData.startsWith('data:audio/wav;base64,')) {
                            setDecodedMediaData(imageData);
                            setError(undefined);
                    } else {
                        setError("The image data is not in the expected format.");
                    }
                }
            } else {
                setDecodedMediaData(decodedData);
            }
        } else {
            setError("The decoded is not in the expected format.");
        }
    }, [decodedData, decodedMediaData]);

    return {
        fetchEncodedData,
        decodedData, 
        decodedMediaData, 
        provider,
        providerReady,
        loading, 
        error
    };

}
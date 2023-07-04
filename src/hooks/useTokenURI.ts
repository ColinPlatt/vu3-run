import { useEffect, useState } from "react"
import { erc721Abi, erc1155Abi, erc5169Abi, customAbi } from "../abis"
import { Address } from "viem"
import { useAuth } from "./useAuth"
import atob from 'atob';
import { setDefaultResultOrder } from "dns";


export function useTokenURI(initialAddress: Address, initialId: BigInt) {
    const {provider} = useAuth(); 
    const [address, setAddress] = useState(initialAddress);
    const [id, setId] = useState(initialId);
    const [ tokenURI, setTokenURI ] = useState<string>();
    const [ loading, setLoading ] = useState<boolean | null>(null);
    const [decodedData, setDecodedData] = useState<string>();

    const fetchTokenURI = async (address: Address, id: BigInt) => {
        setLoading(true);
        setTokenURI(undefined);  // reset the tokenURI
    
        if (!provider) {
            setLoading(false);
            return;
        }

        if(!address || !id) {
            setLoading(false);
            return;
        }
    
        try {
            const uri = await provider.readContract({
                address: address,
                abi: erc721Abi, 
                functionName: 'tokenURI',
                args: [id]
            });
            setTokenURI(`${uri}`);
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    
    /*
    useEffect(() => {
        fetchTokenURI(address, id);  // fetch when address or id changes
    }, [address, id]);
    */

    const [error, setError] = useState<string>();

    useEffect(() => {
        if (tokenURI && tokenURI.startsWith('data:application/json;base64,')) {
            const decoded = atob(tokenURI.substring(29)); //remove prefix and decode
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
                    || imageData.startsWith('data:text/html;base64,')) {
                    setDecodedData(atob(imageData.substring(imageData.indexOf(",") + 1))); //remove prefix and decode
                } else {
                    setError("The image data is not in the expected format.");
                }
            }
        } else {
            setError("The token URI is not in the expected format.");
        }
    }, [tokenURI]);
    
    return {
        address,
        setAddress,
        id,
        setId,
        tokenURI,
        fetchTokenURI,
        loading,
        decodedData,
        error
    }
}
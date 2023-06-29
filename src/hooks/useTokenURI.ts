import { useEffect, useState } from "react"

import { erc721Abi, erc1155Abi, erc5169Abi, customAbi } from "../abis"

import { Address } from "viem"
import { useAuth } from "./useAuth"

export function useTokenURI(initialAddress: Address, initialId: BigInt) {
    const {provider} = useAuth(); 
    const [address, setAddress] = useState(initialAddress);
    const [id, setId] = useState(initialId);
    const [ tokenURI, setTokenURI ] = useState<string>();
    const [ loading, setLoading ] = useState<boolean>(true);
    
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
    
    useEffect(() => {
        fetchTokenURI(address, id);  // fetch when address or id changes
    }, [address, id]);
    
    return {
        address,
        setAddress,
        id,
        setId,
        tokenURI,
        fetchTokenURI,
        loading,
    }
}
import { useEffect, useState } from "react"
import { createPublicClient, http, fallback, PublicClient } from "viem"

import 'viem/chains'


import { useNetwork } from "wagmi"


export function useClient() {
	const { chain } = useNetwork()

	const [client, setClient] = useState<PublicClient | undefined>();
	const [error, setError] = useState<string>();

    useEffect(() => {
        if(chain) {

			const transport = chain.rpcUrls.alchemy.http[0] === undefined ? 
								http(chain.rpcUrls.default.http[0]) 
								: fallback([
										http(chain.rpcUrls.alchemy.http[0]),
										http(chain.rpcUrls.default.http[0])
									]);

            setClient(createPublicClient({
                chain: chain,
                transport: transport,
            }));
        } else {
			setError("Chain not available");
		}
    }, [chain]);

	return {
		client,
		chain, 
		error
	}
}
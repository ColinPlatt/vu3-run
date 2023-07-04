import { useEffect, useRef, useState } from "react"
import { createPublicClient, http, WalletClient, PublicClient } from "viem"
import {
	useAccount,
	useDisconnect,
	useNetwork,
	usePublicClient,
	useWalletClient
} from "wagmi"


export function useAuth() {
	const { data: walletClient } = useWalletClient()
	const { address, isConnecting } = useAccount()
	const { disconnect } = useDisconnect()
	const { chain } = useNetwork()

	const [provider, setProvider] = useState<PublicClient | undefined>();

    useEffect(() => {
        if(chain && walletClient) {
            setProvider(createPublicClient({
                chain: chain,
                transport: http(chain.rpcUrls.default.http[0]),
            }));
        }
    }, [chain, walletClient]);

	const walletClientRef = useRef<WalletClient | null>()
	walletClientRef.current = walletClient

	return {
		provider,
		chain,
		walletClient,
		walletClientRef,
		address,
		loading: isConnecting,
		logout: disconnect,
	}
}
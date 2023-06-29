import { useEffect, useRef, useState } from "react"
import { WalletClient } from "viem"
import {
	useAccount,
	useDisconnect,
	useNetwork,
	usePublicClient,
	useWalletClient
} from "wagmi"


export function useAuth() {
	const provider = usePublicClient()
	const { data: walletClient } = useWalletClient()
	const { address, isConnecting } = useAccount()
	const { disconnect } = useDisconnect()
	const { chain } = useNetwork()


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
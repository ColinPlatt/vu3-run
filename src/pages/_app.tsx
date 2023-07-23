import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import type {AppProps}
from 'next/app';
import {ThemeProvider} from 'theme-ui';
import {theme} from '../theme';
import {
  configureChains, 
  createConfig, 
  WagmiConfig
} from 'wagmi';
import {
    arbitrum,
    arbitrumGoerli,
    lineaTestnet,
    goerli,
    mainnet,
    optimism,
    optimismGoerli,
    polygon,
    polygonMumbai,
    sepolia
} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';
import {createPublicClient, http} from 'viem'

const {chains, publicClient, webSocketPublicClient} = configureChains([
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [
        goerli,
        sepolia,
        arbitrumGoerli,
        polygonMumbai,
        optimismGoerli,
        lineaTestnet
    ] : []),
], [publicProvider()]);

const {connectors} = getDefaultWallets({
  appName: 'vu3-run', 
  projectId: '9814838b3587d4ae7fd693ded6482540', 
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true, 
  connectors, 
  publicClient
});

function MyApp({Component, pageProps} : AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider chains={chains}>
                    <Component {...pageProps}/>
                </RainbowKitProvider>
            </WagmiConfig>
        </ThemeProvider>
    );
}

export default MyApp;

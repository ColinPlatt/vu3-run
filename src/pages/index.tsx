import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Image from 'next/image'
import Head from 'next/head';
import { Text, Container, Grid, Button, Box, Link  } from 'theme-ui';
import { theme } from '../theme';
import {ContractDecode} from '../components';

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>vu3</title>
        <meta content="read from the blockchain" name="vu3.run" />
        <link href="/logo_favo.svg" rel="icon" />
      </Head>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: '#f0f0f0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.svg" width={132} height={63}/>
        </Box>
        <ConnectButton />
      </Box>

      <Box sx={{
        height: '95vh',
      }}>
        <ContractDecode />
      </Box>
    </Container>
  );
};

export default Home;
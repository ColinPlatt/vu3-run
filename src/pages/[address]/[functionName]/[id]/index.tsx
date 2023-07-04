import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Image from 'next/image'
import Head from 'next/head';
import { Text, Container, Grid, Button, Box, Link  } from 'theme-ui';
import { useRouter } from 'next/router'
import {ContractDecode_Routed} from 'src/components';
import {Address, isAddress} from "viem"


const Nav: NextPage = () => {
  const router = useRouter()
  const { address, functionName, id } = router.query

  console.log(router.query)
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
        <ContractDecode_Routed address={address as Address} functionName={functionName as string} id={id as string} />
      </Box>
    </Container>
  );
};

export default Nav;
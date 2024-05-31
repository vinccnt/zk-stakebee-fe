import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets, lightTheme, Theme } from '@rainbow-me/rainbowkit';
import { Chain, metis } from 'wagmi/chains';
import { http } from 'wagmi';

import {
  rabbyWallet,
  walletConnectWallet,
  coinbaseWallet,
  metaMaskWallet
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig } from 'wagmi';
import MetisIcon from '../assets/ethereum.svg';

//@ts-expect-error - lodash.merge is not typed
import merge from 'lodash.merge';

const WALLET_CONNECT_PROJECT_ID = '';

const metis_sepolia = {
  id: 59902,
  name: 'Metis Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'tMetis',
    symbol: 'tMetis'
  },
  rpcUrls: {
    public: { http: ['https://sepolia.metisdevops.link'] },
    default: { http: ['https://sepolia.metisdevops.link'] }
  },
  blockExplorers: {
    default: {
      name: ' metis-scan',
      url: 'https://sepolia-explorer.metisdevops.link/'
    }
  },
  testnet: true
} as const satisfies Chain;

const zk_sepolia = {
  id: 300,
  name: 'Zksync Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'eth',
    symbol: 'eth'
  },
  rpcUrls: {
    public: { http: ['https://sepolia.era.zksync.dev'] },
    default: { http: ['https://sepolia.era.zksync.dev'] }
  },
  blockExplorers: {
    default: {
      name: ' zk-scan',
      url: 'https://explorer.sepolia.era.zksync.dev'
    }
  },
  testnet: true
} as const satisfies Chain;

export const walletTheme = merge(
  lightTheme({
    borderRadius: 'large'
  }),
  {
    colors: {
      modalBackground: '#AE96FC',
      accentColor: '#A9D8B4'
    },

    radii: {
      modal: '12px',
      menuButton: '4px'
    }
  } as Theme
);

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, rabbyWallet, walletConnectWallet, coinbaseWallet]
    }
  ],
  {
    appName: 'StakeBee',
    projectId: 'wallet-connect-s124x'
  }
);

export const config = createConfig({
  connectors,
  chains: [
    // // { ...metis, iconUrl: MetisIcon.src },
    // { ...metis_sepolia, iconUrl: MetisIcon.src },
    { ...zk_sepolia, iconUrl: MetisIcon.src }

  ],
  ssr: true,
  transports: {
    // [metis.id]: http('https://andromeda.metis.io/?owner=1088'),
    // [metis_sepolia.id]: http('https://sepolia.metisdevops.link'),
    [zk_sepolia.id]: http('https://sepolia.era.zksync.dev')
  }
});

import { useAccount, useChainId } from 'wagmi';

import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { useMemo } from 'react';
import type { Account, Chain, Client, Transport } from 'viem';
import { config } from '@/configs/wallet';
import { type Config, useConnectorClient } from 'wagmi';

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}

export default function useWallet() {
  const { address, isConnected, connector } = useAccount();
  const chainId = useChainId({ config });
  const chainDetails = config.chains.find((c) => c.id === chainId);
  const signer = useEthersSigner();

  return {
    account: address,
    active: isConnected,
    connector,
    chainId: chainId ?? 59902,
    chainDetails,
    signer: signer ?? undefined
  };
}

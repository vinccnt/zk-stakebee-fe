'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDisconnect, WagmiProvider } from 'wagmi';
import { config, walletTheme } from '@/configs/wallet';
import { Header } from '@/layout/Header';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Footer from '@/layout/Footer';
import StakeSwapBox from '@/components/swapbox/StakeSwapBox';
import StatsAccordion from '@/components/accordion/StatsAccordion';
import useWallet from '@/hooks/useWallet';
import getContract from '@/configs/contracts';
import { bMetisMinterAbi } from '@/abis/bMetisMinter';
import { stbMetisAbi } from '@/abis/stbMetis';
import { watchAccount } from '@wagmi/core';
import { useEffect } from 'react';
import { toast } from 'sonner';




function App() {
  const { chainId,signer } = useWallet();



  const { disconnect } = useDisconnect();
  useEffect(() => {
    //@ts-expect-error TODO
    const unwatch = watchAccount(config, {
      onChange(data) {
        // console.log(data);

        const chains = config.chains;

        const chain = chains.find((chain) => chain.id === data.chainId);
        console.log(chain);
        if (!chain) {
          disconnect();
          toast.error('Unsupported chain! Please switch to Metis Testnet');
        }
      }
    });
    return () => unwatch();
  }, [disconnect]);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="mx-auto mt-4 max-w-[450px] flex-1 overflow-y-auto md:flex">
        <div className="flex flex-col">
          <div className="my-8 flex flex-col gap-y-4">
            <div className="text-wrap rounded-3xl bg-white p-6">
              <Tabs defaultValue="mint" className="rounded-full">
                {/* <TabsList className="w-full">
                  <TabsTrigger
                    value="mint"
                    className="w-1/3 pt-2 text-xs data-[state=active]:border-l-0"
                  >
                    MINT
                  </TabsTrigger>
                  <TabsTrigger value="stake" className="w-1/3 pt-2 text-xs">
                    STAKE
                  </TabsTrigger>
                  <TabsTrigger
                    value="unstake"
                    className="w-1/3 pt-2  text-xs data-[state=active]:border-r-0"
                  >
                    UNSTAKE
                  </TabsTrigger>
                </TabsList> */}

                <TabsContent value="mint" className="mt-4 ">
                  <StakeSwapBox
                    fromTokenSymbol="ETH"
                    toTokenSymbol="bETH"
                    action="mint"
                    writeContractAddress={getContract(chainId, 'MINTER')}
                    abi={bMetisMinterAbi}
                    functionName="submit"
                  />
                </TabsContent>

                {/* <TabsContent value="stake" className="mt-4 ">
                  <StakeSwapBox
                    fromTokenAddress={getContract(chainId, 'BMETIS')}
                    fromTokenSymbol="BMETIS"
                    toTokenSymbol="STBMETIS"
                    writeContractAddress={getContract(chainId, 'STBMETIS')}
                    action="stake"
                    abi={stbMetisAbi}
                    functionName="deposit"
                  />
                </TabsContent>
                <TabsContent value="unstake" className="mt-4 ">
                  <StakeSwapBox
                    fromTokenAddress={getContract(chainId, 'STBMETIS')}
                    fromTokenSymbol="STBMETIS"
                    toTokenSymbol="BMETIS"
                    writeContractAddress={getContract(chainId, 'STBMETIS')}
                    action="unstake"
                    abi={stbMetisAbi}
                    functionName="withdraw"
                  />
                </TabsContent> */}
              </Tabs>
            </div>
          </div>
          {/* <StatsAccordion /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={walletTheme}>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

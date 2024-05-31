import { cn, formatAmount, parseValue } from '@/lib/utils';
import MetisIcon from '@/assets/ethereum.svg';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import Image from 'next/image';
import useWallet from '@/hooks/useWallet';
import { useEffect, useState } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useBalance, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { Abi, erc20Abi, parseEther } from 'viem';

import Divider from '@/assets/divider.svg';
import { ContractAddress } from '@/types';

import { Provider,Contract,utils, BrowserProvider } from "zksync-ethers";
// import * as paymasterAbi from "../../abis/paymaster.json"; // TODO: Complete and import the ABI
import getContract from '@/configs/contracts';
import { bMetisMinterAbi } from '@/abis/bMetisMinter';



type SwapBoxProps = {
  fromTokenAddress?: ContractAddress;
  fromTokenSymbol: string;
  toTokenSymbol: string;
  abi: Abi;
  writeContractAddress: ContractAddress;
  functionName: string;
  action: 'mint' | 'stake' | 'unstake';
};

export default function StakeSwapBox(props: SwapBoxProps) {
  const {
    fromTokenAddress,
    fromTokenSymbol,
    toTokenSymbol,
    action,
    abi,
    writeContractAddress,
    functionName
  } = props;

  const [amount, setAmount] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const { openConnectModal } = useConnectModal();
  const { active, account, chainId } = useWallet();

  const nativeBalance = useBalance({
    address: account,
    chainId: chainId
  });

  const fromTokenBalance = useReadContract({
    address: fromTokenAddress,
    functionName: 'balanceOf',
    abi: erc20Abi,
    args: [account ?? '0x0'],
    query: {
      enabled: action !== 'mint'
    }
  });
  const approvedAmount = useReadContract({
    address: fromTokenAddress,
    functionName: 'allowance',
    abi: erc20Abi,
    args: [account ?? '0x0', writeContractAddress],
    query: {
      enabled: action !== 'mint'
    }
  });


  // const getFee = async() => {
  //   // TODO: return formatted fee
  //   return "";
  // }

  // const getBalance = async()=> {
  //   // TODO: Return formatted balance
  //   return "";
  // }
  
  const  mintBETHwithUSDC = async()=> {
      const paymasterAddress = getContract(300,"PAYMASTER");
      const bEthMinterAddress = getContract(300,"MINTER");
      const mockUSDCAddress = getContract(300,"MOCKUSDC");
      const signer = await new BrowserProvider(window.ethereum).getSigner();
      const provider = new Provider("https://sepolia.era.zksync.dev");
      // Note that we still need to get the Metamask signer
      const bEthMinter = new Contract(bEthMinterAddress,bMetisMinterAbi, signer);
  
      const gasPrice = await provider.getGasPrice();
  
      // define paymaster parameters for gas estimation
      const paramsForFeeEstimation = utils.getPaymasterParams(
        paymasterAddress,
        {
          type: "ApprovalBased",
          minimalAllowance: BigInt("1"),
          token: mockUSDCAddress,
          innerInput: new Uint8Array(),
        }
      );
  
      // estimate gasLimit via paymaster
      const gasLimit = await bEthMinter.submit.estimateGas(
        {
          value:parseValue(amount, 18),
          customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams: paramsForFeeEstimation,
          },
        }
      );

      const fee = gasPrice*(gasLimit);

      // const paymasterParams = utils.getPaymasterParams(paymasterAddress, {
      //   type: "ApprovalBased",
      //   token: mockUSDCAddress,
      //   // provide estimated fee as allowance
      //   minimalAllowance: fee,
      //   // empty bytes as testnet paymaster does not use innerInput
      //   innerInput: new Uint8Array(),
      // });
  
      // return {
      //   maxFeePerGas: gasPrice,
      //   maxPriorityFeePerGas: BigInt(1),
      //   gasLimit,
      //   customData: {
      //     gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      //     paymasterParams,
      //   },
      // };

      try {
        const txHandle = await bEthMinter.submit( 
          {
          value:parseValue(amount, 18),
          maxFeePerGas: gasPrice,
          maxPriorityFeePerGas: BigInt(1),
          gasLimit,
          customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paramsForFeeEstimation,
          }}
          );
    
    
        // Wait until the transaction is committed
        await txHandle.wait();
  
      } catch (e) {
        console.error(e);
        alert(e);
      }
  }



  const { writeContractAsync, isPending, data: hash } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError
  } = useWaitForTransactionReceipt({
    hash
  });

  const [balance, refetchData] =
    action === 'mint'
      ? [nativeBalance?.data?.value, nativeBalance.refetch]
      : [fromTokenBalance?.data, fromTokenBalance.refetch];

  useEffect(() => {
    if (isConfirmed) {
      refetchData();
      toast.success('Transaction confirmed');
    }
  }, [isConfirmed]);

  const onClickMax = () => {
    if (!balance) return;
    setAmount(formatAmount(balance, 18, 5));
  };


  

  const onSubmit = async () => {
    const value = action === 'mint' ? parseValue(amount, 18) : undefined;
    const args =
      action === 'mint'
        ? []
        : action === 'stake'
          ? [parseValue(amount, 18), account]
          : [parseValue(amount, 18), account, account];

    if (
      action === 'stake' &&
      typeof approvedAmount.data === 'bigint' &&
      approvedAmount.data < (parseValue(amount, 18) as bigint)
    ) {
      setIsApproving(true);
      await writeContractAsync(
        {
          abi: erc20Abi,
          address: fromTokenAddress as `0x${string}`,
          functionName: 'approve',
          args: [writeContractAddress, parseEther('100000000')]
        },
        {
          onSuccess: (hash) => {
            toast.success(`Transaction submitted: ${hash}`);
          },
          onError: () => {
            toast.error('Transaction failed');
          },
          onSettled: () => {
            setIsApproving(false);
          }
        }
      );
    }
    await writeContractAsync(
      {
        abi,
        address: writeContractAddress,
        value,
        functionName,
        args
      },
      {
        onSuccess: (hash) => {
          toast.success(`Transaction submitted: ${hash}`);
        },
        onError: () => {
          toast.error('Transaction failed');
        }
      }
    );
  };

  const getLabel = () => {
    if (amount === '' || parseValue(amount, 18) === BigInt(0)) return 'ENTER AN AMOUNT';
    if (typeof balance === 'bigint' && balance < (parseValue(amount, 18) as bigint))
      return 'INSUFFICIENT BALANCE';
    if (
      action === 'stake' &&
      typeof approvedAmount.data === 'bigint' &&
      approvedAmount.data < (parseValue(amount, 18) as bigint)
    )
      return 'APPROVE TOKEN';

    if (isApproving) return 'APPROVING TOKEN...';
    if (isPending) return 'SUBMITTING TX...';
    if (isConfirming) return 'CONFIRMING TX...';
    if (action === 'mint') return 'MINT NOW';
    if (action === 'stake') return 'RESTAKE NOW';
    if (action === 'unstake') return 'UNSTAKE NOW';
  };

  const getIsDisabled = () => {
    if (amount === '' || parseValue(amount, 18) === BigInt(0)) return true;
    if (typeof balance === 'bigint' && balance < (parseValue(amount, 18) as bigint)) return true;
    if (
      action === 'stake' &&
      typeof approvedAmount.data === 'bigint' &&
      approvedAmount.data < (parseValue(amount, 18) as bigint)
    )
      return true;
    if (isApproving || isPending || isConfirming) return true;
    return false;
  };

  return (
    <>
      <div className="mt-4 flex flex-col gap-y-1 ">
        <div className="relative flex gap-x-2 rounded-xl border-[6px] border-black bg-[#C6C6C6] px-3 py-4">
          <div className="font-helvetica absolute -top-3 right-6 rounded-full bg-black px-3 text-xs text-white">
            Balance: {balance !== undefined ? formatAmount(balance, 18, 5) : '...'}
          </div>
          <div className="flex h-[72px] min-w-[150px] items-center gap-x-4 rounded-full bg-black p-2 text-white">
            <Image src={MetisIcon} alt="metis icon" height={40} />
            <span className="md:text-md text-xs">{fromTokenSymbol}</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="text-md flex items-center gap-x-2  rounded-full border-4 border-black bg-[#E8E8E8] px-2 py-1 text-black ">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-2/3 bg-[#E8E8E8] pt-1 text-lg outline-none"
              />
              <Button
                className="h-fit rounded-full px-1 py-0 pt-1 text-[10px] tracking-tight md:w-1/3 md:px-6"
                variant="outline"
                onClick={() => onClickMax()}
              >
                Max
              </Button>
            </div>
            <span className="pl-4 text-xs">$12,123</span>
          </div>
        </div>
      </div>

      {/* below */}

      <div className="mt-4 flex flex-col gap-y-2 ">
        <div className="relative">
          <div className="w-1/3 rounded-full border-[6px] border-black bg-secondary py-1 pt-2 text-center text-xs">
            RECEIVE
          </div>
          <Image
            src={Divider}
            alt="divider"
            className="absolute right-1 top-1/2  w-2/3 -translate-y-1/2"
          />
        </div>
        <div className="flex items-center gap-x-6 rounded-xl bg-secondary px-3 py-4">
          <div className="flex h-[72px] min-w-[150px] items-center gap-x-4 rounded-full bg-black p-2 text-white">
            <Image src={MetisIcon} alt="metis icon" height={40} />
            <span className="md:text-md text-xs">{toTokenSymbol}</span>
          </div>
          <div className="flex w-full text-lg text-[#C6C6C6]">
            {amount === '' ? '0.00' : amount}
          </div>
        </div>
      </div>
      {active && (
        <>
        <Button
          variant="solid"
          disabled={getIsDisabled()}
          onClick={onSubmit}
          className={cn('mb-4 mt-6 w-full', {
            'bg-tertiary hover:bg-tertiary cursor-not-allowed hover:border-black hover:text-black':
              getIsDisabled()
          })}
        >
          {getLabel()}
        </Button>
        <Button
          variant="solid"
          disabled={getIsDisabled()}
          onClick={mintBETHwithUSDC}
          className={cn('mb-4 mt-6 w-full', {
            'bg-tertiary hover:bg-tertiary cursor-not-allowed hover:border-black hover:text-black':
              getIsDisabled()
          })}
        >
          {"Mint bETH with USDC"}
        </Button>
        </>
      )}

      {!active && (
        <Button onClick={openConnectModal} variant="solid" className="mb-4 mt-6 w-full">
          CONNECT WALLET
        </Button>
      )}

      {isError && toast.error('Transaction failed')}
    </>
  );
}

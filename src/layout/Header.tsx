'use client';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import MenuIcon from '@/assets/menu-icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import CopyIcon from '@/assets/copy.svg';
import { HEADER_CONFIG } from '@/configs/header';
import { Button } from '@/components/ui/button';

import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import useWallet from '@/hooks/useWallet';
import { shortenAddress } from '@/lib/utils';

import { getIcon } from '@/configs/icons';
import DropDownIcon from '@/assets/drop-down.svg';

function Menu() {
  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <Image src={MenuIcon} alt="menu icon" />
        </div>
      </DialogTrigger>
      <DialogContent className="inset-0 w-3/4 translate-x-0 translate-y-0 rounded-[50px] rounded-l-none border-primary bg-primary">
        <div className="mt-20 flex flex-col gap-y-4">
          {HEADER_CONFIG.map((item) => (
            <Link
              href={item.link}
              className="flex items-center gap-x-2 rounded-full p-2 hover:bg-black hover:text-white"
              key={item.name}
            >
              <Image src={item.icon} alt="stakebee icon" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Header() {
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { account, active, chainId, chainDetails } = useWallet();

  const chainIcon = getIcon(chainId);
  return (
    <header className="m-4 flex flex-row justify-end">
      {/* <Menu /> */}

      {!active && <Button onClick={openConnectModal}>CONNECT WALLET</Button>}

      {active && openChainModal && account && (
        <div className="flex gap-x-2">
          <button
            onClick={openChainModal}
            type="button"
            className="flex flex-row items-center gap-x-3 rounded-full bg-[#AE96FC] py-1 pl-2 pr-3 hover:opacity-70"
          >
            <Image src={chainIcon} alt="chain icon" width={25} height={25} />
            <span className="hidden pt-1 md:block">{chainDetails?.name}</span>
            <Image src={DropDownIcon} alt="drop down icon" width={12} height={12} />
          </button>

          <Button
            className="text-primary"
            onClick={async () => await navigator.clipboard.writeText(account)}
          >
            <div className="flex items-center gap-x-2">
              {shortenAddress(account, 12)}
              <Image src={CopyIcon} alt="copy icon" className="pb-1" />
            </div>
          </Button>
        </div>
      )}
    </header>
  );
}

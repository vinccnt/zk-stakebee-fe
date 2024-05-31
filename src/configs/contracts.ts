import { SupportedChains } from '@/types';
import { METIS, METIS_SEPOLIA, ZK_SEPOLIA } from './chains';

const contract = {
  [METIS]: {
    BMETIS: '0x',
    STBMETIS: '0x',
    MINTER: '0x',
    PAYMASTER: '0x',
    MOCKUSDC: '0x'
  },
  [METIS_SEPOLIA]: {
    BMETIS: '0xA50864a01506f94815258Ca9188B4DF08074320A',
    STBMETIS: '0x50C704c7AAf08E3f3b0b4884Bb287063E805e39f',
    MINTER: '0xc13F0858fa65F9D7209e0403A4593EEBd9819567',
    PAYMASTER: '0x',
    MOCKUSDC: '0x'
  },
  [ZK_SEPOLIA]: {
    BMETIS: '0x8Ca4a1c501A5d319d30a80a2aDf2226fd4f9A6A8',
    STBMETIS: '0x50C704c7AAf08E3f3b0b4884Bb287063E805e39f',
    MINTER: '0x2cABA947FB69fFfE6c4404682CB0512A94D22318',
    PAYMASTER: '0xBce46B6E14679529881Af851dDEa6B9ba4fDD624',
    MOCKUSDC: '0xcE4b9A2e9dD0635c5980e1fa91e4057795e60f04'
  }
} as const;

export default function getContract(
  chainId: SupportedChains,
  contractName: keyof (typeof contract)[SupportedChains]
) {
  return contract[chainId][contractName];
}

import { METIS, METIS_SEPOLIA, ZK_SEPOLIA } from './chains';
import MetisIcon from '@/assets/ethereum.svg.svg';
const ICONS = {
  [METIS]: MetisIcon,
  [METIS_SEPOLIA]: MetisIcon,
  [ZK_SEPOLIA]: MetisIcon

};

export function getIcon(chainId: keyof typeof ICONS) {
  return ICONS[chainId];
}

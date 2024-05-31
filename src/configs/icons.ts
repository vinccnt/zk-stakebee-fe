import { METIS, METIS_SEPOLIA } from './chains';
import MetisIcon from '@/assets/metis.svg';
const ICONS = {
  [METIS]: MetisIcon,
  [METIS_SEPOLIA]: MetisIcon
};

export function getIcon(chainId: keyof typeof ICONS) {
  return ICONS[chainId];
}

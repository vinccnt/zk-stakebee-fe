import { supportedChains } from '@/configs/chains';
export type ContractAddress = `0x${string}`;
export type SupportedChains = (typeof supportedChains)[number];

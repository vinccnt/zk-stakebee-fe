import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatUnits, parseUnits } from 'viem';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: `0x${string}` | undefined, length: number) {
  if (!length) {
    return '';
  }
  if (!address) {
    return address;
  }
  if (address.length < 10) {
    return address;
  }
  const left = Math.floor((length - 3) / 2) + 1;
  return (
    address.substring(0, left) +
    '...' +
    address.substring(address.length - (length - (left + 3)), address.length)
  );
}

export const limitDecimals = (amount: bigint | string, maxDecimals?: number) => {
  let amountStr = amount.toString();
  if (maxDecimals === undefined) {
    return amountStr;
  }
  if (maxDecimals === 0) {
    return amountStr.split('.')[0];
  }
  const dotIndex = amountStr.indexOf('.');
  if (dotIndex !== -1) {
    const decimals = amountStr.length - dotIndex - 1;
    if (decimals > maxDecimals) {
      amountStr = amountStr.substring(0, amountStr.length - (decimals - maxDecimals));
    }
  }
  return amountStr;
};

export const padDecimals = (amount: bigint | string, minDecimals: number) => {
  let amountStr = amount.toString();
  const dotIndex = amountStr.indexOf('.');
  if (dotIndex !== -1) {
    const decimals = amountStr.length - dotIndex - 1;
    if (decimals < minDecimals) {
      amountStr = amountStr.padEnd(amountStr.length + (minDecimals - decimals), '0');
    }
  } else {
    amountStr = amountStr + '.0000';
  }
  return amountStr;
};

export const numberWithCommas = (x: bigint | string) => {
  if (!x) {
    return '...';
  }

  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const formatAmount = (
  amount: bigint | undefined | null,
  tokenDecimals: number,
  displayDecimals?: number,
  useCommas?: boolean,
  defaultValue: string = '...'
) => {
  try {
    if (amount === undefined || amount === null || amount.toString().length === 0) {
      return defaultValue;
    }
    if (displayDecimals === undefined) {
      displayDecimals = 4;
    }
    let amountStr = formatUnits(amount, tokenDecimals);

    amountStr = limitDecimals(amountStr, displayDecimals);
    if (displayDecimals !== 0) {
      amountStr = padDecimals(amountStr, displayDecimals);
    }
    if (useCommas) {
      return numberWithCommas(amountStr);
    }
    return amountStr;
  } catch (e) {
    return defaultValue;
  }
};

export const parseValue = (value: string, tokenDecimals: number) => {
  try {
    const pValue = parseFloat(value);

    if (isNaN(pValue)) {
      return undefined;
    }

    value = limitDecimals(value, tokenDecimals);
    const amount = parseUnits(value, tokenDecimals);
    return amount;
  } catch (e) {
    return BigInt(0);
  }
};

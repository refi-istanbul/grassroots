import { useEffect, useState } from "react";
import { useBalance } from "wagmi";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

export function useAccountBalance(address?: string) {
  const [isEthBalance] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);

  const {
    data: fetchedBalanceData,
    isError,
    isLoading,
  } = useBalance({
    address,
    watch: true,
    chainId: getTargetNetwork().id,
  });

  useEffect(() => {
    if (fetchedBalanceData?.formatted) {
      setBalance(Number(fetchedBalanceData.formatted));
    }
  }, [fetchedBalanceData]);

  return { balance, isError, isLoading, isEthBalance };
}

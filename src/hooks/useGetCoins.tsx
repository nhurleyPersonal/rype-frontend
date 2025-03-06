import { useQuery } from '@tanstack/react-query';
import { fetchCoins, fetchCoinById } from '@/services/GetCoins';
import { Coin } from '@/types/Coin';

export function useGetCoins() {
  return useQuery<Coin[]>({
    queryKey: ['coins'],
    queryFn: fetchCoins,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetCoin(id: string) {
  const lowerId = id.toLowerCase();
  return useQuery<Coin>({
    queryKey: ['coin', lowerId],
    queryFn: () => fetchCoinById(lowerId),
    enabled: !!lowerId,
  });
}

import { Coin } from '@/types/Coin';

const API_URL = 'http://localhost:3000';

export async function fetchCoins(): Promise<Coin[]> {
  console.log('fetching coins');
  const response = await fetch(`${API_URL}/coins`);
  if (!response.ok) {
    throw new Error('Failed to fetch coins');
  }
  return response.json();
}

export async function fetchCoinById(id: string): Promise<Coin> {
  const response = await fetch(`${API_URL}/coins/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch coin with ID ${id}`);
  }
  return response.json();
}

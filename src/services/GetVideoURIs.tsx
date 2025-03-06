import { Video } from '@/types/Video';

const API_URL = 'http://localhost:3000';

export async function fetchVideoURIs(): Promise<Video[]> {
  const response = await fetch(`${API_URL}/learning-videos`);
  if (!response.ok) {
    throw new Error('Failed to fetch video URIs');
  }
  return response.json();
}

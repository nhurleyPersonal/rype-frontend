import { useQuery } from '@tanstack/react-query';
import { fetchVideoURIs } from '@/services/GetVideoURIs';
import { Video } from '@/types/Video';

export function useGetVideoURIs() {
  console.log('fetching video URIs HELLO');
  return useQuery<Video[]>({
    queryKey: ['video-uris'],
    queryFn: fetchVideoURIs,
    staleTime: 1000 * 60 * 5,
  });
}

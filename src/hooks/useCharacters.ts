import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'

export const useCharacters = (page: number) => {
  const { data } = useQuery({
    queryKey: ['characters', page],
    queryFn: () => api.getCharacters(page)
  })

  return {
    characters: data?.results || [],
    info: data?.info
  }
}
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import { Character } from '../types/types'

export const useFavorites = () => {
  const queryClient = useQueryClient()

  const { data: favorites = [], isError } = useQuery({
    queryKey: ['favorites'],
    queryFn: api.getFavorites,
    retry: false
  })

  const addToFavorites = async (character: Character) => {
      await api.addToFavorites(character)
      await queryClient.invalidateQueries({ queryKey: ['favorites'] })
  }

  const removeFavorite = async (characterId: number) => {

      await api.removeFromFavorites(characterId)
      await queryClient.invalidateQueries({ queryKey: ['favorites'] })
  }

  const isFavorite = (characterId: number) => {
    return !isError && new Set(favorites.map((fav: { id: number }) => fav.id)).has(characterId)
  }

  return {
    favorites,
    addToFavorites,
    removeFavorite,
    isFavorite
  }
}
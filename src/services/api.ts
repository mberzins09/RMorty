import axios from 'axios'
import {Character} from '../types/types'

const API_URL = 'https://rickandmortyapi.com/api'
const JSON_SERVER_URL = 'http://localhost:3000'

export const api = {
    getCharacters: async (page: number = 1) => {
      const response = await axios.get(`${API_URL}/character?page=${page}`)
      return response.data
    },

    getFavorites: async () => {
        try {
          const response = await axios.get(`${JSON_SERVER_URL}/favorites`)
          return response.data.map((item: any) => item.character)
        } catch (error) {
          return []
        }
      },

      addToFavorites: async (character: Character) => {
          const response = await axios.get(`${JSON_SERVER_URL}/favorites`)
          const favorites = response.data
    
          if (favorites.some((fav: any) => fav.character.id === character.id)) {
            throw new Error('This character is already in favorites!')
          }
    
          await axios.post(`${JSON_SERVER_URL}/favorites`, {
            character: character
          })
          return { success: true }
      },

      removeFromFavorites: async (characterId: number) => {

          const response = await axios.get(`${JSON_SERVER_URL}/favorites`)
          const favorites = response.data
    
          const favoriteEntry = favorites.find((fav: any) => fav.character.id === characterId)
          
          const deleteResponse = await axios.delete(
            `${JSON_SERVER_URL}/favorites/${favoriteEntry.id}`
          )
    
          return { deleteResponse }
      }
}
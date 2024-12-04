import { useState } from "react"
import { Character } from "../types/types"
import CharacterCard from "./CharacterCard"
import Modal from "./CharacterModal"
import { useFavorites } from '../hooks/useFavorites'

interface CharacterListProps {
  characters: Character[]
  isLoading?: boolean
  error?: string | null
  showPagination?: boolean
  page?: number
  onPageChange?: (newPage: number) => void
  info?: { pages: number; next: string | null; prev: string | null }
  isFavoritePage?: boolean
  searchTerm?: string;
  statusFilter?: string;
  genderFilter?: string;
}

const CharacterList = ({ 
  characters,
  searchTerm = '',
  statusFilter = '',
  genderFilter = '', 
  showPagination,
  page,
  onPageChange,
  info,
  isFavoritePage = false
}: CharacterListProps) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const { addToFavorites, removeFavorite, isFavorite } = useFavorites()

  const filteredCharacters = characters.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || character.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesGender = !genderFilter || character.gender.toLowerCase() === genderFilter.toLowerCase()
    return matchesSearch && matchesStatus && matchesGender
  })

  const handleFavoriteAction = async (character: Character, action: 'add' | 'remove') => {
      if (action === 'add') {
        await addToFavorites(character)
      } else {
        await removeFavorite(character.id)
      }
  }

  return (
    <div className="relative">
      {showPagination && page && onPageChange && info && (
        <div className="flex justify-center gap-6 mb-8">
          <button 
            onClick={() => onPageChange(page - 1)}
            disabled={!info?.prev}
            className="px-6 py-3 text-lg bg-blue-500 text-white rounded-md 
                     disabled:bg-gray-300 disabled:cursor-not-allowed 
                     hover:bg-blue-600 hover:scale-105 transition-all duration-300"
          >
            Previous
          </button>
          <span className="flex items-center text-xl font-semibold text-gray-800">
            Page {page}
          </span>
          <button 
            onClick={() => onPageChange(page + 1)}
            disabled={!info?.next}
            className="px-6 py-3 text-lg bg-blue-500 text-white rounded-md 
                     disabled:bg-gray-300 disabled:cursor-not-allowed 
                     hover:bg-blue-600 hover:scale-105 transition-all duration-300"
          >
            Next
          </button>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {filteredCharacters.map(character => (
          <div 
            key={character.id}
            className="relative flex-shrink-0 w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(25%-1.5rem)]"
          >
            <CharacterCard 
              character={character}
              onClick={() => setSelectedCharacter(character)}
            />
            {!selectedCharacter && (
              isFavoritePage ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteAction(character, 'remove');
                  }}
                  className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full 
                           hover:bg-red-600 hover:scale-110 transition-all duration-300 text-lg"
                  data-testid={`remove-favorite-${character.id}`}
                >
                  ✕
                </button>
              ) : !isFavorite(character.id) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteAction(character, 'add');
                  }}
                  className="absolute top-4 right-4 bg-blue-500 text-white p-3 rounded-full 
                           hover:bg-blue-600 hover:scale-110 transition-all duration-300 text-lg"
                  data-testid={`add-favorite-${character.id}`}
                >
                  ❤️
                </button>
              )
            )}
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="fixed inset-0 z-50">
          <Modal 
            character={selectedCharacter} 
            onClose={() => setSelectedCharacter(null)}
          />
        </div>
      )}
    </div>
  )
}

export default CharacterList
import { createLazyFileRoute } from '@tanstack/react-router'
import { useFavorites } from '../hooks/useFavorites'
import CharacterList from '../components/CharacterList'
import SearchAndFilter from '../components/SearchAndFilter'
import { useState } from 'react'

export const Route = createLazyFileRoute('/favorites')({
  component: Favorites,
})

function Favorites() {
  const { favorites } = useFavorites()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [genderFilter, setGenderFilter] = useState('')

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Favorite Characters
        </h2>
        <SearchAndFilter
          onSearch={setSearchTerm}
          onStatusFilter={setStatusFilter}
          onGenderFilter={setGenderFilter}
        />
      </div>
      
      <CharacterList 
        characters={favorites}
        isFavoritePage={true}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        genderFilter={genderFilter}
      />
    </div>
  )
}

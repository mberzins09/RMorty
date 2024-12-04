import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useCharacters } from '../hooks/useCharacters'
import CharacterList from '../components/CharacterList'
import SearchAndFilter from '../components/SearchAndFilter'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const { characters, info } = useCharacters(page)

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Rick and Morty Characters
        </h2>
        <SearchAndFilter
          onSearch={setSearchTerm}
          onStatusFilter={setStatusFilter}
          onGenderFilter={setGenderFilter}
        />
      </div>
      
      <CharacterList 
        characters={characters}
        showPagination
        page={page}
        onPageChange={setPage}
        info={info}
        isFavoritePage={false}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        genderFilter={genderFilter}
      />
    </div>
  )
}

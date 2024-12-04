import { useState } from 'react'

interface SearchAndFilterProps {
  onSearch: (term: string) => void
  onStatusFilter: (status: string) => void
  onGenderFilter: (gender: string) => void
}

const SearchAndFilter = ({ onSearch, onStatusFilter, onGenderFilter }: SearchAndFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <div className="flex gap-4 items-center">
      <select
        onChange={(e) => onStatusFilter(e.target.value)}
        className="px-4 py-2 border-2 border-gray-200 rounded-md focus:outline-none 
                 focus:border-blue-500 transition-colors duration-300"
      >
        <option value="">All Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        onChange={(e) => onGenderFilter(e.target.value)}
        className="px-4 py-2 border-2 border-gray-200 rounded-md focus:outline-none 
                 focus:border-blue-500 transition-colors duration-300"
      >
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>

      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          onSearch(e.target.value)
        }}
        className="px-4 py-2 border-2 border-gray-200 rounded-md focus:outline-none 
                 focus:border-blue-500 transition-colors duration-300 w-64"
      />
    </div>
  )
}

export default SearchAndFilter
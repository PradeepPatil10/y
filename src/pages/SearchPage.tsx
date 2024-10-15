import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Users, Coffee, List, Map, AlertCircle } from 'lucide-react'
import MapView from '../components/MapView'
import FilterOptions from '../components/FilterOptions'
import { sampleProperties } from '../sampleProperties'
import { Property } from '../types'

const SearchPage: React.FC = () => {
  const [filteredProperties, setFilteredProperties] = useState(sampleProperties)
  const [filters, setFilters] = useState({
    hub: '',
    distanceFromHub: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    priceRange: '',
    amenities: [] as string[],
    foodPreferences: [] as string[]
  })
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: checked
        ? [...prev[name as keyof typeof prev] as string[], value]
        : (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
    }))
  }

  const applyFilters = () => {
    let filtered = sampleProperties

    if (filters.hub) {
      filtered = filtered.filter(property => property.hub === filters.hub)
    }

    if (filters.distanceFromHub) {
      filtered = filtered.filter(property => property.distanceFromHub === filters.distanceFromHub)
    }

    if (filters.guests) {
      filtered = filtered.filter(property => property.maxOccupancy >= parseInt(filters.guests))
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number)
      filtered = filtered.filter(property => property.startingTariff >= min && property.startingTariff <= max)
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.every(amenity => property.amenities.includes(amenity))
      )
    }

    if (filters.foodPreferences.length > 0) {
      filtered = filtered.filter(property =>
        filters.foodPreferences.every(pref => property.foodPreferences.includes(pref))
      )
    }

    setFilteredProperties(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Properties</h1>
      <div className="flex">
        <div className="w-1/4 pr-4">
          <FilterOptions
            filters={filters}
            handleFilterChange={handleFilterChange}
            handleCheckboxChange={handleCheckboxChange}
            applyFilters={applyFilters}
          />
        </div>
        <div className="w-3/4 pl-4">
          <div className="flex justify-end items-center mb-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-md ${viewMode === 'map' ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}
              >
                <Map size={20} />
              </button>
            </div>
          </div>
          {viewMode === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <div key={property.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img src={property.images[0]} alt={property.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <MapPin size={16} className="mr-1" /> {property.location}
                    </p>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <Users size={16} className="mr-1" /> Max Occupancy: {property.maxOccupancy}
                    </p>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <Coffee size={16} className="mr-1" /> Starting at ₹{property.startingTariff} per night
                    </p>
                    <p className={`mb-4 flex items-center ${
                      property.availability === 'Sold Out' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      <AlertCircle size={16} className="mr-1" /> 
                      Availability: {property.availability}
                    </p>
                    <Link
                      to={`/property/${property.id}`}
                      className={`bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 inline-block ${
                        property.availability === 'Sold Out' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={(e) => {
                        if (property.availability === 'Sold Out') {
                          e.preventDefault()
                        }
                      }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <MapView properties={filteredProperties} />
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
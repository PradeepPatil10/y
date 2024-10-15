import React from 'react'

interface FilterOptionsProps {
  filters: {
    hub: string
    distanceFromHub: string
    checkIn: string
    checkOut: string
    guests: string
    priceRange: string
    amenities: string[]
    foodPreferences: string[]
  }
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  applyFilters: () => void
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  filters,
  handleFilterChange,
  handleCheckboxChange,
  applyFilters
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="hub" className="block text-sm font-medium text-gray-700 mb-1">Hub</label>
          <select
            id="hub"
            name="hub"
            value={filters.hub}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a hub</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bengaluru">Bengaluru</option>
          </select>
        </div>
        <div>
          <label htmlFor="distanceFromHub" className="block text-sm font-medium text-gray-700 mb-1">Distance from Hub</label>
          <select
            id="distanceFromHub"
            name="distanceFromHub"
            value={filters.distanceFromHub}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select distance</option>
            <option value="Upto 100 Kms">Upto 100 Kms</option>
            <option value="200-350 Kms">200-350 Kms</option>
            <option value="350-500 Kms">350-500 Kms</option>
          </select>
        </div>
        <div>
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={filters.checkIn}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={filters.checkOut}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={filters.guests}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            min="1"
          />
        </div>
        <div>
          <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <select
            id="priceRange"
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select price range</option>
            <option value="0-10000">₹0 - ₹10,000</option>
            <option value="10000-20000">₹10,000 - ₹20,000</option>
            <option value="20000-30000">₹20,000 - ₹30,000</option>
            <option value="30000-100000">₹30,000+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
          {['Swimming Pool', 'Spa', 'Gym', 'Conference Rooms'].map((amenity) => (
            <div key={amenity} className="flex items-center">
              <input
                type="checkbox"
                id={`amenity-${amenity}`}
                name="amenities"
                value={amenity}
                checked={filters.amenities.includes(amenity)}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor={`amenity-${amenity}`}>{amenity}</label>
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Food Preferences</label>
          {['Veg', 'Non-Veg', 'Jain'].map((pref) => (
            <div key={pref} className="flex items-center">
              <input
                type="checkbox"
                id={`food-${pref}`}
                name="foodPreferences"
                value={pref}
                checked={filters.foodPreferences.includes(pref)}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor={`food-${pref}`}>{pref}</label>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={applyFilters}
        className="mt-4 w-full bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        Apply Filters
      </button>
    </div>
  )
}

export default FilterOptions
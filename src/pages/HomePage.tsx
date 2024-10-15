import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Video, Users, MapPin, Coffee, ChevronLeft, ChevronRight, AlertCircle, Calendar } from 'lucide-react'

interface Property {
  id: number
  name: string
  location: string
  images: string[]
  videoUrl: string
  maxOccupancy: number
  startingTariff: number
  amenities: string[]
  availability: "Sold Out" | "Partially Available"
}

const featuredProperties: Property[] = [
  {
    id: 1,
    name: "Taj Lake Palace",
    location: "Udaipur, Rajasthan",
    images: [
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    ],
    videoUrl: "https://example.com/taj-lake-palace-video.mp4",
    maxOccupancy: 200,
    startingTariff: 25000,
    amenities: ["Swimming pool", "Spa", "Gym"],
    availability: "Partially Available"
  },
  {
    id: 2,
    name: "The Leela Palace",
    location: "Bengaluru, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2049&q=80",
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    ],
    videoUrl: "https://example.com/leela-palace-video.mp4",
    maxOccupancy: 300,
    startingTariff: 20000,
    amenities: ["Swimming pool", "Spa", "Gym", "Conference rooms"],
    availability: "Sold Out"
  },
  {
    id: 3,
    name: "The Oberoi Amarvilas",
    location: "Agra, Uttar Pradesh",
    images: [
      "https://images.unsplash.com/photo-1585468274952-66591eb14165?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    ],
    videoUrl: "https://example.com/oberoi-amarvilas-video.mp4",
    maxOccupancy: 250,
    startingTariff: 30000,
    amenities: ["Swimming pool", "Spa", "Gym", "Taj Mahal view"],
    availability: "Partially Available"
  }
]

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % property.images.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img src={property.images[activeImageIndex]} alt={property.name} className="w-full h-64 object-cover" />
        <div className="absolute top-0 right-0 bg-pink-600 text-white px-2 py-1 m-2 rounded">
          Featured
        </div>
        <button 
          onClick={prevImage} 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={nextImage} 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          <ChevronRight size={20} />
        </button>
        <button className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75">
          <Video size={20} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
        <p className="text-gray-600 mb-2 flex items-center">
          <MapPin size={16} className="mr-1" /> {property.location}
        </p>
        <p className="text-gray-600 mb-2 flex items-center">
          <Users size={16} className="mr-1" /> Max Occupancy: {property.maxOccupancy}
        </p>
        <p className="text-gray-600 mb-2 flex items-center">
          <Coffee size={16} className="mr-1" /> Starting at ₹{property.startingTariff} per night
        </p>
        <p className={`mb-2 flex items-center ${
          property.availability === 'Sold Out' ? 'text-red-600' : 'text-yellow-600'
        }`}>
          <AlertCircle size={16} className="mr-1" /> 
          Availability: {property.availability}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.map((amenity, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
              {amenity}
            </span>
          ))}
        </div>
        <Link
          to={`/property/${property.id}`}
          className={`block w-full text-center bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition duration-300 ${
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
  )
}

const HomePage: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')

  const handleSearch = () => {
    // Here you would typically handle the search logic
    console.log('Searching with dates:', { checkInDate, checkOutDate })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Few clicks to a perfect corporate offsite</h1>
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Find the Perfect Venue</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
              <div className="relative">
                <input
                  type="date"
                  id="checkIn"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
              <div className="relative">
                <input
                  type="date"
                  id="checkOut"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="w-full mt-4 bg-pink-600 text-white p-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            Search Venues
          </button>
        </div>
      </div>
      <h2 className="text-3xl font-semibold mb-6">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
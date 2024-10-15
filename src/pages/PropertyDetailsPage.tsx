import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Users, Coffee, Utensils, Wine, Star, MapPin } from 'lucide-react'

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Placeholder data (replace with actual data fetching logic)
  const property = {
    id: 1,
    name: 'Taj Lake Palace',
    location: 'Udaipur, Rajasthan',
    description: 'A luxury hotel located in the middle of Lake Pichola, offering a unique and romantic experience.',
    images: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2049&q=80',
    ],
    video: 'https://example.com/taj-lake-palace-video.mp4',
    maxOccupancy: 200,
    startingTariff: 25000,
    amenities: ['Swimming Pool', 'Spa', 'Gym', 'Conference Rooms'],
    foodPreferences: ['Veg', 'Non-Veg', 'Jain'],
    lawnArea: '5000 sq.ft',
    conferenceHalls: 3,
    banquetCapacity: 150,
    alcoholAvailable: true,
    rating: 4.8,
    reviews: [
      { id: 1, user: 'John Doe', rating: 5, comment: 'Absolutely stunning property with impeccable service!' },
      { id: 2, user: 'Jane Smith', rating: 4, comment: 'Beautiful location, but the food could be improved.' },
    ],
  }

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % property.images.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{property.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative">
            <img src={property.images[activeImageIndex]} alt={property.name} className="w-full h-64 object-cover rounded-lg" />
            <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="mt-4 flex space-x-2">
            {property.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${property.name} ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer ${index === activeImageIndex ? 'border-2 border-pink-500' : ''}`}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>
          {property.video && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Property Video</h3>
              <video controls className="w-full rounded-md">
                <source src={property.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
        <div>
          <p className="text-gray-600 mb-4">{property.description}</p>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 mr-1" size={20} />
            <span className="font-semibold">{property.rating}</span>
            <span className="text-gray-600 ml-2">({property.reviews.length} reviews)</span>
          </div>
          <div className="flex items-center mb-4">
            <MapPin className="text-gray-600 mr-2" size={20} />
            <span>{property.location}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold">Max Occupancy</h3>
              <p className="flex items-center"><Users size={20} className="mr-2" /> {property.maxOccupancy} guests</p>
            </div>
            <div>
              <h3 className="font-semibold">Starting Tariff</h3>
              <p>₹{property.startingTariff} per person</p>
            </div>
            <div>
              <h3 className="font-semibold">Lawn Area</h3>
              <p>{property.lawnArea}</p>
            </div>
            <div>
              <h3 className="font-semibold">Conference Halls</h3>
              <p>{property.conferenceHalls}</p>
            </div>
            <div>
              <h3 className="font-semibold">Banquet Capacity</h3>
              <p>{property.banquetCapacity} guests</p>
            </div>
            <div>
              <h3 className="font-semibold">Alcohol Available</h3>
              <p className="flex items-center">
                <Wine size={20} className="mr-2" />
                {property.alcoholAvailable ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, index) => (
                <span key={index} className="bg-gray-200 px-2 py-1 rounded-md text-sm">{amenity}</span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Food Preferences</h3>
            <div className="flex items-center space-x-4">
              {property.foodPreferences.map((pref, index) => (
                <span key={index} className="flex items-center">
                  <Utensils size={20} className="mr-1" /> {pref}
                </span>
              ))}
            </div>
          </div>
          <Link
            to={`/quote-request/${id}`}
            className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 inline-block"
          >
            Request Quote
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {property.reviews.map((review) => (
          <div key={review.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <Star className="text-yellow-400 mr-1" size={16} />
              <span className="font-semibold">{review.rating}</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <p className="text-gray-500 mt-2">- {review.user}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertyDetailsPage
import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

interface QuoteFormData {
  eventDate: string
  guests: string
  mealPlan: string
  services: string[]
}

const QuoteSummaryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const { formData } = location.state as { formData: QuoteFormData }

  const handleModify = () => {
    navigate(`/quote-request/${id}`)
  }

  const handleConfirm = () => {
    // Here you would typically send the confirmation to your backend
    console.log('Quote confirmed:', formData)
    // Navigate to a booking confirmation page or show a success message
    navigate(`/booking-confirmation/${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Quote Summary for Property {id}</h1>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Event Details</h2>
        <div className="mb-4">
          <p><strong>Event Date:</strong> {formData.eventDate}</p>
          <p><strong>Number of Guests:</strong> {formData.guests}</p>
          <p><strong>Meal Plan:</strong> {formData.mealPlan}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Required Services:</h3>
          <ul className="list-disc list-inside">
            {formData.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleModify}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Modify Request
          </button>
          <button
            onClick={handleConfirm}
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            Confirm Request
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuoteSummaryPage
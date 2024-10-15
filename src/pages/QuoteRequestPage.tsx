import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

interface QuoteFormData {
  checkIn: string
  checkOut: string
  guests: string
  mealPlan: string
  services: string[]
}

const QuoteRequestPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<QuoteFormData>({
    checkIn: '',
    checkOut: '',
    guests: '',
    mealPlan: '',
    services: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter(service => service !== value)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Navigate to the quote summary page
    navigate(`/quote-summary/${id}`, { state: { formData } })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Request Quote for Property {id}</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mealPlan" className="block text-sm font-medium text-gray-700 mb-1">Preferred Meal Plan</label>
          <select
            id="mealPlan"
            name="mealPlan"
            value={formData.mealPlan}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a meal plan</option>
            <option value="CP">Continental Plan (CP)</option>
            <option value="AP">American Plan (AP)</option>
            <option value="MAP">Modified American Plan (MAP)</option>
          </select>
        </div>
        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700 mb-1">Required Third-Party Services</p>
          {['Event Planner', 'DJ', 'Photographer', 'Decorator'].map(service => (
            <div key={service} className="flex items-center">
              <input
                type="checkbox"
                id={service}
                name="services"
                value={service}
                onChange={handleServiceChange}
                className="mr-2"
              />
              <label htmlFor={service}>{service}</label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-pink-600 text-white p-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          Submit Quote Request
        </button>
      </form>
    </div>
  )
}

export default QuoteRequestPage
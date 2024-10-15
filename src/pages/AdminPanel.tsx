import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { fetchPropertiesAsync, addPropertyAsync, updatePropertyAsync, deletePropertyAsync, Property } from '../store/propertySlice'
import { X, Plus, Edit, Trash } from 'lucide-react'

const AdminPanel: React.FC = () => {
  const dispatch = useDispatch()
  const properties = useSelector((state: RootState) => state.properties.properties)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [newProperty, setNewProperty] = useState<Omit<Property, 'id'>>({
    name: '',
    location: '',
    startingTariff: 0,
    lawnArea: '',
    conferenceHalls: 0,
    alcoholPolicy: '',
    amenities: [],
    foodPreferences: [],
    images: [],
    video: null,
    menuCard: null,
    roomTypes: []
  })

  useEffect(() => {
    dispatch(fetchPropertiesAsync() as any)
  }, [dispatch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProperty(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    if (name === 'amenities' || name === 'foodPreferences') {
      setNewProperty(prev => ({
        ...prev,
        [name]: checked
          ? [...prev[name], e.target.value]
          : prev[name].filter((item: string) => item !== e.target.value)
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProperty) {
      dispatch(updatePropertyAsync({ ...newProperty, id: editingProperty.id } as Property) as any)
      setEditingProperty(null)
    } else {
      dispatch(addPropertyAsync(newProperty) as any)
    }
    setShowAddForm(false)
    setNewProperty({
      name: '',
      location: '',
      startingTariff: 0,
      lawnArea: '',
      conferenceHalls: 0,
      alcoholPolicy: '',
      amenities: [],
      foodPreferences: [],
      images: [],
      video: null,
      menuCard: null,
      roomTypes: []
    })
  }

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    setNewProperty(property)
    setShowAddForm(true)
  }

  const handleDelete = (id: number) => {
    dispatch(deletePropertyAsync(id) as any)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Property Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 mb-4"
        >
          <Plus className="inline-block mr-2" size={20} />
          Add New Property
        </button>
        {/* Property list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
              <p className="text-gray-600 mb-2">{property.location}</p>
              <p className="text-sm mb-1">Starting Tariff: ₹{property.startingTariff}</p>
              <p className="text-sm mb-1">Lawn Area: {property.lawnArea}</p>
              <p className="text-sm mb-1">Conference Halls: {property.conferenceHalls}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(property)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  <Edit size={16} className="inline-block mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  <Trash size={16} className="inline-block mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Management Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Booking Management</h2>
        {/* Add your booking management UI here */}
        <p>Booking management functionality to be implemented.</p>
      </div>

      {/* Add/Edit Property Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{editingProperty ? 'Edit Property' : 'Add New Property'}</h2>
              <button onClick={() => {
                setShowAddForm(false)
                setEditingProperty(null)
              }} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Property Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newProperty.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newProperty.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="startingTariff" className="block text-sm font-medium text-gray-700">Starting Tariff</label>
                <input
                  type="number"
                  id="startingTariff"
                  name="startingTariff"
                  value={newProperty.startingTariff}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="lawnArea" className="block text-sm font-medium text-gray-700">Lawn Area</label>
                <input
                  type="text"
                  id="lawnArea"
                  name="lawnArea"
                  value={newProperty.lawnArea}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <div>
                <label htmlFor="conferenceHalls" className="block text-sm font-medium text-gray-700">Number of Conference Halls</label>
                <input
                  type="number"
                  id="conferenceHalls"
                  name="conferenceHalls"
                  value={newProperty.conferenceHalls}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="alcoholPolicy" className="block text-sm font-medium text-gray-700">Alcohol Policy</label>
                <select
                  id="alcoholPolicy"
                  name="alcoholPolicy"
                  value={newProperty.alcoholPolicy}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                >
                  <option value="">Select an option</option>
                  <option value="Bar available, Outside alcohol not allowed">Bar available, Outside alcohol not allowed</option>
                  <option value="No bar, Liquor license and corkage fees applicable">No bar, Liquor license and corkage fees applicable</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amenities</label>
                {['Swimming pool', 'Gym', 'Spa', 'Games'].map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`amenity-${amenity}`}
                      name="amenities"
                      value={amenity}
                      checked={newProperty.amenities.includes(amenity)}
                      onChange={handleCheckboxChange}
                      className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded"
                    />
                    <label htmlFor={`amenity-${amenity}`} className="ml-2 block text-sm text-gray-900">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Food Preferences</label>
                {['Veg', 'Non-Veg', 'Jain', 'Fasting', 'Gala'].map((pref) => (
                  <div key={pref} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`food-${pref}`}
                      name="foodPreferences"
                      value={pref}
                      checked={newProperty.foodPreferences.includes(pref)}
                      onChange={handleCheckboxChange}
                      className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded"
                    />
                    <label htmlFor={`food-${pref}`} className="ml-2 block text-sm text-gray-900">
                      {pref}
                    </label>
                  </div>
                ))}
              </div>
              {/* Add file upload fields for images, video, and menu card here */}
              <button
                type="submit"
                className="w-full bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
              >
                {editingProperty ? 'Update Property' : 'Add Property'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
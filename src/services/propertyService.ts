import { Property } from '../store/propertySlice'

let mockProperties: Property[] = []

export const fetchProperties = async (): Promise<Property[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProperties), 500)
  })
}

export const addProperty = async (propertyData: Omit<Property, 'id'>): Promise<Property> => {
  // Simulate API call
  return new Promise((resolve) => {
    const newProperty = {
      ...propertyData,
      id: mockProperties.length + 1,
    }
    mockProperties.push(newProperty)
    setTimeout(() => resolve(newProperty), 500)
  })
}

export const updateProperty = async (propertyData: Property): Promise<Property> => {
  // Simulate API call
  return new Promise((resolve) => {
    const index = mockProperties.findIndex(p => p.id === propertyData.id)
    if (index !== -1) {
      mockProperties[index] = propertyData
    }
    setTimeout(() => resolve(propertyData), 500)
  })
}

export const deleteProperty = async (id: number): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    mockProperties = mockProperties.filter(p => p.id !== id)
    setTimeout(() => resolve(), 500)
  })
}
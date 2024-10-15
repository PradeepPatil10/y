export interface Property {
  id: number
  name: string
  location: string
  hub: string
  distanceFromHub: string
  maxOccupancy: number
  startingTariff: number
  lawnArea: string
  conferenceHalls: number
  amenities: string[]
  foodPreferences: string[]
  images: string[]
  latitude: number
  longitude: number
  occupancyTypes: string[]
  availability: "Sold Out" | "Partially Available"
}
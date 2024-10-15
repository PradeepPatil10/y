import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { fetchProperties, addProperty, updateProperty, deleteProperty } from '../services/propertyService'

// Define the Property interface
export interface Property {
  id: number
  name: string
  location: string
  startingTariff: number
  lawnArea: string
  conferenceHalls: number
  alcoholPolicy: string
  amenities: string[]
  foodPreferences: string[]
  images: string[]
  video: string | null
  menuCard: string | null
  roomTypes: {
    type: string
    subcategories: {
      name: string
      image: string
      tariff: number
      amenities: string[]
    }[]
  }[]
}

// Define the state interface
interface PropertyState {
  properties: Property[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// Define the initial state
const initialState: PropertyState = {
  properties: [],
  status: 'idle',
  error: null
}

export const fetchPropertiesAsync = createAsyncThunk(
  'properties/fetchProperties',
  async () => {
    const response = await fetchProperties()
    return response
  }
)

export const addPropertyAsync = createAsyncThunk(
  'properties/addProperty',
  async (propertyData: Omit<Property, 'id'>) => {
    const response = await addProperty(propertyData)
    return response
  }
)

export const updatePropertyAsync = createAsyncThunk(
  'properties/updateProperty',
  async (propertyData: Property) => {
    const response = await updateProperty(propertyData)
    return response
  }
)

export const deletePropertyAsync = createAsyncThunk(
  'properties/deleteProperty',
  async (id: number) => {
    await deleteProperty(id)
    return id
  }
)

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertiesAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPropertiesAsync.fulfilled, (state, action: PayloadAction<Property[]>) => {
        state.status = 'succeeded'
        state.properties = action.payload
      })
      .addCase(fetchPropertiesAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(addPropertyAsync.fulfilled, (state, action: PayloadAction<Property>) => {
        state.properties.push(action.payload)
      })
      .addCase(updatePropertyAsync.fulfilled, (state, action: PayloadAction<Property>) => {
        const index = state.properties.findIndex(property => property.id === action.payload.id)
        if (index !== -1) {
          state.properties[index] = action.payload
        }
      })
      .addCase(deletePropertyAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.properties = state.properties.filter(property => property.id !== action.payload)
      })
  },
})

export default propertySlice.reducer